import { Metadata } from "next";
import MapWrapper from "@/app/search/(components)/kakaomap/MapWrapper";
import { Suspense } from "react";
import { getRestaurantsAction } from "@/libs/actions/restaurant";

export const metadata: Metadata = {
  title: "Fresh Plate | 탐색",
  description: "알레르기 필터링으로 맞춤 비건 음식점을 찾아보세요!",
};

export default async function Search() {
  const initialRestaurants = await getRestaurantsAction();

  return (
    <section className="w-full h-full">
      <Suspense fallback={<div>Loading...</div>}>
        <MapWrapper initialRestaurants={initialRestaurants} />
      </Suspense>
    </section>
  );
}
