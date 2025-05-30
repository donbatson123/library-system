import React, { useState } from 'react';
import axios from 'axios';
import './AssetTracker.css';

const StudentSummary = () => {
  const [permId, setPermId] = useState('');
  const [summary, setSummary] = useState([]);
  const [error, setError] = useState('');

  const fetchSummary = async () => {
    if (!permId.trim()) {
      setError("Please enter a Perm ID.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/admin/student_summary/${permId}`);
      setSummary(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setSummary([]);
      setError("Could not find student or fetch summary.");
    }
  };

  return (
    <div className="asset-tracker-container">
      <h2>Student Summary</h2>
      <div className="form-section">
        <input
          type="text"
          placeholder="Enter Perm ID or Student Name"
          value={permId}
          onChange={e => setPermId(e.target.value)}
        />
        <button onClick={fetchSummary}>Get Summary</button>
      </div>

      {error && <p className="status-message">{error}</p>}

      {summary.length > 0 && (
        <div className="results-table">
          <table>
            <thead>
              <tr>
                <th>Device</th>
                <th>Barcode</th>
                <th>Model</th>
                <th>Checkout Date</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {summary.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.device_name || '—'}</td>
                  <td>{item.barcode}</td>
                  <td>{item.model}</td>
                  <td>{item.checkout_date}</td>
                  <td>{item.due_date || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StudentSummary;
