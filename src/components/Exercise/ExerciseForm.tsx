import React, { useState } from 'react';
import { TextField, Button, Grid, Paper, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import useThemeStore from "../../state/themeStore";
import { Category, EquipmentType } from "../../types/types";
import Spinner from '../spinner/Spinner';
import { useAuthStore } from "../../state/auth/authStore";
import { ExerciseApi } from "../../services/api"; // Adjust this path as needed
import { useApi } from '../../api/constants/hooks/useApi';
import { ERROR, PENDING } from '../../api/constants/apiStatus';

export const ExerciseForm = ({ onRefreshExercises }) => {
    const [exerciseName, setExerciseName] = useState<string>('');
    const [category, setCategory] = useState<string>(''); // Assuming Category expects a string
    const [equipmentType, setEquipmentType] = useState<string>(''); // Assuming EquipmentType expects a string
    const themeColors = useThemeStore((state) => state.colors);
    const userId = useAuthStore(state => state.getUserId()); // Using the selector to get userId

    // Instantiate ExerciseApi
    const exerciseApi = new ExerciseApi();

    const {
        data: exerciseData,
        apiStatus,
        error,
        exec
    } = useApi(async (newExerciseRequest) => {
        return await exerciseApi.exerciseCreateExercisesPost(newExerciseRequest);
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newExerciseRequest = [{
            ExerciseName: exerciseName,
            Category: Number(category),
            EquipmentType: Number(equipmentType),
            UserId: userId
        }];

        exec(newExerciseRequest).then(() => {
            setExerciseName('');
            setCategory('');
            setEquipmentType('');

        }).catch(console.error);
        onRefreshExercises();
    };

    const textFieldStyles = {
        input: { color: themeColors.text },
        notchedOutline: { borderColor: 'white' },
        label: { color: themeColors.text },
    };

    if (apiStatus === PENDING) return <Spinner />;
    if (apiStatus === ERROR) return <div>Error adding exercise: {error?.message}</div>;

    // noinspection TypeScriptValidateTypes
    return (
        <Paper style={{ padding: 16, background: '#1d1d1d' }}>
            {apiStatus === 'success' ? (
                <Typography variant="h6" style={{ marginBottom: 16 }}>
                    Exercise Created Successfully!
                </Typography>
            ) : (
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
                            <FormControl fullWidth>
                                <InputLabel style={textFieldStyles.label}>Category</InputLabel>
                                <Select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    label="Category"
                                    style={textFieldStyles.input}
                                >
                                    {Object.keys(Category).filter(key => !isNaN(Number(Category[key]))).map(key => (
                                        <MenuItem key={key} value={Category[key]}>
                                            {key}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel style={textFieldStyles.label}>Equipment Type</InputLabel>
                                <Select
                                    value={equipmentType}
                                    onChange={(e) => setEquipmentType(e.target.value)}
                                    label="Equipment Type"
                                    style={textFieldStyles.input}
                                >
                                    {Object.keys(EquipmentType).filter(key => !isNaN(Number(EquipmentType[key]))).map(key => (
                                        <MenuItem key={key} value={EquipmentType[key]}>
                                            {key}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                 s           <Button variant="contained" color="primary" type="submit">
                                Add Exercise
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            )}
        </Paper>
    );
};

export default ExerciseForm;
