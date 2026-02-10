const mongoose = require('mongoose');
const slugify = require('slugify');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    slug: {
        type: String,
        unique: true,
        index: true
    },
    content: {
        type: String,
        required: [true, 'Content is required']
    },
    excerpt: {
        type: String,
        maxlength: [300, 'Excerpt cannot exceed 300 characters']
    },
    metaTitle: {
        type: String,
        maxlength: [60, 'Meta title should be under 60 characters']
    },
    metaDescription: {
        type: String,
        maxlength: [160, 'Meta description should be under 160 characters']
    },
    featuredImage: {
        type: String,
        default: ''
    },
    author: {
        type: String,
        default: 'Giakaa Team'
    },
    category: {
        type: String,
        default: 'Insights'
    },
    tags: [{
        type: String,
        trim: true
    }],
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    publishedAt: {
        type: Date
    }
}, {
    timestamps: true
});

// Generate slug before saving
blogPostSchema.pre('save', function (next) {
    if (this.isModified('title') || !this.slug) {
        this.slug = slugify(this.title, { lower: true, strict: true });
    }

    // Set publishedAt when status changes to published
    if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
        this.publishedAt = new Date();
    }

    // Generate excerpt from content if not provided
    if (!this.excerpt && this.content) {
        this.excerpt = this.content.replace(/[#*`]/g, '').substring(0, 250) + '...';
    }

    next();
});

// Index for querying
blogPostSchema.index({ status: 1, publishedAt: -1 });
blogPostSchema.index({ category: 1 });
blogPostSchema.index({ tags: 1 });

module.exports = mongoose.model('BlogPost', blogPostSchema);
