import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography, TextField, Button } from "../../../node_modules/@mui/material/index";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";
import { useAuthStore } from "../../state/auth/authStore";
import {Box} from "@mui/material";
import sharkImage from './shark.png'; // Import the image

const LoginForm = () => {
  const { setIsAuthenticated, setData, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    // Verify the session cookie is set/valid
    const verifySession = async () => {
      try {
        const response = await fetch('https://app.operationstacked.com/auth/verify', {
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
      const response = await fetch('https://app.operationstacked.com/auth/login', {
      // const response = await fetch('https://localhost:7099/login', {

        method: 'POST',
        credentials: 'include', // Important for including session cookies in the request
        headers: {
          'Content-Type': 'application/json'
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
   <React.Fragment>
     <Box style={{ textAlign: 'center', marginBottom: '20px' }}>
       <img src={sharkImage} alt="Shark" style={{ maxWidth: '50%', height: 'auto', margin: '0 auto' }} />
     </Box>
     <Grid container justifyContent="center" alignItems="center">
       <Paper elevation={3} style={{ padding: '2rem', backgroundColor: '#242424' }}>

         <Typography variant="h5" gutterBottom style={{ color: 'white', textAlign: 'center' }}>
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
                   onChange={(e) => setEmail(e.target.value)}
                   InputProps={{ style: { color: 'white' } }}
                   InputLabelProps={{ style: { color: 'white', textAlign: 'center' }, shrink: true }}
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
                   InputLabelProps={{ style: { color: 'white', textAlign: 'center' }, shrink: true }}
               />
             </Grid>
             <Grid item>
               <Box textAlign="center">
                 <Button type="submit" variant="contained" color="primary">
                   Submit
                 </Button>
               </Box>
             </Grid>
           </Grid>
         </form>
       </Paper>
     </Grid>
   </React.Fragment>
  );
};

export default LoginForm;
