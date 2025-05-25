import { useState } from 'react';

function Checkout() {
  const [studentId, setStudentId] = useState('');
  const [barcode, setBarcode] = useState('');
  const [checkedOut, setCheckedOut] = useState([]);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);


  const handleStudentIdSubmit = () => {
    if (!studentId.trim()) return;
    setStep(2);
  };

  const handleScan = async () => {
    if (!barcode.trim()) return;
    try {
      const payload = { student_id: studentId, barcode };
      console.log('📤 Sending JSON:', JSON.stringify(payload));
      const res = await fetch("http://10.0.0.35:8000/checkout/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });


      const data = await res.json();
      console.log('✅ Response from backend:', data);

      if (res.ok && data.success) {
        setCheckedOut([...checkedOut, data.book]);
        setError('');
      } else {
        // Make sure we stringify the error if it's an object
        const errorMsg = typeof data.message === 'string'
          ? data.message
          : JSON.stringify(data);
        setError(errorMsg);
      }
    } catch (err) {
      console.error('🚨 Fetch error:', err);
      setError('Server error. Try again.');
    }


    setBarcode('');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 p-4">
      <h1 className="text-2xl font-bold text-blue-900 mb-4">📘 Book Checkout Station</h1>

      {step === 1 && (
        <>
          <input
            type="text"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleStudentIdSubmit()}
            placeholder="Enter student ID"
            className="px-4 py-2 border rounded w-80 text-lg"
            autoFocus
          />
          <button
            onClick={handleStudentIdSubmit}
            className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded"
          >
            Continue
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-2 text-blue-700 font-semibold">Student ID: {studentId}</div>
          <input
            type="text"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleScan()}
            placeholder="Scan book barcode"
            className="px-4 py-2 border rounded w-80 text-lg"
            autoFocus
          />
          <button
            onClick={handleScan}
            className="mt-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded"
          >
            Check Out
          </button>
          {error && <div className="mt-2 text-red-600 font-bold">{error}</div>}

          <div className="mt-6 w-96 text-left">
            <h2 className="text-lg font-bold mb-2">✅ Checked Out This Session:</h2>
            <ul className="list-disc list-inside">
              {checkedOut.map((book, i) => (
                <li key={i}>{book.title} ({book.barcode})</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Checkout;
