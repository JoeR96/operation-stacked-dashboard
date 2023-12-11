import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useThemeStore from '../../state/themeStore';
import { useAuthStore } from "../../state/auth/authStore";

function Header() {
    const navigate = useNavigate();
    const themeColors = useThemeStore(state => state.colors);
    const { setIsAuthenticated, setData, isAuthenticated } = useAuthStore();

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleLogoutClick = async () => {
        try {
            const response = await fetch('https://localhost:7099/logout', {
                method: 'POST',
                credentials: 'include', // Include credentials in the request
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // You might want to check response status to ensure logout was successful
            if (response.ok) {
                // Perform any state updates or cleanup after successful logout
                setIsAuthenticated(false);
                setData(null); // Reset data or perform other state cleanups as needed
                navigate('/login'); // Redirect to the login page or any other page as desired
            } else {
                console.error('Logout failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };


    return (
        <AppBar position="static" style={{ backgroundColor: themeColors.primary }}>
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    OperationStacked
                </Typography>
                <Button color="inherit" onClick={() => handleNavigate('/dashboard')}>Dashboard</Button>
                <Button color="inherit" onClick={() => handleNavigate('/exercises')}>Exercises</Button>
                <Button color="inherit" onClick={() => handleNavigate('/workout')}>Workout</Button>
                <Button color="inherit" onClick={() => handleNavigate('/equipment-stacks')}>Equipment Stacks</Button>
                <Button color="inherit" onClick={() => handleNavigate('/history')}>History</Button>
                <Button color="inherit" onClick={handleLogoutClick}>Logout</Button>
            </Toolbar>
        </AppBar>
    );
}

export default Header;
