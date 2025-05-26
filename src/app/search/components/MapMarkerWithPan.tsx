"use client";

import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { Restaurant } from "vegan";

function MapMarkerWithPan({
  restaurant,
  selectedId,
  setSelectedId,
}: {
  restaurant: Restaurant;
  selectedId: string | null;
  setSelectedId: (id: string | null) => void;
}) {
  const map = useMap();
  const lat = Number(restaurant.lat);
  const lng = Number(restaurant.lng);
  const position = { lat, lng };

  return (
    <MapMarker
      position={position}
      onClick={() => {
        map.panTo(new kakao.maps.LatLng(lat, lng));
      }}
    >
      {selectedId === restaurant.id && <div style={{ padding: "4px 8px", fontWeight: 600 }}>{restaurant.name}</div>}
    </MapMarker>
  );
}

export default MapMarkerWithPan;
