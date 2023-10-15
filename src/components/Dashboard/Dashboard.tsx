// Dashboard.tsx
import React, { useState } from 'react';
import TabbedDisplay from '../TabbedDisplay/TabbedDisplay';
import { DashboardMainContent } from './DashboardMainContent';

const Dashboard: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    return (
        <div>
            <DashboardMainContent selectedTab={selectedTab} />
            <TabbedDisplay selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        </div>
    );
};

export default Dashboard;
