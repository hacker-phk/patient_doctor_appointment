import React, { useEffect } from 'react'
import axios from 'axios';
// import useFetchDoctors from './useFetchDoctors';
import { useState } from 'react';
function useFetchAppointments(url) {
    const [appointments, setAppointments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    

    useEffect(()=>{
        const fetchAppointments = async () => {
            setLoading(true)
            console.log(url)
            try {
                const response = await axios.get(url)
                setAppointments(response.data)
                console.log(response.data)
                setLoading(false)
            } catch (error) {
                setError(error)
                setLoading(false)
            }
        }

        fetchAppointments()

    },[url])

    return {appointments,loading,error}
}

export default useFetchAppointments