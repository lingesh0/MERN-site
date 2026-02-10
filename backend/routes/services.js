const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// GET /api/services - List all services
router.get('/', async (req, res) => {
    try {
        const { all } = req.query;
        const filter = all === 'true' ? {} : { isActive: true };
        const services = await Service.find(filter).sort({ order: 1 });
        res.json({ success: true, data: services });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/services/:slug - Get single service
router.get('/:slug', async (req, res) => {
    try {
        const service = await Service.findOne({ slug: req.params.slug });
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, data: service });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/services - Create service
router.post('/', async (req, res) => {
    try {
        const { title, shortDescription, content, icon, image, features, relatedIndustries, order, isActive } = req.body;
        const service = new Service({
            title,
            shortDescription,
            content,
            icon,
            image,
            features: features ? (Array.isArray(features) ? features : features.split(',').map((f) => f.trim())) : [],
            relatedIndustries: relatedIndustries ? (Array.isArray(relatedIndustries) ? relatedIndustries : relatedIndustries.split(',').map((i) => i.trim())) : [],
            order: order || 0,
            isActive: isActive !== undefined ? isActive : true,
        });
        await service.save();
        res.status(201).json({ success: true, data: service });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// PUT /api/services/:id - Update service
router.put('/:id', async (req, res) => {
    try {
        const { title, shortDescription, content, icon, image, features, relatedIndustries, order, isActive } = req.body;
        const updateData = {};

        if (title) updateData.title = title;
        if (shortDescription !== undefined) updateData.shortDescription = shortDescription;
        if (content !== undefined) updateData.content = content;
        if (icon) updateData.icon = icon;
        if (image !== undefined) updateData.image = image;
        if (features) updateData.features = Array.isArray(features) ? features : features.split(',').map((f) => f.trim());
        if (relatedIndustries) updateData.relatedIndustries = Array.isArray(relatedIndustries) ? relatedIndustries : relatedIndustries.split(',').map((i) => i.trim());
        if (order !== undefined) updateData.order = order;
        if (isActive !== undefined) updateData.isActive = isActive;

        const service = await Service.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, data: service });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// DELETE /api/services/:id - Delete service
router.delete('/:id', async (req, res) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);
        if (!service) {
            return res.status(404).json({ success: false, message: 'Service not found' });
        }
        res.json({ success: true, message: 'Service deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
