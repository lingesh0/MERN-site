'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSlide } from '@/lib/api';

interface HeroProps {
    slides?: HeroSlide[];
}

const defaultSlides: Omit<HeroSlide, '_id'>[] = [
    {
        title: 'Empowering Enterprise',
        description: 'AI-first consulting firm delivering high-impact solutions that drive measurable growth across 40+ industries',
        mediaUrl: '/hero-1.jpg',
        mediaType: 'image',
        ctaText: "Let's Talk",
        ctaLink: '/contact',
        order: 0,
        isActive: true,
    },
    {
        title: 'Built for the AI Era',
        description: 'Unlike legacy firms retrofitting AI into outdated methodologies, Giakaa was purpose-built with artificial intelligence at our core.',
        mediaUrl: '/hero-2.jpg',
        mediaType: 'image',
        ctaText: 'Our Services',
        ctaLink: '/services',
        order: 1,
        isActive: true,
    },
    {
        title: 'Rapid, High-Impact Delivery',
        description: 'We deliver production-ready solutions 3-5x faster than traditional consultancies—without compromising quality.',
        mediaUrl: '/hero-3.jpg',
        mediaType: 'image',
        ctaText: 'Case Studies',
        ctaLink: '/insights',
        order: 2,
        isActive: true,
    },
];

export default function Hero({ slides }: HeroProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [activeSlides.length]);

    const slide = activeSlides[currentSlide];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-900">
            {/* Animated Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />

                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="text-center">
                    {/* Animated Badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 backdrop-blur-sm rounded-full border border-slate-700 mb-8">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse mr-2" />
                        <span className="text-cyan-400 text-sm font-medium">AI-First IT Services</span>
                    </div>

                    {/* Main Heading with Animation */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                        <span className="block">{slide.title.split(' ')[0]}</span>
                        <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                            {slide.title.split(' ').slice(1).join(' ')}
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                        {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href={slide.ctaLink}
                            className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-1"
                        >
                            {slide.ctaText}
                            <svg
                                className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-600 text-white font-semibold rounded-full hover:border-cyan-400 hover:text-cyan-400 transition-all duration-300"
                        >
                            Explore Services
                        </Link>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex justify-center gap-2 mt-16">
                        {activeSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide
                                        ? 'w-8 bg-cyan-400'
                                        : 'w-2 bg-slate-600 hover:bg-slate-500'
                                    }`}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2">
                    <div className="w-1 h-2 bg-cyan-400 rounded-full animate-pulse" />
                </div>
            </div>
        </section>
    );
}
