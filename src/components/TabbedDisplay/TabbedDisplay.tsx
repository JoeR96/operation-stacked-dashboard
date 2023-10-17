import React, { useState } from 'react';
import { Tabs, Tab, Box } from '@mui/material';
import WorkoutCalendar from '../WorkoutCalendar/WorkoutCalendar';
import CurrentWorkout from '../CurrentWorkout/CurrentWorkout';
import EquipmentStacks from '../EquipmentStack/EquipmentStack';
import EquipmentStackTable from '../EquipmentStack/EquipmentStackTable';

const TabbedDisplay = ({ selectedTab, setSelectedTab, selectedStack, setSelectedStack }) => {

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
                return <EquipmentStackTable 
                          selectedStack={selectedStack}   // Pass down as props
                          setSelectedStack={setSelectedStack}  // Pass down setter as props
                       />;
            default:
                return null;
        }
    };

    return (
        <div style={{ backgroundColor: '#242424', color: 'white', padding: '16px' }}>
            <Box mt={3}>
                <Tabs
                    value={selectedTab}
                    onChange={handleTabChange}
                    centered
                    sx={{ 
                        backgroundColor: '#242424', 
                        color: 'white',
                        '& .MuiTabs-indicator': {
                            backgroundColor: '#ff8c00',
                        }
                    }}
                >
                    <Tab 
                        label="Current Workout" 
                        sx={{ 
                            backgroundColor: '#ff8c00', 
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#e77b00'
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#e77b00',
                            }
                        }} 
                    />
                    <Tab 
                        label="Workout Calendar" 
                        sx={{ 
                            backgroundColor: '#ff8c00', 
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#e77b00'
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#e77b00',
                            }
                        }} 
                    />
                    <Tab 
                        label="Equipment Stacks" 
                        sx={{ 
                            backgroundColor: '#ff8c00', 
                            color: 'white',
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#e77b00'
                            },
                            '&.Mui-selected': {
                                backgroundColor: '#e77b00',
                            }
                        }} 
                    />
                </Tabs>
                <Box mt={2} sx={{ color: 'white', padding: '16px' }}>
                    {renderTabContent()}
                </Box>
            </Box>
        </div>
    );
}

export default TabbedDisplay;
