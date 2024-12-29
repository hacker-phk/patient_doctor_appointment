import bcrypt from 'bcryptjs'; // For hashing passwords
import jwt from 'jsonwebtoken'; // For JWT token generation
import Patient from '../models/Patient.js'; // Import Patient model

// JWT Secret Key (Use an environment variable in production)
const JWT_SECRET = 'your_jwt_secret_key'; 

// Register a Patient
export const registerPatient = async (req, res) => {
    const { name, email, password, age, gender, address, phoneNumber, bloodGroup, medicalHistory } = req.body;
    console.log(req.body);
    try {
        // Check if the email already exists
        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            return res.status(400).json({ message: 'Email is already registered' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new patient
        const patient = new Patient({
            name,
            email,
            password: hashedPassword,
            age,
            gender,
            address,
            phoneNumber,
            bloodGroup,
            medicalHistory,
        });

        await patient.save();

        res.status(201).json({ message: 'Patient registered successfully', patient });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Login a Patient
export const loginPatient = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if the email exists
        const patient = await Patient.findOne({ email });
        if (!patient) {
            return res.status(404).json({ message: 'Invalid email or password' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: patient._id, email: patient.email }, JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({ message: 'Login successful', token,patient });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Logout a Patient
export const logoutPatient = (req, res) => {
    try {
        // Clear the token (if stored in cookies or headers)
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
