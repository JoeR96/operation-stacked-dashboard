import create from 'zustand';
import {UserApi, WorkoutApi} from "../services/api";
import _default from "chart.js/dist/plugins/plugin.tooltip";

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

            console.log(typeof(userId))
            const userApi = new UserApi();
            const response = await  userApi.userNameGet(userId)
            console.log(response)
            set({ username: response.data });
        } catch (error) {
            console.error('Error fetching username:', error);
        }
    },
    fetchWeekAndDay: async (userId) => {
        try {
            console.log(typeof(userId))
            const userApi = new UserApi();
            const response = await  userApi.userWeekAndDayUserIdGet(userId)
            if (response) {
                set({ Week: response.data.Week, Day: response.data.Day });
                get().fetchUsername(userId);
            }
        } catch (error) {
            console.error('Error fetching week and day:', error);
        }
    },
}));
