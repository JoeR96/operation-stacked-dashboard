import React, { useState } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Paper, Grid, CircularProgress, Typography, IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { EquipmentStackApi } from "../../services/api"; // Adjust this import to your actual API service
import { useAuthStore } from '../../state/auth/authStore'; // Import the useAuthStore
import { CreateEquipmentStackRequest } from '../../types/types';

// TypeScript Interface for Form Values
interface EquipmentStackFormValues {
  StartWeight: number;
  InitialIncrements: number[];
  IncrementValue: number;
  IncrementCount: number;
  EquipmentStackKey: string;
}

// Yup Validation Schema
const EquipmentStackValidationSchema = Yup.object().shape({
  StartWeight: Yup.number().required('Start weight is required'),
  InitialIncrements: Yup.array().of(Yup.number().required('Initial increment is required')),
  IncrementValue: Yup.number().required('Increment value is required'),
  IncrementCount: Yup.number().required('Increment count is required'),
  EquipmentStackKey: Yup.string().required('Equipment Stack Key is required'),
});

// Custom Field component for Material-UI integration
const MaterialUIField = ({ field, form, ...props }) => (
  <TextField
    {...field}
    {...props}
    error={form.touched[field.name] && Boolean(form.errors[field.name])}
    helperText={form.touched[field.name] && form.errors[field.name]}
    fullWidth
  />
);

// EquipmentStackForm Component
const EquipmentStackForm = ({ onClose }) => {
  const equipmentStackApi = new EquipmentStackApi();
  const userId = useAuthStore((state) => state.data?.userId); // Get userId from auth store
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const initialValues: EquipmentStackFormValues = {
    StartWeight: 0,
    InitialIncrements: [],
    IncrementValue: 0,
    IncrementCount: 0,
    EquipmentStackKey: '',
  };

  const handleSubmit = async (values, actions) => {
    setLoading(true);
    setError('');

    const requestData = {
      ...values,
      UserID: userId, // Add the userId to the request data
    };

    try {
        const request : CreateEquipmentStackRequest = {
            UserID : userId,
            IncrementCount: values.IncrementCount,
            IncrementValue: values.IncrementValue,
            EquipmentStackKey: values.EquipmentStackKey,
            StartWeight: values.StartWeight,
            InitialIncrements: values.InitialIncrements
        } 
      const response = await equipmentStackApi.equipmentStackCreatePost(request); // Adjust to your actual API method
      console.log(response);
      actions.resetForm();
      onClose(); // Close the modal or allow for another entry
    } catch (err) {
      setError(err.message || 'Error occurred while creating equipment stack.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={EquipmentStackValidationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <Paper style={{ padding: 16 }}>
            <Grid container alignItems="flex-start" spacing={2}>
              {/* Start Weight Field */}
              <Grid item xs={12}>
                <Field
                  name="StartWeight"
                  component={MaterialUIField}
                  label="Start Weight"
                  type="number"
                />
              </Grid>

              {/* Initial Increments FieldArray */}
              <Grid item xs={12}>
              <FieldArray name="InitialIncrements">
                  {({ push, remove }) => (
                    <div>
                      {values.InitialIncrements.length > 0 &&
                        values.InitialIncrements.map((increment, index) => (
                          <Grid container key={index} spacing={2} alignItems="center">
                            <Grid item xs={10}>
                              <Field
                                name={`InitialIncrements.${index}`}
                                component={MaterialUIField}
                                label={`Increment ${index + 1}`}
                                type="number"
                              />
                            </Grid>
                            <Grid item xs={2}>
                              <IconButton onClick={() => remove(index)}>
                                <RemoveCircleOutlineIcon />
                              </IconButton>
                            </Grid>
                          </Grid>
                        ))}
                      <Button
                        variant="text"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={() => push(0)} // Push a default value for a new increment
                      >
                        Add Increment
                      </Button>
                    </div>
                  )}
                </FieldArray>
              </Grid>

              {/* Increment Value Field */}
              <Grid item xs={12}>
                <Field
                  name="IncrementValue"
                  component={MaterialUIField}
                  label="Increment Value"
                  type="number"
                />
              </Grid>

              {/* Increment Count Field */}
              <Grid item xs={12}>
                <Field
                  name="IncrementCount"
                  component={MaterialUIField}
                  label="Increment Count"
                  type="number"
                />
              </Grid>

              {/* Equipment Stack Key Field */}
              <Grid item xs={12}>
                <Field
                  name="EquipmentStackKey"
                  component={MaterialUIField}
                  label="Equipment Stack Key"
                />
              </Grid>

              {/* Error Message */}
              {error && (
                <Grid item xs={12}>
                  <Typography color="error">{error}</Typography>
                </Grid>
              )}

              {/* Submit Button */}
              <Grid item xs={12}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
                    Submit
                  </Button>
                )}
              </Grid>
            </Grid>
          </Paper>
        </Form>
      )}
    </Formik>
  );
};

export default EquipmentStackForm;
