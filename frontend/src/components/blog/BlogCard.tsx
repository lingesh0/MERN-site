import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '@/lib/api';

interface BlogCardProps {
    post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group block bg-slate-800/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
        >
            {/* Featured Image */}
            <div className="relative h-48 overflow-hidden">
                {post.featuredImage ? (
                    <Image
                        src={post.featuredImage}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-cyan-500/20 to-blue-600/20 flex items-center justify-center">
                        <span className="text-4xl">📝</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />

                {/* Category Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-cyan-500/20 backdrop-blur-sm text-cyan-400 text-sm font-medium rounded-full">
                    {post.category}
                </span>
            </div>

            {/* Content */}
            <div className="p-6">
                {/* Date */}
                <p className="text-sm text-gray-500 mb-2">
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </p>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors line-clamp-2">
                    {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm line-clamp-3 mb-4">
                    {post.excerpt}
                </p>

                {/* Author & Read More */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">By {post.author}</span>
                    <span className="text-cyan-400 text-sm font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                        Read more
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}
