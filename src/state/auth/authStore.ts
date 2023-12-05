import { create } from "zustand";

type AuthState = {
    isAuthenticated: boolean;
    data: { userId?: string } | null;
    setIsAuthenticated: (value: boolean) => void;
    setData: (data: any) => void;
    getUserId: () => string | undefined;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    data: null,
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setData: (data) => set({ data }),
    getUserId: () => get().data?.userId,
}));
