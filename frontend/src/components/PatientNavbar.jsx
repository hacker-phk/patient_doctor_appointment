import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DefaultNavbar from './DefaultNavbar';


function PatientNavbar() {
 
  const patient = localStorage.getItem('patient');
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('patient');
    navigate('/');
  };

    if(!patient){
      return <DefaultNavbar/>
    }
    const patientData = JSON.parse(patient);  // Parse the stored patient data
    return (
      <nav className="bg-gray-800 text-white flex justify-between py-5 px-4">
        <div className="text-xl font-bold">
          <Link to="/">Your Hospital Name</Link>
        </div>
        <div className="flex gap-4 items-center">
          <span>Welcome, {patientData.name}</span>
          <Link to="/appointments">
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              My Appointments
            </button>
          </Link>
          <Link to="/dashboard" > Book</Link>
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

export default PatientNavbar;
