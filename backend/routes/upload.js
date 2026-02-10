const express = require('express');
const router = express.Router();
const { upload, isCloudinaryConfigured } = require('../config/cloudinary');

// POST /api/upload - Upload file to Cloudinary or local storage
router.post('/', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const fileUrl = req.file.path || req.file.secure_url || `/uploads/${req.file.filename}`;

        res.json({
            success: true,
            data: {
                url: fileUrl,
                filename: req.file.originalname,
                size: req.file.size,
                mimetype: req.file.mimetype,
                isCloudinary: isCloudinaryConfigured()
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// POST /api/upload/multiple - Upload multiple files
router.post('/multiple', upload.array('files', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, message: 'No files uploaded' });
        }

        const files = req.files.map(file => ({
            url: file.path || file.secure_url || `/uploads/${file.filename}`,
            filename: file.originalname,
            size: file.size,
            mimetype: file.mimetype
        }));

        res.json({
            success: true,
            data: files,
            isCloudinary: isCloudinaryConfigured()
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
