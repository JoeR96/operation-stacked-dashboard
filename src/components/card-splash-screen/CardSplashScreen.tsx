// DashboardMainContent.tsx
import  { useEffect } from 'react';
import { AuthState, useAuthStore } from '../../state/auth/authStore';
import { useUserStore } from '../../state/userStore';
import { Box, Card, CardContent, Typography } from '@mui/material';
import CircularProgressBar from '../circular-progress-bar/CircularProgressBar';
import LineChart from '../Workout/LineChart';

interface CardSplashScreen { }

const CardSplashScreen: React.FC<CardSplashScreen> = () => {
    const { fetchWeekAndDay, username, Day,  WorkoutDaysInWeek } = useUserStore();
    const userId = useAuthStore((state : AuthState) => state.data?.userId);
    console.log(userId)
    useEffect(() => {
        if (userId) {
            fetchWeekAndDay(userId);
        }
    }, [userId, fetchWeekAndDay]);

    return (
        <Box display="flex" flexDirection="row" justifyContent="center" alignItems="center" flexWrap="wrap" gap={2} p={2}>
            <Card 
                variant="outlined" 
                sx={{ 
                    backgroundColor: '#242424',
                    width: '23%', 
                    height: '200px', 
                    display: 'flex', 
                    alignItems: 'center',  // centers content vertically
                    justifyContent: 'center', // centers content horizontally
                    marginBottom: '10px' 
                }}>
                <CardContent sx={{ 
                    display: 'flex',
                    flexDirection: 'column', // Stack the content vertically
                    alignItems: 'center', 
                    justifyContent: 'center', 
                }}>
                <Typography variant="h5" align="center" style={{ color: 'white', fontWeight: 'bold' }}>
                    Welcome back 
                </Typography>
                <Typography variant="h5" align="center" style={{  color: 'white', fontWeight: 'bold' }}>
                     {username}
                </Typography>
                </CardContent>
            </Card>

            <Card 
      variant="outlined" 
      sx={{backgroundColor: '#242424', width: '23%', height: '200px', display: 'flex', flexDirection: 'column', marginBottom: '10px' }}
    >
    </Card>
    
            <Card variant="outlined" sx={{backgroundColor: '#242424', width: '23%', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                <CircularProgressBar
                    value={Day}
                    maxValue={WorkoutDaysInWeek}
                    title={`Workouts`}
                />
            </Card>
    
            {/* Card for userId */}
            <Card variant="outlined" sx={{ backgroundColor: '#242424',width: '23%', height: '200px', display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>

                <LineChart maintainAspectRatio={true} />
            </Card>
        </Box>
    );
    
};

export default CardSplashScreen;
