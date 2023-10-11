// authStore.ts

import { create } from "zustand";



type AuthState = {
    isAuthenticated: boolean;
    data: any; // Replace with a more specific type if you know the structure of the response.
    setIsAuthenticated: (value: boolean) => void;
    setData: (data: any) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    data: null,
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setData: (data) => set({ data }),
}));
