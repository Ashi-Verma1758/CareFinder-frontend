// src/HospitalStaff/AddHospitalForm.jsx
import { useState } from 'react';
import axios from 'axios';
// import './AddHospitalForm.css';
import './HospitalStaffForm.css';


function AddHospitalForm({ onAddSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
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
      await axios.post('http://localhost:8000/api/hospitals', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Hospital added successfully!');
      onAddSuccess?.();
    } catch (err) {
      console.error('Failed to add hospital:', err);
      alert('Error adding hospital');
    }
  };

  return (
    <form className="hospital-form" onSubmit={handleSubmit}>
      <h3>Add Hospital</h3>
      {Object.entries(formData).map(([key, value]) => (
        <input
          key={key}
          name={key}
          placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
          value={value}
          onChange={handleChange}
          required
        />
      ))}
      <button type="submit">Add Hospital</button>
    </form>
  );
}

export default AddHospitalForm;
