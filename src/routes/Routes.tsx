import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import LoginForm from '../components/LoginForm/LoginForm';
import WorkoutCalendar from '../components/WorkoutCalendar/WorkoutCalendar';
import PrivateRoute from './PrivateRoute';
import ExercisePage from "../pages/Login/ExercisePage.tsx"; // Import PrivateRoute

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/dashboard" element={<PrivateRoute />} >
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/workoutcalendar" element={<PrivateRoute />} >
        <Route index element={<WorkoutCalendar />} />
      </Route>
        <Route path="/exercises" element={<PrivateRoute />} >
            <Route index element={<ExercisePage />} />
        </Route>
    </Routes>
  );
};

export default AppRoutes;
