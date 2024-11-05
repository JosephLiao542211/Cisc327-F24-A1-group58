const express = require('express');
const Plane = require('../models/Planes');
const mongoose = require('mongoose');



const router = express.Router();

// Get all planes
router.get('/planes', async (req, res) => {
    try {
        const planes = await Plane.find();
        res.json(planes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one plane
router.get('/planes/:id', getPlane, (req, res) => {
    res.json(res.plane);
});

// Create a plane
router.post('/plane', async (req, res) => {
    const plane = new Plane({
        planeId: req.body.planeId,
        modelNumber: req.body.modelNumber,
        model: req.body.model,
        rows: req.body.rows,
        columns: req.body.columns,
        firstclassRange: req.body.firstclassRange
    });

    try {
        const newPlane = await plane.save();
        res.status(201).json(newPlane);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a plane
router.patch('/plane/:id', getPlane, async (req, res) => {
    if (req.body.planeId != null) {
        res.plane.planeId = req.body.planeId;
    }
    if (req.body.modelNumber != null) {
        res.plane.modelNumber = req.body.modelNumber;
    }
    if (req.body.model != null) {
        res.plane.model = req.body.model;
    }
    if (req.body.rows != null) {
        res.plane.rows = req.body.rows;
    }
    if (req.body.columns != null) {
        res.plane.columns = req.body.columns;
    }
    if (req.body.firstclassRange != null) {
        res.plane.firstclassRange = req.body.firstclassRange;
    }

    try {
        const updatedPlane = await res.plane.save();
        res.json(updatedPlane);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a plane
router.delete('/plane/:id', getPlane, async (req, res) => {
    try {
        await res.plane.remove();
        res.json({ message: 'Deleted Plane' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get plane by ID
async function getPlane(req, res, next) {
    let plane;
    try {
        plane = await Plane.findById(req.params.id);
        if (plane == null) {
            return res.status(404).json({ message: 'Cannot find plane' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.plane = plane;
    next();
}

module.exports = router;