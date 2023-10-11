import React from 'react';
import { Link } from 'react-router-dom';
import TabbedDisplay from '../TabbedDisplay/TabbedDisplay';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h1>Dashboard</h1>
            <Link to="/workoutcalendar">
                <button>Go to Tones</button>
            </Link>
            <TabbedDisplay/>
        </div>
    );
};

export default Dashboard;
