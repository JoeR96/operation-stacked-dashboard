import CardSplashScreen from "../card-splash-screen/CardSplashScreen";
import EditEquipmentStackContainer from "../EquipmentStack/EditEquipmentStackContainer";
import MultiAxis from "../Workout/MultiAxis";

// DashboardMainContent.tsx
export const DashboardMainContent: React.FC<{ selectedTab: number, selectedStack: any }> = ({ selectedTab, selectedStack }) => {
    if (selectedTab === 0) {
        return <CardSplashScreen />;
    }
    if (selectedTab === 1) {
        return <MultiAxis />;
    }
    if (selectedTab === 2) {
        if (selectedStack) {
            return <EditEquipmentStackContainer stackData={selectedStack} />;
        } else {
            return (
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    Please select a stack
                </div>
            );
        }
    }

    return null;
};
