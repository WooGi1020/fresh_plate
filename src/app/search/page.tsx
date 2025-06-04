import { Suspense } from "react";
import MapWrapper from "@/app/search/components/kakaomap/MapWrapper";
import { Metadata } from "next";
import rawData from "@/data/restaurants_data.json";

export const metadata: Metadata = {
  title: "VeganFree | 검색",
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
