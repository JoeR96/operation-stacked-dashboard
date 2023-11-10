// ExerciseLayout.js
import React, { useState } from 'react';
import { Box, Paper } from '@mui/material';
import { ExercisesTable } from './ExerciseTable';
import { NewExerciseForm } from './NewExerciseForm';
import ExerciseCompletionForm from './ExerciseCompletionForm';

const ExerciseLayout = () => {
    const userId = 'user-id'; // Replace with actual user ID
    const [showCompletionForm, setShowCompletionForm] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);

    const handleCompleteClick = (exerciseId) => {
        setSelectedExerciseId(exerciseId);
        setShowCompletionForm(true);
    };

    const handleCompleteExercise = (completeExerciseRequest) => {
        console.log('Complete exercise with request:', completeExerciseRequest);
        setShowCompletionForm(false);
    };

    return (
        <Box>
            {showCompletionForm ? (
                <ExerciseCompletionForm
                    exerciseId={selectedExerciseId}
                    onComplete={handleCompleteExercise}
                />
            ) : (
                <>
                    <Paper style={{ padding: 16, marginBottom: 16 }}>
                        <NewExerciseForm />
                    </Paper>
                    <ExercisesTable userId={userId} onCompleteClick={handleCompleteClick} />
                </>
            )}
        </Box>
    );
};

export default ExerciseLayout;
