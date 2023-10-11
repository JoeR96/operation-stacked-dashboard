/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from 'react-router-dom'; 
import { Button, TextField, Paper, Typography, Grid } from '@mui/material';
import { useState } from 'react';

const LoginForm = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event : any) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    // TODO: Add your authentication logic here

    // Mark as authenticated for now
    setIsAuthenticated(true);
    if (isAuthenticated) {
      navigate('/dashboard'); // Navigate to the dashboard
    }
  };


  return (
    <Grid container justifyContent="center" alignItems="center" style={{ height: '100vh' }}>
      <Paper elevation={3} style={{ padding: '2rem' }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <TextField required fullWidth label="Email" variant="outlined" />
            </Grid>
            <Grid item>
              <TextField required fullWidth label="Password" type="password" variant="outlined" />
            </Grid>
            <Grid item>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Grid>
  );
};

export default LoginForm;
