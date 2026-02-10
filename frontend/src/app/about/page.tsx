'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import PageTransition from '@/components/animations/PageTransition';
import { Rocket, Handshake, Globe, BrainCircuit, Zap, Shield, ArrowRight } from 'lucide-react';

const timeline = [
    { year: '2018', title: 'Founded', description: 'Giakaa was established with a vision to deliver AI-first IT solutions for enterprises worldwide.' },
    { year: '2019', title: 'Global Expansion', description: 'Expanded operations to Europe and Southeast Asia, serving clients across 3 continents.' },
    { year: '2020', title: 'Cloud & Digital Surge', description: 'Accelerated cloud migration and digital transformation services during the global remote work shift.' },
    { year: '2021', title: '100+ Enterprise Clients', description: 'Crossed the milestone of 100+ enterprise clients across banking, healthcare, and manufacturing.' },
    { year: '2022', title: 'AI Center of Excellence', description: 'Launched dedicated AI/ML Center of Excellence with focus on GenAI and MLOps capabilities.' },
    { year: '2023', title: 'GenAI Leadership', description: 'Became an early leader in enterprise GenAI adoption with RAG, AI Agents, and LLM fine-tuning.' },
    { year: '2024', title: '500M+ Impact', description: 'Surpassed $500M in client business impact, with 10,000+ Giakaa members across 5 countries.' },
];

const values = [
    { icon: Rocket, title: 'Innovation First', description: 'We push the boundaries of technology to deliver solutions that matter.' },
    { icon: Handshake, title: 'Client Partnership', description: 'We succeed when our clients succeed. Every engagement is a partnership.' },
    { icon: Globe, title: 'Global Impact', description: 'We build solutions that create meaningful impact across industries and geographies.' },
    { icon: BrainCircuit, title: 'Continuous Learning', description: 'Our teams stay ahead with constant upskilling and knowledge sharing.' },
    { icon: Zap, title: 'Agile Delivery', description: 'We deliver fast, iterate faster, and always keep quality at the center.' },
    { icon: Shield, title: 'Trust & Security', description: 'Enterprise-grade security and data privacy are non-negotiable in everything we do.' },
];

const leadership = [
    { name: 'Alex Chen', role: 'CEO & Co-Founder', bio: 'Former VP at a Fortune 500 tech firm with 20+ years in digital transformation.' },
    { name: 'Sarah Williams', role: 'CTO', bio: 'Ex-Google engineering leader specializing in AI/ML and cloud architecture.' },
    { name: 'Michael Johnson', role: 'COO', bio: 'Operations expert with experience scaling startups to global enterprises.' },
    { name: 'Priya Sharma', role: 'Chief AI Officer', bio: 'AI researcher and practitioner with expertise in GenAI, NLP, and computer vision.' },
    { name: 'David Kim', role: 'VP Engineering', bio: 'Engineering leader with deep expertise in distributed systems and platform engineering.' },
    { name: 'Lisa Martinez', role: 'VP Client Success', bio: 'Client success leader focused on delivering measurable business outcomes.' },
];

