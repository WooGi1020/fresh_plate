import { create } from "zustand";

type ExpandedStore = {
  expanded: boolean;
  setExpanded: (value: boolean) => void;
  toggleExpanded: () => void;
};

export const useExpandedStore = create<ExpandedStore>((set, get) => ({
  expanded: true,
  setExpanded: (value: boolean) => set({ expanded: value }),
  toggleExpanded: () => set((state) => ({ expanded: !state.expanded })),
}));
