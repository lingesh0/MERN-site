'use client';

import Link from 'next/link';
import TiltCard from '@/components/animations/TiltCard';

const stakeholders = [
    {
        title: 'Startups',
        description: 'Scale your vision with AI-powered solutions and enterprise-grade infrastructure.',
        icon: '🚀',
        color: 'from-cyan-500 to-blue-600',
        href: '/startups',
    },
    {
        title: 'Enterprises',
        description: 'Transform operations with cutting-edge AI and digital innovation strategies.',
        icon: '🏢',
        color: 'from-blue-500 to-purple-600',
        href: '/enterprises',
    },
    {
        title: 'Investors',
        description: 'Access deal flow and insights across emerging technology sectors.',
        icon: '💰',
        color: 'from-purple-500 to-pink-600',
        href: '/investors',
    },
    {
        title: 'Corporates',
        description: 'Partner with us for innovation programs and digital acceleration.',
        icon: '🤝',
        color: 'from-orange-500 to-red-600',
        href: '/corporates',
    },
    {
        title: 'Governments',
        description: 'Build smart cities and digital public services for citizens.',
        icon: '🏛️',
        color: 'from-green-500 to-teal-600',
        href: '/governments',
    },
    {
        title: 'Universities',
        description: 'Collaborate on research, talent development, and innovation labs.',
        icon: '🎓',
        color: 'from-yellow-500 to-orange-600',
        href: '/universities',
    },
];

export default function SixDoors() {
    return (
        <section className="relative py-24 bg-slate-900 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute inset-8 border border-cyan-500/10 rounded-full" />
                    <div className="absolute inset-16 border border-cyan-500/5 rounded-full" />
                </div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium mb-4">
                        Innovation Ecosystem
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Your Gateway to{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Digital Excellence
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Whether you&apos;re a startup, enterprise, or institution—we have the expertise to accelerate your journey.
                    </p>
                </div>

                {/* Six Doors Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stakeholders.map((item, index) => (
                        <TiltCard key={index} className="rounded-2xl">
                            <Link href={item.href} className="block h-full">
                                <div className="relative h-full p-8 bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden group">
                                    {/* Gradient Overlay on Hover */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                    {/* Glow Border on Hover */}
                                    <div className={`absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-current opacity-0 group-hover:opacity-20 transition-all duration-500`}
                                        style={{ borderImageSource: `linear-gradient(to right, ${item.color.includes('cyan') ? '#06b6d4' : item.color.includes('purple') ? '#a855f7' : item.color.includes('orange') ? '#f97316' : item.color.includes('green') ? '#22c55e' : item.color.includes('yellow') ? '#eab308' : '#3b82f6'}, transparent)` }}
                                    />

                                    {/* Icon */}
                                    <div className={`relative w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${item.color} bg-opacity-20 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300`}>
                                        {item.icon}
                                    </div>

                                    {/* Content */}
                                    <h3 className="relative text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:to-blue-500 group-hover:bg-clip-text transition-all duration-300">
                                        {item.title}
                                    </h3>
                                    <p className="relative text-gray-400 leading-relaxed mb-6">
                                        {item.description}
                                    </p>

                                    {/* Arrow */}
                                    <div className="relative flex items-center text-cyan-400 font-medium">
                                        <span className="group-hover:mr-2 transition-all duration-300">Learn more</span>
                                        <svg className="w-5 h-5 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>
                            </Link>
                        </TiltCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
