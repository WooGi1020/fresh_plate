// store/useMapStore.ts
import { create } from "zustand";

interface MapStore {
  map: kakao.maps.Map | null;
  selectedId: number | null;
  setMap: (map: kakao.maps.Map) => void;
  setSelectedId: (id: number | null) => void;
  panTo: (lat: number, lng: number) => void;
  reset: () => void;
}

export const useMapStore = create<MapStore>((set, get) => ({
  map: null,
  selectedId: null,

  setMap: (map) => set({ map }),
  setSelectedId: (id) => set({ selectedId: id }),

  panTo: (lat, lng) => {
    const map = get().map;
    if (!map) return;
    map.panTo(new kakao.maps.LatLng(lat, lng));
  },

  reset: () => set({ map: null, selectedId: null }),
}));
