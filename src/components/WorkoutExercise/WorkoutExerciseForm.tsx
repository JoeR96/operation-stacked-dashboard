import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl, Tooltip } from '@mui/material';
import { WeightProgression } from '../../types/types';

// Assuming ExerciseTemplate is an enum or similar
enum ExerciseTemplate {
    LinearProgression = 'Linear Progression',
}

// Define the form's validation schema
const WorkoutExerciseFormSchema = Yup.object().shape({
    RestTimer: Yup.number().required('Rest timer is required'),
    WeightProgression: Yup.number().required('Weight progression is required'),
    MinimumReps: Yup.number().required('Minimum reps are required'),
    MaximumReps: Yup.number().required('Maximum reps are required'),
    Sets: Yup.number().required('Sets are required'),
    AttemptsBeforeDeload: Yup.number().required('Attempts before deload is required'),
});

const WorkoutExerciseForm = ({ exercise, onSubmit, onClose }) => {
    return (
        <Formik
            initialValues={{
                RestTimer: 30,
                WeightProgression: WeightProgression.OnePointTwoFiveKg,
                MinimumReps: 8,
                MaximumReps: 12,
                Sets: 3,
                AttemptsBeforeDeload: 2,
                Template: ExerciseTemplate.LinearProgression,
            }}
            validationSchema={WorkoutExerciseFormSchema}
            onSubmit={onSubmit}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Tooltip title="Enter the duration for the rest timer in seconds">
                                <div>
                                    <Field name="RestTimer" as={TextField} label="Rest Timer" fullWidth />
                                </div>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={12}>
                            <Tooltip title="Select the weight increment for progression">
                                <FormControl fullWidth>
                                    <InputLabel>Weight Progression</InputLabel>
                                    <Field name="WeightProgression" as={Select} label="Weight Progression">
                                        {Object.entries(WeightProgression)
                                            .filter(([key, value]) => typeof value === 'number')
                                            .map(([key, value]) => (
                                                <MenuItem key={key} value={value}>
                                                    {value} kg
                                                </MenuItem>
                                            ))
                                        }
                                    </Field>
                                </FormControl>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={12}>
                            <Tooltip title="Enter the minimum number of repetitions for each set">
                                <div>
                                    <Field name="MinimumReps" as={TextField} label="Minimum Reps" fullWidth />
                                </div>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={12}>
                            <Tooltip title="Enter the maximum number of repetitions for each set">
                                <div>
                                    <Field name="MaximumReps" as={TextField} label="Maximum Reps" fullWidth />
                                </div>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={12}>
                            <Tooltip title="Enter the number of sets to be performed">
                                <div>
                                    <Field name="Sets" as={TextField} label="Sets" fullWidth />
                                </div>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={12}>
                            <Tooltip title="Enter the number of attempts before reducing the load">
                                <div>
                                    <Field name="AttemptsBeforeDeload" as={TextField} label="Attempts Before Deload" fullWidth />
                                </div>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={12}>
                            <Tooltip title="Select the exercise template">
                                <FormControl fullWidth>
                                    <InputLabel>Template</InputLabel>
                                    <Field name="Template" as={Select} label="Template">
                                        {Object.values(ExerciseTemplate).map((template) => (
                                            <MenuItem key={template} value={template}>
                                                {template}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </FormControl>
                            </Tooltip>
                        </Grid>

                        <Grid item xs={12} style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                                Submit
                            </Button>
                            <Button onClick={onClose} variant="contained" color="secondary">
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
};

export default WorkoutExerciseForm;
