import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();

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
      const res = await axios.post('http://localhost:8000/api', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const newHospital = res.data?.data;

      if (newHospital && newHospital._id) {
        localStorage.setItem("newHospitalId", newHospital._id); // 🟢 used for highlighting later
      }

      alert('✅ Hospital added successfully!');
      onAddSuccess?.(); // Call callback if provided

      // 🔁 Redirect to homepage
      navigate('/');
    } catch (err) {
      console.error('❌ Failed to add hospital:', err);
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
