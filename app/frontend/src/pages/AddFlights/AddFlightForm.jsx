import React from 'react';
import { useState, useEffect } from 'react';

const AddFlightForm = ({ flightData, handleChange, handleSubmit }) => {
    

  
    const [planeIDs, setPlaneIDs] = useState([]);

    useEffect(() => {
        const fetchPlaneIDs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/planes/ids');
                const data = await response.json();
                setPlaneIDs(data);
            } catch (error) {
                console.error('Error fetching plane IDs:', error);
            }
        };

        fetchPlaneIDs();
    }, []);

    return (
        <form className='addflights' onSubmit={handleSubmit}>
            <h1>Add New Flight</h1>
            <div>
                <label htmlFor='flightNumber'>Flight Number:</label>
                <input
                    id='flightNumber'
                    type="text"
                    name="flightNumber"
                    value={flightData.flightNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor='airline'>Airline:</label>
                <input
                    id='airline'
                    type="text"
                    name="airline"
                    value={flightData.airline}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor='departureAirport'>Departure Airport:</label>
                <input
                    id='departureAirport'
                    type="text"
                    name="departureAirport"
                    value={flightData.departureAirport.toUpperCase()}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor='arrivalAirport'>Arrival Airport:</label>
                <input
                    id='arrivalAirport'
                    type="text"
                    name="arrivalAirport"
                    value={flightData.arrivalAirport.toUpperCase()}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor='departureTime'>Departure Time:</label>
                <input
                    id='departureTime'
                    type="datetime-local"
                    name="departureTime"
                    value={flightData.departureTime}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor='arrivalTime'>Arrival Time:</label>
                <input
                    id='arrivalTime'
                    type="datetime-local"
                    name="arrivalTime"
                    value={flightData.arrivalTime}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor='economyPrice'>Economy Price:</label>
                <input
                    id='economyPrice'
                    type="number"
                    name="economyPrice"
                    value={flightData.economyPrice}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor='firstclassPrice'>First Class Price:</label>
                <input
                    id='firstclassPrice'
                    type="number"
                    name="firstclassPrice"
                    value={flightData.firstclassPrice}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label htmlFor='planeID'>Plane ID:</label>
                <select
                    id='planeID'
                    name="planeID"
                    value={flightData.planeID}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Plane ID</option>
                    {planeIDs.map((id) => (
                        <option key={id} value={id}>
                            {id}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor='discount'>Discount (%):</label>
                <input
                    id='discount'
                    type="number"
                    name="discount"
                    value={flightData.discount}
                    onChange={handleChange}
                    min={0}
                    max={100}
                />
            </div>
            <br />
            <button type="submit">Add Flight</button>
        </form>
    );
};

export default AddFlightForm;
