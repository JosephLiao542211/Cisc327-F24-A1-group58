import React, { useEffect, useState } from 'react';
import FlightCard from '../../components/FlightCard/FlightCard';
import axios from 'axios';
import airportImageCatalogue from '../../assets/airport_img_catalogue';
import './explore.css';

const Explore = () => {
    const [flights, setFlights] = useState([]);

    useEffect(() => {
        const fetchFlights = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:5000/api/flight'
                );
                setFlights(response.data);
            } catch (error) {
                console.error('Error fetching flights:', error);
            }
        };

        fetchFlights();
    }, []);

    const [searchTerm, setSearchTerm] = useState('');

    const searchFilteredFlights = flights.filter(
        (flight) =>
            flight.arrivalAirport
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            flight.departureAirport
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
    );

    const [discountFilter, setDiscountFilter] = useState(false);
    const [dateFilter, setDateFilter] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [departureAirportFilter, setDepartureAirportFilter] = useState('');
    const [arrivalAirportFilter, setArrivalAirportFilter] = useState('');

    const applyFilters = (flight) => {
        const matchesDiscount = discountFilter ? flight.discount : true;
        const matchesDate = dateFilter
            ? new Date(flight.departureTime).toLocaleDateString('en-US') ===
              new Date(dateFilter).toLocaleDateString('en-US')
            : true;
        const matchesPrice =
            (minPrice ? flight.economyPrice >= minPrice : true) &&
            (maxPrice ? flight.economyPrice <= maxPrice : true);
        const matchesDepartureAirport = departureAirportFilter
            ? flight.departureAirport
                  .toLowerCase()
                  .includes(departureAirportFilter.toLowerCase())
            : true;
        const matchesArrivalAirport = arrivalAirportFilter
            ? flight.arrivalAirport
                  .toLowerCase()
                  .includes(arrivalAirportFilter.toLowerCase())
            : true;
        return (
            matchesDiscount &&
            matchesDate &&
            matchesPrice &&
            matchesDepartureAirport &&
            matchesArrivalAirport
        );
    };

    const filteredFlights = flights.filter(applyFilters);

    return (
        <div className="explore-page">
            <div className="exright-column">
                <div className="filters">
                    <div className="discountcheckbox">
                        <input
                            type="checkbox"
                            checked={discountFilter}
                            onChange={(e) =>
                                setDiscountFilter(e.target.checked)
                            }
                        />{' '}
                        Discounted Flights Only
                    </div>
                    <div className="datesearch">
                        Departure Date
                        <input
                            type="date"
                            value={dateFilter}
                            onChange={(e) => setDateFilter(e.target.value)}
                        />
                    </div>
                    <div className="airportsearch">
                        Departure Airport
                        <input
                            type="text"
                            placeholder="Departure Airport"
                            value={departureAirportFilter}
                            onChange={(e) =>
                                setDepartureAirportFilter(e.target.value)
                            }
                        />
                    </div>
                    <div className="airportsearch">
                        Arrival Airport
                        <input
                            type="text"
                            placeholder="Arrival Airport"
                            value={arrivalAirportFilter}
                            onChange={(e) =>
                                setArrivalAirportFilter(e.target.value)
                            }
                        />
                    </div>
                    Price Range:
                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>
            <div className="exleft-column">
                <div className="explore-catalogue">
                    {filteredFlights.length > 0 ? (
                        filteredFlights.map((flight) => (
                            <FlightCard
                                key={flight._id}
                                id={flight._id}
                                imageURL={
                                    airportImageCatalogue[flight.arrivalAirport]
                                        ?.image
                                }
                                description={`${new Date(
                                    flight.departureTime
                                ).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                })} \u00A0\u00A0\u00A0 ${
                                    flight.departureAirport
                                } → ${flight.arrivalAirport}`}
                                location={
                                    airportImageCatalogue[flight.arrivalAirport]
                                        ?.location
                                }
                                discount={flight.discount}
                                price={flight.economyPrice}
                            />
                        ))
                    ) : (
                        <div
                            style={{
                                marginBottom: '30px',
                                width: '100%',
                                height: '100px',
                                backgroundColor: 'orange',
                            }}
                        >
                            <div className="no-flights-message">
                                NO DISCOUNTED FLIGHTS
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Explore;
