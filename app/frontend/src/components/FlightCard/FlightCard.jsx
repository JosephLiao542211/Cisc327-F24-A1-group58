import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './FlightCard.css'; // Make sure to create a CSS file for styling

const FlightCard = ({ id, imageURL: propImageURL, description: propDescription, location: propLocation, discount: propDiscount }) => {
    const [imageURL, setImageURL] = useState(propImageURL || 'placeholder-image-url');
    const [description, setDescription] = useState(propDescription || 'No description available');
    const [location, setLocation] = useState(propLocation || 'Unknown location');
    const [discount, setDiscount] = useState(propDiscount || 'No discount available');
    const navigate = useNavigate();

    useEffect(() => {
        if (propImageURL) setImageURL(propImageURL);
        if (propDescription) setDescription(propDescription);
        if (propLocation) setLocation(propLocation);
        if (propDiscount) setDiscount(propDiscount);
    }, [propImageURL, propDescription, propLocation, propDiscount]);

    const handleClick = () => {
        navigate(`/flight/${id}`);
    };

    return (
        <div className="flight-card" onClick={handleClick}>
        <img src={imageURL} alt="Flight" className="flight-card-image" />
        <div className="flight-card-overlay">
            <p>{description}</p>
            <h1>{location}</h1>
            <p>{discount}</p>
        </div>
    </div>
    );
};

export default FlightCard;