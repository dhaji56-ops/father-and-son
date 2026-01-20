import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  border?: 2 | 4;
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
  hover = false,
  border = 4,
  padding = 'lg',
}: CardProps) {
  return (
    <div
      className={`
        bg-white
        ${border === 4 ? 'border-4' : 'border-2'} border-black
        rounded-none
        ${paddingStyles[padding]}
        ${hover ? 'transition-colors duration-200 hover:bg-black hover:text-white group' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
}
