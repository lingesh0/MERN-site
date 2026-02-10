'use client';

import { useState } from 'react';

export default function Newsletter() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus('loading');

        // Simulate API call
        setTimeout(() => {
            setStatus('success');
            setEmail('');
            setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
    };

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600 via-blue-700 to-purple-800" />

            {/* Animated Shapes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                {/* Content */}
                <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
                    Stay Updated
                </span>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    Get the Latest{' '}
                    <span className="text-cyan-300">Insights</span>
                </h2>

                <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                    Subscribe to our newsletter for the latest trends in AI, digital transformation, and technology innovation.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 relative">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full px-6 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent transition-all"
                                disabled={status === 'loading'}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={status === 'loading'}
                            className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-full hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {status === 'loading' ? (
                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                            ) : (
                                'Subscribe'
                            )}
                        </button>
                    </div>

                    {/* Status Messages */}
                    {status === 'success' && (
                        <p className="mt-4 text-green-300 flex items-center justify-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            You&apos;re subscribed! Check your inbox for confirmation.
                        </p>
                    )}
                </form>

                {/* Trust Indicators */}
                <p className="mt-8 text-white/60 text-sm">
                    Join 10,000+ technology leaders. Unsubscribe anytime.
                </p>
            </div>
        </section>
    );
}
