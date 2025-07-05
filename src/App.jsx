import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';

import AdminDashboard from './Admin/AdminDashboard';

import Nav from './Nav';
import FindNearby from './FindNearby';
import HealthTips from './HealthTips';
import HospitalDetailsWrapper from './HospitalDetailsWrapper'; // optional wrapper
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import HospitalList from './Patient/HospitalList';
import HospitalDetail from './Patient/HospitalDetail';
import HospitalStaffDashboard from './HospitalStaffDashboard';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/test`)
      .then(res => {
        console.log("✅ Connected to backend");
      })
      .catch(err => {
        console.error("❌ Failed to connect to backend:", err.message);
      });
  }, []);

  return (
    <BrowserRouter>
      <Nav onSearch={setSearchTerm} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<FindNearby />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tips" element={<HealthTips />} />

          {/* ✅ Display list of approved hospitals */}
          <Route path="/hospitals" element={<HospitalList />} />

          {/* ✅ Show single hospital details */}
          <Route path="/hospitals/:id" element={<HospitalDetail />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/staff-dashboard" element={<HospitalStaffDashboard />} />


        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
