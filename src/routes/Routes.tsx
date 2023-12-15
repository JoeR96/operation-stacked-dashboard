import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import LoginForm from '../components/LoginForm/LoginForm';
import WorkoutCalendar from '../components/WorkoutCalendar/WorkoutCalendar';
import PrivateRoute from './PrivateRoute';
import ExercisePage from "../pages/Login/ExercisePage.tsx";
import EquipmentStackPage from "../pages/EquipmentStack/EquipmentStackPage.tsx";
import WorkoutPage from "../pages/WorkoutPage/WorkoutPage";
import ExerciseHistoryPage from "../pages/ExerciseHistory/ExerciseHistoryPage.tsx";
import LoginPage from "../pages/Login/LoginPage"; // Import PrivateRoute

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<PrivateRoute />} >
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/workoutcalendar" element={<PrivateRoute />} >
        <Route index element={<WorkoutCalendar />} />
      </Route>
        <Route path="/exercises" element={<PrivateRoute />} >
            <Route index element={<ExercisePage />} />
        </Route>
        <Route path="/equipment-stacks" element={<PrivateRoute />} >
            <Route index element={<EquipmentStackPage />} />
        </Route>
        <Route path="/workout" element={<PrivateRoute />} >
            <Route index element={<WorkoutPage />} />
        </Route>
        <Route path="/history" element={<PrivateRoute />} >
            <Route index element={<ExerciseHistoryPage />} />
        </Route>
    </Routes>   
  );
};

export default AppRoutes;
