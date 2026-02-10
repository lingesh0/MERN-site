import Link from 'next/link';

export default function AdminDashboard() {
    const stats = [
        { label: 'Hero Slides', value: '-', icon: '🖼️', href: '/admin/hero', color: 'cyan' },
        { label: 'Blog Posts', value: '-', icon: '📝', href: '/admin/blogs', color: 'purple' },
        { label: 'Services', value: '-', icon: '🛠️', href: '/admin/services', color: 'blue' },
        { label: 'Industries', value: '-', icon: '🏭', href: '/admin/industries', color: 'orange' },
        { label: 'Messages', value: '-', icon: '📬', href: '/admin/contacts', color: 'green' },
    ];

    const quickActions = [
        { label: 'Add Hero Slide', href: '/admin/hero/new', icon: '➕' },
        { label: 'Create Blog Post', href: '/admin/blogs/new', icon: '✏️' },
        { label: 'Add Service', href: '/admin/services/new', icon: '🛠️' },
        { label: 'Add Industry', href: '/admin/industries/new', icon: '🏭' },
        { label: 'View Site', href: '/', icon: '🌐' },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
                <p className="text-gray-400">Welcome to your Giakaa CMS admin panel.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <Link key={index} href={stat.href} className="group">
                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-cyan-500/50 transition-all hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-3xl">{stat.icon}</span>
                                <span className="text-3xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                                    {stat.value}
                                </span>
                            </div>
                            <p className="text-gray-400">{stat.label}</p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {quickActions.map((action, index) => (
                        <Link
                            key={index}
                            href={action.href}
                            className="flex items-center p-4 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-all group"
                        >
                            <span className="text-2xl mr-3">{action.icon}</span>
                            <span className="text-white font-medium group-hover:text-cyan-400 transition-colors">
                                {action.label}
                            </span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Info Box */}
            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl p-6 border border-cyan-500/20">
                <h3 className="text-lg font-bold text-white mb-2">Getting Started</h3>
                <p className="text-gray-400 mb-4">
                    Use the sidebar to navigate between different content sections. You can manage hero slides,
                    blog posts, services, industries, and view contact form submissions.
                </p>
                <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">Hero Management</span>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-sm rounded-full">Blog CMS</span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 text-sm rounded-full">Image Upload</span>
                    <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full">Markdown Support</span>
                </div>
            </div>
        </div>
    );
}
