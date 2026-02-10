const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  mediaUrl: {
    type: String,
    required: [true, 'Media URL is required']
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    default: 'image'
  },
  ctaText: {
    type: String,
    trim: true,
    default: 'Learn More'
  },
  ctaLink: {
    type: String,
    trim: true,
    default: '/contact'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for ordering
heroSlideSchema.index({ order: 1, isActive: 1 });

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
