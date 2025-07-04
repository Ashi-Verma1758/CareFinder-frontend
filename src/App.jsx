import { useState,useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FindNearby from './FindNearby';
import './App.css'
import Nav from './Nav';
function App() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/test`)
      .then(res => {
        console.log("Response from backend:");
      })
      .catch(err => {
        console.error("Error connecting to backend:");
      });
  }, []);

  return (
  

    <BrowserRouter>
      <Nav onSearch={setSearchTerm} />

      <div className="main-content">
        <Routes>
          <Route path="/" element={<FindNearby />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


