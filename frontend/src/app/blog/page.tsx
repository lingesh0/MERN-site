import { Metadata } from 'next';
import Link from 'next/link';
import BlogCard from '@/components/blog/BlogCard';
import { BlogPost } from '@/lib/api';
import DetailPageWrapper from '@/components/animations/DetailPageWrapper';

export const metadata: Metadata = {
    title: 'Insights | Giakaa - AI & Digital Transformation Blog',
    description: 'Explore the latest insights, trends, and thought leadership on AI, digital transformation, cloud computing, and enterprise technology.',
    openGraph: {
        title: 'Insights | Giakaa',
        description: 'Latest insights on AI and digital transformation',
    },
};

async function getBlogPosts(): Promise<{ data: BlogPost[]; pagination: { total: number; pages: number } } | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs?limit=12`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return null;
        return res.json();
    } catch {
        return null;
    }
}

// Demo posts for when API is not available
const demoPosts: BlogPost[] = [
    {
        _id: '1',
        title: 'The Future of Enterprise AI: Trends to Watch in 2024',
        slug: 'future-enterprise-ai-trends-2024',
        content: '',
        excerpt: 'Explore the key AI trends that will shape enterprise technology in the coming year, from generative AI to autonomous systems.',
        metaTitle: '',
        metaDescription: '',
        featuredImage: '',
        author: 'Giakaa Team',
        category: 'AI & Machine Learning',
        tags: ['AI', 'Enterprise', 'Trends'],
        status: 'published',
        publishedAt: '2024-01-15T10:00:00Z',
        createdAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
    },
    {
        _id: '2',
        title: 'Cloud Migration Strategies for Large Enterprises',
        slug: 'cloud-migration-strategies-enterprises',
        content: '',
        excerpt: 'A comprehensive guide to planning and executing cloud migration for enterprise-scale organizations with minimal disruption.',
        metaTitle: '',
        metaDescription: '',
        featuredImage: '',
        author: 'Giakaa Team',
        category: 'Cloud Computing',
        tags: ['Cloud', 'Migration', 'Enterprise'],
        status: 'published',
        publishedAt: '2024-01-10T10:00:00Z',
        createdAt: '2024-01-10T10:00:00Z',
        updatedAt: '2024-01-10T10:00:00Z',
    },
    {
        _id: '3',
        title: 'Building Resilient Cybersecurity Frameworks',
        slug: 'resilient-cybersecurity-frameworks',
        content: '',
        excerpt: 'Learn how to build and maintain robust cybersecurity frameworks that protect your organization from evolving threats.',
        metaTitle: '',
        metaDescription: '',
        featuredImage: '',
        author: 'Giakaa Team',
        category: 'Cybersecurity',
        tags: ['Security', 'Frameworks', 'Best Practices'],
        status: 'published',
        publishedAt: '2024-01-05T10:00:00Z',
        createdAt: '2024-01-05T10:00:00Z',
        updatedAt: '2024-01-05T10:00:00Z',
    },
];

export default async function BlogPage() {
    const response = await getBlogPosts();
    const posts = response?.data || demoPosts;

    return (
        <DetailPageWrapper>
            <div className="min-h-screen bg-slate-900 pt-24">
                {/* Hero Section */}
                <section className="relative py-16 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <span className="inline-block px-4 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium mb-4">
                                Insights & Thought Leadership
                            </span>
                            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                                Latest{' '}
                                <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                    Insights
                                </span>
                            </h1>
                            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                                Explore our latest thinking on technology, AI, and digital transformation.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Blog Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {posts.length > 0 ? (
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => (
                                    <BlogCard key={post._id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16">
                                <p className="text-gray-400 text-lg">No posts available yet. Check back soon!</p>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </DetailPageWrapper>
    );
}
