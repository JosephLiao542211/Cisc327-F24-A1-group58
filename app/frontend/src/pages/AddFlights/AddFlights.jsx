import React, { useState } from 'react';
import axios from 'axios';

const AddFlights = () => {
    const [flightData, setFlightData] = useState({
        flightNumber: '',
        airline: '',
        departureAirport: '',
        arrivalAirport: '',
        departureTime: '',
        arrivalTime: '',
        price: '',
        seatConfiguration: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlightData({
            ...flightData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/flight', flightData);
            console.log('Flight added:', response.data);
        } catch (error) {
            console.error('There was an error adding the flight!', error);
        }
    };

    return (
        <div>
            <h1>Add New Flight</h1>
            <form onSubmit={handleSubmit}>
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
                        value={flightData.departureAirport}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Arrival Airport:</label>
                    <input
                        type="text"
                        name="arrivalAirport"
                        value={flightData.arrivalAirport}
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
                    <label>Seat Configuration:</label>
                    <input
                        type="text"
                        name="seatConfiguration"
                        value={flightData.seatConfiguration}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Add Flight</button>
            </form>
        </div>
    );
};

export default AddFlights;
