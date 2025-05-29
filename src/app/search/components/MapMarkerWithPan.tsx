"use client";

import { MapMarker, CustomOverlayMap, useMap } from "react-kakao-maps-sdk";
import { Restaurant } from "vegan";
import CustomBalloon from "./customBalloon/CustomBalloon";

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
  const lat = Number(restaurant.lat || restaurant.lat);
  const lng = Number(restaurant.lng || restaurant.lng);
  const position = { lat, lng };

  const isSelected = selectedId === restaurant.id;

  return (
    <>
      <MapMarker
        position={position}
        onClick={() => {
          setSelectedId(restaurant.id);
          map.panTo(new kakao.maps.LatLng(lat, lng));
        }}
        image={{
          src: "/icons/marker.png",
          size: {
            width: 40,
            height: 40,
          },
          options: {
            offset: {
              x: 20,
              y: 40,
            },
          },
        }}
      />
      {isSelected && (
        <CustomOverlayMap position={position} yAnchor={1.2} clickable zIndex={50}>
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
