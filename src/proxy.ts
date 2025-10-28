import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("accessToken")?.value;
  const onboardingAllowed = req.cookies.get("onboardingAllowed")?.value;

  if (!accessToken && req.nextUrl.pathname.startsWith("/my-page")) {
    return NextResponse.redirect(new URL("/sign", req.url));
  }

  if (
    req.nextUrl.pathname.startsWith("/onboarding") &&
    onboardingAllowed !== "true"
  ) {
    // 1회 허용이 아니면 리다이렉트
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
