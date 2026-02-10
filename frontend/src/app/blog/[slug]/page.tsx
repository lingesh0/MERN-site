import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/api';

interface PageProps {
    params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs/${slug}`, {
            next: { revalidate: 60 },
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.data;
    } catch {
        return null;
    }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getBlogPost(resolvedParams.slug);

    if (!post) {
        return {
            title: 'Post Not Found | Giakaa',
        };
    }

    return {
        title: post.metaTitle || `${post.title} | Giakaa Insights`,
        description: post.metaDescription || post.excerpt,
        openGraph: {
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            type: 'article',
            publishedTime: post.publishedAt,
            authors: [post.author],
            images: post.featuredImage ? [{ url: post.featuredImage }] : [],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.metaTitle || post.title,
            description: post.metaDescription || post.excerpt,
            images: post.featuredImage ? [post.featuredImage] : [],
        },
    };
}

// Demo post for when API is not available
const demoPost: BlogPost = {
    _id: '1',
    title: 'The Future of Enterprise AI: Trends to Watch in 2024',
    slug: 'future-enterprise-ai-trends-2024',
    content: `
# The Future of Enterprise AI

Artificial Intelligence is rapidly transforming how enterprises operate, compete, and deliver value to customers. As we look ahead to the coming years, several key trends are emerging that will reshape the enterprise technology landscape.

## 1. Generative AI Goes Mainstream

Generative AI has moved beyond experimentation into production environments. Organizations are now deploying AI-powered tools for:

- **Content Generation**: Automated creation of marketing materials, documentation, and reports
- **Code Assistance**: AI pair programmers that help developers write better code faster
- **Customer Service**: Intelligent chatbots that can handle complex queries

## 2. AI-First Architecture

Forward-thinking enterprises are adopting AI-first approaches to system design:

\`\`\`
Traditional: Data → Processing → Output
AI-First: Data → AI Models → Intelligent Decisions → Adaptive Output
\`\`\`

This shift requires new infrastructure, skills, and governance frameworks.

## 3. Responsible AI Frameworks

With great power comes great responsibility. Organizations are implementing:

- **Bias Detection**: Tools to identify and mitigate algorithmic bias
- **Explainability**: Making AI decisions transparent and understandable
- **Privacy Protection**: Ensuring AI systems respect data privacy regulations

## 4. Edge AI and Real-Time Processing

AI is moving closer to data sources, enabling:

- Lower latency decision making
- Reduced bandwidth requirements
- Enhanced privacy through local processing

## Conclusion

The enterprise AI landscape is evolving rapidly. Organizations that embrace these trends while maintaining focus on ethics and governance will be best positioned for success.

---

*Want to learn how Giakaa can help your organization leverage AI? [Contact us](/contact) today.*
  `,
    excerpt: 'Explore the key AI trends that will shape enterprise technology in the coming year.',
    metaTitle: 'Future of Enterprise AI - 2024 Trends | Giakaa',
    metaDescription: 'Explore the key AI trends shaping enterprise technology: generative AI, AI-first architecture, responsible AI, and edge computing.',
    featuredImage: '',
    author: 'Giakaa Team',
    category: 'AI & Machine Learning',
    tags: ['AI', 'Enterprise', 'Trends', 'GenAI'],
    status: 'published',
    publishedAt: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
};

export default async function BlogDetailPage({ params }: PageProps) {
    const resolvedParams = await params;
    let post = await getBlogPost(resolvedParams.slug);

    // Use demo post if API fails
    if (!post) {
        if (resolvedParams.slug === 'future-enterprise-ai-trends-2024') {
            post = demoPost;
        } else {
            notFound();
        }
    }

    // Simple markdown-like rendering
    const renderContent = (content: string) => {
        return content
            .split('\n')
            .map((line, index) => {
                // Headers
                if (line.startsWith('# ')) {
                    return <h1 key={index} className="text-3xl font-bold text-white mt-8 mb-4">{line.slice(2)}</h1>;
                }
                if (line.startsWith('## ')) {
                    return <h2 key={index} className="text-2xl font-bold text-white mt-8 mb-4">{line.slice(3)}</h2>;
                }
                if (line.startsWith('### ')) {
                    return <h3 key={index} className="text-xl font-bold text-white mt-6 mb-3">{line.slice(4)}</h3>;
                }
                // List items
                if (line.startsWith('- ')) {
                    return <li key={index} className="text-gray-300 ml-4 mb-2">{line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('<strong>').map((part, i) => {
                        if (part.includes('</strong>')) {
                            const [bold, rest] = part.split('</strong>');
                            return <span key={i}><strong className="text-white">{bold}</strong>{rest}</span>;
                        }
                        return part;
                    })}</li>;
                }
                // Code blocks
                if (line.startsWith('```')) {
                    return null;
                }
                // Horizontal rule
                if (line.startsWith('---')) {
                    return <hr key={index} className="border-slate-700 my-8" />;
                }
                // Regular paragraph
                if (line.trim()) {
                    return <p key={index} className="text-gray-300 mb-4 leading-relaxed">{line}</p>;
                }
                return null;
            });
    };

    return (
        <div className="min-h-screen bg-slate-900 pt-24">
            {/* Hero */}
            <section className="relative py-16">
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex items-center space-x-2 text-sm mb-8">
                        <Link href="/" className="text-gray-500 hover:text-cyan-400 transition-colors">Home</Link>
                        <span className="text-gray-600">/</span>
                        <Link href="/blog" className="text-gray-500 hover:text-cyan-400 transition-colors">Insights</Link>
                        <span className="text-gray-600">/</span>
                        <span className="text-gray-400">{post.title.substring(0, 30)}...</span>
                    </nav>

                    {/* Category */}
                    <span className="inline-block px-4 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium mb-6">
                        {post.category}
                    </span>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-400 mb-8">
                        <span className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {post.author}
                        </span>
                        <span className="flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric',
                            })}
                        </span>
                    </div>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-8">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="px-3 py-1 bg-slate-800 text-gray-400 text-sm rounded-full"
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Featured Image */}
            {post.featuredImage && (
                <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                    <div className="relative h-[400px] rounded-2xl overflow-hidden">
                        <Image
                            src={post.featuredImage}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                </section>
            )}

            {/* Content */}
            <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="prose prose-invert max-w-none">
                    {renderContent(post.content)}
                </div>

                {/* Share & Back */}
                <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Back to all insights
                    </Link>

                    <div className="flex items-center gap-4">
                        <span className="text-gray-500">Share:</span>
                        <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-cyan-500 hover:text-white transition-all">
                            <span className="sr-only">Twitter</span>
                            𝕏
                        </button>
                        <button className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all">
                            <span className="sr-only">LinkedIn</span>
                            in
                        </button>
                    </div>
                </div>
            </article>
        </div>
    );
}
