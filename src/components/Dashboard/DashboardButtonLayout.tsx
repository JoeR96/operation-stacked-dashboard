import React from 'react';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export const DashboardButtonLayout = () => {
    const navigate = useNavigate(); // Hook for navigation

    const buttonStyle = {
        backgroundColor: '#ff8c00', // orange background
        color: 'white',
        fontWeight: 'bold',
        '&:hover': {
            backgroundColor: '#e77b00', // darker orange on hover
        },
        borderRadius: '8px', // rounded corners
        margin: '8px', // space between buttons
    };

    // Handler functions for button clicks
    const goToExercises = () => navigate('/exercises');
    const goToWorkouts = () => navigate('/workouts');
    const goToEquipmentStacks = () => navigate('/equipment-stacks');
    const goToHistory = () => navigate('/history');

    return (
        <Box display="flex" justifyContent="space-around" alignItems="center" padding="16px">
            <Button sx={buttonStyle} onClick={goToExercises}>Exercises</Button>
            <Button sx={buttonStyle} onClick={goToWorkouts}>Workouts</Button>
            <Button sx={buttonStyle} onClick={goToEquipmentStacks}>Equipment Stacks</Button>
            <Button sx={buttonStyle} onClick={goToHistory}>History</Button>
        </Box>
    );
};

export default DashboardButtonLayout;
