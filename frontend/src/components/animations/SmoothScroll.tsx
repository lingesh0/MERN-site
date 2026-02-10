'use client';

import { useEffect, useRef } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        let lenis: InstanceType<typeof import('@studio-freight/lenis').default> | null = null;
        let animationId: number;

        const init = async () => {
            try {
                const [LenisModule, gsapModule, stModule] = await Promise.all([
                    import('@studio-freight/lenis'),
                    import('gsap'),
                    import('gsap/ScrollTrigger'),
                ]);

                const Lenis = LenisModule.default;
                const { gsap } = gsapModule;
                const { ScrollTrigger } = stModule;
                gsap.registerPlugin(ScrollTrigger);

                lenis = new Lenis({
                    duration: 1.0,
                    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    orientation: 'vertical',
                    gestureOrientation: 'vertical',
                    smoothWheel: true,
                    wheelMultiplier: 0.8,
                    touchMultiplier: 1.5,
                    infinite: false,
                });

                // Sync Lenis with ScrollTrigger
                lenis.on('scroll', ScrollTrigger.update);

                gsap.ticker.lagSmoothing(0);

                // RAF loop
                const raf = (time: number) => {
                    lenis?.raf(time);
                    animationId = requestAnimationFrame(raf);
                };
                animationId = requestAnimationFrame(raf);

            } catch (err) {
                console.warn('Smooth scroll init failed, using native:', err);
            }
        };

        init();

        return () => {
            if (animationId) cancelAnimationFrame(animationId);
            if (lenis) {
                lenis.destroy();
                lenis = null;
            }
        };
    }, []);

    return <>{children}</>;
}
