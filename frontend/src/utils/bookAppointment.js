import { useState } from "react";
const bookAppointment = (data) => {
    const[error ,setError]=useState(null);
    const [loading,setLoading]=useState(true);
    const [success, setSuccess] = useState(false);
    
    return {data,loading,error,success};

}
export default bookAppointment