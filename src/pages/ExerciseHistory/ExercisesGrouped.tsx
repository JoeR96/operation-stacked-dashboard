import React, { useState, useEffect } from 'react';
import { Button, Box } from "@mui/material";
import { ExerciseApi } from "../../services/api"; // Ensure ExerciseApi is correctly imported
import {ERROR, PENDING} from "../../api/constants/apiStatus.ts";
import Spinner from "../../components/spinner/Spinner.tsx";

export const ExercisesGrouped = ({ userId, onCompleteClick }) => {
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [apiStatus, setApiStatus] = useState('idle');
    const [error, setError] = useState(null);
    const exerciseApi = new ExerciseApi();

    const fetchExercises = async () => {
        setApiStatus(PENDING);
        try {
            const response = await exerciseApi.exerciseUserIdAllGet(userId);
            setExercises(response.data.$values);
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
        <Box>
            {Object.entries(groupedExercises).map(([category, equipmentGroup]) => (
                <Box key={category}>
                    <h2>{category}</h2>
                    {Object.entries(equipmentGroup).map(([equipment, exercises]) => (
                        <Box key={equipment}>
                            <h3>{equipment}</h3>
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
            ))}
        </Box>
    );
};
