// src/HospitalStaff/UpdateBedForm.jsx
import { useState } from 'react';
import axios from 'axios';
// import './UpdateBedForm.css';
import './HospitalStaffForm.css';


function UpdateBedForm({ bed, onUpdateSuccess }) {
  const [formData, setFormData] = useState({
    totalBeds: bed.totalBeds,
    availableBeds: bed.availableBeds,
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:8000/api/beds/${bed._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert('Bed updated successfully!');
      onUpdateSuccess?.();
    } catch (err) {
      console.error('Failed to update bed:', err);
      alert('Update failed');
    }
  };

  return (
    <form className="update-bed-form" onSubmit={handleSubmit}>
      <input
        type="number"
        name="totalBeds"
        value={formData.totalBeds}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="availableBeds"
        value={formData.availableBeds}
        onChange={handleChange}
        required
      />
      <button type="submit">Update</button>
    </form>
  );
}

export default UpdateBedForm;
