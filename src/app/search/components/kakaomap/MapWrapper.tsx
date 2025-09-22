"use client";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import useFilteredRestaurants from "@/hooks/useFilteredRestaurants";
import NoResultsModal from "@/app/search/components/emptyData/EmptyDataModal";
import MarkerLayer from "@/app/search/components/kakaomap/MarkerLayer";
import { useSearchParams } from "next/navigation";
import CustomSideList from "@/app/search/components/customSideList/CustomSideList";
import LoadingIcon from "@/icons/loading_icon.svg";
import { useGetRestaurants } from "@/libs/query/getRestaurantQuery";

export default function MapWrapper() {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data } = useGetRestaurants();

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const restaurants = useFilteredRestaurants(data ?? []);

  const [loading] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
    libraries: ["services", "clusterer"],
  });

  useEffect(() => {
    if (restaurants && restaurants.length > 0 && map && query !== null) {
      const first = restaurants[0];
      setSelectedId(first.id);
      map.panTo(new kakao.maps.LatLng(Number(first.lat), Number(first.lng)));
    }
  }, [restaurants, map, query]);

  if (loading)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <LoadingIcon
          className="animate-spin fill-[#3E5329]"
          width={50}
          height={50}
        />
      </div>
    );

  return (
    <Map
      center={{ lat: 37.56693232422167, lng: 126.97866354704028 }}
      style={{ width: "100%", height: "100%", position: "relative" }}
      level={6}
      onClick={() => setSelectedId(null)}
      onCreate={setMap}
    >
      {/* 리스트는 항상 고정 표시 */}
      {map && (
        <CustomSideList
          initialData={restaurants}
          setSelectedId={setSelectedId}
          map={map}
        />
      )}

      {restaurants.length > 0 ? (
        <MarkerLayer
          restaurants={restaurants}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      ) : (
        query !== null && <NoResultsModal key={query} />
      )}
    </Map>
  );
}
