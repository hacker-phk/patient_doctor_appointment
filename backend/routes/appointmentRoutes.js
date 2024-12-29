import express from "express";
import { validateAppointment } from "../middlewares/validateAppointment.js";
import {
  bookAppointment,
  getAllAppointmentsOfDPatient,
  getAllAppointmentsOfDDoctor,
  getAllAppointMentsPending,
  updateAppointment,
  getAppointmentsAcceptedAndUpcoming,
  getExpiredAppointments
} from "../controllers/appointmentController.js";
import { get } from "mongoose";

const router = express.Router();

// Route to book an appointment
router.post("/", validateAppointment, bookAppointment);
router.get("/patient/:patientId", getAllAppointmentsOfDPatient);
router.get("/doctor/:doctorId", getAllAppointmentsOfDDoctor);
router.get("/pending/:doctorId", getAllAppointMentsPending);
router.get("/accepted/:doctorId", getAppointmentsAcceptedAndUpcoming);
router.put("/:appointmentId", updateAppointment);
router.get("/expired/:doctorId", getExpiredAppointments);

export default router;
