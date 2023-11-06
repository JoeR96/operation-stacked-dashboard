import React from 'react';
import { Grid, Paper } from '@mui/material';
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
        <Grid container spacing={2} style={{ padding: 16 }}>
            <Grid item xs={12} md={6}>
                {/* Form for creating a new exercise */}
                <Paper style={{ padding: 16, marginBottom: 16 }}>
                    <NewExerciseForm addExercise={addExercise} />
                </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
                {/* Table to list all exercises */}
                <ExercisesTable userId={userId} />
            </Grid>
        </Grid>
    );
};

export default ExerciseLayout;
