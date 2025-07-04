import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Nav.css';

function Nav({ onSearch }) {
  const [searchText, setSearchText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  const location = useLocation(); // 👈 detect route change to recheck login

  // 🔁 Update login state when route changes (like after signup/login)
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
      setUsername(JSON.parse(user)?.username || '');
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, [location.pathname]); // 👈 runs on route change

  const handleSearch = async () => {
    if (!searchText.trim()) return;
    onSearch(searchText);

    try {
      const res = await fetch(`http://localhost:8000/api/search?query=${searchText}`);
      const data = await res.json();
      setResults(data?.data || []);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleResultClick = (hospitalId) => {
  setSearchText('');
  setResults([]);
  navigate(`/hospitals/${hospitalId}`);
};


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="logo" />
          <span className="logo-text">Hospital</span>
        </Link>
      </div>

      <div className="navbar-right">
        <div className="search-wrapper">
        <input
          type="text"
          className="search-input"
          placeholder="Search hospitals or cities..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
           onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
{results.length > 0 && (
            <div className="search-dropdown">
              {results.map((item, index) => (
                <div
                  key={index}
                  className="search-result"
                  onClick={() => handleResultClick(item.hospital._id)}
                >
                  <strong>{item.hospital.name}</strong> — {item.hospital.city}
                </div>
              ))}
            </div>
          )}
        </div>

        {!isLoggedIn ? (
          <>
            <Link to="/login">
              <button className="search-button">Login</button>
            </Link>
            <Link to="/signup">
              <button className="search-button">Signup</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/profile">
              <div className="profile-container" title={username}>
                <img src="/profile.png" alt="Profile" className="profile-icon" />
              </div>
            </Link>
            <button className="search-button" onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
