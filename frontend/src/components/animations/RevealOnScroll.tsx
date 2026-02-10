'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface RevealOnScrollProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    duration?: number;
    y?: number;
    stagger?: number;
    once?: boolean;
}

export default function RevealOnScroll({
    children,
    className = '',
    delay = 0,
    duration = 0.8,
    y = 60,
    stagger = 0.15,
    once = true,
}: RevealOnScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const elements = container.children;

        gsap.set(elements, {
            y: y,
            opacity: 0,
        });

        const animation = gsap.to(elements, {
            y: 0,
            opacity: 1,
            duration: duration,
            stagger: stagger,
            delay: delay,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: container,
                start: 'top 85%',
                end: 'bottom 15%',
                toggleActions: once ? 'play none none none' : 'play reverse play reverse',
            },
        });

        return () => {
            animation.kill();
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.trigger === container) {
                    trigger.kill();
                }
            });
        };
    }, [delay, duration, y, stagger, once]);

    return (
        <div ref={containerRef} className={className}>
            {children}
        </div>
    );
}
