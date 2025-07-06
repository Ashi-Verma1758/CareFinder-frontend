import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Nav.css';
import Profile from './Profile';

function Nav({ onSearch }) {
  const [searchText, setSearchText] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [results, setResults] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      setIsLoggedIn(true);
      setUsername(user?.username || '');
    } else {
      setIsLoggedIn(false);
      setUsername('');
    }
  }, [location.pathname]);

  // Close profile dropdown on outside click or Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleSearch = async () => {
    if (!searchText.trim()) return;

    if (onSearch) {
      onSearch(searchText);
    }

    try {
      const res = await fetch(`http://localhost:8000/api/search?query=${searchText}`);
      const data = await res.json();
      setResults(data?.data || []);
      console.log("Search text:", searchText);
      console.log("Search results:", data.data);
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
    setShowProfile(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <img
            src="/logo.png"
            alt="Logo"
            className="logo"
            onError={(e) => e.target.style.display = 'none'}
          />
          <span className="logo-text">CareFinder</span>
        </Link>
      </div>

      <div className="navbar-right">
        {/* 🔍 Search Bar */}
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
        </div>

        {/* 📄 Search Results Dropdown */}
        {results.length > 0 && (
          <div className="search-dropdown">
            {results.map((item, index) => (
              <div
                key={index}
                className="search-result"
                onClick={() => handleResultClick(item?.hospital?._id)}
              >
                <strong>{item?.hospital?.name || 'Unnamed Hospital'}</strong> — {item?.hospital?.city || ''}
              </div>
            ))}
          </div>
        )}

        {/* 👥 Auth Controls */}
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
            {/* 🔧 Staff/Admin Tools */}
            {(user?.role === 'staff' || user?.role === 'admin') && (
              <>
                <Link to="/add-hospital">
                  <button className="search-button">Add Hospital</button>
                </Link>
                <Link to="/add-bed">
                  <button className="search-button">Add Bed</button>
                </Link>
                <Link to="/update-bed">
                  <button className="search-button">Update Bed</button>
                </Link>
              </>
            )}

            {/* 👤 Profile Dropdown */}
            <div className="profile-wrapper" ref={profileRef}>
              <div className="profile-container" onClick={() => setShowProfile(prev => !prev)}>
                <img src="/profile.png" className="profile-icon" alt="profile" />
              </div>

              {showProfile && (
                <Profile
                  user={user}
                  onClose={() => setShowProfile(false)}
                  onLogout={handleLogout}
                />
              )}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
