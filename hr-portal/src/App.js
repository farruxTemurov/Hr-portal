import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/header'; // Import Header component
import SignUp from './Components/Auth/SignUp'; // Import SignUp component
import Login from './Components/Auth/Login'; // Import Login component
import './App.css'; // Import the CSS file with background styles
import EmployeeDashboard from './Components/EmployeeDashboard/EmployeeDashboard';
import HrDashboard from './Components/HrDashboard/HrDashboard';
import ProtectedRoute from './Components/Auth/ProtectedRoute'; // Import ProtectedRoute
import AccessDenied from './Components/Auth/404'; // Import AccessDenied page (optional)

function App() {
  return (
    <Router>
      <div className="App">
        <div className="background-container">
          <Header />

          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Routes */}
            <ProtectedRoute
              path="/employeeDashboard"
              element={<EmployeeDashboard />}
              roleRequired="employee"
            />
            <ProtectedRoute
              path="/hrDashboard"
              element={<HrDashboard />}
              roleRequired="hr"
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
