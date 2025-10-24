"use client";

import { MapMarker, CustomOverlayMap, useMap } from "react-kakao-maps-sdk";
import { Restaurant } from "@/types/restaurants.schema";
import CustomBalloon from "./customBalloon/CustomBalloon";
import customOffsetMarkerPosition from "@/libs/map/customOffsetMarkerPosition";

function MapMarkerWithPan({
  restaurant,
  selectedId,
  setSelectedId,
}: {
  restaurant: Restaurant;
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}) {
  const map = useMap();
  const lat = Number(restaurant.lat);
  const lng = Number(restaurant.lng);
  const position = { lat, lng };

  const isSelected = selectedId === restaurant.id;

  const handleClick = () => {
    customOffsetMarkerPosition(map, new kakao.maps.LatLng(lat, lng));
    setSelectedId(restaurant.id);
  };

  return (
    <>
      <MapMarker
        position={position}
        onClick={handleClick}
        image={{
          src: "/icons/marker.png",
          size: { width: 40, height: 40 },
          options: { offset: { x: 20, y: 40 } },
        }}
      />
      {isSelected && (
        <CustomOverlayMap
          position={position}
          yAnchor={1.2}
          clickable
          zIndex={50}
        >
          <CustomBalloon
            restaurant={restaurant}
            map={map}
            onClose={() => {
              setSelectedId(null);
            }}
          />
        </CustomOverlayMap>
      )}
    </>
  );
}

export default MapMarkerWithPan;
