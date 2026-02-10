import Link from 'next/link';

const features = [
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        title: 'Built for the AI Era',
        description: 'Unlike legacy firms retrofitting AI into outdated methodologies, Giakaa was purpose-built with artificial intelligence at our core. Every solution leverages AI, machine learning, and intelligent automation to deliver adaptive systems that learn and improve over time.',
        color: 'cyan',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: 'Rapid, High-Impact Delivery',
        description: 'We combine agile methodologies, pre-built AI accelerators, and modern engineering practices to deliver production-ready solutions 3-5x faster than traditional consultancies—without compromising quality, security, or scalability.',
        color: 'blue',
    },
    {
        icon: (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        title: 'ROI-Focused Results',
        description: 'Every engagement is designed with clear KPIs and success metrics. We focus relentlessly on outcomes that matter: revenue growth, cost reduction, operational efficiency, customer satisfaction, and competitive differentiation.',
        color: 'purple',
    },
];

export default function WhyGiakaa() {
    return (
        <section className="relative py-24 bg-slate-950 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium mb-4">
                        Why Giakaa
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        What Makes Us{' '}
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            Different
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        We don&apos;t just consult—we partner with you to deliver measurable transformation.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative p-8 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-500"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Icon */}
                            <div className={`relative w-16 h-16 mb-6 rounded-xl bg-gradient-to-br from-${feature.color}-500/20 to-${feature.color}-600/20 flex items-center justify-center text-${feature.color}-400 group-hover:scale-110 transition-transform duration-300`}>
                                <div className="w-14 h-14 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 rounded-xl flex items-center justify-center text-cyan-400">
                                    {feature.icon}
                                </div>
                            </div>

                            {/* Content */}
                            <h3 className="relative text-xl font-bold text-white mb-4 group-hover:text-cyan-400 transition-colors">
                                {feature.title}
                            </h3>
                            <p className="relative text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Arrow */}
                            <div className="relative mt-6 flex items-center text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="text-sm font-medium">Learn more</span>
                                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
