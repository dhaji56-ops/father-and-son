import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'default' | 'lg' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-10 px-6 text-[10px]',
  default: 'h-12 px-8 text-xs',
  lg: 'h-14 px-10 text-xs',
};

export function Button({
  children,
  variant = 'primary',
  size = 'default',
  fullWidth = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center
    uppercase tracking-luxury font-medium
    transition-luxury
    focus-visible:outline-1 focus-visible:outline-luxury-fg focus-visible:outline-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;

  if (variant === 'primary') {
    return (
      <button
        className={`
          ${baseStyles}
          btn-luxury-primary
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      >
        <span>{children}</span>
      </button>
    );
  }

  if (variant === 'secondary') {
    return (
      <button
        className={`
          ${baseStyles}
          btn-luxury-secondary
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `.trim().replace(/\s+/g, ' ')}
        {...props}
      >
        {children}
      </button>
    );
  }

  // Ghost variant
  return (
    <button
      className={`
        ${baseStyles}
        text-luxury-fg hover:text-luxury-accent
        ${sizeStyles[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {children}
    </button>
  );
}
