import React, { useState, useEffect } from 'react';
import './AssetTracker.css';

const DeviceHistory = () => {
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Placeholder for future fetch request
    // Example: fetch(`/api/devices/history?search=${searchTerm}`)
  }, [searchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="asset-container">
      <h2>📜 Device History</h2>
      <input
        type="text"
        placeholder="Search by Student or Barcode..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="asset-input"
      />
      <table className="asset-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Device Barcode</th>
            <th>Action</th>
            <th>Date</th>
            <th>Staff</th>
          </tr>
        </thead>
        <tbody>
          {history.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', fontStyle: 'italic' }}>
                No history found.
              </td>
            </tr>
          ) : (
            history.map((entry, idx) => (
              <tr key={idx}>
                <td>{entry.student_name}</td>
                <td>{entry.barcode}</td>
                <td>{entry.action}</td>
                <td>{entry.date}</td>
                <td>{entry.staff}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceHistory;
