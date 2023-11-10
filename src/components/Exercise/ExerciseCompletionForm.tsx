import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Grid } from '@mui/material';

const ExerciseCompletionForm = ({ exerciseId, onComplete }) => {
    const [sets, setSets] = useState([{ reps: '' }]);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (typeof onComplete === 'function') {
            onComplete({
                exerciseId,
                sets: sets.length,
                reps: sets.map(set => set.reps),
            });
        }
    };

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
