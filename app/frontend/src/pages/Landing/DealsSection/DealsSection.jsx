// DealsSection.js
import React from 'react';
import FlightCard from '../../../components/FlightCard/FlightCard';
import './DealsSection.css';

const DealsSection = ({ flights }) => {
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
        <FlightCard id={1} imageURL="rome.jpg" description="Sept 17th" location="Rome, Italy" discount="-20%" />
        <FlightCard id={2} imageURL="halongbay.jpg" description="Oct 26th" location="Ha Long Bay, Vietnam" discount="-17%" />
        <FlightCard id={2} imageURL="tokyo.jpg" description="Oct 11th" location="Tokyo, Japan" discount="-50%" />
      </div>

      {/* <div className="deal-cards">
        {flights.length > 0 ? (
          flights.map((flight) => (
            <FlightCard key={flight.id} id={flight.id} imageURL={flight.imageURL} description={flight.description} location={flight.location} discount={flight.discount} />
          ))
        ) : (
          <div style={{ width: '100px', height: '100px', backgroundColor: 'purple' }}></div>
        )}
      </div> */}

      <button className="explore-button">Explore More</button>
    </section>
  );
};

export default DealsSection;
