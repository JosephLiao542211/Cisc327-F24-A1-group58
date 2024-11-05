import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addflights.css';
import UpdateFlight from './UpdateFlight';
import AddFlightForm from './AddFlightForm';
import AllFlights from './AllFlights';
import AllUsers from './AllUsers';
import AddPlaneForm from './AddPlaneForm';
import AllPlanes from './AllPlanes';

/**
 * AddFlights component allows users to add new flights and view existing flights and users.
 */
const AddFlights = () => {
    const [users, setUsers] = useState([]);
    const [flights, setFlights] = useState([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [focusFlight, setFocusFlight] = useState([]);

    // Fetch users from the API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('There was an error fetching the users!', error);
            }
        };

        fetchUsers();
    }, []);

    // Fetch flights from the API
    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/flight');
                setFlights(response.data);
            } catch (error) {
                console.error('There was an error fetching the flights!', error);
            }
        };

        fetchFlights();
    }, []);

    const [flightData, setFlightData] = useState({
        flightNumber: 0,
        airline: '',
        departureAirport: '',
        arrivalAirport: '',
        departureTime: '',
        arrivalTime: '',
        economyPrice: 0,
        firstclassPrice: 0,
        planeID: '',
        discount: 0,
    });

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlightData({
            ...flightData,
            [name]: value,
        });
    };

    const openLightbox = (flight) => {
        setFocusFlight(flight);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setFocusFlight([]);
        setLightboxOpen(false);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/flight', flightData);
            console.log('Flight added:', response.data);
            alert('Flight added successfully!');
            setFlightData({
                flightNumber: 0,
                airline: '',
                departureAirport: '',
                arrivalAirport: '',
                departureTime: '',
                arrivalTime: '',
                economyPrice: 0,
                firstclassPrice: 0,
                planeID: '',
                discount: 0,
            });
        } catch (error) {
            if (error.response && error.response.status === 400 && error.response.data.message.includes('Flight number already exists')) {
                alert('Error: Flight number already exists.');
            } else {
                console.error('There was an error adding the flight!', error);
            }
        }
    };

    return (
        <div className='addflight-layout'>
            {lightboxOpen && <UpdateFlight flight={focusFlight} onClose={closeLightbox} />}
            <AddFlightForm flightData={flightData} handleChange={handleChange} handleSubmit={handleSubmit} />
            <AllFlights flights={flights} openLightbox={openLightbox} />    
            <AllUsers users={users} />
            <AddPlaneForm />
            <AllPlanes></AllPlanes>
        </div>
    );
};

export default AddFlights;
