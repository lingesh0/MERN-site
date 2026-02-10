'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Industry {
    _id: string;
    name: string;
    slug: string;
    isActive: boolean;
}

export default function IndustriesAdmin() {
    const [industries, setIndustries] = useState<Industry[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        fetchIndustries();
    }, []);

    const fetchIndustries = async () => {
        try {
            const res = await fetch('http://localhost:5000/api/industries');
            const data = await res.json();
            if (data.success) {
                setIndustries(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch industries:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this industry?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/industries/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setIndustries(industries.filter(i => i._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete industry:', error);
        }
    };

    if (loading) return <div className="text-white">Loading...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Industries</h1>
                <Link
                    href="/admin/industries/new"
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                >
                    Add New Industry
                </Link>
            </div>

            <div className="bg-slate-800 rounded-xl border border-slate-700 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-gray-400">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Slug</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700">
                        {industries.map((industry) => (
                            <tr key={industry._id} className="hover:bg-slate-700/30 transition-colors">
                                <td className="p-4 text-white font-medium">{industry.name}</td>
                                <td className="p-4 text-gray-400">{industry.slug}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${industry.isActive ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'
                                        }`}>
                                        {industry.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <Link
                                        href={`/admin/industries/${industry._id}`}
                                        className="inline-block px-3 py-1 bg-slate-700 text-white text-sm rounded hover:bg-slate-600 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(industry._id)}
                                        className="px-3 py-1 bg-red-500/10 text-red-400 text-sm rounded hover:bg-red-500/20 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {industries.length === 0 && (
                            <tr>
                                <td colSpan={4} className="p-8 text-center text-gray-500">
                                    No industries found. Create one to get started.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

