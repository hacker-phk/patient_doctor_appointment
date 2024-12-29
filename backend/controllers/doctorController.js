import Doctor from "../models/doctorModel.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register a new doctor
export const registerDoctor = async (req, res) => {
    const { name, email, password, designation, slot, age, specializations } = req.body;

    try {
        // Check if doctor already exists
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            return res.status(400).json({ message: 'Doctor already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new doctor
        const doctor = new Doctor({
            name,
            email,
            password: hashedPassword,
            designation,
            slot,
            age,
            specializations,
        });

        await doctor.save();
        console.log("hello");

        // Create JWT token
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, doctor: { id: doctor._id, name: doctor.name, email: doctor.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Login a doctor
export const loginDoctor = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if doctor exists
        const doctor = await Doctor.findOne({ email });
        if (!doctor) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, doctor.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, doctor});
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

// Logout a doctor (optional)
export const logoutDoctor = (req, res) => {
    // In a stateless JWT authentication system, logout can be handled on the client-side
    // by simply deleting the token. However, if you want to implement a server-side logout,
    // you can maintain a blacklist of tokens or use a session-based approach.
    res.status(200).json({ message: 'Logged out successfully' });
};
