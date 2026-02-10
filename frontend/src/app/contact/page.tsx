'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import PageTransition from '@/components/animations/PageTransition';

const services = [
    'Strategy & Digital Transformation',
    'Application Services',
    'Cloud Services',
    'Data, Analytics & AI',
    'Digital Engineering',
    'Cybersecurity',
    'Generative AI Solutions',
    'Other',
];

const offices = [
    { city: 'New York', country: 'United States', address: '350 Fifth Avenue, Suite 4800', phone: '+1 (212) 555-0100', icon: '🇺🇸' },
    { city: 'London', country: 'United Kingdom', address: '30 St Mary Axe, Level 28', phone: '+44 20 7946 0958', icon: '🇬🇧' },
    { city: 'Bangalore', country: 'India', address: '100 Feet Road, Indiranagar', phone: '+91 80 4567 8900', icon: '🇮🇳' },
];

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/contact`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (data.success) {
                setStatus('success');
                setForm({ name: '', email: '', company: '', service: '', message: '' });
            } else {
                setStatus('error');
                setErrorMsg(data.errors?.[0]?.msg || data.message || 'Something went wrong');
            }
        } catch {
            setStatus('error');
            setErrorMsg('Unable to submit. Please try again later.');
        }
    };

    useEffect(() => {
        const timeout = setTimeout(async () => {
            const { gsap } = await import('gsap');
            const { ScrollTrigger } = await import('gsap/ScrollTrigger');
            gsap.registerPlugin(ScrollTrigger);

            const tl = gsap.timeline({ delay: 0.3 });
            tl.from('.contact-hero-title', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' })
                .from('.contact-hero-sub', { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.4');

            gsap.from('.contact-form-container', {
                scrollTrigger: { trigger: '.contact-form-container', start: 'top 90%' },
                opacity: 0, y: 40, duration: 0.7, ease: 'power3.out',
            });

            gsap.from('.contact-info-card', {
                scrollTrigger: { trigger: '.contact-info-col', start: 'top 85%' },
                opacity: 0, y: 30, duration: 0.5, stagger: 0.1, ease: 'power3.out',
            });
        }, 100);
        return () => clearTimeout(timeout);
    }, []);

    return (
        <PageTransition>
            <div className="min-h-screen bg-slate-900">
                {/* Hero */}
                <section className="relative pt-32 pb-16 overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.05)_1px,transparent_1px)] bg-[size:64px_64px]" />
                    </div>
                    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <nav className="flex justify-center mb-8">
                            <ol className="flex items-center space-x-2 text-sm text-gray-400">
                                <li><Link href="/" className="hover:text-cyan-400 transition-colors">Home</Link></li>
                                <li><span className="mx-2">/</span></li>
                                <li className="text-cyan-400">Contact</li>
                            </ol>
                        </nav>
                        <h1 className="contact-hero-title text-5xl md:text-7xl font-bold text-white mb-6">
                            Let&apos;s{' '}
                            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Talk</span>
                        </h1>
                        <p className="contact-hero-sub text-xl text-gray-400 max-w-2xl mx-auto">
                            Ready to transform your business? Tell us about your project and we&apos;ll get back to you within 24 hours.
                        </p>
                    </div>
                </section>

                {/* Form + Info */}
                <section className="relative pb-24 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-5 gap-12">
                            {/* Form */}
                            <div className="lg:col-span-3 contact-form-container">
                                <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Your Name *</label>
                                            <input type="text" name="name" id="name" value={form.name} onChange={handleChange} required
                                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder-gray-600" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email Address *</label>
                                            <input type="email" name="email" id="email" value={form.email} onChange={handleChange} required
                                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder-gray-600" placeholder="john@company.com" />
                                        </div>
                                    </div>
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="company" className="block text-sm font-medium text-gray-300 mb-2">Company</label>
                                            <input type="text" name="company" id="company" value={form.company} onChange={handleChange}
                                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors placeholder-gray-600" placeholder="Acme Inc." />
                                        </div>
                                        <div>
                                            <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">Service</label>
                                            <select name="service" id="service" value={form.service} onChange={handleChange}
                                                className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors appearance-none cursor-pointer">
                                                <option value="" className="bg-slate-900">Select a Service</option>
                                                {services.map((s) => (<option key={s} value={s} className="bg-slate-900">{s}</option>))}
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message *</label>
                                        <textarea name="message" id="message" value={form.message} onChange={handleChange} required rows={5}
                                            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 transition-colors resize-none placeholder-gray-600" placeholder="Tell us about your project..." />
                                    </div>

                                    {status === 'success' && (
                                        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-sm flex items-center gap-2">
                                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                            Thank you! Your message has been received. We&apos;ll get back to you within 24 hours.
                                        </div>
                                    )}
                                    {status === 'error' && (
                                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">{errorMsg}</div>
                                    )}

                                    <button type="submit" disabled={status === 'loading'}
                                        className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                        {status === 'loading' ? (
                                            <><svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg>Sending...</>
                                        ) : 'Send Message'}
                                    </button>
                                </form>
                            </div>

                            {/* Contact Info */}
                            <div className="lg:col-span-2 contact-info-col space-y-6">
                                <div className="contact-info-card p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50">
                                    <h3 className="text-lg font-bold text-white mb-4">Quick Contact</h3>
                                    <div className="space-y-4">
                                        <a href="mailto:hello@giakaa.com" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors">
                                            <span className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">📧</span>
                                            hello@giakaa.com
                                        </a>
                                        <a href="tel:+12125550100" className="flex items-center gap-3 text-gray-300 hover:text-cyan-400 transition-colors">
                                            <span className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center">📞</span>
                                            +1 (212) 555-0100
                                        </a>
                                    </div>
                                </div>
                                {offices.map((office, i) => (
                                    <div key={i} className="contact-info-card p-6 bg-slate-800/40 rounded-2xl border border-slate-700/50 hover:border-cyan-500/30 transition-colors">
                                        <div className="flex items-center gap-3 mb-3">
                                            <span className="text-2xl">{office.icon}</span>
                                            <div>
                                                <h4 className="font-bold text-white">{office.city}</h4>
                                                <p className="text-gray-500 text-sm">{office.country}</p>
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm">{office.address}</p>
                                        <p className="text-gray-400 text-sm mt-1">{office.phone}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </PageTransition>
    );
}
