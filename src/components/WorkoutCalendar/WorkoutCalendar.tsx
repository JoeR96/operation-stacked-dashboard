/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useApiStatus } from '../../api/constants/hooks/useApiStatus';
import { ERROR, IDLE, PENDING, SUCCESS } from '../../api/constants/apiStatus';
import { useApi } from '../../api/constants/hooks/useApi';
import { apiRequest } from '../../api/constants/apiClient';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { EquipmentType } from '../../types/types';
import Spinner from '../spinner/Spinner';

const WorkoutCalendar = () => {
    const pageSize = 10;
    const [pageIndex, setPageIndex] = useState(0);

    const {
        data: exercises,
        apiStatus,
        error,
        exec
    } = useApi(() => getWorkout("894ce6d3-6990-454d-ba92-17a61d518d8c", pageIndex, pageSize));

    useEffect(() => {
        exec();
    }, [pageIndex]);

    const [sortCriteria, setSortCriteria] = useState({ field: 'LiftWeek', direction: 'asc' });
    
    const handleSort = (field) => {
        if (sortCriteria.field === field) {
            setSortCriteria(prev => ({
                field,
                direction: prev.direction === 'asc' ? 'desc' : 'asc'
            }));
        } else {
            setSortCriteria({ field, direction: 'asc' });
        }
    };

    const sortedExercises = [...(exercises?.Exercises || [])].sort((a, b) => {
        const modifier = sortCriteria.direction === 'asc' ? 1 : -1;
        if (sortCriteria.field === 'LiftWeek' || sortCriteria.field === 'LiftDay') {
            return (a[sortCriteria.field] - b[sortCriteria.field]) * modifier;
        }
        return (a[sortCriteria.field] > b[sortCriteria.field] ? 1 : -1) * modifier;
    });

    const loadMoreExercises = () => {
        setPageIndex(prevIndex => prevIndex + 1);
    };

    const loadPreviousExercises = () => {
        setPageIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    };

    if (apiStatus === PENDING) return <Spinner />;
    if (apiStatus === ERROR) return <div>Error fetching exercises: {error?.message}</div>;
    if (!exercises) return <div>No exercises found</div>;

    return (
        <Paper elevation={3} style={{ backgroundColor: "#242424" }}>
            <Table>
                <TableHead>
                    <TableRow>
                        {['Exercise', 'Week', 'Day', 'Minimum Reps', 'Maximum Reps', 'Sets', 'Working Weight', 'Equipment Type'].map(header => (
                            <TableCell style={{ color: "white",fontWeight: 'bold' }} key={header}>{header}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {sortedExercises.map((exercise) => (
                        <TableRow key={exercise.Id}>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.ExerciseName}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.LiftWeek}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.LiftDay}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.MinimumReps}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.MaximumReps}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold'}}>{exercise.Sets}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold' }}>{exercise.WorkingWeight}</TableCell>
                            <TableCell style={{ color: "white",fontWeight: 'bold'}}>{EquipmentType[exercise.EquipmentType]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0' }}>
            <Button 
                    variant="contained" 
                    style={{ backgroundColor: '#ff8c00' }} 
                    onClick={loadPreviousExercises} 
                    disabled={pageIndex <= 0}
                >
                    Load Previous 20 Exercises
                </Button>
                <Button 
                    variant="contained" 
                    style={{ backgroundColor: '#ff8c00' }} 
                    onClick={loadMoreExercises}
                >
                    Load Next 20 Exercises
                </Button>
            </div>
        </Paper>
    );
}


const getWorkout = async (userId: string, pageIndex: number, pageSize: number) => {
    try {
        const response = await apiRequest(
            "GET",
            `/workout-creation/${userId}/all?pageIndex=${pageIndex}&pageSize=${pageSize}`,
            5002
        );
        return response;
    } catch (error) {
        console.error("Error fetching workout:", error);
        throw error;
    }
}

export default WorkoutCalendar;
