"use client";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { useEffect } from "react";
import useFilteredRestaurants from "@/hooks/useFilteredRestaurants";
import NoResultsModal from "@/app/search/(components)/emptyData/EmptyDataModal";
import MarkerLayer from "@/app/search/(components)/kakaomap/MarkerLayer";
import { useSearchParams } from "next/navigation";
import CustomSideList from "@/app/search/(components)/customSideList/CustomSideList";
import LoadingIcon from "@/icons/loading_icon.svg";
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

  // 특정 검색 결과로 이동
  useEffect(() => {
    if (restaurants && restaurants.length > 0 && map && query !== null) {
      const first = restaurants[0];
      setSelectedId(first.id);
      panTo(Number(first.lat), Number(first.lng));
    }
  }, [restaurants, map, query, panTo, setSelectedId]);

  if (loading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        <LoadingIcon
          className="animate-spin fill-[#3E5329]"
          width={50}
          height={50}
        />
      </div>
    );

  return (
    <Map
      center={coordinatesCenter}
      style={{ width: "100%", height: "100%", position: "relative" }}
      level={6}
      onClick={() => setSelectedId(null)}
      onCreate={setMap}
    >
      {map && (
        <CustomSideList
          initialData={restaurants}
          isLoading={isLoading}
          map={map}
        />
      )}

      {restaurants.length > 0 ? (
        <MarkerLayer restaurants={restaurants} />
      ) : (
        query !== null && <NoResultsModal key={query} />
      )}
    </Map>
  );
}
