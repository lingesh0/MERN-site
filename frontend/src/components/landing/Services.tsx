import Link from 'next/link';

const services = [
    {
        title: 'Strategy & Digital Transformation',
        description: 'Navigate digital disruption with AI-powered strategy consulting and transformation roadmaps.',
        icon: '🎯',
        href: '/services/strategy-digital-transformation',
    },
    {
        title: 'Application Services',
        description: 'Custom application development, modernization, and maintenance powered by AI.',
        icon: '💻',
        href: '/services/application-services',
    },
    {
        title: 'Cloud Services',
        description: 'Multi-cloud strategies, migration, and optimization for scalable infrastructure.',
        icon: '☁️',
        href: '/services/cloud-services',
    },
    {
        title: 'Data, Analytics & AI',
        description: 'Transform data into insights with advanced analytics, ML, and GenAI solutions.',
        icon: '🤖',
        href: '/services/data-analytics-ai',
    },
    {
        title: 'Digital Engineering',
        description: 'Product engineering and development using modern DevOps and agile practices.',
        icon: '⚙️',
        href: '/services/digital-engineering',
    },
    {
        title: 'IoT & Connected Products',
        description: 'Build intelligent connected ecosystems with edge computing and IoT platforms.',
        icon: '📡',
        href: '/services/iot-connected-products',
    },
    {
        title: 'Cybersecurity',
        description: 'Protect your digital assets with AI-driven threat detection and zero-trust security.',
        icon: '🔐',
        href: '/services/cybersecurity',
    },
    {
        title: 'Integration & Middleware',
        description: 'Seamless system integration with API management and enterprise middleware.',
        icon: '🔗',
        href: '/services/integration-middleware',
    },
    {
        title: 'Digital Experience & Design',
        description: 'Create compelling user experiences with UX/UI design and digital innovation.',
        icon: '🎨',
        href: '/services/digital-experience',
    },
    {
        title: 'Infrastructure Modernization',
        description: 'Modernize legacy infrastructure with containerization and microservices.',
        icon: '🏗️',
        href: '/services/infrastructure-modernization',
    },
    {
        title: 'Blockchain & Web3',
        description: 'Decentralized solutions with smart contracts and blockchain architecture.',
        icon: '⛓️',
        href: '/services/blockchain-web3',
    },
    {
        title: 'Quantum Computing',
        description: 'Future-ready solutions exploring quantum algorithms and applications.',
        icon: '⚛️',
        href: '/services/quantum-computing',
    },
];

export default function Services() {
    return (
        <section className="relative py-24 bg-slate-900 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
                    <div>
                        <span className="inline-block px-4 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium mb-4">
                            Our Services
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            End-to-End{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Digital Solutions
                            </span>
                        </h2>
                        <p className="text-gray-400 max-w-xl">
                            Comprehensive technology services designed to accelerate your digital transformation journey.
                        </p>
                    </div>
                    <Link
                        href="/services"
                        className="mt-6 md:mt-0 inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors font-medium group"
                    >
                        View all services
                        <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Services Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {services.map((service, index) => (
                        <Link
                            key={index}
                            href={service.href}
                            className="group relative p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Hover Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Icon */}
                            <div className="relative text-4xl mb-4">{service.icon}</div>

                            {/* Content */}
                            <h3 className="relative text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                {service.title}
                            </h3>
                            <p className="relative text-gray-400 text-sm leading-relaxed">
                                {service.description}
                            </p>

                            {/* Arrow */}
                            <div className="relative mt-4 flex items-center text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
