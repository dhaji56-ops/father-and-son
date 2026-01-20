import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  featured?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingStyles = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  className = '',
  hover = true,
  featured = false,
  padding = 'lg',
}: CardProps) {
  return (
    <div
      className={`
        card-warm
        ${paddingStyles[padding]}
        ${hover ? 'hover:shadow-warm-md' : ''}
        ${featured ? 'card-featured' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
}
