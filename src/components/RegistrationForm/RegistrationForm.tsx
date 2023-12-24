import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Grid, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../api/constants/hooks/useApi';
import Spinner from '../spinner/Spinner'; // Assuming Spinner is a component you have for loading state
import { PENDING, ERROR } from '../../api/constants/apiStatus';

// Yup schema for validation
const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required'),
    password: Yup.string()
        .matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{12,}$/,
            "Password must contain at least one letter, one number, one special character, and be at least 12 characters long"
        )
        .required('Required'),
});

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [registrationMessage, setRegistrationMessage] = useState('');

    const registerUser = async (email, password) => {
        try {
            const response = await fetch('https://app.operationstacked.com/auth/register', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'accept': 'text/plain'
                },
                body: JSON.stringify({ email, password }),
            });
            return response.json();
        } catch (error) {
            console.error('Error during registration:', error);
            throw error;
        }
    };

    const {
        apiStatus,
        data,
        error,
        exec
    } = useApi(async (email, password) => await registerUser(email, password));

    // Formik hook
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setSubmitting }) => {
            exec(values.email, values.password).then((result) => {
                setSubmitting(false);
                if (result.data.message === 'Registration successful') {
                    setRegistrationMessage('Registration successful');
                    navigate('/login');
                } else if (result.data.message === 'User already exists.') {
                    setRegistrationMessage('User already registered');
                }
            }).catch(() => {
                setSubmitting(false);
            });
        },
    });

    if (apiStatus === PENDING) return <Spinner />;
    if (apiStatus === ERROR) return <div>Error during registration: {error?.message}</div>;

    return (
        <React.Fragment>
            <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
                {/* Add your registration form logo or image here */}
            </Box>
            <Grid container justifyContent="center" alignItems="center">
                <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#242424' }}>
                    <Typography variant="h5" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
                        Register
                    </Typography>

                    {registrationMessage ? (
                        <div>
                            <Typography style={{ color: 'white', textAlign: 'center' }}>
                                {registrationMessage}
                            </Typography>
                            {registrationMessage === 'Registration successful' && (
                                <Button onClick={() => navigate('/login')} color="primary" variant="contained">
                                    Return to Login
                                </Button>
                            )}
                        </div>
                    ) : (
                        <form onSubmit={formik.handleSubmit}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        id="email"
                                        name="email"
                                        type="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        error={formik.touched.email && Boolean(formik.errors.email)}
                                        helperText={formik.touched.email && formik.errors.email}
                                        InputProps={{ style: { color: 'white' } }}
                                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        fullWidth
                                        label="Password"
                                        variant="outlined"
                                        id="password"
                                        name="password"
                                        type="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        error={formik.touched.password && Boolean(formik.errors.password)}
                                        helperText={formik.touched.password && formik.errors.password}
                                        InputProps={{ style: { color: 'white' } }}
                                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Box textAlign="center">
                                        <Button type="submit" variant="contained" color="primary">
                                            Register
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </form>
                    )}
                </Paper>
            </Grid>
        </React.Fragment>
    );
};

export default RegistrationForm;
