import create from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    data: { userId?: string } | null;
    setIsAuthenticated: (value: boolean) => void;
    setData: (data: any) => void;
    getUserId: () => string | undefined;
    setUserId: (userId: string) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    data: null,
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setData: (data) => set({ data }),
    getUserId: () => useAuthStore.getState().data?.userId, // Use the getState method from Zustand
    setUserId: (userId) => set((state) => ({ data: { ...state.data, userId } })),
}));
