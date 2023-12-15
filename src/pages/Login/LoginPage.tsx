// LoginPage.tsx
import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm.tsx';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.tsx';
import { Button } from '@mui/material';

const LoginPage = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);

    const toggleForm = () => {
        setShowLoginForm(!showLoginForm);
    };

    return (
        <>
            {showLoginForm ? <LoginForm /> : <RegistrationForm />}
            <Button onClick={toggleForm} variant="contained" color="secondary" style={{ marginTop: '20px' }}>
                {showLoginForm ? 'Register' : 'Login'}
            </Button>
        </>
    );
};

export default LoginPage;
