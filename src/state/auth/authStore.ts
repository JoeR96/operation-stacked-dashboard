import create from 'zustand';

export type AuthState = {
    isAuthenticated: boolean;
    data: { userId?: string } | null;
    setIsAuthenticated: (value: boolean) => void;
    setData: (data: { userId?: string } | null) => void; // Use a more specific type
    getUserId: () => string | undefined;
    setUserId: (userId: string) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    isAuthenticated: false,
    data: null,
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setData: (data) => set({ data }),
    getUserId: () => get().data?.userId, // Use 'get' instead of the store hook
    setUserId: (userId) => set((state) => ({ data: { ...state.data, userId } })),
}));

