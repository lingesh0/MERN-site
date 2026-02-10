'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import PageTransition from '@/components/animations/PageTransition';
import {
    Rocket, Sprout, Car, Plane, Landmark, FlaskConical, Smartphone, ShoppingBag,
    Shield, GraduationCap, Zap, Building2, Stethoscope, Cpu, Building, FileText,
    Scale, Dna, Truck, Factory, Film, Pickaxe, Heart, Flame, Pill, Briefcase,
    Sun, ShoppingCart, Microchip, Trophy, Radio, Train, Globe, PawPrint, Package,
    Recycle, Droplets, ArrowRight
} from 'lucide-react';

const industries = [
    { name: 'Aerospace', icon: Rocket, slug: 'aerospace', color: 'blue' },
    { name: 'Agriculture', icon: Sprout, slug: 'agriculture', color: 'green' },
    { name: 'Automotive & Mobility', icon: Car, slug: 'automotive-mobility', color: 'cyan' },
    { name: 'Aviation', icon: Plane, slug: 'aviation', color: 'blue' },
    { name: 'Banking & Finance', icon: Landmark, slug: 'banking-finance', color: 'yellow' },
    { name: 'Chemical Manufacturing', icon: FlaskConical, slug: 'chemical-manufacturing', color: 'purple' },
    { name: 'Communication & Telecom', icon: Smartphone, slug: 'communication-telecom', color: 'blue' },
    { name: 'Consumer Goods', icon: ShoppingBag, slug: 'consumer-goods', color: 'orange' },
    { name: 'Defense', icon: Shield, slug: 'defense', color: 'gray' },
    { name: 'Education', icon: GraduationCap, slug: 'education', color: 'blue' },
    { name: 'Energy & Utilities', icon: Zap, slug: 'energy-utilities', color: 'yellow' },
    { name: 'Government', icon: Building2, slug: 'government', color: 'blue' },
    { name: 'Healthcare', icon: Stethoscope, slug: 'healthcare', color: 'red' },
    { name: 'High Technology', icon: Cpu, slug: 'high-technology', color: 'cyan' },
    { name: 'Hospitality & Tourism', icon: Building, slug: 'hospitality-tourism', color: 'orange' },
    { name: 'Insurance', icon: FileText, slug: 'insurance', color: 'blue' },
    { name: 'Legal Services', icon: Scale, slug: 'legal-services', color: 'gray' },
    { name: 'Life Sciences', icon: Dna, slug: 'life-sciences', color: 'green' },
    { name: 'Logistics & Supply Chain', icon: Truck, slug: 'logistics-supply-chain', color: 'orange' },
    { name: 'Manufacturing', icon: Factory, slug: 'manufacturing', color: 'gray' },
    { name: 'Media & Entertainment', icon: Film, slug: 'media-entertainment', color: 'purple' },
    { name: 'Mining & Metals', icon: Pickaxe, slug: 'mining-metals', color: 'amber' },
    { name: 'Non-Profit', icon: Heart, slug: 'non-profit', color: 'green' },
    { name: 'Oil & Gas', icon: Flame, slug: 'oil-gas', color: 'yellow' },
    { name: 'Pharmaceuticals', icon: Pill, slug: 'pharmaceuticals', color: 'blue' },
    { name: 'Professional Services', icon: Briefcase, slug: 'professional-services', color: 'blue' },
    { name: 'Real Estate', icon: Building, slug: 'real-estate', color: 'cyan' },
    { name: 'Renewable Energy', icon: Sun, slug: 'renewable-energy', color: 'green' },
    { name: 'Retail & Ecommerce', icon: ShoppingCart, slug: 'retail-ecommerce', color: 'pink' },
    { name: 'Semiconductors', icon: Microchip, slug: 'semiconductors', color: 'purple' },
    { name: 'Sports & Fitness', icon: Trophy, slug: 'sports-fitness', color: 'green' },
    { name: 'Telecommunications', icon: Radio, slug: 'telecommunications', color: 'blue' },
    { name: 'Transportation', icon: Train, slug: 'transportation', color: 'cyan' },
    { name: 'Travel & Leisure', icon: Globe, slug: 'travel-leisure', color: 'orange' },
    { name: 'Veterinary', icon: PawPrint, slug: 'veterinary', color: 'green' },
    { name: 'Warehousing', icon: Package, slug: 'warehousing', color: 'gray' },
    { name: 'Waste Management', icon: Recycle, slug: 'waste-management', color: 'green' },
    { name: 'Water & Sanitation', icon: Droplets, slug: 'water-sanitation', color: 'blue' },
];

