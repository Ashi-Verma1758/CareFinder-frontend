// src/HospitalStaff/AddBedForm.jsx
import { useState } from 'react';
import axios from 'axios';
import './HospitalStaffForm.css';

function AddBedForm({ hospitalId, onAddSuccess }) {
  const [bedData, setBedData] = useState({
    type: '',
    totalBeds: '',
    availableBeds: '',
  });

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

      // Convert totalBeds and availableBeds to numbers
      const payload = {
        hospitalId,
        type: bedData.type,
        totalBeds: Number(bedData.totalBeds),
        availableBeds: Number(bedData.availableBeds)
      };

      await axios.post(`http://localhost:8000/api/beds/${hospitalId}`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('✅ Bed added successfully!');
      navigate('/');
      setBedData({ type: '', totalBeds: '', availableBeds: '' }); // reset form
      onAddSuccess?.();

    } catch (err) {
      console.error('🚨 Error adding bed:', err);
      console.error('📦 Backend response:', err.response?.data);
      alert(`❌ Failed to add bed: ${err.response?.data?.message || 'Server error'}`);
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
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
