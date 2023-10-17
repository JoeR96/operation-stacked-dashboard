import React, { useState } from 'react';
import TabbedDisplay from '../TabbedDisplay/TabbedDisplay';
import { DashboardMainContent } from './DashboardMainContent';

const Dashboard: React.FC = () => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [selectedStack, setSelectedStack] = useState(null);

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <DashboardMainContent selectedTab={selectedTab} selectedStack={selectedStack} />
            <TabbedDisplay 
                selectedTab={selectedTab} 
                setSelectedTab={setSelectedTab} 
                selectedStack={selectedStack}
                setSelectedStack={setSelectedStack}
            />
        </div>
    );
};

export default Dashboard;
