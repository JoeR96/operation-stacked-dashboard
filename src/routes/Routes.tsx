import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from '../components/Dashboard/Dashboard';
import WorkoutCalendar from '../components/WorkoutCalendar/WorkoutCalendar';
import PrivateRoute from './PrivateRoute';
import ExercisePage from "../pages/Login/ExercisePage.tsx";
import EquipmentStackPage from "../pages/EquipmentStack/EquipmentStackPage.tsx";
import WorkoutPage from "../pages/WorkoutPage/WorkoutPage";
import ExerciseHistoryPage from "../pages/ExerciseHistory/ExerciseHistoryPage.tsx";
import LoginPage from "../pages/Login/LoginPage";
import CreateWorkoutContainer from '../pages/WorkoutPage/CreateWorkoutContainer.tsx';
import MainContent from './RouteWrapper.tsx';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent><LoginPage /></MainContent>} />
      <Route path="/dashboard" element={<PrivateRoute />} >
        <Route index element={<MainContent><Dashboard /></MainContent>} />
      </Route>
      <Route path="/workoutcalendar" element={<PrivateRoute />} >
        <Route index element={<MainContent><WorkoutCalendar /></MainContent>} />
      </Route>
      <Route path="/exercises" element={<PrivateRoute />} >
        <Route index element={<MainContent><ExercisePage /></MainContent>} />
      </Route>
      <Route path="/equipment-stacks" element={<PrivateRoute />} >
        <Route index element={<MainContent><EquipmentStackPage /></MainContent>} />
      </Route>
      <Route path="/workout" element={<PrivateRoute />} >
        <Route index element={<MainContent><WorkoutPage /></MainContent>} />
      </Route>
      <Route path="/history" element={<PrivateRoute />} >
        <Route index element={<MainContent><ExerciseHistoryPage /></MainContent>} />
      </Route>
      <Route path="/create-workout" element={<PrivateRoute />} >
        <Route index element={<MainContent><CreateWorkoutContainer /></MainContent>} />
      </Route>
    </Routes>   
  );
};

export default AppRoutes;
