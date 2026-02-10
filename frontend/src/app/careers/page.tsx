'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import PageTransition from '@/components/animations/PageTransition';
import { Home, BookOpen, Heart, Plane, TrendingUp, Target, Sun, Pizza, ArrowRight } from 'lucide-react';

const openings = [
    { title: 'Senior AI/ML Engineer', dept: 'Engineering', location: 'New York / Remote', type: 'Full-time' },
    { title: 'Full-Stack Developer (React/Node)', dept: 'Engineering', location: 'Bangalore', type: 'Full-time' },
    { title: 'Cloud Solutions Architect', dept: 'Cloud Services', location: 'London / Remote', type: 'Full-time' },
    { title: 'GenAI Solutions Consultant', dept: 'Data & AI', location: 'New York', type: 'Full-time' },
    { title: 'DevOps Engineer', dept: 'Engineering', location: 'Bangalore / Remote', type: 'Full-time' },
    { title: 'UX/UI Designer', dept: 'Design', location: 'London', type: 'Full-time' },
    { title: 'Cybersecurity Analyst', dept: 'Security', location: 'New York', type: 'Full-time' },
    { title: 'Data Engineer', dept: 'Data & AI', location: 'Bangalore / Remote', type: 'Full-time' },
];

const benefits = [
    { icon: Home, title: 'Remote Flexibility', description: 'Work from anywhere with flexible hybrid options.' },
    { icon: BookOpen, title: 'Learning Budget', description: '$5,000 annual budget for courses, conferences, and certifications.' },
    { icon: Heart, title: 'Health & Wellness', description: 'Comprehensive medical, dental, and mental health coverage.' },
    { icon: Plane, title: 'Travel Opportunities', description: 'Work with global clients and travel to international offices.' },
    { icon: TrendingUp, title: 'Stock Options', description: 'Competitive equity compensation for all team members.' },
    { icon: Target, title: 'Career Growth', description: 'Clear promotion paths and mentorship programs.' },
    { icon: Sun, title: 'Unlimited PTO', description: 'Take the time you need to recharge and stay productive.' },
    { icon: Pizza, title: 'Team Events', description: 'Regular team offsites, hackathons, and social events.' },
];

const culture = [
    { stat: '10K+', label: 'Team Members' },
    { stat: '5', label: 'Countries' },
    { stat: '4.8/5', label: 'Employee Rating' },
    { stat: '92%', label: 'Would Recommend' },
];

export default function CareersPage() {
    const benefitsRef = useRef<HTMLDivElement>(null);
    const jobsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const tl = gsap.timeline({ delay: 0.3 });
            tl.from('.careers-hero-title', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' })
                .from('.careers-hero-sub', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.4');

            // Culture stats
            gsap.from('.culture-stat', {
                scrollTrigger: { trigger: '.culture-stats', start: 'top 85%' },
                opacity: 0, y: 30, duration: 0.5, stagger: 0.1, ease: 'power3.out',
            });

            // Benefits
            const bCards = benefitsRef.current?.querySelectorAll('.benefit-card');
            if (bCards && bCards.length > 0) {
                gsap.set(bCards, { opacity: 0, y: 30 });
                ScrollTrigger.batch(bCards, {
                    onEnter: (batch) => {
                        gsap.to(batch, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power3.out', overwrite: true });
                    },
                    start: 'top 88%',
                });
            }

            // Job rows
            const rows = jobsRef.current?.querySelectorAll('.job-row');
            if (rows && rows.length > 0) {
                gsap.set(rows, { opacity: 0, x: -20 });
                ScrollTrigger.batch(rows, {
                    onEnter: (batch) => {
                        gsap.to(batch, { opacity: 1, x: 0, duration: 0.5, stagger: 0.05, ease: 'power3.out', overwrite: true });
                    },
                    start: 'top 88%',
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
                        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px]" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <nav className="flex justify-center mb-8">
                            <ol className="flex items-center space-x-2 text-sm text-gray-400">
                                <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
                                <li><span className="mx-2">/</span></li>
                                <li className="text-emerald-400">Careers</li>
                            </ol>
                        </nav>
                        <h1 className="careers-hero-title text-5xl md:text-7xl font-bold text-white mb-6">
                            Build the{' '}
                            <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">Future</span>
                            {' '}With Us
                        </h1>
                        <p className="careers-hero-sub text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Join 10,000+ innovators across 5 countries working on cutting-edge AI and digital transformation projects.
                        </p>
                    </div>
                </section>

                {/* Culture Stats */}
                <section className="culture-stats py-12 px-4">
                    <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
                        {culture.map((item, i) => (
                            <div key={i} className="culture-stat text-center p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent mb-1">{item.stat}</div>
                                <div className="text-gray-400 text-sm">{item.label}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-20 px-4" ref={benefitsRef}>
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Why Join Giakaa?</h2>
                        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">We invest in our people with industry-leading benefits.</p>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                            {benefits.map((b, i) => (
                                <div key={i} className="benefit-card p-5 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1">
                                    <div className="text-emerald-400 mb-3">
                                        <b.icon className="w-8 h-8" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-white font-semibold mb-1">{b.title}</h3>
                                    <p className="text-gray-400 text-sm">{b.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Open Positions */}
                <section className="py-20 px-4 bg-slate-950" ref={jobsRef}>
                    <div className="max-w-5xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">Open Positions</h2>
                        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">Find your next opportunity.</p>
                        <div className="space-y-3">
                            {openings.map((job, i) => (
                                <div key={i} className="job-row group flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer">
                                    <div className="mb-3 sm:mb-0">
                                        <h3 className="text-white font-semibold group-hover:text-emerald-400 transition-colors">{job.title}</h3>
                                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                                            <span>{job.dept}</span><span>•</span><span>{job.location}</span><span>•</span><span>{job.type}</span>
                                        </div>
                                    </div>
                                    <span className="inline-flex items-center text-emerald-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                        Apply
                                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 px-4 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-blue-500/10" />
                    <div className="relative z-10 max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Don&apos;t See Your Role?</h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">We&apos;re always looking for exceptional talent. Send us your resume and we&apos;ll keep you in mind.</p>
                        <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-cyan-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-1 text-lg">
                            Get in Touch
                        </Link>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
