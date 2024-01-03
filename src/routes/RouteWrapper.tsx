import React from 'react';

function MainContent({ children }) {
    return (
        <div style={{ paddingTop: '64px' }}> {/* Adjust this value based on the actual height of your AppBar */}
            {children}
        </div>
    );
}

export default MainContent;
