import { useState } from "react";

function DeviceCheckIn() {
  const [barcode, setBarcode] = useState("");
  const [permId, setPermId] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/device/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode, perm_id: permId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Check-in failed");
      }

      setMessage("Check-in successful!");
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <div>
      <h1>Device Check-In</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Enter device barcode"
        />
        <input
          type="text"
          value={permId}
          onChange={(e) => setPermId(e.target.value)}
          placeholder="Enter student perm_id"
        />
        <button type="submit">Check In</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default DeviceCheckIn;
