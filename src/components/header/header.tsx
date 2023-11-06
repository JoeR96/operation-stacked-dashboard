import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Header() {
    const navigate = useNavigate(); // Hook for navigation

    const handleLoginClick = () => {
        // This function will navigate to the /dashboard route when the button is clicked
        navigate('/dashboard');
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Your App Name
                </Typography>
                <Button color="inherit" onClick={handleLoginClick}>Dashboard</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
