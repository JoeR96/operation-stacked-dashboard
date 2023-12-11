import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';

const HeaderWrapper = () => {
    const location = useLocation();

    // Hide header on the login page
    if (location.pathname === '/') {
        return null;
    }

    return <Header />;
};

export default HeaderWrapper;
