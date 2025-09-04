import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import Donations from './components/Donations';
import MainPage from './components/MainPage';
import Login from './components/Login';
import AdminDashboard from './AdminDashboard'
import WasteReport from './components/WasteReport';
import Park from './components/Parks';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donations" element={<Donations />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/wastereport" element={<WasteReport />} />
        <Route path="/login" element={<Login />} />
        <Route path="/park" element={<Park />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
