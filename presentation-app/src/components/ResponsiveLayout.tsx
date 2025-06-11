'use client';

import { ReactNode } from 'react';

interface ResponsiveLayoutProps {
    children: ReactNode;
    className?: string;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    centerContent?: boolean;
}

export default function ResponsiveLayout({
    children,
    className = '',
    maxWidth = 'full',
    padding = 'md',
    centerContent = false
}: ResponsiveLayoutProps) {
    const maxWidthClasses = {
        sm: 'max-w-sm',
        md: 'max-w-md',
        lg: 'max-w-lg',
        xl: 'max-w-xl',
        '2xl': 'max-w-2xl',
        full: 'max-w-full'
    };

    const paddingClasses = {
        none: '',
        sm: 'p-2 sm:p-4',
        md: 'p-4 sm:p-6 md:p-8',
        lg: 'p-6 sm:p-8 md:p-12'
    };

    const centerClasses = centerContent
        ? 'mx-auto flex items-center justify-center min-h-screen'
        : 'mx-auto';

    return (
        <div className={`
      w-full 
      ${maxWidthClasses[maxWidth]} 
      ${paddingClasses[padding]} 
      ${centerClasses}
      ${className}
    `}>
            {children}
        </div>
    );
}

// Specialized layout components for different contexts
export function PresentationLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div className={`w-full h-screen overflow-hidden ${className}`}>
            {children}
        </div>
    );
}

export function SpeakerLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <div className={`w-full h-screen flex flex-col bg-gray-100 ${className}`}>
            {children}
        </div>
    );
}

export function HomeLayout({ children, className = '' }: { children: ReactNode; className?: string }) {
    return (
        <ResponsiveLayout
            maxWidth="2xl"
            padding="lg"
            className={`min-h-screen bg-gray-50 ${className}`}
        >
            {children}
        </ResponsiveLayout>
    );
} 