import express from 'express';
import { registerDoctor, loginDoctor, logoutDoctor } from '../controllers/doctorController.js';
import { validateDoctor } from '../middlewares/validateDoctor.js';
import getAllDoctors from '../controllers/getAllDoctors.js';

const router = express.Router();
//auth routes

    router.post('/register', validateDoctor, registerDoctor);
    router.post('/login', loginDoctor);
    router.post('/logout', logoutDoctor);

    
// get all doctors

    router.get("/",getAllDoctors);

export default router;