const colorMap: Record<string, string> = {
    blue: 'border-blue-500/30 hover:border-blue-500/60 bg-blue-500/5',
    cyan: 'border-cyan-500/30 hover:border-cyan-500/60 bg-cyan-500/5',
    green: 'border-emerald-500/30 hover:border-emerald-500/60 bg-emerald-500/5',
    yellow: 'border-amber-500/30 hover:border-amber-500/60 bg-amber-500/5',
    red: 'border-red-500/30 hover:border-red-500/60 bg-red-500/5',
    purple: 'border-purple-500/30 hover:border-purple-500/60 bg-purple-500/5',
    orange: 'border-orange-500/30 hover:border-orange-500/60 bg-orange-500/5',
    gray: 'border-gray-500/30 hover:border-gray-500/60 bg-gray-500/5',
    pink: 'border-pink-500/30 hover:border-pink-500/60 bg-pink-500/5',
    amber: 'border-amber-500/30 hover:border-amber-500/60 bg-amber-500/5',
};

export default function IndustriesPage() {
    const [filter, setFilter] = useState('');
    const [visibleCount, setVisibleCount] = useState(24);
    const gridRef = useRef<HTMLDivElement>(null);

    const filtered = industries.filter((ind) =>
        ind.name.toLowerCase().includes(filter.toLowerCase())
    );
    const displayed = filtered.slice(0, visibleCount);

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const tl = gsap.timeline({ delay: 0.3 });
            tl.from('.industries-hero-title', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' })
                .from('.industries-hero-sub', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.4')
                .from('.industries-search', { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '-=0.3');

            // Cards
            const cards = gridRef.current?.querySelectorAll('.industry-card');
            if (cards && cards.length > 0) {
                gsap.set(cards, { opacity: 0, y: 30, scale: 0.95 });
                ScrollTrigger.batch(cards, {
                    onEnter: (batch) => {
                        gsap.to(batch, {
                            opacity: 1, y: 0, scale: 1,
                            duration: 0.5, stagger: 0.04, ease: 'power3.out', overwrite: true,
                        });
                    },
                    start: 'top 90%',
                });
            }
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-900">
                {/* Hero */}
                <section className="relative pt-32 pb-20 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px]" />
                        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-pink-500/8 rounded-full blur-[100px]" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <nav className="flex justify-center mb-8">
                            <ol className="flex items-center space-x-2 text-sm text-gray-400">
                                <li><Link href="/" className="hover:text-purple-400 transition-colors">Home</Link></li>
                                <li><span className="mx-2">/</span></li>
                                <li className="text-purple-400">Industries</li>
                            </ol>
                        </nav>
                        <h1 className="industries-hero-title text-5xl md:text-7xl font-bold text-white mb-6">
                            Industries{' '}
                            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">We Serve</span>
                        </h1>
                        <p className="industries-hero-sub text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
                            Deep domain expertise combined with cutting-edge technology across 38+ industries worldwide.
                        </p>
                        <div className="industries-search mt-10 max-w-md mx-auto">
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <input
                                    type="text"
                                    placeholder="Search industries..."
                                    value={filter}
                                    onChange={(e) => { setFilter(e.target.value); setVisibleCount(38); }}
                                    className="w-full pl-12 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Grid */}
                <section className="relative pb-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto" ref={gridRef}>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                            {displayed.map((industry, index) => (
                                <Link
                                    key={index}
                                    href={`/industries/${industry.slug}`}
                                    className={`industry-card group relative p-5 rounded-2xl border transition-all duration-300 text-center hover:-translate-y-2 hover:shadow-lg hover:shadow-purple-500/10 ${colorMap[industry.color] || 'border-slate-700/50 bg-slate-800/30'}`}
                                >
                                    <div className="text-purple-400 mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                                        <industry.icon className="w-8 h-8" strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors leading-tight">{industry.name}</h3>
                                </Link>
                            ))}
                        </div>

                        {filtered.length > visibleCount && (
                            <div className="text-center mt-12">
                                <button
                                    onClick={() => setVisibleCount((prev) => prev + 12)}
                                    className="inline-flex items-center px-8 py-3 bg-slate-800 border border-slate-700 text-white font-medium rounded-full hover:border-purple-500/50 transition-all duration-300 hover:-translate-y-0.5"
                                >
                                    Load More Industries
                                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </div>
                        )}

                        {filtered.length === 0 && (
                            <div className="text-center py-16">
                                <p className="text-gray-400 text-lg">No industries found matching &quot;{filter}&quot;</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className="relative py-24 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-violet-500/10" />
                    <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Don&apos;t See Your Industry?</h2>
                        <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">Our expertise extends across every sector. Let&apos;s discuss how we can help your industry embrace digital transformation.</p>
                        <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:-translate-y-1 text-lg">
                            Get in Touch
                        </Link>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
