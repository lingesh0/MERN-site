import Link from 'next/link';
import type { Metadata } from 'next';
import DetailPageWrapper from '@/components/animations/DetailPageWrapper';
import {
    Target, Laptop, Cloud, Database, Cpu, Wifi, ShieldCheck, Network,
    Palette, Server, Blocks, Atom, Sparkles, Workflow, CheckCircle,
    BarChart3, MonitorCheck, ArrowRight, ChevronRight
} from 'lucide-react';

// Service data - fallback when API is unavailable
const serviceData: Record<string, {
    title: string;
    icon: any;
    gradient: string;
    description: string;
    features: string[];
    relatedIndustries: string[];
    content: string;
}> = {
    'strategy-digital-transformation': {
        title: 'Strategy & Digital Transformation',
        icon: Target,
        gradient: 'from-blue-500 to-cyan-400',
        description: 'Navigate digital disruption with AI-powered strategy consulting and transformation roadmaps that align technology with business objectives.',
        features: ['Digital Maturity Assessment', 'Transformation Roadmap', 'Change Management', 'Innovation Labs', 'Technology Advisory', 'ROI Optimization'],
        relatedIndustries: ['Banking & Finance', 'Healthcare', 'Manufacturing', 'Retail & Ecommerce'],
        content: 'We help enterprises navigate the complexities of digital transformation by combining deep industry expertise with cutting-edge technology capabilities.',
    },
    'application-services': {
        title: 'Application Services',
        icon: Laptop,
        gradient: 'from-violet-500 to-purple-400',
        description: 'Custom application development, modernization, and maintenance powered by AI and modern engineering practices.',
        features: ['Custom App Development', 'Legacy Modernization', 'Application Management', 'Low-Code/No-Code', 'SaaS Development', 'API Development'],
        relatedIndustries: ['High Technology', 'Banking & Finance', 'Healthcare', 'Insurance'],
        content: 'Our application services combine modern development practices with AI-driven quality engineering to deliver scalable, resilient applications.',
    },
    'cloud-services': {
        title: 'Cloud Services',
        icon: Cloud,
        gradient: 'from-cyan-500 to-blue-400',
        description: 'Multi-cloud strategies, migration, and optimization for scalable, resilient infrastructure.',
        features: ['Cloud Migration', 'Multi-Cloud Strategy', 'Cloud-Native Development', 'Cost Optimization', 'DevOps & SRE', 'Serverless Architecture'],
        relatedIndustries: ['High Technology', 'Banking & Finance', 'Media & Entertainment', 'Retail & Ecommerce'],
        content: 'Our cloud services help you build, migrate, and optimize applications across AWS, Azure, and Google Cloud with enterprise-grade security.',
    },
    'data-analytics-ai': {
        title: 'Data, Analytics & AI',
        icon: Database,
        gradient: 'from-emerald-500 to-teal-400',
        description: 'Transform data into insights with advanced analytics, ML pipelines, and GenAI solutions.',
        features: ['Data Engineering', 'Business Intelligence', 'Machine Learning', 'GenAI/LLM Solutions', 'Data Governance', 'Real-time Analytics'],
        relatedIndustries: ['Banking & Finance', 'Healthcare', 'Retail & Ecommerce', 'Manufacturing'],
        content: 'We build end-to-end data platforms that transform raw data into actionable insights, powered by machine learning and generative AI.',
    },
    'digital-engineering': {
        title: 'Digital Engineering',
        icon: Cpu,
        gradient: 'from-orange-500 to-amber-400',
        description: 'Product engineering and development using modern DevOps, CI/CD, and agile practices.',
        features: ['Product Engineering', 'DevOps & CI/CD', 'Microservices', 'Platform Engineering', 'Agile Delivery', 'Technical Architecture'],
        relatedIndustries: ['High Technology', 'Automotive & Mobility', 'Aerospace', 'Manufacturing'],
        content: 'Our digital engineering teams build and scale products using modern practices like DevOps, microservices, and platform engineering.',
    },
    'iot-connected-products': {
        title: 'IoT & Connected Products',
        icon: Wifi,
        gradient: 'from-teal-500 to-green-400',
        description: 'Build intelligent connected ecosystems with edge computing, IoT platforms, and real-time analytics.',
        features: ['IoT Platform Development', 'Edge Computing', 'Digital Twins', 'Industrial IoT', 'Smart Products', 'Predictive Maintenance'],
        relatedIndustries: ['Manufacturing', 'Automotive & Mobility', 'Energy & Utilities', 'Healthcare'],
        content: 'We design and implement IoT solutions that connect devices, collect data, and drive intelligent automation across industries.',
    },
    'cybersecurity': {
        title: 'Cybersecurity',
        icon: ShieldCheck,
        gradient: 'from-red-500 to-rose-400',
        description: 'Protect your digital assets with AI-driven threat detection, zero-trust architecture, and compliance.',
        features: ['Threat Detection & Response', 'Zero Trust Architecture', 'Cloud Security', 'Compliance & GRC', 'Identity & Access Management', 'Security Operations'],
        relatedIndustries: ['Banking & Finance', 'Healthcare', 'Defense', 'Government'],
        content: 'Our cybersecurity practice protects enterprises with AI-powered threat detection, zero-trust frameworks, and 24/7 security operations.',
    },
    'integration-middleware': {
        title: 'Integration & Middleware',
        icon: Network,
        gradient: 'from-indigo-500 to-blue-400',
        description: 'Seamless system integration with API management, ESB, and enterprise middleware solutions.',
        features: ['API Management', 'Enterprise Integration', 'iPaaS Solutions', 'Event-Driven Architecture', 'Data Integration', 'B2B Integration'],
        relatedIndustries: ['Banking & Finance', 'Logistics & Supply Chain', 'Manufacturing', 'Retail & Ecommerce'],
        content: 'We connect your enterprise systems, data, and applications through modern integration platforms and API-first architectures.',
    },
    'digital-experience': {
        title: 'Digital Experience & Design',
        icon: Palette,
        gradient: 'from-pink-500 to-rose-400',
        description: 'Create compelling user experiences with UX/UI design, design systems, and digital innovation.',
        features: ['UX Research & Strategy', 'UI Design', 'Design Systems', 'Accessibility', 'CX Optimization', 'Rapid Prototyping'],
        relatedIndustries: ['Retail & Ecommerce', 'Media & Entertainment', 'Banking & Finance', 'Healthcare'],
        content: 'Our design team creates human-centered digital experiences that drive engagement, conversion, and customer loyalty.',
    },
    'infrastructure-modernization': {
        title: 'Infrastructure Modernization',
        icon: Server,
        gradient: 'from-slate-500 to-gray-400',
        description: 'Modernize legacy infrastructure with containerization, microservices, and serverless architectures.',
        features: ['Container Orchestration', 'Kubernetes Management', 'Infrastructure as Code', 'Hybrid Cloud', 'Network Modernization', 'Disaster Recovery'],
        relatedIndustries: ['Banking & Finance', 'Manufacturing', 'Government', 'Energy & Utilities'],
        content: 'We modernize legacy infrastructure using containers, Kubernetes, and infrastructure-as-code for improved agility and cost efficiency.',
    },
    'blockchain-web3': {
        title: 'Blockchain & Web3',
        icon: Blocks,
        gradient: 'from-amber-500 to-yellow-400',
        description: 'Decentralized solutions with smart contracts, DeFi protocols, and blockchain architecture.',
        features: ['Smart Contracts', 'DeFi Development', 'NFT Platforms', 'Supply Chain Tracking', 'Tokenization', 'Decentralized Identity'],
        relatedIndustries: ['Banking & Finance', 'Logistics & Supply Chain', 'Real Estate', 'High Technology'],
        content: 'We build enterprise blockchain solutions that enable trust, transparency, and efficiency across business networks.',
    },
    'quantum-computing': {
        title: 'Quantum Computing',
        icon: Atom,
        gradient: 'from-fuchsia-500 to-purple-400',
        description: 'Future-ready solutions exploring quantum algorithms, optimization, and post-quantum cryptography.',
        features: ['Quantum Algorithm Design', 'Quantum Optimization', 'Post-Quantum Cryptography', 'Quantum Machine Learning', 'Hybrid Quantum Systems', 'Research Partnerships'],
        relatedIndustries: ['High Technology', 'Banking & Finance', 'Aerospace', 'Life Sciences'],
        content: 'Our quantum computing practice explores the frontier of computation, preparing enterprises for the quantum advantage.',
    },
    'generative-ai': {
        title: 'Generative AI Solutions',
        icon: Sparkles,
        gradient: 'from-cyan-400 to-blue-500',
        description: 'Enterprise GenAI implementation with LLMs, RAG pipelines, AI agents, and responsible AI frameworks.',
        features: ['LLM Fine-tuning', 'RAG Pipelines', 'AI Agents', 'Prompt Engineering', 'Responsible AI', 'AI Governance'],
        relatedIndustries: ['High Technology', 'Banking & Finance', 'Healthcare', 'Media & Entertainment'],
        content: 'We implement production-grade GenAI solutions using the latest LLMs, retrieval-augmented generation, and agentic AI frameworks.',
    },
    'business-process-automation': {
        title: 'Business Process Automation',
        icon: Workflow,
        gradient: 'from-green-500 to-emerald-400',
        description: 'Intelligent automation with RPA, process mining, and AI-powered workflow orchestration.',
        features: ['RPA Implementation', 'Process Mining', 'Intelligent Document Processing', 'Workflow Automation', 'Chatbot Development', 'Hyperautomation'],
        relatedIndustries: ['Banking & Finance', 'Insurance', 'Manufacturing', 'Healthcare'],
        content: 'We automate complex business processes using RPA, AI, and process mining to drive efficiency and reduce operational costs.',
    },
    'quality-engineering': {
        title: 'Quality Engineering & Testing',
        icon: CheckCircle,
        gradient: 'from-lime-500 to-green-400',
        description: 'AI-driven test automation, performance engineering, and quality assurance at scale.',
        features: ['Test Automation', 'Performance Testing', 'Security Testing', 'AI-Powered Testing', 'Continuous Testing', 'Accessibility Testing'],
        relatedIndustries: ['High Technology', 'Banking & Finance', 'Healthcare', 'Retail & Ecommerce'],
        content: 'Our quality engineering practice ensures software reliability through AI-driven test automation and continuous quality monitoring.',
    },
    'enterprise-resource-planning': {
        title: 'Enterprise Resource Planning',
        icon: BarChart3,
        gradient: 'from-blue-600 to-indigo-400',
        description: 'SAP, Oracle, and Microsoft ERP implementation, migration, and optimization services.',
        features: ['SAP S/4HANA', 'Oracle Cloud ERP', 'Microsoft Dynamics', 'ERP Migration', 'Custom Extensions', 'Data Migration'],
        relatedIndustries: ['Manufacturing', 'Retail & Ecommerce', 'Consumer Goods', 'Oil & Gas'],
        content: 'We implement and optimize enterprise resource planning systems that streamline operations and enable data-driven decision-making.',
    },
    'managed-it-services': {
        title: 'Managed IT Services',
        icon: MonitorCheck,
        gradient: 'from-gray-500 to-slate-400',
        description: '24/7 IT operations management, NOC/SOC services, and proactive infrastructure monitoring.',
        features: ['24/7 Monitoring', 'Help Desk', 'NOC/SOC Services', 'Incident Management', 'Capacity Planning', 'Vendor Management'],
        relatedIndustries: ['Banking & Finance', 'Healthcare', 'Manufacturing', 'Energy & Utilities'],
        content: 'Our managed services provide round-the-clock IT operations management, ensuring maximum uptime and optimal performance.',
    },
};

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const resolvedParams = await params;
    const service = serviceData[resolvedParams.slug];
    return {
        title: service ? `${service.title} | Giakaa Services` : 'Service | Giakaa',
        description: service?.description || 'Giakaa IT services',
    };
}

