import CardSplashScreen from "../card-splash-screen/CardSplashScreen";
import MultiAxis from "../Workout/MultiAxis";

// DashboardMainContent.tsx
export const WorkoutMainContent: React.FC<{ selectedTab: number }> = ({ selectedTab }) => {

    if (selectedTab === 0) {
        return <MultiAxis />;
    }
    if (selectedTab === 1) {
        return <MultiAxis />;
    }

    return null;
};