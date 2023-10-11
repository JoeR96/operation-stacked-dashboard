import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import LoginForm from '../components/LoginForm/LoginForm';
import WorkoutCalendar from '../components/Workout/WorkoutCalendar';

const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workoutcalendar" element={<WorkoutCalendar/>} />
        </Routes>

    );
};

export default AppRoutes;
