"use client";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { useEffect, useState, useMemo, Activity } from "react";
import useFilteredRestaurants from "@/hooks/useFilteredRestaurants";
import NoResultsModal from "@/app/search/(components)/emptyData/EmptyDataModal";
import { useSearchParams } from "next/navigation";
import CustomSideList from "@/app/search/(components)/customSideList/CustomSideList";
import { Restaurant } from "@/types/restaurants.schema";
import { useMapStore } from "@/store/useMapStore";
import coordinatesCenter from "@/constants/coordinatesCenter";
import { useExpandedStore } from "@/store/useExpandedStore";
import SearchLoadingUI from "../SearchLoadingUI";
import MapMarkerWithPan from "./MapMarkerWithPan";

export default function MapWrapper({
  initialRestaurants,
}: {
  initialRestaurants: Restaurant[];
}) {
  const map = useMapStore((s) => s.map);
  const setMap = useMapStore((s) => s.setMap);
  const setSelectedId = useMapStore((s) => s.setSelectedId);
  const panTo = useMapStore((s) => s.panTo);
  const setExpanded = useExpandedStore((s) => s.setExpanded);

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const restaurants = useFilteredRestaurants(initialRestaurants);

  const [isLoading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
    libraries: ["services", "clusterer"],
  });

  // 맵이 준비된 후 검색 시 첫 결과로 이동
  useEffect(() => {
    if (map && query !== null && restaurants.length > 0) {
      const first = restaurants[0];
      setSelectedId(first.id);
      panTo(Number(first.lat), Number(first.lng));
    }
  }, [map, query, restaurants, panTo, setSelectedId]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Map
        center={coordinatesCenter}
        style={{ width: "100%", height: "100%" }}
        level={6}
        onClick={() => {
          setSelectedId(null);
          setExpanded(false);
        }}
        onCreate={(instance) => {
          setMap(instance);
        }}
        className="absolute inset-0 transition-all duration-700 ease-out"
      >
        <CustomSideList initialData={restaurants} />
        {restaurants.length > 0
          ? restaurants.map((restaurant) => {
              return (
                <MapMarkerWithPan key={restaurant.id} restaurant={restaurant} />
              );
            })
          : query !== null && <NoResultsModal key={query} />}
      </Map>

      <Activity mode={isLoading ? "visible" : "hidden"}>
        <div
          className={`absolute inset-0 z-50 transition-opacity duration-700 ${
            !isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <SearchLoadingUI message="지도 컨텐츠를 준비하고 있습니다..." />
        </div>
      </Activity>
    </div>
  );
}
