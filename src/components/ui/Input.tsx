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
            className="block text-xs font-bold uppercase tracking-widest mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full
            px-4 py-3
            bg-white
            border-2 border-black
            rounded-none
            text-base
            placeholder:text-gray-400 placeholder:uppercase placeholder:tracking-wide placeholder:text-sm
            focus:border-swiss-accent focus:outline-none
            transition-colors duration-200
            ${error ? 'border-swiss-accent' : ''}
            ${className}
          `.trim().replace(/\s+/g, ' ')}
          {...props}
        />
        {error && (
          <p className="mt-1 text-xs text-swiss-accent font-medium">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
