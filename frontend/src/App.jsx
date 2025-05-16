import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-center flex flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold text-blue-800">📚 Library Circulation System</h1>
      <p className="text-gray-700">Welcome! Choose a station type to get started.</p>
      <div className="flex gap-4">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Check In</button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Check Out</button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Search</button>
      </div>
    </div>
  );
}

export default App;

