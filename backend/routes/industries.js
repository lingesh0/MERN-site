const express = require('express');
const router = express.Router();
const Industry = require('../models/Industry');

// GET /api/industries - List all industries
router.get('/', async (req, res) => {
    try {
        const { all } = req.query;
        const filter = all === 'true' ? {} : { isActive: true };
        const industries = await Industry.find(filter).sort({ name: 1 });
        res.json({ success: true, data: industries });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/industries/:slug - Get single industry
router.get('/:slug', async (req, res) => {
    try {
        const industry = await Industry.findOne({ slug: req.params.slug });
        if (!industry) {
            return res.status(404).json({ success: false, message: 'Industry not found' });
        }
        res.json({ success: true, data: industry });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/industries - Create industry
router.post('/', async (req, res) => {
    try {
        const { name, description, content, icon, image, relatedServices, stats, isActive } = req.body;
        const industry = new Industry({
            name,
            description,
            content,
            icon,
            image,
            relatedServices: relatedServices ? (Array.isArray(relatedServices) ? relatedServices : relatedServices.split(',').map((s) => s.trim())) : [],
            stats: stats || {},
            isActive: isActive !== undefined ? isActive : true,
        });
        await industry.save();
        res.status(201).json({ success: true, data: industry });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT /api/industries/:id - Update industry
router.put('/:id', async (req, res) => {
    try {
        const { name, description, content, icon, image, relatedServices, stats, isActive } = req.body;
        const updateData = {};

        if (name) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (content !== undefined) updateData.content = content;
        if (icon) updateData.icon = icon;
        if (image !== undefined) updateData.image = image;
        if (relatedServices) updateData.relatedServices = Array.isArray(relatedServices) ? relatedServices : relatedServices.split(',').map((s) => s.trim());
        if (stats) updateData.stats = stats;
        if (isActive !== undefined) updateData.isActive = isActive;

        const industry = await Industry.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!industry) {
            return res.status(404).json({ success: false, message: 'Industry not found' });
        }
        res.json({ success: true, data: industry });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/industries/:id - Delete industry
router.delete('/:id', async (req, res) => {
    try {
        const industry = await Industry.findByIdAndDelete(req.params.id);
        if (!industry) {
            return res.status(404).json({ success: false, message: 'Industry not found' });
        }
        res.json({ success: true, message: 'Industry deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
