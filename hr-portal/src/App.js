import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/header';
import SignUp from './Components/Auth/SignUp';
import Login from './Components/Auth/Login';
import NotFound from './Components/Auth/404';
import './App.css';
import EmployeeDashboard from './Components/EmployeeDashboard/EmployeeDashboard';
import HrDashboard from './Components/HrDashboard/HrDashboard';
import ProtectedRoute from './Components/Auth/ProtectedRoute';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="background-container">
          <Header />
          <Routes>
            {/* Public Routes */}
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notFound" element={<NotFound />} />

            {/* Protected Routes */}
            <Route
              path="/employeeDashboard"
              element={
                <ProtectedRoute roleRequired="employee">
                  <EmployeeDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/hrDashboard"
              element={
                <ProtectedRoute roleRequired="hr">
                  <HrDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
