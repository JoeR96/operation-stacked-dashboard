/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ERROR, IDLE, PENDING, SUCCESS } from '../../api/constants/apiStatus';
import { useApi } from '../../api/constants/hooks/useApi';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { EquipmentType } from '../../types/types';
import Spinner from '../spinner/Spinner';
import {WorkoutApi} from "../../services/api";

const WorkoutCalendar = () => {
    const pageSize = 10;
    const [pageIndex, setPageIndex] = useState(0);
    const workoutApi = new WorkoutApi();

    const fetchWorkouts = async (userId, pageIndex, pageSize) => {
        try {
            const response = await workoutApi.workoutUserIdAllGet(userId, pageIndex, pageSize);
            console.log(response); // Logs the actual response
            return response.data.Exercises;
        } catch (error) {
            console.error("Error fetching workouts:", error);
            throw error;
        }
    };
    
    const {
        data: exercises,
        apiStatus,
        error,
        exec
    } = useApi(async () => await fetchWorkouts("5af5dae7-801e-47c0-bfc9-3eac5b25491c", pageIndex, pageSize));

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
    let exercisesArray = exercises.$values;
    console.log(exercisesArray);
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
                    {exercisesArray.map((workoutExercise) => {
                        console.log(workoutExercise);
                        console.log(workoutExercise.LinearProgressionExercise)
                        return (
                            <TableRow key={workoutExercise.Id}>
                                <TableCell style={{ color: "white", fontWeight: 'bold' }}>{workoutExercise.Exercise?.ExerciseName}</TableCell>
                                <TableCell style={{ color: "white", fontWeight: 'bold' }}>
                                    {workoutExercise.LinearProgressionExercises?.$values[0].LiftWeek}
                                </TableCell>
                                <TableCell style={{ color: "white", fontWeight: 'bold' }}>{workoutExercise.LiftDay}</TableCell>
                                <TableCell style={{ color: "white", fontWeight: 'bold' }}>{workoutExercise.MinimumReps}</TableCell>
                                <TableCell style={{ color: "white", fontWeight: 'bold' }}>{workoutExercise.MaximumReps}</TableCell>
                                <TableCell style={{ color: "white", fontWeight: 'bold'}}>{workoutExercise.Sets}</TableCell>
                                <TableCell style={{ color: "white", fontWeight: 'bold' }}>
                                    {workoutExercise.LinearProgressionExercises?.$values[0].WorkingWeight} KG
                                </TableCell>
                                <TableCell style={{ color: "white", fontWeight: 'bold'}}>
                                    {EquipmentType[workoutExercise.Exercise.EquipmentType]}
                                </TableCell>
                            </TableRow>
                        );
                    })}
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

export default WorkoutCalendar;
