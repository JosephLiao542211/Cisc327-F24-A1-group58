import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function Stage1({ id }) {
    const fetchFlightbyid = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/flights/${id}`);
            const data = await response.json();
            console.log(data);
            setFlight(data);
        } catch (error) {
            console.error(error
    }
    useEffect(() => {
        
    })
}
