import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './addflights.css';
import UpdateFlight from './UpdateFlight';
/**
 * AddFlights component allows users to add new flights and view existing flights and users.
 */
const AddFlights = () => {
    const [users, setUsers] = useState([]);
    const [flights, setFlights] = useState([]);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [focusFlight, setFocusFlight ] = useState([]);

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
        price: 0,
        discount: 0,
        seatsAvaliable: 0,
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
    const closeightbox = (flight) => {
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
                price: 0,
                discount: 0,
                seatsAvaliable: 0,
            });
        } catch (error) {
            console.error('There was an error adding the flight!', error);
        }
    };

    return (
        <div className='addflight-layout'>
            {lightboxOpen && (<UpdateFlight flight={focusFlight} onClose={closeightbox}></UpdateFlight>)}
            <form className='addflights' onSubmit={handleSubmit}>
                <h1>Add New Flight</h1>
                <div>
                    <label>Flight Number:</label>
                    <input
                        type="text"
                        name="flightNumber"
                        value={flightData.flightNumber}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Airline:</label>
                    <input
                        type="text"
                        name="airline"
                        value={flightData.airline}
                        onChange={handleChange}
                        
                        required
                    />
                </div>
                <div>
                    <label>Departure Airport:</label>
                    <input
                        type="text"
                        name="departureAirport"
                        value={flightData.departureAirport.toUpperCase()}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Arrival Airport:</label>
                    <input
                        type="text"
                        name="arrivalAirport"
                        value={flightData.arrivalAirport.toUpperCase()}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Departure Time:</label>
                    <input
                        type="datetime-local"
                        name="departureTime"
                        value={flightData.departureTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Arrival Time:</label>
                    <input
                        type="datetime-local"
                        name="arrivalTime"
                        value={flightData.arrivalTime}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={flightData.price}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Discount(%)</label>
                    <input
                        type="number"
                        name="discount"
                        value={flightData.discount}
                        onChange={handleChange}
                        min={0}
                        max={100}
                    />
                </div>
                <br></br>
               
                <button type="submit">Add Flight</button>
            </form>

            <div className="control-panel ">
                <h2 >All Flights</h2>
                <ul className="space-y-4">
                    {flights.map((flight) => (
                        <li
                            key={flight.flightNumber}
                            className="p-4 bg-white rounded-md shadow-sm border border-gray-200"
                        >
                            <div className="flex ">
                                <div className="text-lg font-semibold">
                                    {flight.airline} — Flight {flight.flightNumber}
                                </div>
                                <div>
                                    <div className="text-lg font-semibold text-blue-600">
                                        ${flight.price}
                                    </div>
                                    <div className="shrink text-gray-500">
                                        {flight.seatsAvaliable} seats available
                                    </div>
                                </div>
                            </div>
                            <div className="text-gray-500">
                                Airline: {flight.airline} | Flight Number: {flight.flightNumber} | Price: ${flight.price}
                            </div>
                            <button 
                                onClick={() => openLightbox(flight)} 
                                className="ml-auto bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                                Update
                            </button>
                        </li>
                    
                    ))}
                </ul>
            </div>

            <div className='control-panel'>
                <h2>All Users</h2>
                <ul>
                    {users.map((user, key) => (
                        
                        <li key={user._id}><strong>{user.firstName} {user.lastName}</strong>
                        <div className="text-gray-500">
                        <strong> User Id: </strong>{user._id}    <strong>User Email: </strong>{user.email}     <strong>User PhoneNumber: </strong>{user.phoneNumber}
                        </div>
             
                        </li>
                            
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AddFlights;
