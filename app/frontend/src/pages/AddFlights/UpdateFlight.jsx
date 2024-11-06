import React, { useState } from 'react';
import './updateflight.css'; // Make sure to create a corresponding CSS file for styling
/* UpdateFlight.css */

const UpdateFlight = ({ flight, onClose }) => {
    const [flightInfo, setFlightInfo] = useState(flight);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlightInfo({
            ...flightInfo,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        onClose();
    };

    return (
        <div className="lightbox">
            <div className="lightbox-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Update Flight Information</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Flight Number:
                        <input type="text" name="flightNumber" value={flightInfo.flightNumber} onChange={handleChange} />
                    </label>
                    <label>
                        Departure:
                        <input type="text" name="departure" value={flightInfo.departure} onChange={handleChange} />
                    </label>
                    <label>
                        Arrival:
                        <input type="text" name="arrival" value={flightInfo.arrival} onChange={handleChange} />
                    </label>
                    <label>
                        Date:
                        <input type="date" name="date" value={flightInfo.date} onChange={handleChange} />
                    </label>
                    <label>
                        Time:
                        <input type="time" name="time" value={flightInfo.time} onChange={handleChange} />
                    </label>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateFlight;