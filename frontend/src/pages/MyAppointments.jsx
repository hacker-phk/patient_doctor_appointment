import React, { useEffect, useState } from "react";
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      const patient = localStorage.getItem("patient");
      const patientId = patient ? JSON.parse(patient)._id : null; // Retrieve patientId from localStorage
      if (!patientId) {
        setError("Patient ID not found in localStorage.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/patient/${patientId}`);
        setAppointments(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching appointments.");
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="text-center text-lg text-gray-500">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-semibold mb-4 text-center">My Appointments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {appointments.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No appointments found.</div>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition duration-300 ease-in-out"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Dr. {appointment.doctorId.name}
              </h3>
              <p className="text-sm text-gray-600 mb-1">
                Appointment Date: {new Date(appointment.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                Time: {new Date(appointment.date).toLocaleTimeString()}
              </p>
              <p
                className={`text-sm font-semibold ${appointment.status === "pending" ? "text-teal-500" : "text-green-500"} bol`}
              >
                Status: {appointment.status}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
