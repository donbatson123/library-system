// src/pages/StudentLookup.jsx
import React, { useState } from 'react';
import './StudentLookup.css';

const StudentLookup = () => {
  const [query, setQuery] = useState('');
  const [student, setStudent] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!query.trim()) return;

    fetch(`http://localhost:8000/admin/student/${query.trim()}`)
      .then(res => {
        if (!res.ok) throw new Error('Student not found');
        return res.json();
      })
      .then(data => {
        setStudent(data);
        setError('');
      })
      .catch(() => {
        setStudent(null);
        setError('Student not found');
      });
  };

  return (
    <div className="student-lookup">
      <h2>🔎 Student Lookup</h2>
      <input
        type="text"
        placeholder="Enter name or perm ID"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p className="error">{error}</p>}

      {student && (
        <div className="student-info">
          <h3>{student.name} (ID: {student.perm_id})</h3>
          <p><strong>Staff:</strong> {student.staff || '—'}</p>
          <p><strong>Grade:</strong> {student.grade || '—'}</p>

          <h4>📦 Devices Checked Out:</h4>
          {student.devices.length > 0 ? (
            <ul>
              {student.devices.map((device, i) => (
                <li key={i}>
                  {device.model} — {device.barcode}
                </li>
              ))}
            </ul>
          ) : (
            <p>No devices checked out.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StudentLookup;
