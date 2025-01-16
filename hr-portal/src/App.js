import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/header'; // Import Header component
import SignUp from './Components/Auth/SignUp'; // Import SignUp component
import Login from './Components/Auth/Login'; // Import Login component

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
