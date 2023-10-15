// DashboardMainContent.tsx
import React, { useEffect } from 'react';
import { useAuthStore } from '../../state/auth/authStore';
import { useUserStore } from '../../state/userStore';
import { Box, Card, CardContent } from '@mui/material';
import CircularProgressBar from '../circular-progress-bar/CircularProgressBar';

interface CardSplashScreen { }

const CardSplashScreen: React.FC<CardSplashScreen> = () => {
    const { fetchWeekAndDay, username, Day, Week, WorkoutDaysInWeek } = useUserStore();
    const userId = useAuthStore((state) => state.data?.userId);

    useEffect(() => {
        if (userId) {
            fetchWeekAndDay(userId);
        }
    }, [userId, fetchWeekAndDay]);

    return (
        <Box display="flex" justifyContent="space-between" flexWrap="wrap" gap={2} p={2}>
            {/* Card for Username */}
            <Card variant="outlined" sx={{ width: '23%' }}>
                <CardContent>
                    Hello, {username}
                </CardContent>
            </Card>

            {/* Card for Current Week */}
            <Card variant="outlined" sx={{ width: '23%' }}>
                <CardContent>
                    Current Week: {Week}
                </CardContent>
            </Card>

            <Card variant="outlined" sx={{ width: '23%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgressBar
                    value={Day}
                    maxValue={WorkoutDaysInWeek} // Assuming you have the total number of workout weeks as WorkoutWeeks
                    title={`Workout Day: ${Day}`}
                />
            </Card>

            {/* Card for userId */}
            <Card variant="outlined" sx={{ width: '23%' }}>
                <CardContent>
                    User ID: {userId}
                </CardContent>
            </Card>
        </Box>
    );
};

export default CardSplashScreen;
