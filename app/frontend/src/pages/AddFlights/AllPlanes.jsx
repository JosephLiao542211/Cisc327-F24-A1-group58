import React, { useEffect, useState } from 'react';

const AllPlanes = () => {
    const [planes, setPlanes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlanes = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/planes');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlanes(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPlanes();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='control-panel'>
            <h1>All Planes</h1>
            <ul>
                {planes.map((plane) => (
                    <li key={plane.planeId}>
                        <p>PlaneID: {plane.planeId}</p>
                        <p>Model: {plane.model}</p>
                        <p>Model Number: {plane.modelNumber}</p>
                        <p>Rows: {plane.rows}</p>
                        <p>Columns: {plane.columns}</p>
                        <p>First Class Range: {plane.firstclassRange.join(', ')}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AllPlanes;