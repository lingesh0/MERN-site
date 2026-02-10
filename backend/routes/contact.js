const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { body, validationResult } = require('express-validator');

// POST /api/contact - Submit contact form
router.post('/',
    [
        body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
        body('email').trim().isEmail().withMessage('Valid email is required'),
        body('message').trim().notEmpty().withMessage('Message is required').isLength({ max: 2000 }),
        body('company').optional().trim().isLength({ max: 200 }),
        body('service').optional().trim().isLength({ max: 200 }),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ success: false, errors: errors.array() });
            }

            const { name, email, company, service, message } = req.body;
            const contact = new Contact({ name, email, company, service, message });
            await contact.save();

            res.status(201).json({
                success: true,
                message: 'Thank you! Your message has been received. We\'ll get back to you shortly.',
                data: { id: contact._id },
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
);

// GET /api/contact - List contact submissions (admin)
router.get('/', async (req, res) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;
        const filter = status && status !== 'all' ? { status } : {};
        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [contacts, total] = await Promise.all([
            Contact.find(filter).sort({ createdAt: -1 }).skip(skip).limit(parseInt(limit)),
            Contact.countDocuments(filter),
        ]);

        res.json({
            success: true,
            data: contacts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit)),
            },
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// PATCH /api/contact/:id/status - Update contact status
router.patch('/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['new', 'read', 'replied'].includes(status)) {
            return res.status(400).json({ success: false, message: 'Invalid status' });
        }
        const contact = await Contact.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, data: contact });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/contact/:id - Delete contact
router.delete('/:id', async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        if (!contact) {
            return res.status(404).json({ success: false, message: 'Contact not found' });
        }
        res.json({ success: true, message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
