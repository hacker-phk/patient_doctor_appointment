import Appointment from "../models/appointment.js"; // Adjust path as per your project structure

export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, patient, description, date, time } = req.body;

    // Create a new appointment
    const appointment = new Appointment({
      doctorId,
      patient,
      description,
      date: new Date(date), // Ensure date is stored as a valid Date object
      time, // Assuming time is stored as a string
    });

    // Save to the database
    const savedAppointment = await appointment.save();

    return res.status(201).json({
      message: "Appointment booked successfully",
      appointment: savedAppointment,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to book the appointment. Please try again later.",
    });
  }
};

export const getAllAppointmentsOfDPatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const appointments = await Appointment.find({
      patient: patientId,
    }).populate("doctorId"); // Populate the doctorId field
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAppointmentsOfDDoctor = async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    console.log(doctorId);
    const appointments = await Appointment.find({ doctorId }).populate(
      "patient"
    ); // Populate the patient field
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllAppointMentsPending = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const appointments = await Appointment.find({
      doctorId,
      status: "pending",
    }).populate("patient");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateAppointment = async (req, res) => {
  const { appointmentId } = req.params;
  const { status } = req.body;
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAppointmentsAcceptedAndUpcoming = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const currentDate = new Date();

    // Find accepted appointments where the appointment date is greater than or equal to today
    const appointments = await Appointment.find({
      doctorId,
      status: "accepted",
      date: { $gte: currentDate },
    }).populate("patient");

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getExpiredAppointments = async (req, res) => {
  const { doctorId } = req.params;
  try {
    const currentDate = new Date();
    const appointments = await Appointment.find({
      doctorId,
      status: "accepted",
      date: { $lt: currentDate },
    }).populate("patient");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteAppointment = async(id)=>{
    try {
        // Find the appointment by ID and delete it
        const deletedAppointment = await Appointment.findByIdAndDelete(id);
        if (!deletedAppointment) {
          return res.status(404).json({ message: 'Appointment not found' });
        }
        return res.status(200).json({ message: 'Appointment deleted successfully' });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }

}