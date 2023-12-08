import React, { useState, useEffect } from 'react';
import {Button, Box, Grid} from "@mui/material";
import { ExerciseApi } from "../../services/api"; // Ensure ExerciseApi is correctly imported
import {ERROR, PENDING} from "../../api/constants/apiStatus.ts";
import Spinner from "../../components/spinner/Spinner.tsx";
import {useAuthStore} from "../../state/auth/authStore";
import {Category, EquipmentType} from "../../types/types";

export const ExercisesGrouped = ({  onCompleteClick }) => {
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [apiStatus, setApiStatus] = useState('idle');
    const [error, setError] = useState(null);
    const exerciseApi = new ExerciseApi();
    const userId = useAuthStore(state => state.getUserId()); // Using the selector    <Box key=Category{[equipment]}>


    const fetchExercises = async () => {
        setApiStatus(PENDING);
        try {
            const response = await exerciseApi.exerciseUserIdAllGet(userId);

            setExercises(response.data);
            setApiStatus('success');
        } catch (error) {
            console.error("Error fetching exercises:", error);
            setError(error);
            setApiStatus(ERROR);
        }
    }

    useEffect(() => {
        fetchExercises();
    }, []);

    const handleExerciseClick = (exerciseId) => {
        setSelectedExercises(prev => [...prev, exerciseId]);
    };

    const groupedExercises = exercises.reduce((acc, exercise) => {
        const category = exercise.Category || 'Others';
        const equipment = exercise.EquipmentType || 'None';
        if (!acc[category]) {
            acc[category] = {};
        }
        if (!acc[category][equipment]) {
            acc[category][equipment] = [];
        }
        acc[category][equipment].push(exercise);
        return acc;
    }, {});

    if (apiStatus === PENDING) return <Spinner />;
    if (apiStatus === ERROR) return <div>Error fetching exercises: {error?.message}</div>;
    if (!exercises || exercises.length === 0) return <div>No exercises found</div>;

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {Object.entries(groupedExercises).map(([category, equipmentGroup], index) => (
                    <Grid item xs={6} key={category}>
                        <Box>
                            <h2>{Category[category]}</h2>
                            {Object.entries(equipmentGroup).map(([equipment, exercises]) => (
                                <Box key={equipment}>
                                    <h3>{EquipmentType[equipment]}</h3>
                                    {exercises.map(exercise => (
                                        <Button
                                            key={exercise.Id}
                                            variant="contained"
                                            onClick={() => handleExerciseClick(exercise.Id)}
                                        >
                                            {exercise.ExerciseName}
                                        </Button>
                                    ))}
                                </Box>
                            ))}
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};
