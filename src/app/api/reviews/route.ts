import { serverApiClient } from "@/libs/api/serverApiClient";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const restaurantId = searchParams.get("restaurantId");

  try {
    const data = await serverApiClient.get(
      `api/restaurant/${restaurantId}/reviews`,
    );
    const list = data?.reviews ?? [];
    return NextResponse.json(list);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}
