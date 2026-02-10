const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
    success: boolean;
    data?: T;
    message?: string;
    pagination?: {
        page: number;
        limit: number;
        total: number;
        pages: number;
    };
}

async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers,
        },
        ...options,
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'API request failed');
    }

    return response.json();
}

// Hero API
export interface HeroSlide {
    _id: string;
    title: string;
    description: string;
    mediaUrl: string;
    mediaType: 'image' | 'video';
    ctaText: string;
    ctaLink: string;
    order: number;
    isActive: boolean;
}

export const heroApi = {
    getAll: (all?: boolean) => fetchApi<HeroSlide[]>(`/hero${all ? '?all=true' : ''}`),
    getById: (id: string) => fetchApi<HeroSlide>(`/hero/${id}`),
    create: async (data: FormData) => {
        const response = await fetch(`${API_BASE_URL}/hero`, {
            method: 'POST',
            body: data,
        });
        return response.json();
    },
    update: async (id: string, data: FormData) => {
        const response = await fetch(`${API_BASE_URL}/hero/${id}`, {
            method: 'PUT',
            body: data,
        });
        return response.json();
    },
    delete: (id: string) => fetchApi(`/hero/${id}`, { method: 'DELETE' }),
    reorder: (orders: { id: string; order: number }[]) =>
        fetchApi('/hero/reorder', {
            method: 'PATCH',
            body: JSON.stringify({ orders })
        }),
};

// Blog API
export interface BlogPost {
    _id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    metaTitle: string;
    metaDescription: string;
    featuredImage: string;
    author: string;
    category: string;
    tags: string[];
    status: 'draft' | 'published';
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
}

export const blogApi = {
    getAll: (params?: { status?: string; page?: number; limit?: number; category?: string }) => {
        const query = new URLSearchParams();
        if (params?.status) query.append('status', params.status);
        if (params?.page) query.append('page', params.page.toString());
        if (params?.limit) query.append('limit', params.limit.toString());
        if (params?.category) query.append('category', params.category);
        return fetchApi<BlogPost[]>(`/blogs?${query.toString()}`);
    },
    getBySlug: (slug: string) => fetchApi<BlogPost>(`/blogs/${slug}`),
    getById: (id: string) => fetchApi<BlogPost>(`/blogs/id/${id}`),
    create: async (data: FormData) => {
        const response = await fetch(`${API_BASE_URL}/blogs`, {
            method: 'POST',
            body: data,
        });
        return response.json();
    },
    update: async (id: string, data: FormData) => {
        const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
            method: 'PUT',
            body: data,
        });
        return response.json();
    },
    delete: (id: string) => fetchApi(`/blogs/${id}`, { method: 'DELETE' }),
    getCategories: () => fetchApi<string[]>('/blogs/categories/list'),
};

// Upload API
export const uploadApi = {
    upload: async (file: File) => {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch(`${API_BASE_URL}/upload`, {
            method: 'POST',
            body: formData,
        });
        return response.json();
    },
};
