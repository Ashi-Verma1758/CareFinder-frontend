// src/HospitalStaff/UpdateBedForm.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import './HospitalStaffForm.css';
import { useNavigate } from 'react-router-dom';

function UpdateBedForm({ bed, onUpdateSuccess }) {
  const [formData, setFormData] = useState({
    totalBeds: '',
    availableBeds: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (bed) {
      setFormData({
        totalBeds: bed.totalBeds,
        availableBeds: bed.availableBeds,
      });
    }
  }, [bed]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bed?._id) {
      alert("❌ Invalid bed ID. Cannot update.");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/beds/${bed._id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert('✅ Bed updated successfully!');
      onUpdateSuccess?.();
      navigate('/');
    } catch (err) {
      console.error('❌ Failed to update bed:', err);
      alert('Update failed');
    }
  };

  if (!bed) return <div>Loading bed data...</div>;

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h3>Update Bed</h3>
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
