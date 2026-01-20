import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-[10px] uppercase tracking-luxury text-luxury-muted-fg mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            input-luxury
            w-full
            h-12
            text-base
            ${error ? 'border-luxury-accent' : ''}
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          {...props}
        />
        {error && (
          <p className="mt-2 text-[10px] uppercase tracking-luxury text-luxury-accent">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
