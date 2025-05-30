import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CheckIn from './pages/CheckIn';
import Checkout from './pages/Checkout';
import AssetTrackerHome from './pages/AssetTracker/AssetTrackerHome';
import DeviceCheckIn from './pages/AssetTracker/DeviceCheckIn';
import DeviceCheckOut from './pages/AssetTracker/DeviceCheckOut';
import DeviceStatus from './pages/AssetTracker/DeviceStatus';
import DeviceSearch from './pages/AssetTracker/DeviceSearch';
import DeviceHistory from './pages/AssetTracker/DeviceHistory';
import AdminTools from './pages/AssetTracker/AdminTools';
import StudentSummary from './pages/AssetTracker/StudentSummary';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-gray-100 text-center flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold text-blue-800">📚 Library Circulation System</h1>
            <p className="text-gray-700">Welcome! Choose a station type to get started.</p>
            <div className="flex gap-4">
              <Link to="/checkin" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Check In</Link>
              <Link to="/checkout" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Check Out</Link>
              <Link to="/search" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Search</Link>
            </div>
          </div>
        } />
        <Route path="/checkin" element={<CheckIn />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/asset" element={<AssetTrackerHome />} />
        <Route path="/asset/checkin" element={<DeviceCheckIn />} />
        <Route path="/asset/checkout" element={<DeviceCheckOut />} />
        <Route path="/asset/status" element={<DeviceStatus />} />
        <Route path="/asset/search" element={<DeviceSearch />} />
        <Route path="/asset/history" element={<DeviceHistory />} />
        <Route path="/asset/admin" element={<AdminTools />} />
        <Route path="/asset/summary" element={<StudentSummary />} />
        {/* We'll create /search soon */}
      </Routes>
    </Router>
  );
}

export default App;


