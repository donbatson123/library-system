import React, { useState } from 'react';
import axios from 'axios';
import './AssetTracker.css';

const AdminTools = () => {
  const [statusMessage, setStatusMessage] = useState('');

  const handleUpload = async (event, type) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const endpoint = `http://localhost:8000/admin/upload/${type}`;
      await axios.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setStatusMessage(`Successfully uploaded ${type}`);
    } catch (err) {
      console.error(`Upload failed for ${type}:`, err);
      setStatusMessage(`Failed to upload ${type}`);
    }
  };

  const handleReset = async () => {
    try {
      await axios.post('http://localhost:8000/admin/reset');
      setStatusMessage('Database reset successfully');
    } catch (err) {
      console.error('Reset failed:', err);
      setStatusMessage('Reset failed');
    }
  };

  return (
    <div className="asset-tracker-container">
      <h2>Admin Tools</h2>

      <div className="upload-section">
        <h4>Upload CSVs</h4>
        <label>
          Students CSV:
          <input type="file" accept=".csv,.txt" onChange={e => handleUpload(e, 'students')} />
        </label>
        <label>
          Devices CSV:
          <input type="file" accept=".csv,.txt" onChange={e => handleUpload(e, 'devices')} />
        </label>
        <label>
          Checkouts CSV:
          <input type="file" accept=".csv,.txt" onChange={e => handleUpload(e, 'checkouts')} />
        </label>
      </div>

      <div className="reset-section">
        <h4>Danger Zone</h4>
        <button className="reset-button" onClick={handleReset}>Reset Database</button>
      </div>

      {statusMessage && <p className="status-message">{statusMessage}</p>}
    </div>
  );
};

export default AdminTools;
