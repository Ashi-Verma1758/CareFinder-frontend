import { useState } from 'react'
import './Login.css';
import axios from 'axios';

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res =await axios.post("http://localhost:8000/api/user/login", {
        Username: formData.username,
        password: formData.password
      }, {
  withCredentials: true
});
console.log("✅ Login success full response:", res.data);
const token = res.data.data.accessToken;
    const user = res.data.data.user;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    // ✅ force UI to refresh (navbar will detect login)
    window.location.href = "/"; // or "/profile" if you want to land there
      // Optionally save accessToken to state/localStorage
    } catch (err) {
  const errorMsg = err?.response?.data?.message || err.message || "Unknown error";
  console.error("Login failed:", errorMsg);
  alert(`Login failed: ${errorMsg}`);
}
  
  };
  return (
    <div className="login-wrapper">
    <div className="login-container">
      <h2>Login to CareFinder</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <input type="username" name="Username" placeholder="Username" value={formData.emailOrUsername}
          onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password}
          onChange={handleChange} required />
        <button type="submit">Login</button>
        <p>Don't have an account? <a href="/signup">Sign up</a></p>
      </form>
    </div>
    </div>
  );
}

export default Login;