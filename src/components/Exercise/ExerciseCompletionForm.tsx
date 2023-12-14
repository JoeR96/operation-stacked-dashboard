import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { WorkoutApi } from '../../services/api'; // Import the WorkoutApi
import DatePicker from 'react-datepicker'; // Import a date picker library
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles

const ExerciseCompletionForm = ({ exerciseId, onComplete }) => {
    const [sets, setSets] = useState([{ reps: '' }]);
    const [workingWeight, setWorkingWeight] = useState(''); // State for workingWeight
    const [isLoading, setIsLoading] = useState(false);
    const [dummyTime, setDummyTime] = useState(new Date());

    const handleRepsChange = (index, value) => {
        const newSets = sets.map((set, i) => {
            if (i === index) {
                return { ...set, reps: Number(value) };
            }
            return set;
        });
        setSets(newSets);
    };

    const addSet = () => {
        setSets([...sets, { reps: '' }]);
    };

    const removeSet = (index) => {
        const newSets = sets.filter((_, i) => i !== index);
        setSets(newSets);
    };

    const submitExerciseData = async () => {
        try {
            setIsLoading(true);
            const workoutApi = new WorkoutApi();
            const data = {
                exerciseId,
                sets: sets.length,
                reps: sets.map(set => set.reps),
                workingWeight: parseFloat(workingWeight), // Convert to decimal/float
                dummyTime: dummyTime.toISOString(),
                // ...other necessary fields
            };
            console.log('sending')
            await workoutApi.workoutCompletePost(data); // Replace with actual API call
            setIsLoading(false);
            onComplete(data); // or handle the response accordingly
        } catch (error) {
            console.error("API call failed:", error);
            setIsLoading(false);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        submitExerciseData();
    };

    if (isLoading) {
        return <CircularProgress />; // Show a loading spinner
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom>
                Complete Exercise
            </Typography>
            {sets.map((set, index) => (
                <Grid container spacing={2} key={index}>
                    <Grid item xs={8}>
                        <TextField
                            required
                            fullWidth
                            label={`Reps for Set ${index + 1}`}
                            value={set.reps}
                            onChange={(e) => handleRepsChange(index, e.target.value)}
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="error"
                            onClick={() => removeSet(index)}
                            disabled={sets.length === 1}
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
                value={workingWeight}
                onChange={(e) => setWorkingWeight(e.target.value)}
                type="number"
                InputLabelProps={{
                    shrink: true,
                }}
                sx={{ mt: 2 }}
            />
            <DatePicker
                selected={dummyTime}
                onChange={(date) => setDummyTime(date)}
                dateFormat="yyyy-MM-dd"
                wrapperClassName="datePicker"
                sx={{ mt: 2 }}
            />
            <Button
                variant="contained"
                onClick={addSet}
                sx={{ mt: 2, mb: 2 }}
            >
                Add Set
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
