import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import useFetchDoctors from '../utils/useFetchDoctors'; // Custom hook to fetch doctors

const DoctorsDashboard = () => {
    const { data, loading, error } = useFetchDoctors({ url: 'http://localhost:5000/api/doctors' });

    // Handling error state
    if (error) return <p>Error: {error.message}</p>;

    // Skeleton loader when data is loading
    if (loading) {
        return (
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-6">Doctors Dashboard</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="max-w-sm rounded-lg shadow-lg bg-gray-200 p-4 animate-pulse"
                        >
                            <div className="h-6 bg-gray-300 rounded mb-4"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Doctors Dashboard</h2>

            {/* Grid for displaying doctors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {data.map((doctor) => (
                    <Link
                        key={doctor._id}
                        to={`/book-appointment/${doctor._id}`} // Navigate to the doctor-specific appointment page
                        className="block" // Ensure the Link is treated as a block-level element
                    >
                        <div
                            className="max-w-sm rounded-lg shadow-lg bg-white p-4 cursor-pointer hover:shadow-xl transition duration-300"
                            aria-labelledby={`doctor-${doctor._id}`} // Accessible label for screen readers
                        >
                            <h3
                                id={`doctor-${doctor._id}`}
                                className="text-xl font-semibold text-gray-700 mb-2"
                            >
                                {doctor.name}
                            </h3>
                            <p className="text-gray-500 mb-1">Designation: {doctor.designation}</p>
                            <p className="text-gray-500 mb-1">Age: {doctor.age}</p>
                            <p className="text-gray-500 mb-1">Specializations: {doctor.specializations.join(", ")}</p>
                            <p className="text-gray-500 mb-1">Available Slot: {doctor.slot}</p>
                            <p className="text-gray-500">Email: {doctor.email}</p>

                            {/* "Book" button can be added here */}
                            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                                Book Appointment
                            </button>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default DoctorsDashboard;
