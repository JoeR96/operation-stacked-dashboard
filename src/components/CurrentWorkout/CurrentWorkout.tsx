// CurrentWorkout.tsx

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
        <Paper elevation={3}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Exercise</TableCell>
                        <TableCell>Week</TableCell>
                        <TableCell>Day</TableCell>
                        <TableCell>Minimum Reps</TableCell>
                        <TableCell>Maximum Reps</TableCell>
                        <TableCell>Completed Reps</TableCell>
                        <TableCell>Sets</TableCell>
                        <TableCell>Working Weight</TableCell>
                        <TableCell>Equipment Type</TableCell>
                        <TableCell>Edit</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {exercises?.Exercises.map((exercise) => (
                        <TableRow key={exercise.Id}>
                            <TableCell>{exercise.ExerciseName}</TableCell>
                            <TableCell>{exercise.LiftWeek}</TableCell>
                            <TableCell>{exercise.LiftDay}</TableCell>
                            <TableCell>{exercise.MinimumReps}</TableCell>
                            <TableCell>{exercise.MaximumReps}</TableCell>
                            <TableCell>{exercise.CompletedReps}</TableCell>
                            <TableCell>{exercise.Sets}</TableCell>
                            <TableCell>{exercise.WorkingWeight}KG</TableCell>
                            <TableCell>{EquipmentType[exercise.EquipmentType]}</TableCell>
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
