import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/workoutcalendar">
                <button>Go to Tones</button>
            </Link>
        </div>
    );
};

export default Dashboard;
