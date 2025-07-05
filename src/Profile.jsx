import React from 'react';
import './ProfileCard.css'; // optional for stylin

function Profile({ user, onClose, onLogout }) {
  if (!user) return null;

  return (
    <div className="profile-card">
      <button className="close-btn" onClick={onClose}>×</button>
      <h3>👤 Profile</h3>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Full Name:</strong> {user.fullName}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </div>
  );
}

export default Profile;