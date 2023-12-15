import React, { useState } from 'react';
import { Box, Paper, Button } from '@mui/material';
import { ExercisesTable } from './ExerciseTable';
import ExerciseCompletionForm from './ExerciseCompletionForm';
import { useAuthStore } from '../../state/auth/authStore';

const ExerciseLayout = () => {
    const userId = useAuthStore(state => state.getUserId());
    const [showNewExerciseForm, setShowNewExerciseForm] = useState(false);
    const [showCompletionForm, setShowCompletionForm] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);

    const handleCompleteClick = (exerciseId) => {
        setSelectedExerciseId(exerciseId);
        setShowCompletionForm(true);
    };


    const toggleNewExerciseForm = () => {
        setShowNewExerciseForm(!showNewExerciseForm);
    };

    return (
        <Box
            style={{     marginBottom: '10px', paddingTop:'100px'}}
        >
            <Button
                variant="contained"
                style={{ backgroundColor: '#FFA500', marginBottom: '10px'}}
                onClick={toggleNewExerciseForm}
            >
                {showNewExerciseForm ? 'Hide Add Exercise Form' : 'Show Add Exercise Form'}
            </Button>

            {showNewExerciseForm && (
                <Paper style={{ padding: 16, marginBottom: 16, backgroundColor: '#242424' }}>
                    <ExerciseForm />
                </Paper>
            )}

            {showCompletionForm ? (
                <ExerciseCompletionForm
                    exerciseId={selectedExerciseId}
                />
            ) : (
                <ExercisesTable userId={userId} onCompleteClick={handleCompleteClick} />
            )}
        </Box>
    );
};

export default ExerciseLayout;
