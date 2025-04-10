import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import HomeRedirect from './pages/home-redirect';
import Settings from './pages/settings';
import AssignRoles from './pages/assignRoles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeRedirect />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/assign-roles" element={<AssignRoles />} />
      </Routes>
    </Router>
  );
}

export default App;
