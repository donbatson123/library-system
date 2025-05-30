import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AssetTracker.css';

const DeviceStatus = () => {
  const [devices, setDevices] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:8000/admin/devices')  // adjust if needed
      .then(res => setDevices(res.data))
      .catch(err => console.error('Failed to fetch devices:', err));
  }, []);

  const filteredDevices = devices.filter(device => {
    if (filter === 'all') return true;
    if (filter === 'in') return device.checked_in === true;
    if (filter === 'out') return device.checked_in === false;
    return true;
  });

  return (
    <div className="asset-tracker-container">
      <h2>Device Status</h2>
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('in')}>Checked In</button>
        <button onClick={() => setFilter('out')}>Checked Out</button>
      </div>
      <table className="device-table">
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Model</th>
            <th>Campus</th>
            <th>Status</th>
            <th>Checked Out To</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((device, index) => (
            <tr key={index}>
              <td>{device.barcode}</td>
              <td>{device.model_number}</td>
              <td>{device.campus}</td>
              <td>{device.checked_in ? 'In' : 'Out'}</td>
              <td>{device.student_name || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceStatus;
