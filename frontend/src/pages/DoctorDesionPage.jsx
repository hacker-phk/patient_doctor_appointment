import React from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

import useFetchAppointments from '../utils/useFetchAppointments';

function DoctorDesionPage() {
  const doctor = JSON.parse(localStorage.getItem('doctor'));
  const { loading, error, appointments:data } = useFetchAppointments(
    'http://localhost:5000/api/appointments/pending/' + doctor._id
  );

  const handleDecision = async (appointmentId, decision) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/appointments/${appointmentId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: decision }),
        }
      );
      if (!response.ok) {
        throw new Error('Failed to update the appointment status');
      }
      window.location.reload(); // Refresh the page to reflect updated data
    } catch (err) {
      console.error(err.message);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Doctor Decision Page</h1>
      {data.map((appointment) => (
        <div
          key={appointment._id}
          className="border border-gray-300 rounded-lg p-6 mb-6 shadow-lg bg-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-800">
                Patient Name: <span className="font-normal">{appointment.patient.name}</span>
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Appointment Date:{' '}
                <span className="font-normal">
                  {new Date(appointment.date).toLocaleDateString()}
                </span>
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Appointment Time: <span className="font-normal">{appointment.time}</span>
              </p>
              <p className="text-lg font-semibold text-gray-800">
                Description: <span className="font-normal">{appointment.description}</span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => handleDecision(appointment._id, 'accepted')}
                className="flex items-center justify-center w-12 h-12  text-green-500 rounded-full "
              >
                <CheckCircleIcon className="w-6 h-6" />
              </button>
              <button
                onClick={() => handleDecision(appointment._id, 'rejected')}
                className="flex items-center justify-center w-12 h-12  text-red-500 rounded-full "
              >
                <XCircleIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DoctorDesionPage;
