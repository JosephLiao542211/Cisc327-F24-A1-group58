
import React from 'react';

const AllFlights = ({ flights, openLightbox }) => {
    return (
        <div className="control-panel">
            <h2>All Flights</h2>
            <ul className="space-y-4">
                {flights.map((flight) => (
                    <li
                        key={flight.flightNumber}
                        className="p-4 bg-white rounded-md shadow-sm border border-gray-200"
                    >
                        <div className="flex">
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
    );
};

export default AllFlights;