import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { ThemeProvider } from './context/ThemeContext';
import { Provider } from 'react-redux';
import store from './store';
import './index.css';

import Schedules from './pages/Schedules';
import Profile from './pages/Profile';
import Goals from './pages/Goals';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="schedules" element={<Schedules />} />
              <Route path="goals" element={<Goals />} />
              <Route path="profile" element={<Profile />} />
              {/* Add other routes here */}
            </Route>

            <Route path="/" element={<Navigate to="/login" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
