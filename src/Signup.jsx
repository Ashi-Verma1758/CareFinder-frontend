import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // for redirecting
import './Signup.css';

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    role: ''
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
      const res = await axios.post('http://localhost:8000/api/user/register', formData, {
        withCredentials: true // for cookies if using refresh tokens
      });

      const { accessToken, user } = res.data.data;

      // ✅ Store token and user info
      localStorage.setItem('token', accessToken);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Registration successful!');

      // ✅ Redirect to homepage or dashboard
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err.response?.data || err.message);
      alert(err?.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="signup-wrapper">
    <div className="signup-container">
      <h2>Create a CareFinder Account</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <input type="text" name="role" placeholder="Role (admin, Hospital-staff, viewer)" onChange={handleChange} required />

        <button type="submit">Sign Up</button>
        <p>Already have an account? <a href="/login">Log in</a></p>
      </form>
    </div>
    </div>
  );
}

export default Signup;
