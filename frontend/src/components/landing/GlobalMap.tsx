'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface Location {
    name: string;
    x: number; // percentage from left
    y: number; // percentage from top
    region: string;
}

const locations: Location[] = [
    { name: 'New York', x: 25, y: 38, region: 'Americas' },
    { name: 'London', x: 47, y: 32, region: 'Europe' },
    { name: 'Dubai', x: 60, y: 45, region: 'Middle East' },
    { name: 'Mumbai', x: 68, y: 50, region: 'Asia Pacific' },
    { name: 'Singapore', x: 76, y: 58, region: 'Asia Pacific' },
    { name: 'Sydney', x: 85, y: 75, region: 'Asia Pacific' },
];

export default function GlobalMap() {
    const [activeLocation, setActiveLocation] = useState<Location | null>(null);
    const pulsesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        // Animate pulses
        pulsesRef.current.forEach((pulse, index) => {
            if (!pulse) return;

            gsap.to(pulse, {
                scale: 2,
                opacity: 0,
                duration: 2,
                repeat: -1,
                delay: index * 0.3,
                ease: 'power2.out',
            });
        });
    }, []);

    return (
        <section className="relative py-24 bg-slate-950 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-sm font-medium mb-4">
                        Global Presence
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Delivering Excellence{' '}
                        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Worldwide
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Our global network ensures local expertise with worldwide reach.
                    </p>
                </div>

                {/* Map Container */}
                <div className="relative aspect-[2/1] max-w-5xl mx-auto">
                    {/* Stylized World Map SVG */}
                    <svg
                        viewBox="0 0 1000 500"
                        className="w-full h-full"
                        fill="none"
                    >
                        {/* World Map Outline (simplified) */}
                        <path
                            d="M150 180 Q200 150 250 160 L300 140 Q350 130 400 145 L450 135 Q500 140 520 130 L560 140 Q580 120 620 130 L680 125 Q720 140 760 135 L820 150 Q850 160 880 155 L920 170 Q940 180 950 190
              M150 180 Q130 200 140 220 L160 250 Q180 280 170 310 L190 340 Q200 370 180 400 L200 420
              M300 140 Q280 160 290 190 L280 220 Q295 250 285 280 L300 310 Q290 340 310 370 L295 400 Q310 420 300 450
              M450 135 Q470 160 460 190 L480 220 Q475 250 490 280 L480 310 Q495 340 485 370 L500 400
              M560 140 Q540 170 550 200 L540 230 Q555 260 545 290 L560 320 Q550 350 565 380 L555 410
              M680 125 Q700 150 690 180 L710 210 Q705 240 720 270 L710 300 Q725 330 715 360 L730 390
              M820 150 Q840 180 830 210 L850 240 Q845 270 860 300 L850 330 Q865 360 855 390 L870 420
              M760 340 Q780 360 770 380 L790 400 Q785 420 800 450 L810 470
              M850 380 Q870 400 860 420 L880 440 Q890 460 880 480"
                            stroke="rgba(6,182,212,0.15)"
                            strokeWidth="1"
                            fill="none"
                        />

                        {/* Grid Lines */}
                        {[...Array(10)].map((_, i) => (
                            <line
                                key={`h-${i}`}
                                x1="0"
                                y1={i * 50}
                                x2="1000"
                                y2={i * 50}
                                stroke="rgba(6,182,212,0.05)"
                                strokeWidth="0.5"
                            />
                        ))}
                        {[...Array(20)].map((_, i) => (
                            <line
                                key={`v-${i}`}
                                x1={i * 50}
                                y1="0"
                                x2={i * 50}
                                y2="500"
                                stroke="rgba(6,182,212,0.05)"
                                strokeWidth="0.5"
                            />
                        ))}

                        {/* Connection Lines */}
                        {locations.slice(0, -1).map((loc, i) => (
                            <line
                                key={`line-${i}`}
                                x1={loc.x * 10}
                                y1={loc.y * 5}
                                x2={locations[i + 1].x * 10}
                                y2={locations[i + 1].y * 5}
                                stroke="url(#lineGradient)"
                                strokeWidth="1"
                                strokeDasharray="5,5"
                                opacity="0.3"
                            />
                        ))}

                        {/* Gradient Definition */}
                        <defs>
                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#06b6d4" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Location Markers */}
                    {locations.map((location, index) => (
                        <div
                            key={location.name}
                            className="absolute group cursor-pointer"
                            style={{
                                left: `${location.x}%`,
                                top: `${location.y}%`,
                                transform: 'translate(-50%, -50%)',
                            }}
                            onMouseEnter={() => setActiveLocation(location)}
                            onMouseLeave={() => setActiveLocation(null)}
                        >
                            {/* Pulse Ring */}
                            <div
                                ref={(el) => { pulsesRef.current[index] = el; }}
                                className="absolute inset-0 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/30 rounded-full"
                            />

                            {/* Main Dot */}
                            <div className="relative w-4 h-4 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-lg shadow-cyan-500/50 group-hover:scale-150 transition-transform duration-300">
                                <div className="absolute inset-1 bg-white rounded-full" />
                            </div>

                            {/* Tooltip */}
                            <div
                                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 bg-slate-800/90 backdrop-blur-sm rounded-lg border border-slate-700 whitespace-nowrap transition-all duration-300 ${activeLocation?.name === location.name
                                        ? 'opacity-100 translate-y-0'
                                        : 'opacity-0 translate-y-2 pointer-events-none'
                                    }`}
                            >
                                <p className="text-white font-semibold">{location.name}</p>
                                <p className="text-cyan-400 text-sm">{location.region}</p>
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-800/90" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
                    {[
                        { value: '15+', label: 'Countries' },
                        { value: '6', label: 'Global Offices' },
                        { value: '24/7', label: 'Support' },
                        { value: '40+', label: 'Industries Served' },
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <p className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                {stat.value}
                            </p>
                            <p className="text-gray-400 mt-2">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
