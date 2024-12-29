import express from 'express';
import { registerPatient, loginPatient, logoutPatient } from '../controllers/patientController.js';
import { validatePatient } from '../middlewares/validatePatient.js';

const router = express.Router();

// Register a Patient
router.post('/register', validatePatient, registerPatient);

// Login a Patient
router.post('/login', loginPatient);

// Logout a Patient
router.post('/logout', logoutPatient);
router.get("/",(req,res)=>{
    res.send("hello")
})

export default router;
