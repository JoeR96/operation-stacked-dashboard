import React, { useState, useEffect } from 'react';
import { Table, TableCell, TableRow, Paper, Button, Typography, Grid, Box } from '@mui/material';
import { useApi } from '../../api/constants/hooks/useApi';
import Spinner from '../spinner/Spinner';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { ExerciseApi } from '../../services/api';
import { useAuthStore } from '../../state/auth/authStore';
import { Category, EquipmentType } from '../../types/types';
import barbellImage from './barbell.png';
import smithMachineImage from './smithMachine.png';
import dumbbellImage from './dumbell.png';
import machineImage from './machine.png';
import cableMachineImage from './cableMachine.png';

export const ExercisesTable = ({ onCompleteClick, refreshState }) => {
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

        console.log(refreshState)
    }, []);

    useEffect(() => {
        exec();
        console.log(refreshState)
    }, [refreshState]);

    const [groupedExercises, setGroupedExercises] = useState({});

    useEffect(() => {
        exec();
    }, [refreshState]);

    useEffect(() => {
        if (exercises && exercises.length > 0) {
            const grouped = groupExercisesByCategory(exercises);
            setGroupedExercises(grouped);
        } else {
            setGroupedExercises({});
        }
    }, [exercises]);

    // Group exercises by category
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
    const getEquipmentImage = (equipmentType) => {
        switch (equipmentType) {
            case EquipmentType.Barbell:
                return barbellImage;
            case EquipmentType.SmithMachine:
                return smithMachineImage;
            case EquipmentType.Dumbbell:
                return dumbbellImage;
            case EquipmentType.Machine:
                return machineImage;
            case EquipmentType.Cable:
                return cableMachineImage;
            default:
                return barbellImage;
        }
    };


    if (apiStatus === PENDING) return <Spinner />;
    if (apiStatus === ERROR) return <div>Error fetching exercises: {error?.message}</div>;
    if (!exercises || exercises.length === 0) return <div>No exercises found</div>;


    return (
        <Grid container spacing={2}>
            {Object.entries(groupedExercises).map(([category, exercisesInCategory], index) => (
                <Grid item xs={12} sm={4} key={index}>
                    <Box style={{ margin: '10px' }}>
                        <Typography variant="h5" style={{ color: "white", marginBottom: '10px' }}>{category}</Typography>
                        {exercisesInCategory.map((exercise) => (
                            <Paper
                                key={exercise.Id}
                                style={{
                                    padding: '10px',
                                    backgroundColor: "#242424",
                                    marginBottom: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between' // Distributes space evenly
                                }}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <div>
                                        <Typography style={{ color: "white", fontWeight: 'bold' }}>{exercise.ExerciseName}</Typography>
                                        <Typography style={{ color: "white" }}>{EquipmentType[exercise.EquipmentType]}</Typography>
                                    </div>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => onCompleteClick(exercise)}
                                        style={{ marginLeft: '10px' }} // Add some space between text and button
                                    >
                                        Complete
                                    </Button>
                                </div>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center', // Centers the image
                                    flex: 0.2 // Adjust this to control the space allocated for the image
                                }}>
                                    <img
                                        src={getEquipmentImage(exercise.EquipmentType)}
                                        alt={EquipmentType[exercise.EquipmentType]}
                                        style={{ width: '30px', height: '30px' }}
                                    />
                                </div>
                            </Paper>
                        ))}

                    </Box>
                </Grid>
            ))}
        </Grid>
    );
};
