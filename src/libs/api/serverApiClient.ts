import { cookies, headers as getHeaders } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

interface RequestConfig extends RequestInit {
  params?: Record<string, string | number | boolean | undefined | null>;
  data?: any;
}

async function serverRequest<T = any>(
  url: string,
  config: RequestConfig = {},
  isRetry = false,
): Promise<T> {
  const { params, data, ...customConfig } = config;

  const cookieStore = await cookies();
  // 재시도 시에는 이미 새로운 토큰이 헤더에 주입되어 오므로 쿠키를 다시 읽지 않음
  let accessToken = isRetry ? null : cookieStore.get("accessToken")?.value;

  let finalUrl = url.startsWith("http")
    ? url
    : `${BASE_URL}${url.startsWith("/") ? url : `/${url}`}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      finalUrl += (finalUrl.includes("?") ? "&" : "?") + queryString;
    }
  }

  const headers = new Headers(customConfig.headers);
  if (data && !(data instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const fetchOptions: RequestInit = {
    ...customConfig,
    headers,
    body:
      data instanceof FormData
        ? data
        : data
          ? JSON.stringify(data)
          : customConfig.body,
  };

  const response = await fetch(finalUrl, fetchOptions);

  if (response.status === 401 && !isRetry) {
    const refreshToken = cookieStore.get("refreshToken")?.value;
    if (refreshToken) {
      try {
        const reissueResponse = await fetch(`${BASE_URL}/api/auth/reissue`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        if (reissueResponse.ok) {
          const reissueData = await reissueResponse.json();
          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            reissueData.data;

          // 현재 컨텍스트가 쿠키 수정이 가능한지 체크 (서버 액션 또는 라우트 핸들러 여부)
          const headerList = await getHeaders();
          const isServerAction = headerList.has("next-action");

          if (isServerAction) {
            try {
              cookieStore.set("accessToken", newAccessToken, {
                path: "/",
                sameSite: "lax",
              });
              cookieStore.set("refreshToken", newRefreshToken, {
                path: "/",
                sameSite: "lax",
              });
            } catch (e) {
              console.warn("Manual cookie set failed even in Action context.");
            }
          } else {
            // SSR(렌더링) 중일 때는 쿠키 세팅을 스킵하고 '현재 요청'에만 새 토큰을 적용해 재시도합니다.
            console.warn(
              "SSR context detected. Token refreshed for current request, but cookie skip due to Next.js restriction.",
            );
          }

          // 새 토큰으로 헤더 재설정 후 재시도
          const newHeaders = new Headers(headers);
          newHeaders.set("Authorization", `Bearer ${newAccessToken}`);
          return serverRequest<T>(
            url,
            { ...config, headers: newHeaders },
            true,
          );
        }
      } catch (error) {
        console.error("Token reissue failed in serverApiClient:", error);
      }
    }
  }

  const responseData = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      throw new Error("세션이 만료되었습니다. 다시 로그인해주세요.");
    }
    throw new Error(responseData.message || response.statusText);
  }

  return responseData.data as T;
}

export const serverApiClient = {
  get: <T = any>(
    url: string,
    params?: Record<string, any>,
    config?: RequestInit,
  ) => serverRequest<T>(url, { ...config, method: "GET", params }),
  post: <T = any>(url: string, data?: any, config?: RequestInit) =>
    serverRequest<T>(url, { ...config, method: "POST", data }),
  put: <T = any>(url: string, data?: any, config?: RequestInit) =>
    serverRequest<T>(url, { ...config, method: "PUT", data }),
  delete: <T = any>(url: string, config?: RequestInit) =>
    serverRequest<T>(url, { ...config, method: "DELETE" }),
};
