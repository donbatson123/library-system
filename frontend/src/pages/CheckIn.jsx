import { useState } from 'react';

function CheckIn() {
  const [barcode, setBarcode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [student, setStudent] = useState(null);
  const [stillOut, setStillOut] = useState([]);

  const handleCheckIn = async () => {
    if (!barcode.trim()) return;
    try {
      const res = await fetch(`http://10.0.0.35:8000/checkin/${barcode}`, {
        method: 'POST',
      });

      const data = await res.json();
      console.log('✅ Check-in response:', data);

      if (res.ok && data.success) {
        setMessage(data.message);
        setStudent(data.student);
        setStillOut(data.still_out);
        setError('');

        // Auto-reset UI
        setTimeout(() => {
          setMessage('');
          setError('');
          setStudent(null);
          setStillOut([]);
        }, 10000);
      } else {
        setError(data.message || 'Check-in failed.');
        setMessage('');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Server error. Try again.');
      setMessage('');
    }
    setBarcode('');
  };

  const handleStudentLookup = async (e) => {
    if (e.key === 'Enter') {
      const id = e.target.value.trim();
      if (!id) return;

      try {
        const res = await fetch(`http://10.0.0.35:8000/status/${id}`);
        const data = await res.json();

        if (res.ok) {
          setStudent(data.student);
          setStillOut(data.books);
          setMessage(`Books checked out to ${data.student.name}`);
          setError('');

          setTimeout(() => {
            setMessage('');
            setStudent(null);
            setStillOut([]);
          }, 10000);
        } else {
          setError(data.detail || 'Could not find student.');
          setTimeout(() => setError(''), 5000);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Server error. Try again.');
      }

      e.target.value = '';
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-green-100 p-4">
      <h1 className="text-2xl font-bold text-green-900 mb-4">📗 Book Check-In Station</h1>

      {/* 🔍 Student ID Search */}
      <input
        type="text"
        placeholder="Type or scan student ID to see your books"
        onKeyDown={handleStudentLookup}
        className="mb-4 px-4 py-2 border rounded w-80 text-lg"
      />

      {/* 📚 Book Barcode Input */}
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

      {/* ✅ Success Message */}
      {message && (
        <div className="mt-4 text-green-700 font-semibold text-lg">{message}</div>
      )}

      {/* ❗ Error Message */}
      {error && (
        <div className="mt-4 text-red-600 font-bold">{error}</div>
      )}

      {/* 👤 Student Info + Book List */}
      {student && (
        <div className="mt-6 text-blue-900 w-96 text-left">
          <div className="font-semibold">👤 {student.name}</div>

          {stillOut.length > 0 ? (
            <>
              <div className="mt-2 font-semibold">Books still checked out:</div>
              <ul className="list-disc list-inside">
                {stillOut.map((b, i) => (
                  <li key={i}>
                    {b.title} ({b.barcode}){' '}
                    {b.overdue && (
                      <span className="text-red-600 font-bold">OVERDUE</span>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <div className="mt-2 italic text-sm text-gray-600">
              All books returned 🎉
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CheckIn;