export default function AboutPage() {
    const timelineRef = useRef<HTMLDivElement>(null);
    const valuesRef = useRef<HTMLDivElement>(null);
    const leaderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            // Hero
            const tl = gsap.timeline({ delay: 0.3 });
            tl.from('.about-hero-title', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' })
                .from('.about-hero-sub', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.4');

            // Stats
            gsap.from('.about-stat', {
                scrollTrigger: { trigger: '.about-stats', start: 'top 85%' },
                opacity: 0, y: 30, duration: 0.5, stagger: 0.1, ease: 'power3.out',
            });

            // Mission
            gsap.from('.about-mission', {
                scrollTrigger: { trigger: '.about-mission', start: 'top 80%' },
                opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
            });

            // Timeline items
            const items = timelineRef.current?.querySelectorAll('.timeline-item');
            if (items && items.length > 0) {
                gsap.set(items, { opacity: 0, x: -30 });
                ScrollTrigger.batch(items, {
                    onEnter: (batch) => {
                        gsap.to(batch, { opacity: 1, x: 0, duration: 0.6, stagger: 0.12, ease: 'power3.out', overwrite: true });
                    },
                    start: 'top 85%',
                });
            }

            // Timeline line draw
            gsap.fromTo('.timeline-line-fill', { height: '0%' }, {
                height: '100%',
                scrollTrigger: { trigger: '.timeline-section', start: 'top 60%', end: 'bottom 40%', scrub: 1 },
                ease: 'none',
            });

            // Values
            const valCards = valuesRef.current?.querySelectorAll('.value-card');
            if (valCards && valCards.length > 0) {
                gsap.set(valCards, { opacity: 0, y: 40, scale: 0.95 });
                ScrollTrigger.batch(valCards, {
                    onEnter: (batch) => {
                        gsap.to(batch, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', overwrite: true });
                    },
                    start: 'top 85%',
                });
            }

            // Leadership
            const leaders = leaderRef.current?.querySelectorAll('.leader-card');
            if (leaders && leaders.length > 0) {
                gsap.set(leaders, { opacity: 0, y: 30 });
                ScrollTrigger.batch(leaders, {
                    onEnter: (batch) => {
                        gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power3.out', overwrite: true });
                    },
                    start: 'top 85%',
                });
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-900">
                {/* Hero */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/8 rounded-full blur-[100px]" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <nav className="flex justify-center mb-8">
                            <ol className="flex items-center space-x-2 text-sm text-gray-400">
                                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                                <li><span className="mx-2">/</span></li>
                                <li className="text-cyan-400">About</li>
                            </ol>
                        </nav>
                        <h1 className="about-hero-title text-5xl md:text-7xl font-bold text-white mb-6">
                            About{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Giakaa</span>
                        </h1>
                        <p className="about-hero-sub text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            An AI-first consulting firm delivering high-impact solutions that drive measurable growth across 40+ industries in 5 countries.
                        </p>
                    </div>
                </section>

                {/* Stats */}
                <section className="about-stats py-16 px-4">
                    <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { value: '5+', label: 'Countries' },
                            { value: '40+', label: 'Projects Delivered' },
                            { value: '38+', label: 'Industries' },
                            { value: '10K+', label: 'Team Members' },
                        ].map((stat, i) => (
                            <div key={i} className="about-stat text-center p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">{stat.value}</div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Mission */}
                <section className="py-20 px-4">
                    <div className="about-mission max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
                        <p className="text-xl text-gray-300 leading-relaxed">
                            To empower enterprises with AI-first technology solutions that accelerate digital transformation,
                            drive innovation, and create lasting competitive advantages in an increasingly connected world.
                        </p>
                    </div>
                </section>

                {/* Timeline */}
                <section className="timeline-section py-20 px-4" ref={timelineRef}>
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Our Journey</h2>
                        <div className="relative">
                            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800">
                                <div className="timeline-line-fill w-full bg-gradient-to-b from-cyan-400 to-blue-500" />
                            </div>
                            <div className="space-y-12">
                                {timeline.map((item, index) => (
                                    <div key={index} className={`timeline-item relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                        <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-slate-900 z-10" />
                                        <div className={`ml-16 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:pl-16'}`}>
                                            <span className="text-cyan-400 font-bold text-lg">{item.year}</span>
                                            <h3 className="text-xl font-bold text-white mt-1">{item.title}</h3>
                                            <p className="text-gray-400 mt-2">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-20 px-4 bg-slate-950" ref={valuesRef}>
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Our Values</h2>
                        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">The principles that guide everything we do.</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {values.map((value, i) => (
                                <div key={i} className="value-card p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1">
                                    <div className="text-cyan-400 mb-4 flex justify-center sm:justify-start">
                                        <value.icon className="w-10 h-10" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                                    <p className="text-gray-400 text-sm">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Leadership */}
                <section className="py-20 px-4" ref={leaderRef}>
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Leadership Team</h2>
                        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">Experienced leaders driving innovation and growth.</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {leadership.map((leader, i) => (
                                <div key={i} className="leader-card group p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300">
                                    <div className="w-20 h-20 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full flex items-center justify-center mb-4 group-hover:from-cyan-400/30 group-hover:to-blue-500/30 transition-all">
                                        <span className="text-2xl font-bold text-cyan-400">{leader.name.split(' ').map(n => n[0]).join('')}</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white">{leader.name}</h3>
                                    <p className="text-cyan-400 text-sm font-medium mb-2">{leader.role}</p>
                                    <p className="text-gray-400 text-sm">{leader.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 px-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10" />
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Join Our Journey</h2>
                        <p className="text-gray-400 text-lg mb-10">Be part of a team that&apos;s shaping the future of enterprise technology.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/careers" className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1">
                                View Careers
                            </Link>
                            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 border border-slate-600 text-white font-semibold rounded-full hover:border-cyan-500/50 transition-all duration-300 hover:-translate-y-1">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
