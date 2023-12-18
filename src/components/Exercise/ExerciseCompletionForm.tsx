import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Grid, CircularProgress } from '@mui/material';
import { WorkoutApi } from '../../services/api'; // Import the WorkoutApi
import DatePicker from 'react-datepicker'; // Import a date picker library
import 'react-datepicker/dist/react-datepicker.css'; // Import date picker styles
import useThemeStore from "../../state/themeStore";

const ExerciseCompletionForm = ({ exerciseId }) => {
    const [sets, setSets] = useState([{ reps: 0 }]); // Initialize reps as numbers
    const [workingWeight, setWorkingWeight] = useState(''); // State for workingWeight
    const [isLoading, setIsLoading] = useState(false);
    const [dummyTime, setDummyTime] = useState(new Date());
    const themeColors = useThemeStore((state) => state.colors);
    const textFieldStyles = {
        input: {
            color: themeColors.text, // Set the text color
            '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'white', // Set the border color
            },
        },
        label: {
            color: themeColors.text, // Set the label color
        },
    };

    const handleRepsChange = (index, value) => {
        const newSets = sets.map((set, i) => {
            if (i === index) {
                return { ...set, reps: Number(value) }; // Convert value to number
            }
            return set;
        });
        setSets(newSets);
    };

    const addSet = () => {
        setSets([...sets, { reps: 0 }]);
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
                ExerciseId: exerciseId,
                Sets: sets.length,
                Reps: sets.map(set => set.reps),
                WorkingWeight: parseFloat(workingWeight),
                DummyTime: dummyTime.toISOString(),
            };
            console.log('sending')
            await workoutApi.workoutCompletePost(data);
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

    if (isLoading) {
        return <CircularProgress />;
    }

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <Typography variant="h6" gutterBottom>
                Complete Exercise
            </Typography>
            {sets.map((set, index) => (
                <Grid container spacing={2} key={index}>
                    <Grid item xs={8}
                    ><TextField
                        required
                        fullWidth
                        label={`Reps for Set ${index + 1}`}
                        value={set.reps}
                        onChange={(e) => handleRepsChange(index, e.target.value)}
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
                InputProps={{
                    sx: textFieldStyles.input
                }}
                InputLabelProps={{
                    sx: textFieldStyles.label
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
