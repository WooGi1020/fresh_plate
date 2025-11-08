"use client";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { useEffect, useState, useMemo } from "react";
import useFilteredRestaurants from "@/hooks/useFilteredRestaurants";
import NoResultsModal from "@/app/search/(components)/emptyData/EmptyDataModal";
import MarkerLayer from "@/app/search/(components)/kakaomap/MarkerLayer";
import { useSearchParams } from "next/navigation";
import CustomSideList from "@/app/search/(components)/customSideList/CustomSideList";
import { useGetRestaurants } from "@/libs/query/getRestaurantQuery";
import { useMapStore } from "@/store/useMapStore";
import coordinatesCenter from "@/constants/coordinatesCenter";

export default function MapWrapper() {
  const { data, isLoading } = useGetRestaurants();
  const map = useMapStore((s) => s.map);
  const setMap = useMapStore((s) => s.setMap);
  const setSelectedId = useMapStore((s) => s.setSelectedId);
  const panTo = useMapStore((s) => s.panTo);

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const restaurants = useFilteredRestaurants(data ?? []);

  const [loading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
    libraries: ["services", "clusterer"],
  });

  const [mapReady, setMapReady] = useState(false);

  // 통합 준비 완료 상태
  const isReady = useMemo(() => {
    return !loading && !isLoading && mapReady;
  }, [loading, isLoading, mapReady]);

  // 맵이 준비되면 첫 결과로 이동
  useEffect(() => {
    if (isReady && restaurants.length > 0 && map && query !== null) {
      const first = restaurants[0];
      setSelectedId(first.id);
      panTo(Number(first.lat), Number(first.lng));
    }
  }, [isReady, restaurants, map, query, panTo, setSelectedId]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Map
        center={coordinatesCenter}
        style={{ width: "100%", height: "100%" }}
        level={6}
        onClick={() => setSelectedId(null)}
        onCreate={(instance) => {
          setMap(instance);
          // @ts-ignore kakao 전역
          window.kakao?.maps.event.addListener(instance, "tilesloaded", () => {
            setMapReady(true);
          });
        }}
        className={`absolute inset-0 transition-all duration-700 ease-out ${
          isReady ? "opacity-100 blur-0" : "opacity-0 blur-md"
        }`}
      >
        {isReady && (
          <>
            <CustomSideList initialData={restaurants} map={map!} />
            {restaurants.length > 0 ? (
              <MarkerLayer restaurants={restaurants} />
            ) : (
              query !== null && <NoResultsModal key={query} />
            )}
          </>
        )}
      </Map>

      {/* 스피너 오버레이 */}
      <div
        className={`absolute inset-0 z-10 grid place-items-center bg-white transition-opacity duration-700 ${
          isReady ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="animate-spin border-4 border-neutral-300 border-t-yellow-700 rounded-full size-10" />
      </div>
    </div>
  );
}
