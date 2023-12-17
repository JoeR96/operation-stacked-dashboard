import React, { useState } from 'react';
import { Grid, Paper, Typography, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useApi } from '../../api/constants/hooks/useApi';
import Spinner from '../spinner/Spinner'; // Assuming Spinner is a component you have for loading state
import { PENDING, ERROR } from '../../api/constants/apiStatus';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registrationMessage, setRegistrationMessage] = useState('');

    const registerUser = async () => {
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
    } = useApi(async () => await registerUser());

    const handleSubmit = (event) => {
        console.log(event)
        event.preventDefault();
        exec().then((result) => {
            console.log(result)
            if (result.data.message === 'Registration successful') {
                setRegistrationMessage('Registration successful');
            } else if (result.data.message === 'User already exists.') {
                setRegistrationMessage('User already registered');
            }
        });
    };

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
                        <form onSubmit={handleSubmit}>
                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Email"
                                        variant="outlined"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        InputProps={{ style: { color: 'white' } }}
                                        InputLabelProps={{ style: { color: 'white' }, shrink: true }}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Password"
                                        type="password"
                                        variant="outlined"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
