'use client';

import { useEffect, useRef, ReactNode } from 'react';

interface PageTransitionProps {
    children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = containerRef.current;
        if (!el || hasAnimated.current) return;
        hasAnimated.current = true;

        // Scroll to top immediately
        window.scrollTo(0, 0);

        // Use CSS animation as fallback, GSAP as enhancement
        el.classList.add('page-enter-active');

        // Try GSAP for smoother animation
        const tryGsap = async () => {
            try {
                const { gsap } = await import('gsap');
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', clearProps: 'all' }
                );
            } catch {
                // GSAP unavailable, CSS animation handles it
                el.style.opacity = '1';
                el.style.transform = 'none';
            }
        };

        tryGsap();
    }, []);

    return (
        <div ref={containerRef} className="page-enter">
            {children}
        </div>
    );
}
