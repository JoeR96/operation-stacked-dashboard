import React, { useState } from 'react';
import {DashboardButtonLayout} from "./DashboardButtonLayout.tsx";
import CardSplashScreen from "../card-splash-screen/CardSplashScreen";

const Dashboard: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
             <CardSplashScreen />
            <DashboardButtonLayout/>
        </div>
    );
};

export default Dashboard;
