const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const BlogPost = require('../models/BlogPost');
const { upload } = require('../config/cloudinary');

// Validation middleware
const blogValidation = [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('content').trim().notEmpty().withMessage('Content is required'),
    body('status').optional().isIn(['draft', 'published']).withMessage('Invalid status'),
    body('metaTitle').optional().isLength({ max: 60 }).withMessage('Meta title too long'),
    body('metaDescription').optional().isLength({ max: 160 }).withMessage('Meta description too long')
];

// GET /api/blogs - Get all published blogs
router.get('/', async (req, res) => {
    try {
        const { status, page = 1, limit = 10, category } = req.query;

        const query = {};
        if (status) {
            query.status = status;
        } else {
            query.status = 'published';
        }
        if (category) {
            query.category = category;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [posts, total] = await Promise.all([
            BlogPost.find(query)
                .sort({ publishedAt: -1, createdAt: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .select('-content'), // Exclude content for listing
            BlogPost.countDocuments(query)
        ]);

        res.json({
            success: true,
            data: posts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / parseInt(limit))
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/blogs/:slug - Get single blog by slug
router.get('/:slug', async (req, res) => {
    try {
        const post = await BlogPost.findOne({ slug: req.params.slug });
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/blogs/id/:id - Get single blog by ID (for admin)
router.get('/id/:id', async (req, res) => {
    try {
        const post = await BlogPost.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/blogs - Create new blog
router.post('/', upload.single('featuredImage'), blogValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const postData = {
            ...req.body,
            tags: req.body.tags ? (Array.isArray(req.body.tags) ? req.body.tags : req.body.tags.split(',').map(t => t.trim())) : []
        };

        if (req.file) {
            postData.featuredImage = req.file.path || req.file.secure_url || `/uploads/${req.file.filename}`;
        }

        const post = new BlogPost(postData);
        await post.save();

        res.status(201).json({ success: true, data: post });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'A post with this title already exists' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
});

// PUT /api/blogs/:id - Update blog
router.put('/:id', upload.single('featuredImage'), blogValidation, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }

        const updateData = {
            ...req.body,
            tags: req.body.tags ? (Array.isArray(req.body.tags) ? req.body.tags : req.body.tags.split(',').map(t => t.trim())) : []
        };

        if (req.file) {
            updateData.featuredImage = req.file.path || req.file.secure_url || `/uploads/${req.file.filename}`;
        }

        const post = await BlogPost.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }

        res.json({ success: true, data: post });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ success: false, message: 'A post with this title already exists' });
        }
        res.status(500).json({ success: false, message: error.message });
    }
});

// DELETE /api/blogs/:id - Delete blog
router.delete('/:id', async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.json({ success: true, message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// GET /api/blogs/categories/list - Get all categories
router.get('/categories/list', async (req, res) => {
    try {
        const categories = await BlogPost.distinct('category');
        res.json({ success: true, data: categories });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
