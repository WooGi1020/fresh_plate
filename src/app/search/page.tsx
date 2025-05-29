import { Suspense } from "react";
import MapWrapper from "@/app/search/components/kakaomap/MapWrapper";

export default function Search() {
  return (
    <section className="w-full h-full">
      <Suspense fallback={<div>Loading map...</div>}>
        <MapWrapper />
      </Suspense>
    </section>
  );
}
