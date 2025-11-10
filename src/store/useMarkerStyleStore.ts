import { create } from "zustand";
import { persist } from "zustand/middleware";

type MarkerStyleState = {
  userMarkerSettings: Record<string, boolean>; // nickname 기준
  toggleMarkerEffect: (nickname: string) => void;
  isMarkerDisabled: (nickname: string) => boolean;
};

export const useMarkerStyleStore = create<MarkerStyleState>()(
  persist(
    (set, get) => ({
      userMarkerSettings: {},

      toggleMarkerEffect: (nickname) => {
        const current = get().userMarkerSettings[nickname] ?? false;
        set({
          userMarkerSettings: {
            ...get().userMarkerSettings,
            [nickname]: !current,
          },
        });
      },

      isMarkerDisabled: (nickname) => {
        return get().userMarkerSettings[nickname] ?? false;
      },
    }),
    {
      name: "user-marker-style-storage",
      partialize: (state) => ({ userMarkerSettings: state.userMarkerSettings }),
    }
  )
);
