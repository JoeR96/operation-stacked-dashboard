import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

// Define a type for the component props
type CenteredWelcomeCardProps = {
    username: string;
};

function CenteredWelcomeCard({ username }: CenteredWelcomeCardProps) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card variant="outlined" sx={{ width: '23%', height: '200px', display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white', letterSpacing: '1px' }}>
                        Hello, {username}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}

export default CenteredWelcomeCard;
