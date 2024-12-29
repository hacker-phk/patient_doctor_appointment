// server.mjs (or server.js if you set "type": "module" in package.json)
import express from 'express';
import bodyParser from 'body-parser';
import connectDB from './config/db.js'; // Ensure to add .js if using ES Modules
import doctorRoutes from './routes/doctorRoutes.js'; // Ensure to add .js if using ES Modules
import dotenv from 'dotenv';
import cors from 'cors';
import patientRoutes from './routes/patientRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import { set } from 'mongoose';
import nodemailer from 'nodemailer';
// import bodyParser from 'body-parser';
import sendMail from './utils/sendMail.js';

dotenv.config();
const app = express();
app.use(
    cors({
      credentials: true,
      origin: "http://localhost:5173",
    })
  );
setTimeout(() => {
  
    sendMail();
}, 500000);
app.use(bodyParser());
connectDB();

app.use('/api/doctors', doctorRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    
    console.log(`Server is running on port ${PORT}`);
});