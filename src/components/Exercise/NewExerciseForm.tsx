import React, { useState } from 'react';
import { TextField, Button, Grid, Paper } from '@mui/material';
import { useApi } from '../../api/constants/hooks/useApi';
import Spinner from '../spinner/Spinner';
import { ERROR, PENDING } from "../../api/constants/apiStatus";
import useThemeStore from "../../state/themeStore";

export const NewExerciseForm = () => {
    const [exerciseName, setExerciseName] = useState('');
    const [category, setCategory] = useState('');
    const [equipmentType, setEquipmentType] = useState('');
    const themeColors = useThemeStore((state) => state.colors); // Get theme colors from the store

    const {
        apiStatus,
        error,
        exec: addExercise
    } = useApi(async (exercise) => {
        // Replace with the actual API call to add an exercise
        console.log('Adding exercise:', exercise);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await addExercise({ exerciseName, category, equipmentType });
        setExerciseName('');
        setCategory('');
        setEquipmentType('');
    };

    if (apiStatus === PENDING) return <Spinner />;
    if (apiStatus === ERROR) return <div>Error adding exercise: {error?.message}</div>;
    const textFieldStyles = {
        input: { color: themeColors.text },
        notchedOutline: { borderColor: 'white' },
        label: { color: themeColors.text },
    };
    return (
        <Paper style={{ padding: 16,background:'#1d1d1d' }}>
            <form onSubmit={handleSubmit}>
                <Grid container alignItems="flex-start" spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Exercise Name"
                            value={exerciseName}
                            onChange={(e) => setExerciseName(e.target.value)}
                            InputProps={{
                                style: textFieldStyles.input,
                                notchedOutline: textFieldStyles.notchedOutline
                            }}
                            InputLabelProps={{ style: textFieldStyles.label }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            InputProps={{
                                style: textFieldStyles.input,
                                notchedOutline: textFieldStyles.notchedOutline
                            }}
                            InputLabelProps={{ style: textFieldStyles.label }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Equipment Type"
                            value={equipmentType}
                            onChange={(e) => setEquipmentType(e.target.value)}
                            InputProps={{
                                style: textFieldStyles.input,
                                notchedOutline: textFieldStyles.notchedOutline
                            }}
                            InputLabelProps={{ style: textFieldStyles.label }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Add Exercise
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};
