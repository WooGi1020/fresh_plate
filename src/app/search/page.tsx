import { Suspense } from "react";
import MapWrapper from "@/app/search/components/kakaomap/MapWrapper";
import { Metadata } from "next";
import rawData from "@/data/restaurants_data_with_preferences.json";

export const metadata: Metadata = {
  title: "Fresh Plate | 검색",
  description: "알레르기 필터링으로 맞춤 비건 음식점을 찾아보세요!",
};

const rawdata = rawData.restaurants;

export default function Search() {
  const data = rawdata;

  return (
    <section className="w-full h-full">
      <Suspense fallback={<div>Loading map...</div>}>
        <MapWrapper initialData={data} />
      </Suspense>
    </section>
  );
}
