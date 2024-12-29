// doctorModel.mjs (or doctorModel.js if you set "type": "module" in package.json)
import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    designation: { type: String, required: true },
    slot: { type: String, required: true },
    age: { type: Number, required: true },
    specializations: { type: [String], required: true },
});

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor;