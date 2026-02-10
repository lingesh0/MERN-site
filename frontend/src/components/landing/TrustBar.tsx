import LogoMarquee from '@/components/animations/LogoMarquee';

const partnerLogos = [
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
    { name: 'KPMG' },
    { name: 'PwC' },
];

export default function TrustBar() {
    return (
        <section className="relative py-16 bg-slate-950 overflow-hidden">
            {/* Top Border Glow */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 to-transparent" />

            <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-gray-500 text-sm uppercase tracking-widest">
                        Trusted by Industry Leaders
                    </p>
                </div>

                {/* Logo Marquees */}
                <div className="space-y-8">
                    <LogoMarquee logos={partnerLogos.slice(0, 6)} speed={25} direction="left" />
                    <LogoMarquee logos={partnerLogos.slice(6)} speed={25} direction="right" />
                </div>
            </div>

            {/* Bottom Border Glow */}
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
        </section>
    );
}
