import React, { useState } from 'react';

const DeviceCheckOut = () => {
  const [barcode, setBarcode] = useState('');
  const [permId, setPermId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/device-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ barcode, perm_id: permId }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`✅ ${data.message}`);
      } else {
        setMessage(`❌ ${data.error || 'Error during checkout.'}`);
      }
    } catch (err) {
      setMessage(`❌ Network error: ${err.message}`);
    }
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">📦 Check Out Device</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Device Barcode"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Student Perm ID"
          value={permId}
          onChange={(e) => setPermId(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Check Out
        </button>
      </form>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default DeviceCheckOut;
