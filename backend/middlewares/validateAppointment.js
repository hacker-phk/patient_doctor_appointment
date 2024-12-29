import mongoose from 'mongoose';

export const validateAppointment = (req, res, next) => {
    const { doctorId, patient, description, date, time, status } = req.body;

    // Check if all required fields are provided
    if (!doctorId || !patient || !description || !date || !time ) {
        return res.status(400).json({ error: "All fields are required" });
    }

    // Validate ObjectId for doctorId and patient
    if (!mongoose.Types.ObjectId.isValid(doctorId) || !mongoose.Types.ObjectId.isValid(patient)) {
        return res.status(400).json({ error: "Invalid doctorId or patientId" });
    }

    // Validate status
    

    // Validate date
    if (isNaN(Date.parse(date))) {
        return res.status(400).json({ error: "Invalid date format" });
    }

    // Validate time (format HH:mm)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    if (!timeRegex.test(time)) {
        return res.status(400).json({ error: "Invalid time format. Use HH:mm" });
    }

    next(); // Pass control to the next middleware or controller
};
