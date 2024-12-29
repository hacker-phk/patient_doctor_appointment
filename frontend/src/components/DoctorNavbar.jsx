import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DefaultNavbar from './DefaultNavbar';

function DoctorNavbar() {
  const doctor = localStorage.getItem('doctor');
  const navigate = useNavigate();

  // Handle logout and remove doctor data from localStorage
  const handleLogout = () => {
    localStorage.removeItem('doctor');
    navigate('/');
  };

  // Parse doctor data if it exists
  const doctorData = doctor ? JSON.parse(doctor) : null;

  if (!doctorData) {
    return <DefaultNavbar/>; // or redirect to login if no doctor data exists
  }

  return (
    <nav className="bg-gray-800 text-white flex justify-between py-5 px-4">
      <div className="text-xl font-bold">
        <Link to="/">Your Hospital Name</Link>
      </div>
      <div className="flex gap-4 items-center">
        <span>Welcome, Dr. {doctorData.name}</span>
        
        {/* My Appointments Button */}
        <Link to="/doctor/appointments">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            My Appointments
          </button>
        </Link>

        {/* Accepted Appointments Button */}
        <Link to="/doctor/accepted-appointments">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Accepted Appointments
          </button>
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default DoctorNavbar;
