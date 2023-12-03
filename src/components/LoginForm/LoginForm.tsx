
import { useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "../../../node_modules/@mui/material/index";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import { useAuthStore } from "../../state/auth/authStore";

const LoginForm = () => {
  const { setIsAuthenticated, setData, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  console.log(isAuthenticated)
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Now you directly use the email and password state variables.

    try {
      const response = await fetch('http://3.10.176.181:5001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response.json)
      const data = await response.json();
      data.userId = "5af5dae7-801e-47c0-bfc9-3eac5b25491c";
      
      setData(data);
      console.log(data)
      if (data.idToken) {
        console.log('setting authenticated to true')
        setIsAuthenticated(true);
        navigate('/dashboard');
      }

    } catch (error) {
      console.error('Error during authentication:', error);
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
              <TextField
                required
                fullWidth
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // <-- Controlled component
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
                onChange={(e) => setPassword(e.target.value)} // <-- Controlled component
              />
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
