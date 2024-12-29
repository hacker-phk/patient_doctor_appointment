import nodemailer from 'nodemailer';
import Appointment from '../models/appointment.js';
import dotenv from 'dotenv';
import { deleteAppointment } from '../controllers/appointmentController.js';

dotenv.config(); // Load environment variables

// Configure the transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    secure : true,
    port : 465,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS

    }
});

const sendMail = async () => {
  try {
    const currentDate = new Date();

    // Fetch appointments with status 'pending' and date less than the current date
    const expiredAppointments = await Appointment.find({
      status: 'pending',
      date: { $lt: currentDate }
    }).populate('patient');

    if (expiredAppointments.length === 0) {
      console.log('No expired pending appointments found');
      return;
    }

    // Iterate through appointments to send emails
    for (const appointment of expiredAppointments) {
      const { email, name, _id } = appointment.patient; // Destructure patient data

      // Customize mail options
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Expired Pending Appointment Notification',
        text: `Dear ${name},\n\nYour appointment scheduled for ${appointment.date.toDateString()} has expired. Please contact the clinic to reschedule or for further actions.\n\nDetails:\n- Appointment ID: ${appointment._id}\n- Description: ${appointment.description}\n\nThank you.`
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
           deleteAppointment(_id)
        } else {
          console.log('Email sent successfully to:', email, '\nResponse:', info.response);
        }
      });
    }
  } catch (error) {
    console.error('Error in sendMail function:', error.message);
  }
};

export default sendMail;
