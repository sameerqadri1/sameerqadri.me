'use client';

import { type ButtonHTMLAttributes, forwardRef, cloneElement, isValidElement, type ReactElement } from 'react';

const base =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:opacity-60 disabled:cursor-not-allowed';

const variants = {
  primary:
    'bg-primary text-primary-foreground shadow-xl shadow-primary/20 hover:bg-primary/90',
  secondary:
    'bg-secondary text-secondary-foreground border border-border hover:bg-secondary/80',
  ghost:
    'text-muted-foreground hover:text-foreground hover:bg-white/5',
} as const;

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-sm',
} as const;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  /** When true, render the single child element with merged props (e.g. Link). */
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', asChild, children, ...props }, ref) => {
    const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim();
    if (asChild && isValidElement(children)) {
      return cloneElement(children as ReactElement<{ className?: string; ref?: React.Ref<unknown> }>, {
        className: [classes, (children as ReactElement<{ className?: string }>).props?.className].filter(Boolean).join(' '),
        ref,
      });
    }
    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
