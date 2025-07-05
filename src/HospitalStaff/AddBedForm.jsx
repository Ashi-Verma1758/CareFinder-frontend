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
      await axios.post('http://localhost:8000/api/beds', {
        hospitalId,
        ...bedData
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Bed added successfully!');
      onAddSuccess?.();
    } catch (err) {
      console.error('Error adding bed:', err);
      alert('Failed to add bed');
    }
  };

  return (
    <form className="bed-form" onSubmit={handleSubmit}>
      <h3>Add Bed</h3>
      <select name="type" onChange={handleChange} required>
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
