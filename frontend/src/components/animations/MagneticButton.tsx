'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

interface MagneticButtonProps {
    children: React.ReactNode;
    href?: string;
    className?: string;
    strength?: number;
    onClick?: () => void;
}

export default function MagneticButton({
    children,
    href,
    className = '',
    strength = 0.3,
    onClick,
}: MagneticButtonProps) {
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!buttonRef.current) return;

        const rect = buttonRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        setPosition({
            x: x * strength,
            y: y * strength,
        });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const style = {
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0
            ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            : 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    };

    const baseClassName = `inline-flex items-center justify-center ${className}`;

    if (href) {
        return (
            <Link
                href={href}
                ref={buttonRef as React.RefObject<HTMLAnchorElement>}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={style}
                className={baseClassName}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            ref={buttonRef as React.RefObject<HTMLButtonElement>}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            style={style}
            className={baseClassName}
        >
            {children}
        </button>
    );
}
