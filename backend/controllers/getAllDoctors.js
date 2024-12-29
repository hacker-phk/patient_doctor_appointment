import Doctor from "../models/doctorModel.js";
const getAllDoctors=async(req,res)=>{
    try{
        const doctors=await Doctor.find()
        res.send(doctors)
    }
    catch(error){
        res.send(400).json({error:error.message})
    }
    
}
export default getAllDoctors