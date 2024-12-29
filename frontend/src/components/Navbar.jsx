import React, { useState, useEffect } from 'react';
import DefaultNavbar from './DefaultNavbar';
import PatientNavbar from './PatientNavbar';
import DoctorNavbar from './DoctorNavbar';

function Navbar() {
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const patient = localStorage.getItem('patient');
    const doctor = localStorage.getItem('doctor');
    
    if (doctor) {
      setUserType('doctor');
    } else if (patient) {
      setUserType('patient');
    } else {
      setUserType(null);
    }
  }, []); // This will run once when the component mounts

  
    // Listen to changes in localStorage (optional)
    const handleStorageChange = () => {
      const patient = localStorage.getItem('patient');
      const doctor = localStorage.getItem('doctor');

      if (doctor) {
        setUserType('doctor');
      } else if (patient) {
        setUserType('patient');
      } else {
        setUserType(null);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    
  

  if (userType === 'doctor') {
    return <DoctorNavbar />;
  }

  if (userType === 'patient') {
    return <PatientNavbar />;
  }

  return <DefaultNavbar />;
}

export default Navbar;
