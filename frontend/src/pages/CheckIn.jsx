import { useState } from 'react';

function CheckIn() {
  const [barcode, setBarcode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleCheckIn = async () => {
    if (!barcode.trim()) return;
    try {
      console.log('📤 Submitting barcode to:', `http://10.0.0.35:8000/checkin/${barcode}`);
      const res = await fetch(`http://10.0.0.35:8000/checkin/${barcode}`, {
        method: 'POST',
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage(data.message);
        setError('');
      } else {
        setError(data.message || data.detail || 'Check-in failed.');
        setMessage('');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Server error. Try again.');
      setMessage('');
    }
    setBarcode('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-4">
      <h1 className="text-2xl font-bold text-green-900 mb-4">📗 Book Check-In Station</h1>

      <input
        type="text"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleCheckIn()}
        placeholder="Scan or enter book barcode"
        className="px-4 py-2 border rounded w-80 text-lg"
        autoFocus
      />

      <button
        onClick={handleCheckIn}
        className="mt-4 bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded"
      >
        Check In
      </button>

      {message && <div className="mt-4 text-green-800 font-bold">{message}</div>}
      {error && <div className="mt-4 text-red-600 font-bold">{error}</div>}
    </div>
  );
}

export default CheckIn;
