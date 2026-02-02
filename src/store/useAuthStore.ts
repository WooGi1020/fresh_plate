"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  nickname: string;
  eatStyles?: string[];
  memberId: string;
}

type AuthState = {
  user: User | null;
  isAuthed: boolean;
  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthed: false,
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),

      login: (user) =>
        set({
          user,
          isAuthed: true,
        }),

      logout: () =>
        set({
          user: null,
          isAuthed: false,
        }),

      setUser: (user) => set({ user }),
    }),
    {
      name: "auth", // localStorage key
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
