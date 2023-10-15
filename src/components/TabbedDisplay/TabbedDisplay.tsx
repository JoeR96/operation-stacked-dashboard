import React, { useState } from 'react';
import { Tabs, Tab, Card, CardContent, Box } from '@mui/material';
import WorkoutCalendar from '../Workout/WorkoutCalendar';
import CurrentWorkout from '../CurrentWorkout/CurrentWorkout';
import EquipmentStacks from '../EquipmentStack/EquipmentStack';
import EquipmentStackTable from '../EquipmentStack/EquipmentStackTable';

const TabbedDisplay = ({ selectedTab, setSelectedTab }) => {
    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const renderTabContent = () => {
        switch (selectedTab) {
            case 0:
                return <CurrentWorkout />;
            case 1:
                return <WorkoutCalendar />;
            case 2:
                return <EquipmentStackTable />;
            default:
                return null;
        }
    };

    return (
        <div>
            {/* Top half with empty cards */}

            {/* Bottom half with tabs */}
            <Box mt={3}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    centered
                    sx={{ backgroundColor: 'transparent' }}  // Set the background color for the Tabs container
                >
                    <Tab label="Current Workout" sx={{ backgroundColor: 'white' }} />
                    <Tab label="Workout Calendar" sx={{ backgroundColor: 'white' }} />
                    <Tab label="Equipment Stacks" sx={{ backgroundColor: 'white' }} />
                </Tabs>
                <Box mt={2}>
                    {renderTabContent()}
                </Box>
            </Box>
        </div>
    );
}

export default TabbedDisplay;
