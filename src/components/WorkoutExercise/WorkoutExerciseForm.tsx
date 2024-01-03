import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Grid, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
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
  AttemptsBeforeDeload: Yup.number().required('Attempts before deload are required'),
  // Add validations for other fields if needed
});

const WorkoutExerciseForm = ({ exercise, onSubmit, day, order }) => {
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
              <Field name="RestTimer" as={TextField} label="Rest Timer" fullWidth />
            </Grid>
            
            <Grid item xs={12}>
  <FormControl fullWidth>
    <InputLabel>Weight Progression</InputLabel>
    <Field name="WeightProgression" as={Select} label="Weight Progression">
      {Object.entries(WeightProgression)
        .filter(([key, value]) => typeof value === 'number') // Keep only numeric values
        .map(([key, value]) => (
          <MenuItem key={key} value={value}>
            {value} kg
          </MenuItem>
        ))
      }
    </Field>
  </FormControl>
</Grid>



            <Grid item xs={12}>
              <Field name="MinimumReps" as={TextField} label="Minimum Reps" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Field name="MaximumReps" as={TextField} label="Maximum Reps" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Field name="Sets" as={TextField} label="Sets" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <Field name="AttemptsBeforeDeload" as={TextField} label="Attempts Before Deload" fullWidth />
            </Grid>
            <Grid item xs={12}>
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
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default WorkoutExerciseForm;
