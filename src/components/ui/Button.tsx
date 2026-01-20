import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'terracotta';
type ButtonSize = 'default' | 'lg' | 'sm';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-9 px-5 text-sm',
  default: 'h-11 px-6 text-sm',
  lg: 'h-12 px-8 text-sm',
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
    font-medium tracking-wide
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/30 focus-visible:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    rounded-md
  `;

  const variantStyles: Record<ButtonVariant, string> = {
    primary: 'btn-primary',
    terracotta: 'btn-terracotta',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost hover:underline underline-offset-4',
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${variantStyles[variant]}
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
