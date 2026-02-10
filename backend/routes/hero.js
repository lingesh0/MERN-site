const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const HeroSlide = require('../models/HeroSlide');
const { upload, isCloudinaryConfigured } = require('../config/cloudinary');

// Validation middleware
const heroValidation = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('mediaType').optional().isIn(['image', 'video']).withMessage('Invalid media type'),
    body('order').optional().isInt({ min: 0 }).withMessage('Order must be a positive integer'),
    body('isActive').optional().isBoolean().withMessage('isActive must be a boolean')
];

// GET /api/hero - Get all active hero slides
router.get('/', async (req, res) => {
    try {
        const { all } = req.query;
        const query = all === 'true' ? {} : { isActive: true };
        const slides = await HeroSlide.find(query).sort({ order: 1 });
        res.json({ success: true, data: slides });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/hero/:id - Get single slide
router.get('/:id', async (req, res) => {
    try {
        const slide = await HeroSlide.findById(req.params.id);
        if (!slide) {
            return res.status(404).json({ success: false, message: 'Slide not found' });
        }
        res.json({ success: true, data: slide });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/hero - Create new slide
router.post('/', upload.single('media'), heroValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const slideData = {
            ...req.body,
            mediaUrl: req.file ? (req.file.path || req.file.secure_url || `/uploads/${req.file.filename}`) : req.body.mediaUrl
        };

        const slide = new HeroSlide(slideData);
        await slide.save();

        res.status(201).json({ success: true, data: slide });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/hero/:id - Update slide
router.put('/:id', upload.single('media'), heroValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const updateData = { ...req.body };
        if (req.file) {
            updateData.mediaUrl = req.file.path || req.file.secure_url || `/uploads/${req.file.filename}`;
        }

        const slide = await HeroSlide.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!slide) {
            return res.status(404).json({ success: false, message: 'Slide not found' });
        }

        res.json({ success: true, data: slide });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/hero/:id - Delete slide
router.delete('/:id', async (req, res) => {
    try {
        const slide = await HeroSlide.findByIdAndDelete(req.params.id);
        if (!slide) {
            return res.status(404).json({ success: false, message: 'Slide not found' });
        }
        res.json({ success: true, message: 'Slide deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PATCH /api/hero/reorder - Reorder slides
router.patch('/reorder', async (req, res) => {
    try {
        const { orders } = req.body; // [{ id: '...', order: 0 }, ...]

        const updatePromises = orders.map(item =>
            HeroSlide.findByIdAndUpdate(item.id, { order: item.order })
        );

        await Promise.all(updatePromises);
        res.json({ success: true, message: 'Slides reordered successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
