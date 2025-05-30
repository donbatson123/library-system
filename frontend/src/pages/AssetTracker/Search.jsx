import React, { useState } from 'react';
import axios from 'axios';
import './AssetTracker.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async () => {
    if (!query.trim()) {
      setMessage("Enter a student name or barcode.");
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8000/search?q=${encodeURIComponent(query)}`);
      setResults(response.data);
      setMessage('');
    } catch (err) {
      console.error("Search failed:", err);
      setMessage("No results found or an error occurred.");
    }
  };

  return (
    <div className="asset-tracker-container">
      <h2>Search</h2>
      <div className="form-section">
        <input
          type="text"
          placeholder="Enter student name or barcode"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {message && <p className="status-message">{message}</p>}

      {results.length > 0 && (
        <div className="results-table">
          <table>
            <thead>
              <tr>
                <th>Student Name</th>
                <th>Perm ID</th>
                <th>Device Barcode</th>
                <th>Model</th>
                <th>Checked Out</th>
                <th>Due Date</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.student_name || '—'}</td>
                  <td>{item.perm_id || '—'}</td>
                  <td>{item.barcode || '—'}</td>
                  <td>{item.model || '—'}</td>
                  <td>{item.checkout_date || '—'}</td>
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

export default Search;
