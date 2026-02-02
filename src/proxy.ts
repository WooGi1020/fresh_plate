import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/my-page", "/onboarding"];
const PUBLIC_ROUTES = ["/sign", "/"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const accessToken = req.cookies.get("accessToken")?.value;
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const onboardingAllowed = req.cookies.get("onboardingAllowed")?.value;

  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route),
  );
  const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname === route);

  // 1. 마이페이지 및 보호된 경로 접근 시 토큰이 아예 없는 경우
  if (isProtectedRoute && !accessToken && !refreshToken) {
    const url = new URL("/sign", req.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // 2. 액세스 토큰은 없지만 리프레시 토큰이 있는 경우 (토큰이 쿠키에서 자연 만료되었거나 삭제된 경우 재발급 시도)
  if (isProtectedRoute && !accessToken && refreshToken) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/reissue`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshToken}`,
          },
        },
      );

      if (response.ok) {
        const data = await response.json();
        const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
          data.data;

        // 새로운 토큰으로 요청을 계속함
        const nextResponse = NextResponse.next();
        nextResponse.cookies.set("accessToken", newAccessToken, {
          path: "/",
          sameSite: "lax",
        });
        nextResponse.cookies.set("refreshToken", newRefreshToken, {
          path: "/",
          sameSite: "lax",
        });
        return nextResponse;
      }
    } catch (error) {
      console.error("Token reissue failed in proxy middleware:", error);
    }

    // 재발급 실패 시 쿠키를 모두 삭제하고 로그인 페이지로 리다이렉트
    const response = NextResponse.redirect(new URL("/sign", req.url));
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    return response;
  }

  // 3. 온보딩 보호 권한 체크
  if (pathname.startsWith("/onboarding") && onboardingAllowed !== "true") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 4. 이미 로그인한 사용자가 로그인 페이지 접근 시 자동 리다이렉트
  if (isPublicRoute && accessToken && pathname === "/sign") {
    return NextResponse.redirect(new URL("/search", req.url));
  }

  return NextResponse.next();
}
