// DealsSection.js
import React from 'react';
import { useState } from 'react';
import FlightCard from '../../../components/FlightCard/FlightCard';
import './DealsSection.css';
import { useEffect } from 'react';
import axios from 'axios';
import airportImageCatalogue from '../../../assets/airport_img_catalogue';

const DealsSection = () => {
  const [flights, setFlights] = useState([]);


  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/flight');
        const discountedFlights = response.data.filter(flight => flight.discount > 0);
        setFlights(discountedFlights);
      } catch (error) {
        console.error('Error fetching flights:', error);
      }
    };

    fetchFlights();
  }, []);

  return (
    <section className="deals-section">
      <h2>Up to -40% 🎉 Airplane Travel exclusive deals</h2>

      <div className="categories">
        <button className="category-button">Europe</button>
        <button className="category-button">Asia</button>
        <button className="category-button">North America</button>
        <button className="category-button">Other</button>
      </div>

      <div className="deal-cards">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard key={flight.id} id={flight.id} imageURL={airportImageCatalogue[flight.arrivalAirport].image} description={new Date(flight.departureTime).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} location={airportImageCatalogue[flight.arrivalAirport].location} discount={flight.discount} price={flight.economyPrice} />
          ))
        ) : (
          <div style={{ marginBottom:"30px", width: '100%', height: '100px', backgroundColor: 'orange' }}>
            <div className="no-flights-message">NO DISCOUNTED FLIGHTS </div>
          </div>
        )}
      </div>

      <button className="explore-button">Explore All Flights</button>
    </section>
  );
};

export default DealsSection;
