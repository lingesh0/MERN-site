'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { HeroSlide } from '@/lib/api';
import MagneticButton from '@/components/animations/MagneticButton';

interface HeroEnhancedProps {
    slides?: HeroSlide[];
}

const defaultSlides: Omit<HeroSlide, '_id'>[] = [
    {
        title: 'Empowering Enterprise',
        description: 'AI-first consulting firm delivering high-impact solutions that drive measurable growth across 40+ industries',
        mediaUrl: 'https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4',
        mediaType: 'video',
        ctaText: "Let's Talk",
        ctaLink: '/contact',
        order: 0,
        isActive: true,
    },
    {
        title: 'Built for the AI Era',
        description: 'Unlike legacy firms retrofitting AI into outdated methodologies, Giakaa was purpose-built with artificial intelligence at our core.',
        mediaUrl: 'https://videos.pexels.com/video-files/5377684/5377684-uhd_2560_1440_25fps.mp4',
        mediaType: 'video',
        ctaText: 'Our Services',
        ctaLink: '/services',
        order: 1,
        isActive: true,
    },
    {
        title: 'Rapid, High-Impact Delivery',
        description: 'We deliver production-ready solutions 3-5x faster than traditional consultancies—without compromising quality.',
        mediaUrl: 'https://videos.pexels.com/video-files/7710243/7710243-uhd_2560_1440_30fps.mp4',
        mediaType: 'video',
        ctaText: 'Case Studies',
        ctaLink: '/insights',
        order: 2,
        isActive: true,
    },
];

export default function HeroEnhanced({ slides }: HeroEnhancedProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const activeSlides = slides && slides.length > 0 ? slides : defaultSlides;
    const heroRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const ctaRef = useRef<HTMLDivElement>(null);

    // Slide rotation
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [activeSlides.length]);

    // GSAP entrance animation
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                titleRef.current,
                { y: 100, opacity: 0, skewY: 3 },
                { y: 0, opacity: 1, skewY: 0, duration: 1, ease: 'power3.out', delay: 0.2 }
            );
            gsap.fromTo(
                descRef.current,
                { y: 60, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
            );
            gsap.fromTo(
                ctaRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.7 }
            );
        }, heroRef);

        return () => ctx.revert();
    }, [currentSlide]);

    const slide = activeSlides[currentSlide];

    return (
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Video/Image Background */}
            <div className="absolute inset-0 z-0">
                {slide.mediaType === 'video' ? (
                    <video
                        key={slide.mediaUrl}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src={slide.mediaUrl} type="video/mp4" />
                    </video>
                ) : (
                    <div
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.mediaUrl})` }}
                    />
                )}

                {/* Overlays */}
                <div className="absolute inset-0 bg-slate-900/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-transparent to-slate-900/80" />
            </div>

            {/* Animated Grid Pattern */}
            <div className="absolute inset-0 z-[1] opacity-20">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '60px 60px',
                    }}
                />
            </div>

            {/* Floating Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
                <div className="text-center">
                    {/* Badge */}
                    <div className="inline-flex items-center px-5 py-2.5 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-10">
                        <span className="relative flex h-2 w-2 mr-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                        </span>
                        <span className="text-cyan-400 text-sm font-medium tracking-wide">AI-First IT Services & Digital Transformation</span>
                    </div>

                    {/* Title */}
                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 tracking-tight leading-[0.9]"
                    >
                        <span className="block overflow-hidden">
                            <span className="inline-block">{slide.title.split(' ')[0]}</span>
                        </span>
                        <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent overflow-hidden">
                            <span className="inline-block">{slide.title.split(' ').slice(1).join(' ')}</span>
                        </span>
                    </h1>

                    {/* Description */}
                    <p
                        ref={descRef}
                        className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed"
                    >
                        {slide.description}
                    </p>

                    {/* CTAs */}
                    <div ref={ctaRef} className="flex flex-col sm:flex-row justify-center gap-5">
                        <MagneticButton
                            href={slide.ctaLink}
                            strength={0.2}
                            className="group px-10 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-full hover:shadow-2xl hover:shadow-cyan-500/30 transition-all duration-300"
                        >
                            <span className="flex items-center">
                                {slide.ctaText}
                                <svg
                                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </MagneticButton>

                        <MagneticButton
                            href="/services"
                            strength={0.2}
                            className="px-10 py-5 bg-white/5 backdrop-blur-md border-2 border-white/20 text-white font-semibold rounded-full hover:bg-white/10 hover:border-cyan-400/50 transition-all duration-300"
                        >
                            Explore Services
                        </MagneticButton>
                    </div>

                    {/* Slide Indicators */}
                    <div className="flex justify-center gap-3 mt-20">
                        {activeSlides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`relative h-1 rounded-full transition-all duration-500 overflow-hidden ${index === currentSlide ? 'w-12 bg-cyan-400' : 'w-6 bg-white/20 hover:bg-white/40'
                                    }`}
                            >
                                {index === currentSlide && (
                                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
                <div className="flex flex-col items-center gap-2 animate-bounce">
                    <span className="text-gray-400 text-sm">Scroll to explore</span>
                    <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2">
                        <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-pulse" />
                    </div>
                </div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-0 left-0 w-64 h-64 border-l-2 border-t-2 border-cyan-500/20 rounded-tl-[100px]" />
            <div className="absolute bottom-0 right-0 w-64 h-64 border-r-2 border-b-2 border-purple-500/20 rounded-br-[100px]" />
        </section>
    );
}
