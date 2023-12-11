import { useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "../../../node_modules/@mui/material/index";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import { useAuthStore } from "../../state/auth/authStore";

const LoginForm = () => {
  const { setIsAuthenticated, setData, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Verify the session cookie is set/valid
    const verifySession = async () => {
      try {
        const response = await fetch('https://localhost:7099/verify', {
          method: 'GET',
          credentials: 'include', // Important for including session cookies in the request
          headers: {
            'Accept': 'application/json', // Assuming your server responds with JSON
          }
        });

        console.log(response)
        if (response.ok) {
          const data = await response.json(); // Parse the JSON response body
          console.log(data); // Log the parsed data to see its structure

          if(!data.userId){
            return;
          }
          setIsVerified(true);
          setIsAuthenticated(true);
          setData({ userId: data.userId }); // Use 'data.userId', assuming 'data' has a 'userId' property
          console.log("redirecting to dashboard")
          navigate('/dashboard');
        }  else {
          // Handle cases where the session is not valid
          // Possibly navigate to the login page or show a message
        }
      } catch (error) {
        console.error('Error during session verification:', error);
        // Handle network or server errors
      }
    };


      verifySession();
  }, [navigate]);


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // const response = await fetch('http://3.10.176.181:5001/login', {
      const response = await fetch('https://localhost:7099/login', {

        method: 'POST',
        credentials: 'include', // Important for including session cookies in the request
        headers: {
          'Content-Type': 'application/json',
          'accept': 'text/plain'
        },
        body: JSON.stringify({ email, password }),
      });
      console.log(response.json)
      const data = await response.json();

      setData(data);
      console.log(data)
      if (data.userId) {
        console.log('setting authenticated to true')
        setIsAuthenticated(true);
        setData({ userId: data.userId }); // Or use setUserId(data.userId)

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
