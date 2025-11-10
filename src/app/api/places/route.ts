import { NextResponse } from "next/server";
import axios from "axios";

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
      const response = await axios.get(
        "https://dapi.kakao.com/v2/local/search/keyword.json",
        {
          params: { query },
          headers: { Authorization: `KakaoAK ${key}` },
        }
      );
      return NextResponse.json(response.data);
    } catch (err: any) {
      // 429 → 키 교체
      if (err.response?.status === 429) {
        currentKeyIndex = (currentKeyIndex + 1) % kakaoKeys.length;
        continue;
      }
      return NextResponse.json(
        { error: err.message },
        { status: err.response?.status || 500 }
      );
    }
  }

  return NextResponse.json({ error: "All keys exhausted" }, { status: 429 });
}
