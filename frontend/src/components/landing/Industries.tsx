import Link from 'next/link';

const industries = [
    { name: 'Aerospace', icon: '🚀', color: 'blue' },
    { name: 'Agriculture', icon: '🌾', color: 'green' },
    { name: 'Automotive & Mobility', icon: '🚗', color: 'cyan' },
    { name: 'Aviation', icon: '✈️', color: 'blue' },
    { name: 'Banking & Finance', icon: '🏦', color: 'yellow' },
    { name: 'Chemical Manufacturing', icon: '🧪', color: 'purple' },
    { name: 'Communication & Telecom', icon: '📱', color: 'blue' },
    { name: 'Consumer Goods', icon: '🛒', color: 'orange' },
    { name: 'Defense', icon: '🛡️', color: 'gray' },
    { name: 'Education', icon: '🎓', color: 'blue' },
    { name: 'Energy & Utilities', icon: '⚡', color: 'yellow' },
    { name: 'Healthcare', icon: '🏥', color: 'red' },
    { name: 'High Technology', icon: '💡', color: 'cyan' },
    { name: 'Insurance', icon: '📋', color: 'blue' },
    { name: 'Life Sciences', icon: '🔬', color: 'green' },
    { name: 'Logistics & Supply Chain', icon: '📦', color: 'orange' },
    { name: 'Manufacturing', icon: '🏭', color: 'gray' },
    { name: 'Media & Entertainment', icon: '🎬', color: 'purple' },
    { name: 'Mining & Metals', icon: '⛏️', color: 'brown' },
    { name: 'Oil & Gas', icon: '🛢️', color: 'yellow' },
    { name: 'Professional Services', icon: '💼', color: 'blue' },
    { name: 'Real Estate', icon: '🏢', color: 'cyan' },
    { name: 'Retail & Ecommerce', icon: '🛍️', color: 'pink' },
    { name: 'Renewable Energy', icon: '🌱', color: 'green' },
];

export default function Industries() {
    return (
        <section className="relative py-24 bg-slate-950 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/5 to-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <span className="inline-block px-4 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm font-medium mb-4">
                            Industries We Serve
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Expertise Across{' '}
                            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                                40+ Industries
                            </span>
                        </h2>
                        <p className="text-gray-400 max-w-xl">
                            Deep domain knowledge combined with cutting-edge technology solutions for every sector.
                        </p>
                    </div>
                    <Link
                        href="/industries"
                        className="mt-6 md:mt-0 inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors font-medium group"
                    >
                        View all industries
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Industries Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {industries.map((industry, index) => (
                        <Link
                            key={index}
                            href={`/industries/${industry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                            className="group relative p-4 bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-800 hover:border-purple-500/50 transition-all duration-300 text-center hover:-translate-y-1"
                        >
                            {/* Hover Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Icon */}
                            <div className="relative text-3xl mb-2">{industry.icon}</div>

                            {/* Name */}
                            <h3 className="relative text-sm font-medium text-gray-300 group-hover:text-purple-400 transition-colors">
                                {industry.name}
                            </h3>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
