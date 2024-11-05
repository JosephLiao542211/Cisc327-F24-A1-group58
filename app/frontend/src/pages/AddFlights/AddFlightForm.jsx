import React from 'react';

const AddFlightForm = ({ flightData, handleChange, handleSubmit }) => {
    return (
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
                <label>Economy Price:</label>
                <input
                    type="number"
                    name="economyPrice"
                    value={flightData.economyPrice}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>First Class Price:</label>
                <input
                    type="number"
                    name="firstclassPrice"
                    value={flightData.firstclassPrice}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Plane ID:</label>
                <input
                    type="text"
                    name="planeID"
                    value={flightData.planeID}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Discount (%):</label>
                <input
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
