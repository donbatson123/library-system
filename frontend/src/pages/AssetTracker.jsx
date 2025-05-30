// frontend/src/pages/AssetTracker.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AssetTracker.css'; // Optional for styling later

const AssetTracker = () => {
  const navigate = useNavigate();

  return (
    <div className="asset-tracker">
      <h1>📚 Asset Tracker</h1>
      <p>Welcome to the Chromebook and Textbook Management Portal</p>

      <div className="asset-buttons">
        <button onClick={() => navigate('/assets/view')}>📋 View All Devices</button>
        <button onClick={() => navigate('/assets/status')}>🔍 Check Device Status</button>
        <button onClick={() => navigate('/assets/manage')}>➕ Add or Edit Devices</button>
      </div>
    </div>
  );
};

export default AssetTracker;
