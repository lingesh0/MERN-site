'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AnimatedCounter from '@/components/animations/AnimatedCounter';

gsap.registerPlugin(ScrollTrigger);

const metrics = [
    { value: 500, suffix: 'M+', prefix: '$', label: 'Portfolio Value', description: 'Managed assets' },
    { value: 200, suffix: '+', prefix: '', label: 'Projects Delivered', description: '+20% YoY growth' },
    { value: 10000, suffix: '+', prefix: '', label: 'Community Members', description: 'Global network' },
    { value: 98, suffix: '%', prefix: '', label: 'Client Satisfaction', description: 'Repeat business' },
];

export default function ImpactMetrics() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const section = sectionRef.current;
        const cards = cardsRef.current;
        if (!section || !cards) return;

        // Staggered reveal animation
        gsap.fromTo(
            cards.children,
            { y: 80, opacity: 0, scale: 0.9 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                },
            }
        );
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-cyan-900/20 to-slate-900" />

            {/* Animated Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                <div className="absolute top-1/4 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium mb-4">
                        Impact Metrics
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Delivering{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Measurable Results
                        </span>
                    </h2>
                </div>

                {/* Metrics Grid */}
                <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((metric, index) => (
                        <div
                            key={index}
                            className="relative group p-8 bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 text-center"
                        >
                            {/* Glow on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Value */}
                            <div className="relative">
                                <AnimatedCounter
                                    target={metric.value}
                                    prefix={metric.prefix}
                                    suffix={metric.suffix}
                                    duration={2.5}
                                    className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                                />
                            </div>

                            {/* Label */}
                            <h3 className="relative text-white font-semibold text-lg mt-4 mb-1">
                                {metric.label}
                            </h3>

                            {/* Description */}
                            <p className="relative text-gray-500 text-sm">
                                {metric.description}
                            </p>

                            {/* Decorative Line */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full group-hover:w-1/2 transition-all duration-500" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
