import { NextResponse } from "next/server";

const kakaoKeys = [
  process.env.NEXT_PUBLIC_KAKAO_REST_KEY!,
  process.env.NEXT_PUBLIC_KAKAO_REST_KEY2!,
  process.env.NEXT_PUBLIC_KAKAO_REST_KEY3!,
  process.env.NEXT_PUBLIC_KAKAO_REST_KEY4!,
  process.env.NEXT_PUBLIC_KAKAO_REST_KEY5!,
];

let currentKeyIndex = 0;

/** Kakao Place 검색 API 프록시 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  for (let i = 0; i < kakaoKeys.length; i++) {
    const key = kakaoKeys[currentKeyIndex];
    console.log(key);
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(
          query,
        )}`,
        {
          method: "GET",
          headers: { Authorization: `KakaoAK ${key}` },
        },
      );

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json(data);
      }

      // 429 → 키 교체
      if (response.status === 429) {
        currentKeyIndex = (currentKeyIndex + 1) % kakaoKeys.length;
        continue;
      }

      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || response.statusText },
        { status: response.status },
      );
    } catch (err: any) {
      return NextResponse.json({ error: err.message }, { status: 500 });
    }
  }

  return NextResponse.json({ error: "All keys exhausted" }, { status: 429 });
}
