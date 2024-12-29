import express from 'express';
import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    doctorId: { type: mongoose.Types.ObjectId, ref: "Doctor" },
    patient: { type: mongoose.Types.ObjectId, ref: "Patient" },
    description: { type: String },
    date: { type: Date },
    time: { type: String }, // Assuming time is stored as a string (e.g., "HH:mm")
    status: { type: String,default:"pending" },
}, { timestamps: true });

export default mongoose.model('Appointment', appointmentSchema);
