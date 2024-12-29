import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useFetchDoctors from '../utils/useFetchDoctors';
import axios from 'axios'; // Custom hook to fetch doctors

const BookAppointmentPage = () => {
    const { doctorId } = useParams(); // Get the doctor ID from URL
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointmentDetails, setAppointmentDetails] = useState({
        date: '',
        time: '',
        remarks: '', // Add remarks field for the text area
    });

    const { data: doctors, loading, error } = useFetchDoctors({
        url: 'http://localhost:5000/api/doctors', // Replace with your actual API endpoint
    });

    // Find the selected doctor based on the doctorId in URL params
    useEffect(() => {
        const doctor = doctors.find((doc) => doc._id === doctorId);
        if (doctor) {
            setSelectedDoctor(doctor);
        }
    }, [doctorId, doctors]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointmentDetails({
            ...appointmentDetails,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const patient = localStorage.getItem('patient');
        const patientData = JSON.parse(patient);
        console.log('Patient Data:', patientData);
        console.log('Appointment Data:', { selectedDoctor, appointmentDetails });
        const sendData={
            doctorId:doctorId,
            patient:patientData._id,
            description:appointmentDetails.remarks,
            date:appointmentDetails.date,
            time:appointmentDetails.time
        }
        try{
            console.log(sendData);
            const response =await axios.post('http://localhost:5000/api/appointments',sendData);
            if(response.status===201){
                alert("Appointment Booked Successfully");
            }
            console.log(response);

        }
        catch(error){
            alert(error)
        }
        // You can send the data to the backend here using Axios or Fetch
        // Redirect or show a success message
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="container mx-auto p-4">
            {selectedDoctor ? (
                <>
                    <h2 className="text-3xl font-bold mb-6">
                        Book Appointment with {selectedDoctor.name}
                    </h2>
                    <div className="lg:flex lg:space-x-6">
                        {/* Doctor's details section (Left) */}
                        <div className="lg:w-1/3 mb-6 lg:mb-0">
                            <h3 className="text-2xl font-semibold mb-4">Doctor's Details</h3>
                            <p><strong>Name:</strong> {selectedDoctor.name}</p>
                            <p><strong>Specialization:</strong> {selectedDoctor.specializations.join(', ')}</p>
                            <p><strong>Designation:</strong> {selectedDoctor.designation}</p>
                            <p><strong>Available Slot:</strong> {selectedDoctor.slot}</p>
                            
                        </div>
                        {/* Appointment form section (Right) */}
                        <div className="lg:w-2/3">
                            <h3 className="text-2xl font-semibold mb-4">Appointment Details</h3>
                            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
                                <div className="mb-4">
                                    <label htmlFor="date" className="block text-gray-700">Select Date:</label>
                                    <input
                                        type="date"
                                        id="date"
                                        name="date"
                                        value={appointmentDetails.date}
                                        onChange={handleChange}
                                        className="mt-2 p-2 border rounded w-full"
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="time" className="block text-gray-700">Select Time:</label>
                                    <input
                                        type="time"
                                        id="time"
                                        name="time"
                                        value={appointmentDetails.time}
                                        onChange={handleChange}
                                        className="mt-2 p-2 border rounded w-full"
                                        required
                                    />
                                </div>

                                {/* Remarks Text Area */}
                                <div className="mb-4">
                                    <label htmlFor="remarks" className="block text-gray-700">Remarks (Optional):</label>
                                    <textarea
                                        id="remarks"
                                        name="remarks"
                                        value={appointmentDetails.remarks}
                                        onChange={handleChange}
                                        className="mt-2 p-2 border rounded w-full"
                                        placeholder="Any symptoms or special requests?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
                                >
                                    Book Appointment
                                </button>
                            </form>
                        </div>
                    </div>
                </>
            ) : (
                <p>Doctor not found.</p>
            )}
        </div>
    );
};

export default BookAppointmentPage;
