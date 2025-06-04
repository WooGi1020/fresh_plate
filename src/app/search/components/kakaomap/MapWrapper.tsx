"use client";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import { useState, useEffect } from "react";
import useFilteredRestaurants from "@/hooks/useFilteredRestaurants";
import NoResultsModal from "@/app/search/components/emptyData/EmptyDataModal";
import CustomSideBar from "@/app/search/components/CustomSideBar";
import MarkerLayer from "@/app/search/components/kakaomap/MarkerLayer";
import SidebarToggleButton from "@/app/search/components/kakaomap/SidebarToggleButton";
import { useSearchParams } from "next/navigation";
import { Restaurant } from "vegan";

export default function MapWrapper({ initialData }: { initialData: Restaurant[] }) {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const restaurants = useFilteredRestaurants(initialData);

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
  }, [restaurants, map]);

  if (loading) return <div className="w-screen h-screen flex justify-center items-center">loading map</div>;

  return (
    <Map
      center={{ lat: 37.56693232422167, lng: 126.97866354704028 }}
      style={{ width: "100%", height: "100%", position: "relative" }}
      level={6}
      onClick={() => setSelectedId(null)}
      onCreate={setMap}
    >
      <SidebarToggleButton showSidebar={showSidebar} toggleSidebar={() => setShowSidebar((prev) => !prev)} />
      {showSidebar && <CustomSideBar />}
      {restaurants.length > 0 ? (
        <MarkerLayer restaurants={restaurants} selectedId={selectedId} setSelectedId={setSelectedId} />
      ) : (
        query !== null && <NoResultsModal key={query} />
      )}
    </Map>
  );
}
