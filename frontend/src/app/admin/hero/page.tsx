'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { heroApi, HeroSlide } from '@/lib/api';

export default function HeroManagement() {
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        mediaUrl: '',
        mediaType: 'image' as 'image' | 'video',
        ctaText: "Let's Talk",
        ctaLink: '/contact',
        order: 0,
        isActive: true,
    });

    const fetchSlides = async () => {
        try {
            const response = await heroApi.getAll(true);
            if (response.success && response.data) {
                setSlides(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch slides:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSlides();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const form = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            form.append(key, String(value));
        });

        try {
            if (editingSlide) {
                await heroApi.update(editingSlide._id, form);
            } else {
                await heroApi.create(form);
            }
            setShowForm(false);
            setEditingSlide(null);
            setFormData({
                title: '',
                description: '',
                mediaUrl: '',
                mediaType: 'image',
                ctaText: "Let's Talk",
                ctaLink: '/contact',
                order: 0,
                isActive: true,
            });
            fetchSlides();
        } catch (error) {
            console.error('Failed to save slide:', error);
        }
    };

    const handleEdit = (slide: HeroSlide) => {
        setEditingSlide(slide);
        setFormData({
            title: slide.title,
            description: slide.description,
            mediaUrl: slide.mediaUrl,
            mediaType: slide.mediaType,
            ctaText: slide.ctaText,
            ctaLink: slide.ctaLink,
            order: slide.order,
            isActive: slide.isActive,
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this slide?')) return;

        try {
            await heroApi.delete(id);
            fetchSlides();
        } catch (error) {
            console.error('Failed to delete slide:', error);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Hero Slides</h1>
                    <p className="text-gray-400">Manage hero section slides on the homepage.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingSlide(null);
                        setFormData({
                            title: '',
                            description: '',
                            mediaUrl: '',
                            mediaType: 'image',
                            ctaText: "Let's Talk",
                            ctaLink: '/contact',
                            order: slides.length,
                            isActive: true,
                        });
                        setShowForm(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                    + Add Slide
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <h2 className="text-2xl font-bold text-white mb-6">
                            {editingSlide ? 'Edit Slide' : 'Add New Slide'}
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    placeholder="Slide title"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows={3}
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                                    placeholder="Slide description"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Media Type</label>
                                    <select
                                        name="mediaType"
                                        value={formData.mediaType}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    >
                                        <option value="image">Image</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Order</label>
                                    <input
                                        type="number"
                                        name="order"
                                        value={formData.order}
                                        onChange={handleChange}
                                        min="0"
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Media URL</label>
                                <input
                                    type="url"
                                    name="mediaUrl"
                                    value={formData.mediaUrl}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    placeholder="https://example.com/image.jpg"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">CTA Text</label>
                                    <input
                                        type="text"
                                        name="ctaText"
                                        value={formData.ctaText}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">CTA Link</label>
                                    <input
                                        type="text"
                                        name="ctaLink"
                                        value={formData.ctaLink}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    id="isActive"
                                    checked={formData.isActive}
                                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                                    className="w-5 h-5 text-cyan-500 bg-slate-900 border-slate-700 rounded focus:ring-cyan-500"
                                />
                                <label htmlFor="isActive" className="ml-3 text-gray-300">Active (visible on site)</label>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="submit"
                                    className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                                >
                                    {editingSlide ? 'Update Slide' : 'Create Slide'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingSlide(null);
                                    }}
                                    className="px-6 py-3 bg-slate-700 text-gray-300 font-semibold rounded-lg hover:bg-slate-600 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Slides List */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
                </div>
            ) : slides.length === 0 ? (
                <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="text-gray-400 mb-4">No hero slides yet.</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="text-cyan-400 hover:text-cyan-300"
                    >
                        Create your first slide
                    </button>
                </div>
            ) : (
                <div className="space-y-4">
                    {slides.sort((a, b) => a.order - b.order).map((slide) => (
                        <div
                            key={slide._id}
                            className="bg-slate-800 rounded-xl p-6 border border-slate-700 flex items-center gap-6"
                        >
                            {/* Order */}
                            <div className="text-2xl font-bold text-gray-600 w-8 text-center">
                                {slide.order}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="text-lg font-bold text-white">{slide.title}</h3>
                                    <span className={`px-2 py-0.5 text-xs rounded-full ${slide.isActive
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-gray-500/20 text-gray-400'
                                        }`}>
                                        {slide.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                    <span className="px-2 py-0.5 text-xs bg-slate-700 text-gray-400 rounded-full">
                                        {slide.mediaType}
                                    </span>
                                </div>
                                <p className="text-gray-400 text-sm line-clamp-1">{slide.description}</p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleEdit(slide)}
                                    className="px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-all"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(slide._id)}
                                    className="px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
