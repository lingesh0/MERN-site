'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
    { href: '/services', label: 'Services' },
    { href: '/industries', label: 'Industries' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Insights' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact us' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
                    ? 'bg-slate-900/95 backdrop-blur-xl border-b border-slate-800 shadow-lg shadow-black/10'
                    : 'bg-transparent border-b border-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                            <span className="text-white font-bold text-xl">G</span>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                            Giakaa
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 group ${pathname === link.href || pathname.startsWith(link.href + '/')
                                        ? 'text-cyan-400'
                                        : 'text-gray-300 hover:text-white'
                                    }`}
                            >
                                {link.label}
                                {/* Underline hover effect */}
                                <span
                                    className={`absolute bottom-0 left-4 right-4 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 transition-transform duration-300 origin-left ${pathname === link.href || pathname.startsWith(link.href + '/')
                                            ? 'scale-x-100'
                                            : 'scale-x-0 group-hover:scale-x-100'
                                        }`}
                                />
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="ml-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:-translate-y-0.5"
                        >
                            Let&apos;s Talk
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden text-gray-300 hover:text-white p-2 relative w-10 h-10 flex items-center justify-center"
                        aria-label="Toggle menu"
                    >
                        <span className={`absolute w-6 h-[2px] bg-current transition-all duration-300 ${isOpen ? 'rotate-45' : '-translate-y-2'}`} />
                        <span className={`absolute w-6 h-[2px] bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
                        <span className={`absolute w-6 h-[2px] bg-current transition-all duration-300 ${isOpen ? '-rotate-45' : 'translate-y-2'}`} />
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <div className="py-4 border-t border-slate-800 space-y-1">
                        {navLinks.map((link, i) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${pathname === link.href
                                        ? 'text-cyan-400 bg-cyan-500/10'
                                        : 'text-gray-300 hover:text-white hover:bg-slate-800/50'
                                    }`}
                                style={{ transitionDelay: isOpen ? `${i * 50}ms` : '0ms' }}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="block mx-4 mt-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-6 py-3 rounded-full font-semibold text-center text-sm"
                            onClick={() => setIsOpen(false)}
                        >
                            Let&apos;s Talk
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}
