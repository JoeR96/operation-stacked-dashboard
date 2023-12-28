import React, { useState } from 'react';
import LoginForm from '../../components/LoginForm/LoginForm.tsx';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm.tsx';
import sharkImage from './sharky.png';

const LoginPage = () => {
    const [showLoginForm, setShowLoginForm] = useState(true);

    const toggleForm = () => {
        setShowLoginForm(!showLoginForm);
    };

    return (
        <div style={{ display: 'flex', height: '100vh', alignItems: 'center' }}>
            <div style={{ flex: '0 0 75%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <img src={sharkImage} alt="Shark" style={{ maxWidth: '50%', height: 'auto' }} />
            </div>
            <div style={{ flex: '0 0 25%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {showLoginForm ? <LoginForm onToggleForm={toggleForm} /> : <RegistrationForm onToggleForm={toggleForm} />}
            </div>
        </div>
    );
};

export default LoginPage;
