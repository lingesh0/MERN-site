'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';

interface Logo {
    name: string;
    url?: string;
}

const defaultLogos: Logo[] = [
    { name: 'Microsoft' },
    { name: 'Google Cloud' },
    { name: 'AWS' },
    { name: 'IBM' },
    { name: 'Oracle' },
    { name: 'Salesforce' },
    { name: 'SAP' },
    { name: 'Accenture' },
    { name: 'Deloitte' },
    { name: 'McKinsey' },
];

interface LogoMarqueeProps {
    logos?: Logo[];
    speed?: number;
    direction?: 'left' | 'right';
    className?: string;
}

export default function LogoMarquee({
    logos = defaultLogos,
    speed = 30,
    direction = 'left',
    className = '',
}: LogoMarqueeProps) {
    const marqueeRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const marquee = marqueeRef.current;
        const content = contentRef.current;
        if (!marquee || !content) return;

        // Clone content for seamless loop
        const clone = content.cloneNode(true) as HTMLDivElement;
        marquee.appendChild(clone);

        const totalWidth = content.offsetWidth;
        const duration = totalWidth / speed;

        const animation = gsap.to(marquee.children, {
            x: direction === 'left' ? -totalWidth : totalWidth,
            duration: duration,
            ease: 'none',
            repeat: -1,
            modifiers: {
                x: gsap.utils.unitize((x) => {
                    const num = parseFloat(x);
                    return direction === 'left'
                        ? ((num % totalWidth) + totalWidth) % totalWidth - totalWidth
                        : num % totalWidth;
                }),
            },
        });

        return () => {
            animation.kill();
            if (clone.parentNode) {
                clone.parentNode.removeChild(clone);
            }
        };
    }, [speed, direction]);

    return (
        <div className={`overflow-hidden ${className}`}>
            <div ref={marqueeRef} className="flex">
                <div ref={contentRef} className="flex items-center gap-16 px-8">
                    {logos.map((logo, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 px-8 py-4 bg-slate-800/30 rounded-lg backdrop-blur-sm border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
                        >
                            {logo.url ? (
                                <Image
                                    src={logo.url}
                                    alt={logo.name}
                                    width={120}
                                    height={40}
                                    className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                                />
                            ) : (
                                <span className="text-gray-400 font-medium text-sm whitespace-nowrap hover:text-white transition-colors">
                                    {logo.name}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
