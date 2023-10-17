import { useEffect } from 'react';
import { useApi } from '../../api/constants/hooks/useApi';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { EquipmentType } from '../../types/types';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { apiRequest } from '../../api/constants/apiClient';
import { useAuthStore } from '../../state/auth/authStore';
import { useUserStore } from '../../state/userStore';
import Spinner from '../spinner/Spinner';

const CurrentWorkout = () => {
    const { Week: userWeek, Day: userDay } = useUserStore();
    const userId = useAuthStore((state) => state.data?.userId);

    // Use values from the store or fallback to defaults
    const week = userWeek || 1;
    const day = userDay || 1;
    const defaultCompleted = true;

    const {
        data: exercises,
        apiStatus,
        error,
        exec
    } = useApi(() => fetchCurrentWorkout(userId, week, day, defaultCompleted));

    useEffect(() => {
        exec();
    }, []);

    if (apiStatus === PENDING) return <Spinner />;
    if (apiStatus === ERROR) return <div>Error fetching exercises: {error?.message}</div>;

    return (
        <Paper elevation={3} style={{ backgroundColor: "#242424" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Exercise</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Week</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Day</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Minimum Reps</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Maximum Reps</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Completed Reps</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Sets</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Working Weight</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Equipment Type</TableCell>
                        <TableCell style={{ color: "white",fontWeight: 'bold' }}>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exercises?.Exercises.map((exercise) => (
                        <TableRow key={exercise.Id}>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.ExerciseName}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.LiftWeek}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.LiftDay}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.MinimumReps}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.MaximumReps}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.CompletedReps}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.Sets}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.WorkingWeight}KG</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{EquipmentType[exercise.EquipmentType]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
}

const fetchCurrentWorkout = async (userId: string, Week: number, Day: number, Completed: boolean) => {
    try {
        const response = await apiRequest(
            "GET",
            `/workout-creation/${userId}/${Week}/${Day}/${Completed}`,
            5002
        );
        return response;
    } catch (error) {
        console.error("Error fetching current workout:", error);
        throw error;  // Re-throwing the error for useApi hook to catch it.
    }
};

export default CurrentWorkout;
