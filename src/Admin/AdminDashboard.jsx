import { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

function AdminDashboard() {
  const [pendingHospitals, setPendingHospitals] = useState([]);

  const fetchPending = async () => {
    try {
      // const res = await axios.get('http://localhost:8000/api/hospitals?approved=false');
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/hospitals?approved=false`)
      
      setPendingHospitals(res.data.data);
    } catch (error) {
      console.error('Failed to fetch pending hospitals:', error);
    }
  };

  const approveHospital = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/hospitals/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Hospital approved!');
      fetchPending(); // Refresh list
    } catch (err) {
      console.error('Approval failed:', err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  return (
    <div className="admin-dashboard">
      <h2>Pending Hospital Approvals</h2>
      {pendingHospitals.length === 0 ? (
        <p>No hospitals pending approval.</p>
      ) : (
        <ul className="hospital-list">
          {pendingHospitals.map((hospital) => (
            <li key={hospital._id} className="hospital-card">
              <h4>{hospital.name}</h4>
              <p>{hospital.city}, {hospital.state}</p>
              <p>Email: {hospital.email}</p>
              <p>Phone: {hospital.phone}</p>
              <button onClick={() => approveHospital(hospital._id)}>Approve</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default AdminDashboard;
