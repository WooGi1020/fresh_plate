"use client";

import { CustomOverlayMap, useMap } from "react-kakao-maps-sdk";
import { Restaurant } from "@/types/restaurants.schema";
import CustomBalloon from "./customBalloon/CustomBalloon";
import customOffsetMarkerPosition from "@/libs/map/customOffsetMarkerPosition";
import { twMerge } from "tailwind-merge";
import { useMarkerStyleStore } from "@/store/useMarkerStyleStore";
import { useAuthStore } from "@/store/useAuthStore";

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
  const nickname = useAuthStore((s) => s.user?.nickname);

  const isSelected = selectedId === restaurant.id;

  const handleClick = () => {
    customOffsetMarkerPosition(map, new kakao.maps.LatLng(lat, lng));
    setSelectedId(restaurant.id);
  };

  const disableMarkerEffect = useMarkerStyleStore((s) =>
    s.isMarkerDisabled(nickname!)
  );

  return (
    <>
      {/* ✅ HTML 기반 마커 */}
      <CustomOverlayMap
        position={position}
        yAnchor={1}
        zIndex={isSelected ? 20 : 10}
      >
        <div
          className="relative size-10 flex items-center justify-center cursor-pointer transition-transform hover:scale-110 user-select-none"
          onClick={handleClick}
        >
          {/* 실제 마커 이미지 */}
          <img
            src="/icons/marker.png"
            alt="marker"
            className="size-10 relative z-10 pointer-events-none"
          />

          {!disableMarkerEffect && (
            <div
              className={twMerge(
                "absolute inset-0 pointer-events-none",
                restaurant.allergyLevel! > 0
                  ? "bg-red-500 animate-ping"
                  : restaurant.recommended
                  ? "bg-blue-500 animate-soft-glow"
                  : "bg-transparent"
              )}
              style={{
                WebkitMaskImage: "url('/icons/marker.png')",
                maskImage: "url('/icons/marker.png')",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                transform: "scale(1.2)",
              }}
            />
          )}
        </div>
      </CustomOverlayMap>

      {/* ✅ 선택 시 말풍선 */}
      {isSelected && (
        <CustomOverlayMap
          position={position}
          yAnchor={1.2}
          clickable
          zIndex={50}
        >
          <CustomBalloon
            restaurant={restaurant}
            map={map!}
            onClose={() => setSelectedId(null)}
          />
        </CustomOverlayMap>
      )}
    </>
  );
}

export default MapMarkerWithPan;
