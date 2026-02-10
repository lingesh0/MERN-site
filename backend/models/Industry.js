const mongoose = require('mongoose');
const slugify = require('slugify');

const industrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        maxlength: [200, 'Name cannot exceed 200 characters'],
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    content: {
        type: String,
        default: '',
    },
    icon: {
        type: String,
        default: '🏢',
    },
    image: {
        type: String,
        default: '',
    },
    relatedServices: [{
        type: String,
        trim: true,
    }],
    stats: {
        projects: { type: Number, default: 0 },
        clients: { type: Number, default: 0 },
        satisfaction: { type: Number, default: 0 },
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});

industrySchema.pre('save', function (next) {
    if (this.isModified('name') || !this.slug) {
        this.slug = slugify(this.name, { lower: true, strict: true });
    }
    next();
});

industrySchema.index({ isActive: 1 });

module.exports = mongoose.model('Industry', industrySchema);
