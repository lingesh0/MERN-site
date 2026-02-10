'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/hero', label: 'Hero Slides', icon: '🖼️' },
    { href: '/admin/blogs', label: 'Blog Posts', icon: '📝' },
    { href: '/admin/services', label: 'Services', icon: '🛠️' },
    { href: '/admin/industries', label: 'Industries', icon: '🏭' },
    { href: '/admin/contacts', label: 'Contacts', icon: '📬' },
];

export default function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 bg-slate-800 min-h-screen fixed left-0 top-0 border-r border-slate-700">
            {/* Logo */}
            <div className="h-20 flex items-center px-6 border-b border-slate-700">
                <Link href="/admin" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
                        <span className="text-white font-bold text-lg">G</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-bold text-white leading-none">Giakaa</span>
                        <span className="text-[10px] uppercase tracking-wider text-cyan-400 font-semibold mt-0.5">Admin Panel</span>
                    </div>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="p-4">
                <ul className="space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={`flex items-center px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-cyan-500/20 text-cyan-400'
                                        : 'text-gray-400 hover:bg-slate-700 hover:text-white'
                                        }`}
                                >
                                    <span className="text-xl mr-3">{item.icon}</span>
                                    <span className="font-medium">{item.label}</span>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            {/* Back to Site */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
                <Link
                    href="/"
                    className="flex items-center justify-center px-4 py-3 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-all"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Site
                </Link>
            </div>
        </aside>
    );
}
