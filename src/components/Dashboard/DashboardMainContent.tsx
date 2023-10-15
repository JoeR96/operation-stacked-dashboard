import CardSplashScreen from "../card-splash-screen/CardSplashScreen";
import WorkoutCalendar from "../Workout/WorkoutCalendar";

// DashboardMainContent.tsx
export const DashboardMainContent: React.FC<{ selectedTab: number }> = ({ selectedTab }) => {
    if (selectedTab === 0) {
        return <CardSplashScreen />;
    }
    if (selectedTab === 1) {
        return <WorkoutCalendar />;
    }

    // If there are other views for other tabs, you can add them similarly
    return null;
};

