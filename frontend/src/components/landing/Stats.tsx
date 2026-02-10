'use client';

import { useEffect, useState, useRef } from 'react';

interface StatItemProps {
    value: number;
    suffix: string;
    label: string;
    description: string;
}

function StatItem({ value, suffix, label, description }: StatItemProps) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [isVisible, value]);

    return (
        <div ref={ref} className="text-center group">
            <div className="relative inline-block mb-4">
                <span className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {count}{suffix}
                </span>
                <div className="absolute -inset-4 bg-cyan-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">{label}</h3>
            <p className="text-gray-500 text-sm">{description}</p>
        </div>
    );
}

export default function Stats() {
    const stats = [
        { value: 15, suffix: '+', label: 'Countries', description: '+5 This Year' },
        { value: 200, suffix: '+', label: 'Projects Delivered', description: '+20% Growth YoY' },
        { value: 40, suffix: '+', label: 'Industries Expertise', description: 'Global Scale' },
        { value: 98, suffix: '%', label: 'Client Satisfaction', description: 'Proven Results' },
    ];

    return (
        <section className="relative py-24 bg-slate-900 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Global Scale. Local Expertise.{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Proven Results.
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        We empower enterprises to compete with industry giants by delivering world-class technology solutions.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <StatItem key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
}
