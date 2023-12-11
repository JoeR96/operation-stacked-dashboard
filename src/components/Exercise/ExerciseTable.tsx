import React, { useState, useEffect } from 'react';
import { Table, TableCell, TableRow, Paper, Button, Typography, Grid, Box } from '@mui/material';
import { useApi } from '../../api/constants/hooks/useApi';
import Spinner from '../spinner/Spinner';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { ExerciseApi } from '../../services/api';
import { useAuthStore } from '../../state/auth/authStore';
import { Category, EquipmentType } from '../../types/types';

export const ExercisesTable = ({ onCompleteClick }) => {
    const exerciseApi = new ExerciseApi();
    const userId = useAuthStore(state => state.getUserId());

    const fetchExercises = async () => {
        try {
            const response = await exerciseApi.exerciseUserIdAllGet(userId);
            return response.data;
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
    } = useApi(async () => await fetchExercises());

    useEffect(() => {
        exec();
    }, []);

    const groupExercisesByCategory = (exercises) => {
        return exercises.reduce((acc, exercise) => {
            const category = Category[exercise.Category] || 'Others';
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push(exercise);
            return acc;
        }, {});
    };

    if (apiStatus === PENDING) return <Spinner />;
    if (apiStatus === ERROR) return <div>Error fetching exercises: {error?.message}</div>;
    if (!exercises || exercises.length === 0) return <div>No exercises found</div>;

    const groupedExercises = groupExercisesByCategory(exercises);

    return (
        <Grid container spacing={2}>
            {Object.entries(groupedExercises).map(([category, exercisesInCategory], index) => (
                <Grid item xs={12} sm={4} key={index}>
                    <Box style={{ margin: '10px' }}>
                        <Typography variant="h5" style={{ color: "white", marginBottom: '10px' }}>{category}</Typography>
                        {exercisesInCategory.map((exercise) => (
                            <Paper key={exercise.Id} style={{ padding: '10px', backgroundColor: "#242424", marginBottom: '10px' }}>
                                <Typography style={{ color: "white", fontWeight: 'bold' }}>{exercise.ExerciseName}</Typography>
                                <Typography style={{ color: "white" }}>{EquipmentType[exercise.EquipmentType]}</Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => onCompleteClick(exercise.Id)}
                                    style={{ marginTop: '10px' }}
                                >
                                    Complete
                                </Button>
                            </Paper>
                        ))}
                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};
