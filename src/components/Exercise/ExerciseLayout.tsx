

import React, { useState } from 'react';
import { Box, Paper, Button } from '@mui/material';
import Spinner from '../spinner/Spinner';
import { useApi } from '../../api/constants/hooks/useApi';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { WorkoutApi } from '../../services/api';
import { ExercisesTable } from './ExerciseTable';
import { NewExerciseForm } from './NewExerciseForm';
import ExerciseCompletionForm from './ExerciseCompletionForm';
import { useAuthStore } from '../../state/auth/authStore';

const ExerciseLayout = () => {
    const userId = useAuthStore(state => state.getUserId());
    const [showNewExerciseForm, setShowNewExerciseForm] = useState(false);
    const [showCompletionForm, setShowCompletionForm] = useState(false);
    const [selectedExerciseId, setSelectedExerciseId] = useState(null);

    const workoutApi = new WorkoutApi();

    const completeExercise = async (completeExerciseRequest) => {
        try {
            const response = await workoutApi.workoutCompletePost(completeExerciseRequest);
            return response.data;
        } catch (error) {
            console.error("Error completing exercise:", error);
            throw error;
        }
    };

    const {
        data: completionResult,
        apiStatus,
        error,
        exec
    } = useApi(async (completeExerciseRequest) => await completeExercise(completeExerciseRequest));

    const handleCompleteClick = (exerciseId) => {
        setSelectedExerciseId(exerciseId);
        setShowCompletionForm(true);
    };

    const handleCompleteExercise = (completeExerciseRequest) => {
        exec(completeExerciseRequest);
        setShowCompletionForm(false);
    };

    if (apiStatus === PENDING) return <Spinner />;
    if (apiStatus === ERROR) return <div>Error completing exercise: {error?.message}</div>;

    const toggleNewExerciseForm = () => {
        setShowNewExerciseForm(!showNewExerciseForm);
    };

    return (
        <Box>
            <Button
                variant="contained"
                style={{ backgroundColor: '#FFA500', marginBottom: '10px' }}
                onClick={toggleNewExerciseForm}
            >
                {showNewExerciseForm ? 'Hide Add Exercise Form' : 'Show Add Exercise Form'}
            </Button>

            {showNewExerciseForm && (
                <Paper style={{ padding: 16, marginBottom: 16, backgroundColor: '#242424' }}>
                    <NewExerciseForm />
                </Paper>
            )}

            {showCompletionForm ? (
                <ExerciseCompletionForm
                    exerciseId={selectedExerciseId}
                    onComplete={handleCompleteExercise}
                />
            ) : (
                <ExercisesTable userId={userId} onCompleteClick={handleCompleteClick} />
            )}
        </Box>
    );
};

export default ExerciseLayout;
