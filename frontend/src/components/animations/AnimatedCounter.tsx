'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedCounterProps {
    target: number;
    suffix?: string;
    prefix?: string;
    duration?: number;
    className?: string;
}

export default function AnimatedCounter({
    target,
    suffix = '',
    prefix = '',
    duration = 2,
    className = '',
}: AnimatedCounterProps) {
    const counterRef = useRef<HTMLSpanElement>(null);
    const [hasAnimated, setHasAnimated] = useState(false);

    useEffect(() => {
        const counter = counterRef.current;
        if (!counter || hasAnimated) return;

        const obj = { value: 0 };

        const animation = gsap.to(obj, {
            value: target,
            duration: duration,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: counter,
                start: 'top 85%',
                onEnter: () => {
                    setHasAnimated(true);
                },
            },
            onUpdate: () => {
                if (counter) {
                    counter.textContent = `${prefix}${Math.round(obj.value).toLocaleString()}${suffix}`;
                }
            },
        });

        return () => {
            animation.kill();
        };
    }, [target, suffix, prefix, duration, hasAnimated]);

    return (
        <span ref={counterRef} className={className}>
            {prefix}0{suffix}
        </span>
    );
}
