import create from 'zustand';
import { apiRequest } from '../api/constants/apiClient';

type UserState = {
    Week: number;
    Day: number;
    username: string;
    WorkoutDaysInWeek: number;
    fetchUsername: (userId: string) => void;
    fetchWeekAndDay: (userId: string) => void;
};

export const useUserStore = create<UserState>((set, get) => ({
    Week: 1,
    Day: 1,
    username: '',
    WorkoutDaysInWeek: 4,
    fetchUsername: async (userId) => {
        try {
            const response: string = await apiRequest(
                'GET',
                `/user/name?cognitoUserId=${userId}`,
                5002
            );
            set({ username: response });
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    },
    fetchWeekAndDay: async (userId) => {
        try {
            const response = await apiRequest(
                'GET',
                `/user/week-and-day/${userId}`,
                5002
            );
            if (response) {
                set({ Week: response.Week, Day: response.Day });
                get().fetchUsername(userId); // Fetch username after fetching week and day
            }
        } catch (error) {
            console.error('Error fetching week and day:', error);
        }
    },
}));
