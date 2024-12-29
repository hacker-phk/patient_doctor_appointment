import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DoctorRegister from './pages/DoctorRegister';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PatientLogin from './pages/PatientLogin';
import PatientRegister from './pages/PatientRegister';
import DoctorLogin from './pages/DoctorLogin';
import DoctorsDashboard from './pages/DoctorsDashBoard';
import BookAppointmentPage from './pages/BookAppointmentPage';
import MyAppointments from './pages/MyAppointments';
import DoctorDesionPage from './pages/DoctorDesionPage';

function App() {
    return (
        <Router>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/doctor/register" element={<DoctorRegister />} />
                <Route path="/patient/login" element={<PatientLogin />} />
                <Route path="/patient/register" element={<PatientRegister />} />
                <Route path="/doctor/login" element={<DoctorLogin />} />
                <Route path="/dashboard" element={<DoctorsDashboard />} />
                <Route path="/book-appointment/:doctorId" element={<BookAppointmentPage />} />
                <Route path="/appointments" element={<MyAppointments />} />
                <Route path="/doctor/appointments" element={<DoctorDesionPage />} />

            </Routes>
        </Router>
    );
}

export default App;