export async function generateStaticParams() {
    return Object.keys(serviceData).map((slug) => ({ slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
    const resolvedParams = await params;
    const service = serviceData[resolvedParams.slug];

    if (!service) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Service Not Found</h1>
                    <Link href="/services" className="text-cyan-400 hover:text-cyan-300">
                        ← Back to Services
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <DetailPageWrapper>
            <div className="min-h-screen bg-slate-900">
                {/* Hero */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className={`absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br ${service.gradient} opacity-10 rounded-full blur-[120px]`} />
                    </div>

                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Breadcrumb */}
                        <nav className="flex mb-8">
                            <ol className="flex items-center space-x-2 text-sm text-gray-400">
                                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                                <li><span className="mx-2">/</span></li>
                                <li><Link href="/services" className="hover:text-cyan-400 transition-colors">Services</Link></li>
                                <li><span className="mx-2">/</span></li>
                                <li className="text-cyan-400">{service.title}</li>
                            </ol>
                        </nav>

                        <div className="flex items-start gap-6 mb-8">
                            <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-cyan-400">
                                <service.icon className="w-16 h-16" strokeWidth={1.5} />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                                    {service.title}
                                </h1>
                                <p className="text-xl text-gray-400 max-w-3xl leading-relaxed">
                                    {service.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="relative pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-3 gap-12">
                            {/* Main Content */}
                            <div className="lg:col-span-2 space-y-12">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                                    <p className="text-gray-300 leading-relaxed text-lg">{service.content}</p>
                                </div>

                                {/* Features Grid */}
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-6">Key Capabilities</h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {service.features.map((feature, i) => (
                                            <div
                                                key={i}
                                                className="flex items-center gap-3 p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
                                            >
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} />
                                                <span className="text-gray-300">{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* CTA */}
                                <div className="p-8 bg-gradient-to-r from-slate-800 to-slate-800/50 rounded-2xl border border-slate-700/50">
                                    <h3 className="text-2xl font-bold text-white mb-3">Ready to get started?</h3>
                                    <p className="text-gray-400 mb-6">Let&apos;s discuss how {service.title} can transform your business.</p>
                                    <Link
                                        href="/contact"
                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5"
                                    >
                                        Contact Us
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Link>
                                </div>
                            </div>

                            {/* Sidebar */}
                            <div className="space-y-8">
                                {/* Related Industries */}
                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                                    <h3 className="text-lg font-bold text-white mb-4">Related Industries</h3>
                                    <div className="space-y-2">
                                        {service.relatedIndustries.map((industry, i) => (
                                            <Link
                                                key={i}
                                                href={`/industries/${industry.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                                                className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-700/50 transition-colors text-gray-300 hover:text-cyan-400"
                                            >
                                                {industry}
                                                <ChevronRight className="w-4 h-4" />
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                {/* Other Services */}
                                <div className="p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50">
                                    <h3 className="text-lg font-bold text-white mb-4">Other Services</h3>
                                    <div className="space-y-2">
                                        {Object.entries(serviceData)
                                            .filter(([slug]) => slug !== resolvedParams.slug)
                                            .slice(0, 5)
                                            .map(([slug, s]) => (
                                                <Link
                                                    key={slug}
                                                    href={`/services/${slug}`}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-700/50 transition-colors text-gray-300 hover:text-cyan-400"
                                                >
                                                    <s.icon className="w-5 h-5 text-cyan-400" />
                                                    <span className="text-sm">{s.title}</span>
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </DetailPageWrapper>
    );
}
