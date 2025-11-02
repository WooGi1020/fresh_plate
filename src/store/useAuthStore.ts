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
  accessToken: string | null;
  refreshToken: string | null;
  isAuthed: boolean;
  login: (
    user: User,
    tokens: { accessToken: string; refreshToken: string }
  ) => void;
  logout: () => void;
  setUser: (user: User) => void;
  hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthed: false,
      hasHydrated: false,
      setHasHydrated: (state) => set({ hasHydrated: state }),

      login: (user, tokens) =>
        set({
          user,
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          isAuthed: true,
        }),

      logout: () =>
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthed: false,
        }),

      setUser: (user) => set({ user }),
    }),
    {
      name: "auth", // localStorage key
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
