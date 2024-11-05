import React, { useState } from 'react';
import axios from 'axios';

const AddPlaneForm = () => {
    const [planeData, setPlaneData] = useState({
        planeId: '',
        modelNumber: '',
        model: 'Boeing', // Set a default value for the dropdown
        rows: 0,
        columns: 6,
        firstclassRange: [0, 0], // Initialize as an array with two elements
    });

    // Handle input changes for regular fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlaneData({
            ...planeData,
            [name]: value,
        });
    };

    // Handle input changes for firstclassRange array
    const handleFirstClassRangeChange = (index, value) => {
        const updatedRange = [...planeData.firstclassRange];
        updatedRange[index] = Number(value); // Ensure value is a number
        setPlaneData({
            ...planeData,
            firstclassRange: updatedRange,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/planes', planeData);
            console.log('Plane added:', response.data);
            alert('Plane added successfully!');
            setPlaneData({
                planeId: '',
                modelNumber: '',
                model: 'Boeing', // Reset to default value
                rows: 0,
                columns: 0,
                firstclassRange: [0, 0],
            });
        } catch (error) {
            console.error('There was an error adding the plane!', error);
        }
    };

    return (
        <form className='addplane' onSubmit={handleSubmit}>
            <h1>Add New Plane</h1>
            <div>
                <label>Plane ID:</label>
                <input
                    type="text"
                    name="planeId"
                    value={planeData.planeId}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Model Number:</label>
                <input
                    type="text"
                    name="modelNumber"
                    value={planeData.modelNumber}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Model:</label>
                <select
                    name="model"
                    value={planeData.model}
                    onChange={handleChange}
                    required
                >
                    <option value="Boeing">Boeing</option>
                    <option value="Airbus">Airbus</option>
                    <option value="Embraer">Embraer</option>
                    <option value="Bombardier">Bombardier</option>
                    <option value="Cessna">Cessna</option>
                </select>
            </div>
            <div>
                <label>Rows:</label>
                <input
                    type="number"
                    name="rows"
                    value={planeData.rows}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Columns:</label>
                <input
                    type="number"
                    name="columns"
                    value={planeData.columns}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>First Class Range:</label>
                <input
                    type="number"
                    value={planeData.firstclassRange[0]}
                    min={0}
                    max={planeData.rows} // Ensure the value is less than columns
                    onChange={(e) => handleFirstClassRangeChange(0, e.target.value)}
                    required
                />
                <input
                    type="number"
                    value={planeData.firstclassRange[1]}
                    onChange={(e) => handleFirstClassRangeChange(1, e.target.value)}
                    min={planeData.firstclassRange[0]} // Ensure the value is greater than the first element
                    max={planeData.rows} // Ensure the value is less than columns
                    required
                />
            </div>
            <br />
            <button type="submit">Add Plane</button>
        </form>
    );
};

export default AddPlaneForm;
