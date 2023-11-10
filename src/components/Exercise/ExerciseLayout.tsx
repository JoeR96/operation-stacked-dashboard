import React, { useState } from 'react';
import { Box, Paper, Button } from '@mui/material';
import Spinner from '../spinner/Spinner';
import { useApi } from '../../api/constants/hooks/useApi';
import { ERROR, PENDING } from '../../api/constants/apiStatus';
import { WorkoutApi } from '../../services/api';
import { ExercisesTable } from './ExerciseTable';
import { NewExerciseForm } from './NewExerciseForm';
import ExerciseCompletionForm from './ExerciseCompletionForm';

const ExerciseLayout = () => {
    const userId = 'user-id'; // Replace with actual user ID
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
