// src/pages/DeviceList.jsx
import React, { useEffect, useState } from 'react';
import './DeviceList.css';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:8000/admin/devices')
      .then(res => res.json())
      .then(data => setDevices(data))
      .catch(err => console.error('Error fetching devices:', err));
  }, []);

  const filteredDevices = devices.filter(d =>
    d.barcode.toLowerCase().includes(search.toLowerCase()) ||
    d.model?.toLowerCase().includes(search.toLowerCase()) ||
    d.perm_id?.toString().includes(search)
  );

  return (
    <div className="device-list">
      <h2>📋 All Devices</h2>
      <input
        type="text"
        placeholder="Search by barcode, model, or student ID"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Model</th>
            <th>Status</th>
            <th>Student</th>
            <th>Campus</th>
          </tr>
        </thead>
        <tbody>
          {filteredDevices.map((d, i) => (
            <tr key={i} className={d.status === 'checked_out' ? 'checked-out' : 'available'}>
              <td>{d.barcode}</td>
              <td>{d.model}</td>
              <td>{d.status}</td>
              <td>{d.student_name || '-'}</td>
              <td>{d.campus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceList;
