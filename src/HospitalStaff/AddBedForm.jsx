// src/HospitalStaff/AddBedForm.jsx
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './HospitalStaffForm.css';

function AddBedForm({ hospitalId = null, onAddSuccess }) {
  const [bedData, setBedData] = useState({
    type: '',
    totalBeds: '',
    availableBeds: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setBedData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');

      const payload = {
        type: bedData.type,
        totalBeds: Number(bedData.totalBeds),
        availableBeds: Number(bedData.availableBeds)
      };

      // Only include hospitalId if available and needed
      if (hospitalId) {
        payload.hospitalId = hospitalId;
      }

      // ✅ Route without /:hospitalId — backend already determines it from user
      await axios.post(`http://localhost:8000/api/beds`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('✅ Bed added successfully!');
      setBedData({ type: '', totalBeds: '', availableBeds: '' });
      onAddSuccess?.();
      navigate('/');
      return;

    } catch (err) {
      console.error('🚨 Error adding bed:', err);
      console.error('📦 Backend response:', err.response?.data);
      alert(`❌ Failed to add bed: ${err.response?.data?.message || 'Server error'}`);
    }
  };

  return (
    <form className="bed-form" onSubmit={handleSubmit}>
      <h3>Add Bed</h3>
      <select name="type" onChange={handleChange} value={bedData.type} required>
        <option value="">Select Type</option>
        <option value="ICU">ICU</option>
        <option value="General">General</option>
        <option value="Ventilator">Ventilator</option>
        <option value="Oxygen">Oxygen</option>
      </select>
      <input
        type="number"
        name="totalBeds"
        placeholder="Total Beds"
        value={bedData.totalBeds}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="availableBeds"
        placeholder="Available Beds"
        value={bedData.availableBeds}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Bed</button>
    </form>
  );
}

export default AddBedForm;
