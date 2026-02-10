'use client';

import { useState, useEffect } from 'react';

interface Contact {
    _id: string;
    name: string;
    email: string;
    company?: string;
    service?: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    createdAt: string;
}

export default function ContactsAdmin() {
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchContacts();
    }, [filter]);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const query = filter !== 'all' ? `?status=${filter}` : '';
            const res = await fetch(`http://localhost:5000/api/contact${query}`);
            const data = await res.json();
            if (data.success) {
                setContacts(data.data);
            }
        } catch (error) {
            console.error('Failed to fetch contacts:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, newStatus: string) => {
        try {
            const res = await fetch(`http://localhost:5000/api/contact/${id}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            const data = await res.json();
            if (data.success) {
                setContacts(contacts.map(c => c._id === id ? { ...c, status: newStatus as any } : c));
            }
        } catch (error) {
            console.error('Failed to update status:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const res = await fetch(`http://localhost:5000/api/contact/${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                setContacts(contacts.filter(c => c._id !== id));
            }
        } catch (error) {
            console.error('Failed to delete contact:', error);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
            case 'read': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
            case 'replied': return 'bg-green-500/10 text-green-400 border-green-500/20';
            default: return 'bg-gray-500/10 text-gray-400';
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <h1 className="text-3xl font-bold text-white">Contact Submissions</h1>
                <div className="flex gap-2 bg-slate-800 p-1 rounded-lg border border-slate-700">
                    {['all', 'new', 'read', 'replied'].map((s) => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${filter === s
                                ? 'bg-slate-700 text-white shadow-sm'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <div className="text-white">Loading messages...</div>
                ) : contacts.length === 0 ? (
                    <div className="text-center p-12 bg-slate-800/50 rounded-xl border border-slate-700 text-gray-500">
                        No messages found.
                    </div>
                ) : (
                    contacts.map((contact) => (
                        <div
                            key={contact._id}
                            className="bg-slate-800 rounded-xl border border-slate-700 p-6 hover:border-cyan-500/30 transition-all"
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{contact.name}</h3>
                                    <div className="text-cyan-400">{contact.email}</div>
                                    <div className="text-sm text-gray-500 mt-1">
                                        {contact.company && <span className="mr-3">🏢 {contact.company}</span>}
                                        {contact.service && <span>🛠️ {contact.service}</span>}
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <span className="text-xs text-gray-500">{formatDate(contact.createdAt)}</span>
                                    <div className={`px-3 py-1 rounded-full border text-xs font-medium uppercase tracking-wider ${getStatusColor(contact.status)}`}>
                                        {contact.status}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-900/50 p-4 rounded-lg text-gray-300 whitespace-pre-wrap mb-4 border border-slate-700/50">
                                {contact.message}
                            </div>

                            <div className="flex justify-end gap-3 pt-2 border-t border-slate-700/50">
                                {contact.status === 'new' && (
                                    <button
                                        onClick={() => updateStatus(contact._id, 'read')}
                                        className="px-3 py-1.5 text-sm bg-slate-700/50 text-white rounded hover:bg-slate-700"
                                    >
                                        Mark as Read
                                    </button>
                                )}
                                {contact.status !== 'replied' && (
                                    <button
                                        onClick={() => updateStatus(contact._id, 'replied')}
                                        className="px-3 py-1.5 text-sm bg-green-500/10 text-green-400 rounded hover:bg-green-500/20"
                                    >
                                        Mark as Replied
                                    </button>
                                )}
                                <button
                                    onClick={() => handleDelete(contact._id)}
                                    className="px-3 py-1.5 text-sm bg-red-500/10 text-red-400 rounded hover:bg-red-500/20"
                                >
                                    Delete
                                </button>
                                <a
                                    href={`mailto:${contact.email}`}
                                    className="px-3 py-1.5 text-sm bg-cyan-500/10 text-cyan-400 rounded hover:bg-cyan-500/20 ml-auto"
                                >
                                    Reply via Email
                                </a>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

