'use client';

import PageTransition from '@/components/animations/PageTransition';
import { ReactNode } from 'react';

export default function DetailPageWrapper({ children }: { children: ReactNode }) {
    return <PageTransition>{children}</PageTransition>;
}
