import type { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide';
}

const sizeStyles = {
  default: 'max-w-6xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-[1600px]',
};

export function Container({
  children,
  className = '',
  size = 'default',
}: ContainerProps) {
  return (
    <div
      className={`
        w-full mx-auto px-8 md:px-16
        ${sizeStyles[size]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </div>
  );
}
