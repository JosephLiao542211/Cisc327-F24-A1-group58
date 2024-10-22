import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlightCard.css'; // Make sure to create a CSS file for styling

const FlightCard = ({ id }) => {
    const [imageURL, setImageURL] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [discount, setDiscount] = useState('');
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/flight/${id}`);
    };

    return (
        <div className="flight-card" onClick={handleClick}>
            <img src={imageURL} alt="Flight" className="flight-card-image" />
            <div className="flight-card-overlay">
                <p>{description}</p>
                <p>{location}</p>
                <p>{discount}</p>
            </div>
        </div>
    );
};

export default FlightCard;