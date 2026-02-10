import Link from 'next/link';

const services = [
    { label: 'Strategy & Digital Transformation', slug: 'strategy-digital-transformation' },
    { label: 'Application Services', slug: 'application-services' },
    { label: 'Cloud Services', slug: 'cloud-services' },
    { label: 'Data, Analytics & AI', slug: 'data-analytics-ai' },
    { label: 'Digital Engineering', slug: 'digital-engineering' },
    { label: 'Cybersecurity', slug: 'cybersecurity' },
];

const industries = [
    { label: 'Healthcare', slug: 'healthcare' },
    { label: 'Banking & Finance', slug: 'banking-finance' },
    { label: 'Retail & Ecommerce', slug: 'retail-ecommerce' },
    { label: 'Manufacturing', slug: 'manufacturing' },
    { label: 'Energy & Utilities', slug: 'energy-utilities' },
    { label: 'High Technology', slug: 'high-technology' },
];

const company = [
    { href: '/about', label: 'About Us' },
    { href: '/blog', label: 'Insights' },
    { href: '/careers', label: 'Careers' },
    { href: '/contact', label: 'Contact' },
];

const legal = [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/cookies', label: 'Cookie Policy' },
    { href: '/admin', label: 'Admin Login' },
];

export default function Footer() {
    return (
        <footer className="bg-slate-900 border-t border-slate-800">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="flex items-center space-x-2 mb-6">
                            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">G</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                Giakaa
                            </span>
                        </Link>
                        <p className="text-gray-400 mb-6 max-w-md">
                            AI-first consulting firm delivering high-impact solutions that drive
                            measurable growth across 40+ industries worldwide.
                        </p>
                        <div className="flex space-x-4">
                            {['linkedin', 'twitter', 'facebook'].map((social) => (
                                <a
                                    key={social}
                                    href={`https://${social}.com/giakaa`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"
                                >
                                    <span className="sr-only">{social}</span>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10c0-5.523-4.477-10-10-10z" />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Services</h4>
                        <ul className="space-y-3">
                            {services.map((service) => (
                                <li key={service.slug}>
                                    <Link
                                        href={`/services/${service.slug}`}
                                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                                    >
                                        {service.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Industries */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Industries</h4>
                        <ul className="space-y-3">
                            {industries.map((industry) => (
                                <li key={industry.slug}>
                                    <Link
                                        href={`/industries/${industry.slug}`}
                                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                                    >
                                        {industry.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Company</h4>
                        <ul className="space-y-3">
                            {company.map((item) => (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className="text-gray-400 hover:text-cyan-400 transition-colors text-sm"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-500 text-sm">
                            © {new Date().getFullYear()} Giakaa. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            {legal.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
