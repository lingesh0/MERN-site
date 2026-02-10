'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { blogApi, BlogPost } from '@/lib/api';

export default function BlogManagement() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        excerpt: '',
        metaTitle: '',
        metaDescription: '',
        featuredImage: '',
        author: 'Giakaa Team',
        category: 'Insights',
        tags: '',
        status: 'draft' as 'draft' | 'published',
    });
    const [preview, setPreview] = useState(false);

    const fetchPosts = async () => {
        try {
            const response = await blogApi.getAll({ status: 'all' });
            if (response.success && response.data) {
                setPosts(response.data);
            }
        } catch (error) {
            console.error('Failed to fetch posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent, status?: 'draft' | 'published') => {
        e.preventDefault();

        const form = new FormData();
        Object.entries({ ...formData, status: status || formData.status }).forEach(([key, value]) => {
            form.append(key, String(value));
        });

        try {
            if (editingPost) {
                await blogApi.update(editingPost._id, form);
            } else {
                await blogApi.create(form);
            }
            setShowForm(false);
            setEditingPost(null);
            setFormData({
                title: '',
                content: '',
                excerpt: '',
                metaTitle: '',
                metaDescription: '',
                featuredImage: '',
                author: 'Giakaa Team',
                category: 'Insights',
                tags: '',
                status: 'draft',
            });
            fetchPosts();
        } catch (error) {
            console.error('Failed to save post:', error);
        }
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt || '',
            metaTitle: post.metaTitle || '',
            metaDescription: post.metaDescription || '',
            featuredImage: post.featuredImage || '',
            author: post.author,
            category: post.category,
            tags: post.tags.join(', '),
            status: post.status,
        });
        setShowForm(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            await blogApi.delete(id);
            fetchPosts();
        } catch (error) {
            console.error('Failed to delete post:', error);
        }
    };

    return (
        <div>
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Blog Posts</h1>
                    <p className="text-gray-400">Create and manage blog content with Markdown support.</p>
                </div>
                <button
                    onClick={() => {
                        setEditingPost(null);
                        setFormData({
                            title: '',
                            content: '',
                            excerpt: '',
                            metaTitle: '',
                            metaDescription: '',
                            featuredImage: '',
                            author: 'Giakaa Team',
                            category: 'Insights',
                            tags: '',
                            status: 'draft',
                        });
                        setShowForm(true);
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                    + New Post
                </button>
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-slate-800 rounded-xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
                        {/* Form Header */}
                        <div className="flex justify-between items-center p-6 border-b border-slate-700">
                            <h2 className="text-2xl font-bold text-white">
                                {editingPost ? 'Edit Post' : 'Create New Post'}
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPreview(!preview)}
                                    className={`px-4 py-2 rounded-lg transition-all ${preview ? 'bg-cyan-500 text-white' : 'bg-slate-700 text-gray-300'
                                        }`}
                                >
                                    {preview ? 'Edit' : 'Preview'}
                                </button>
                                <button
                                    onClick={() => {
                                        setShowForm(false);
                                        setEditingPost(null);
                                        setPreview(false);
                                    }}
                                    className="px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>

                        {/* Form Content */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {preview ? (
                                /* Preview Mode */
                                <div className="prose prose-invert max-w-none">
                                    <h1>{formData.title || 'Untitled Post'}</h1>
                                    <p className="text-gray-400">{formData.excerpt}</p>
                                    <hr />
                                    <div className="whitespace-pre-wrap">{formData.content}</div>
                                </div>
                            ) : (
                                /* Edit Mode */
                                <form id="postForm" onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white text-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                            placeholder="Enter post title"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                            >
                                                <option value="Insights">Insights</option>
                                                <option value="AI & Machine Learning">AI & Machine Learning</option>
                                                <option value="Cloud Computing">Cloud Computing</option>
                                                <option value="Cybersecurity">Cybersecurity</option>
                                                <option value="Digital Transformation">Digital Transformation</option>
                                                <option value="Case Studies">Case Studies</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Author</label>
                                            <input
                                                type="text"
                                                name="author"
                                                value={formData.author}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Content * <span className="text-gray-500">(Markdown supported)</span>
                                        </label>
                                        <textarea
                                            name="content"
                                            value={formData.content}
                                            onChange={handleChange}
                                            required
                                            rows={15}
                                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                                            placeholder="# Your content here...

Write your blog post using Markdown syntax:
- **bold** for emphasis
- ## Headers for sections
- `code` for inline code
- Lists and more"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Excerpt</label>
                                        <textarea
                                            name="excerpt"
                                            value={formData.excerpt}
                                            onChange={handleChange}
                                            rows={2}
                                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                                            placeholder="Brief summary for listing pages (auto-generated if empty)"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Featured Image URL</label>
                                        <input
                                            type="url"
                                            name="featuredImage"
                                            value={formData.featuredImage}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                                        <input
                                            type="text"
                                            name="tags"
                                            value={formData.tags}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                            placeholder="AI, Cloud, Enterprise (comma separated)"
                                        />
                                    </div>

                                    {/* SEO Section */}
                                    <div className="border-t border-slate-700 pt-6">
                                        <h3 className="text-lg font-bold text-white mb-4">SEO Settings</h3>
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Meta Title <span className="text-gray-500">(60 chars max)</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    name="metaTitle"
                                                    value={formData.metaTitle}
                                                    onChange={handleChange}
                                                    maxLength={60}
                                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                                    placeholder="SEO optimized title"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                                    Meta Description <span className="text-gray-500">(160 chars max)</span>
                                                </label>
                                                <textarea
                                                    name="metaDescription"
                                                    value={formData.metaDescription}
                                                    onChange={handleChange}
                                                    maxLength={160}
                                                    rows={2}
                                                    className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
                                                    placeholder="SEO description for search results"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </div>

                        {/* Form Footer */}
                        {!preview && (
                            <div className="flex gap-4 p-6 border-t border-slate-700">
                                <button
                                    type="button"
                                    onClick={(e) => handleSubmit(e, 'draft')}
                                    className="px-6 py-3 bg-slate-700 text-gray-300 font-semibold rounded-lg hover:bg-slate-600 transition-all"
                                >
                                    Save as Draft
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => handleSubmit(e, 'published')}
                                    className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                                >
                                    {editingPost?.status === 'published' ? 'Update Post' : 'Publish Post'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Posts List */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto"></div>
                </div>
            ) : posts.length === 0 ? (
                <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
                    <p className="text-gray-400 mb-4">No blog posts yet.</p>
                    <button
                        onClick={() => setShowForm(true)}
                        className="text-cyan-400 hover:text-cyan-300"
                    >
                        Create your first post
                    </button>
                </div>
            ) : (
                <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-slate-900/50">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Title</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Category</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Date</th>
                                <th className="px-6 py-4 text-right text-sm font-medium text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700">
                            {posts.map((post) => (
                                <tr key={post._id} className="hover:bg-slate-700/50">
                                    <td className="px-6 py-4">
                                        <div>
                                            <p className="text-white font-medium line-clamp-1">{post.title}</p>
                                            <p className="text-gray-500 text-sm">/{post.slug}</p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-gray-400">{post.category}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 text-xs rounded-full ${post.status === 'published'
                                                ? 'bg-green-500/20 text-green-400'
                                                : 'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400 text-sm">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex justify-end gap-2">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                target="_blank"
                                                className="px-3 py-1 text-gray-400 hover:text-cyan-400 transition-colors"
                                            >
                                                View
                                            </Link>
                                            <button
                                                onClick={() => handleEdit(post)}
                                                className="px-3 py-1 text-gray-400 hover:text-white transition-colors"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(post._id)}
                                                className="px-3 py-1 text-gray-400 hover:text-red-400 transition-colors"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
