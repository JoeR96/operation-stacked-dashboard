import React, { useState } from 'react';
import { Tabs, Tab, Card, CardContent, Box } from '@mui/material';
import WorkoutCalendar from '../Workout/WorkoutCalendar';
import CurrentWorkout from '../CurrentWorkout/CurrentWorkout';
import EquipmentStacks from '../LoginForm/EquipmentStack';

const TabbedDisplay = () => {
    const [selectedTab, setSelectedTab] = useState(0);

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
                return <EquipmentStacks />;  // 2. Add a new case for the EquipmentStacks component
            default:
                return null;
        }
    };

    return (
        <div>
            {/* Top half with empty cards */}
            <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2} p={2}>
                {[1, 2, 3, 4].map(i => (
                    <Card key={i} variant="outlined" sx={{ width: '23%' }}>
                        <CardContent>
                            {/* Empty card content for now */}
                        </CardContent>
                    </Card>
                ))}
            </Box>

            {/* Bottom half with tabs */}
            <Box mt={3}>
                <Tabs value={selectedTab} onChange={handleTabChange} centered>
                    <Tab label="Current Workout" />
                    <Tab label="Workout Calendar" />
                    <Tab label="Equipment Stacks" />  // 3. Add the new tab here
                </Tabs>
                <Box mt={2}>
                    {renderTabContent()}
                </Box>
            </Box>
        </div>
    );
}

export default TabbedDisplay;
