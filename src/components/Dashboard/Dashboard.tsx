import React, { useState } from 'react';
import TabbedDisplay from '../TabbedDisplay/TabbedDisplay';
import { DashboardMainContent } from './DashboardMainContent';
import {DashboardButtonLayout} from "./DashboardButtonLayout.tsx";

const Dashboard: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <DashboardMainContent selectedTab={selectedTab} />
            <TabbedDisplay 
                selectedTab={selectedTab} 
                setSelectedTab={setSelectedTab} 
            />
            <DashboardButtonLayout/>
        </div>
    );
};

export default Dashboard;
