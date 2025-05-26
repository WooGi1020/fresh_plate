"use client";

import { Map, useKakaoLoader } from "react-kakao-maps-sdk";
import rawData from "@/data/filtered_active_vegan_restaurants.json";
import { Restaurant } from "vegan";
import { useState } from "react";
import MapMarkerWithPan from "@/app/search/components/MapMarkerWithPan";

const data = rawData as Restaurant[];

export default function KakaoMap() {
  const [loading, error] = useKakaoLoader({
    appkey: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY!,
    libraries: ["services", "clusterer"],
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading KakaoMap</div>;

  return (
    <Map
      center={{ lat: 37.56693232422167, lng: 126.97866354704028 }}
      style={{ width: "100%", height: "100%" }}
      level={5}
      onClick={() => setSelectedId(null)}
    >
      {data.map((restaurant: Restaurant) => {
        return (
          <MapMarkerWithPan
            key={restaurant.id}
            restaurant={restaurant}
            selectedId={selectedId}
            setSelectedId={setSelectedId}
          />
        );
      })}
    </Map>
  );
}
