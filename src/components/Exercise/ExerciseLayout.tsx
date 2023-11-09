import React from 'react';
import {Box, Grid, Paper} from '@mui/material';
import { NewExerciseForm } from './NewExerciseForm';
import { ExercisesTable } from './ExerciseTable';

const ExerciseLayout = () => {
    const userId = 'user-id'; // This should be the actual user ID from your application's state or context

    const addExercise = (exercise) => {
        // Function to call API and add exercise
        console.log('Adding exercise:', exercise);
        // You would replace this console.log with the actual API call
    };

    return (
        <Box>
            <Paper style={{ padding: 16, marginBottom: 16 }}>
                <NewExerciseForm addExercise={addExercise} />
            </Paper>
            <ExercisesTable userId={userId} />
        </Box>

    );
};

export default ExerciseLayout;
