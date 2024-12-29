import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import DefaultNavbar from './DefaultNavbar';

function DefaultNavbar() {
    const [selectedRole, setSelectedRole] = useState('');
    const handleLogin = (event) => {
        setSelectedRole(event.target.value);
      };
    
      const handleRegistration = () => {
        if (selectedRole === 'patient') {
          navigate('/patient/register');
        } else {
          navigate('/doctor/register');
        }
      };
    
  return (
   <>
   <nav className="bg-gray-800 text-white flex justify-between py-5 px-4">
      <div className="text-xl font-bold">Your Hospital Name</div>
      <div className="flex gap-4 items-center">
        <span>Login as:</span>
        <select
          name="loginselect"
          value={selectedRole}
          onChange={handleLogin}
          className="bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <option value="">Select Role</option>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
        </select>
        <Link
          to={
            selectedRole === 'doctor'
              ? '/doctor/login'
              : selectedRole === 'patient'
              ? '/patient/login'
              : '#'
          }
        >
          <button
            className={`${
              selectedRole
                ? 'bg-blue-500 hover:bg-blue-700'
                : 'bg-gray-500 cursor-not-allowed'
            } text-white font-bold py-2 px-4 rounded`}
            disabled={!selectedRole}
          >
            Login
          </button>
        </Link>
        <button
          onClick={handleRegistration}
          className="hover:text-blue-500 text-white font-bold"
        >
          Register
        </button>
      </div>
    </nav>
   </>
  )
}

export default DefaultNavbar