import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { WorkoutApi } from '../../services/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useThemeStore from "../../state/themeStore";

const ExerciseCompletionForm = ({ exerciseId }) => {
    const [exercises, setExercises] = useState([
        { exerciseId: '', sets: [{ reps: 0 }], workingWeight: '', dummyTime: new Date() }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const themeColors = useThemeStore((state) => state.colors);

    const textFieldStyles = {
        input: {
            color: themeColors.text,
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white',
            },
        },
        label: {
            color: themeColors.text,
        },
    };

    const handleRepsChange = (exerciseIndex, setIndex, value) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                const newSets = exercise.sets.map((set, j) => {
                    if (j === setIndex) {
                        return { ...set, reps: Number(value) };
                    }
                    return set;
                });
                return { ...exercise, sets: newSets };
            }
            return exercise;
        });
        setExercises(newExercises);
    };

    const addSet = (exerciseIndex) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                return { ...exercise, sets: [...exercise.sets, { reps: 0 }] };
            }
            return exercise;
        });
        setExercises(newExercises);
    };

    const removeSet = (exerciseIndex, setIndex) => {
        const newExercises = exercises.map((exercise, i) => {
            if (i === exerciseIndex) {
                const newSets = exercise.sets.filter((_, j) => j !== setIndex);
                return { ...exercise, sets: newSets };
            }
            return exercise;
        });
        setExercises(newExercises);
    };

    const submitExerciseData = async () => {
        try {
            setIsLoading(true);
            const workoutApi = new WorkoutApi();
            const data = exercises.map(exercise => ({
                ExerciseId: exerciseId,
                Sets: exercise.sets.length,
                Reps: exercise.sets.map(set => set.reps),
                WorkingWeight: parseFloat(exercise.workingWeight),
                DummyTime: exercise.dummyTime.toISOString(),
                // Other fields can be left undefined as they are optional
            }));

            console.log('sending', data);
                await workoutApi.workoutCompleteMultiplePost(data);
            
            setIsLoading(false);
        } catch (error) {
            console.error("API call failed:", error);
            setIsLoading(false);
        }
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        submitExerciseData();
    };

    const addExercise = () => {
        setExercises([...exercises, { exerciseId: '', sets: [{ reps: 0 }], workingWeight: '', dummyTime: new Date() }]);
    };

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom>
                Complete Exercise
            </Typography>
            {exercises.map((exercise, exerciseIndex) => (
                <Box key={exerciseIndex}>
                    {exercise.sets.map((set, setIndex) => (
                        <Grid container spacing={2} key={setIndex}>
                            <Grid item xs={8}>
                                <TextField
                                    required
                                    fullWidth
                                    label={`Reps for Set ${setIndex + 1}`}
                                    value={set.reps}
                                    onChange={(e) => handleRepsChange(exerciseIndex, setIndex, e.target.value)}
                                    type="number"
                                    InputProps={{
                                        sx: textFieldStyles.input
                                    }}
                                    InputLabelProps={{
                                        sx: textFieldStyles.label
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="error"
                                    onClick={() => removeSet(exerciseIndex, setIndex)}
                                    disabled={exercise.sets.length === 1}
                                >
                                    Remove Set
                                </Button>
                            </Grid>
                        </Grid>
                    ))}
                    <TextField
                        required
                        fullWidth
                        label="Working Weight"
                        value={exercise.workingWeight}
                        onChange={(e) => setExercises(exercises.map((ex, i) => i === exerciseIndex ? { ...ex, workingWeight: e.target.value } : ex))}
                        type="number"
                        InputProps={{
                            sx: textFieldStyles.input
                        }}
                        InputLabelProps={{
                            sx: textFieldStyles.label
                        }}
                        sx={{ mt: 2 }}
                    />
                    <DatePicker
                        selected={exercise.dummyTime}
                        onChange={(date) => setExercises(exercises.map((ex, i) => i === exerciseIndex ? { ...ex, dummyTime: date } : ex))}
                        dateFormat="yyyy-MM-dd"
                        wrapperClassName="datePicker"
                        sx={{ mt: 2 }}
                    />
                    <Button
                        variant="contained"
                        onClick={() => addSet(exerciseIndex)}
                        sx={{ mt: 2, mb: 2 }}
                    >
                        Add Set
                    </Button>
                </Box>
            ))}
            <Button
                variant="contained"
                onClick={addExercise}
                sx={{ mt: 2, mb: 2 }}
            >
                Add Exercise
            </Button>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Complete Exercise
            </Button>
        </Box>
    );
};

export default ExerciseCompletionForm;
