import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/header'; // Import Header component
import SignUp from './Components/Auth/SignUp'; // Import SignUp component
import Login from './Components/Auth/Login'; // Import Login component
import './App.css'; // Import the CSS file with background styles

function App() {
  return (
    <Router>
      <div className="App">
        {/* Add a container with the background styling */}
        <div className="background-container">
          <Header />
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            {/* Add other routes here */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
