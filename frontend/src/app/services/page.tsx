'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import PageTransition from '@/components/animations/PageTransition';
import {
    Target, Laptop, Cloud, Database, Cpu, Wifi, ShieldCheck, Network,
    Palette, Server, Blocks, Atom, Sparkles, Workflow, CheckCircle,
    BarChart3, MonitorCheck, ArrowRight
} from 'lucide-react';

const services = [
    { title: 'Strategy & Digital Transformation', slug: 'strategy-digital-transformation', description: 'Navigate digital disruption with AI-powered strategy consulting and transformation roadmaps that align technology with business objectives.', icon: Target, gradient: 'from-blue-500 to-cyan-400' },
    { title: 'Application Services', slug: 'application-services', description: 'Custom application development, modernization, and maintenance powered by AI and modern engineering practices.', icon: Laptop, gradient: 'from-violet-500 to-purple-400' },
    { title: 'Cloud Services', slug: 'cloud-services', description: 'Multi-cloud strategies, migration, and optimization for scalable, resilient infrastructure.', icon: Cloud, gradient: 'from-cyan-500 to-blue-400' },
    { title: 'Data, Analytics & AI', slug: 'data-analytics-ai', description: 'Transform data into insights with advanced analytics, ML pipelines, and GenAI solutions.', icon: Database, gradient: 'from-emerald-500 to-teal-400' },
    { title: 'Digital Engineering', slug: 'digital-engineering', description: 'Product engineering and development using modern DevOps, CI/CD, and agile practices.', icon: Cpu, gradient: 'from-orange-500 to-amber-400' },
    { title: 'IoT & Connected Products', slug: 'iot-connected-products', description: 'Build intelligent connected ecosystems with edge computing, IoT platforms, and real-time analytics.', icon: Wifi, gradient: 'from-teal-500 to-green-400' },
    { title: 'Cybersecurity', slug: 'cybersecurity', description: 'Protect your digital assets with AI-driven threat detection, zero-trust architecture, and compliance.', icon: ShieldCheck, gradient: 'from-red-500 to-rose-400' },
    { title: 'Integration & Middleware', slug: 'integration-middleware', description: 'Seamless system integration with API management, ESB, and enterprise middleware solutions.', icon: Network, gradient: 'from-indigo-500 to-blue-400' },
    { title: 'Digital Experience & Design', slug: 'digital-experience', description: 'Create compelling user experiences with UX/UI design, design systems, and digital innovation.', icon: Palette, gradient: 'from-pink-500 to-rose-400' },
    { title: 'Infrastructure Modernization', slug: 'infrastructure-modernization', description: 'Modernize legacy infrastructure with containerization, microservices, and serverless architectures.', icon: Server, gradient: 'from-slate-500 to-gray-400' },
    { title: 'Blockchain & Web3', slug: 'blockchain-web3', description: 'Decentralized solutions with smart contracts, DeFi protocols, and blockchain architecture.', icon: Blocks, gradient: 'from-amber-500 to-yellow-400' },
    { title: 'Quantum Computing', slug: 'quantum-computing', description: 'Future-ready solutions exploring quantum algorithms, optimization, and post-quantum cryptography.', icon: Atom, gradient: 'from-fuchsia-500 to-purple-400' },
    { title: 'Generative AI Solutions', slug: 'generative-ai', description: 'Enterprise GenAI implementation with LLMs, RAG pipelines, AI agents, and responsible AI frameworks.', icon: Sparkles, gradient: 'from-cyan-400 to-blue-500' },
    { title: 'Business Process Automation', slug: 'business-process-automation', description: 'Intelligent automation with RPA, process mining, and AI-powered workflow orchestration.', icon: Workflow, gradient: 'from-green-500 to-emerald-400' },
    { title: 'Quality Engineering & Testing', slug: 'quality-engineering', description: 'AI-driven test automation, performance engineering, and quality assurance at scale.', icon: CheckCircle, gradient: 'from-lime-500 to-green-400' },
    { title: 'Enterprise Resource Planning', slug: 'enterprise-resource-planning', description: 'SAP, Oracle, and Microsoft ERP implementation, migration, and optimization services.', icon: BarChart3, gradient: 'from-blue-600 to-indigo-400' },
    { title: 'Managed IT Services', slug: 'managed-it-services', description: '24/7 IT operations management, NOC/SOC services, and proactive infrastructure monitoring.', icon: MonitorCheck, gradient: 'from-gray-500 to-slate-400' },
];

export default function ServicesPage() {
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            // Hero text animations
            const tl = gsap.timeline({ delay: 0.3 });
            tl.from('.services-hero-title', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' })
                .from('.services-hero-sub', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.4');

            // Staggered card reveal on scroll
            const cards = gridRef.current?.querySelectorAll('.service-card-item');
            if (cards && cards.length > 0) {
                gsap.set(cards, { opacity: 0, y: 50 });
                ScrollTrigger.batch(cards, {
                    onEnter: (batch) => {
                        gsap.to(batch, {
                            opacity: 1,
                            y: 0,
                            duration: 0.6,
                            stagger: 0.08,
                            ease: 'power3.out',
                            overwrite: true,
                        });
                    },
                    start: 'top 85%',
                });
            }

            // CTA section
            gsap.from('.services-cta', {
                scrollTrigger: { trigger: '.services-cta', start: 'top 85%' },
                opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
            });
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-900">
                {/* Hero Banner */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <nav className="flex justify-center mb-8">
                            <ol className="flex items-center space-x-2 text-sm text-gray-400">
                                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                                <li><span className="mx-2">/</span></li>
                                <li className="text-cyan-400">Services</li>
                            </ol>
                        </nav>
                        <h1 className="services-hero-title text-5xl md:text-7xl font-bold text-white mb-6">
                            Our{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Services</span>
                        </h1>
                        <p className="services-hero-sub text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            End-to-end digital solutions designed to accelerate your transformation journey across every technology domain.
                        </p>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="relative pb-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto" ref={gridRef}>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service, index) => (
                                <Link
                                    key={index}
                                    href={`/services/${service.slug}`}
                                    className="service-card-item group relative p-8 bg-slate-800/40 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                                >
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 rounded-2xl`} />
                                    <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                                    <div className="relative text-cyan-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                                        <service.icon className="w-12 h-12" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">{service.title}</h3>
                                    <p className="relative text-gray-400 text-sm leading-relaxed mb-5">{service.description}</p>
                                    <div className="relative flex items-center text-cyan-400 text-sm font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                        Learn more
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="services-cta relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
                    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Transform Your Business?</h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Let&apos;s discuss how our AI-first approach can drive measurable growth for your enterprise.</p>
                        <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1 text-lg">
                            Let&apos;s Talk
                            <ArrowRight className="w-5 h-5 ml-3" />
                        </Link>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
