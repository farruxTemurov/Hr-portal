import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/header'; // Import Header component
import SignUp from './Components/Auth/SignUp'; // Import SignUp component
import Login from './Components/Auth/Login'; // Import Login component
import NotFound from './Components/Auth/404';
import './App.css'; // Import the CSS file with background styles
import EmployeeDashboard from './Components/EmployeeDashboard/EmployeeDashboard';
import HrDashboard from './Components/HrDashboard/HrDashboard';
import ProtectedRoute from './Components/Auth/ProtectedRoute'; // Import ProtectedRoute

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
                <ProtectedRoute
                  element={<EmployeeDashboard />}
                  roleRequired="employee"
                />
              }
            />
            <Route
              path="/hrDashboard"
              element={
                <ProtectedRoute
                  element={<HrDashboard />}
                  roleRequired="hr"
                />
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
