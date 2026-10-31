'use client';

import { type ButtonHTMLAttributes, forwardRef, cloneElement, isValidElement, type ReactElement } from 'react';

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-[6px] transition-colors focus-visible:outline-2 focus-visible:outline-accent disabled:opacity-60 disabled:cursor-not-allowed';

const variants = {
  primary:
    'bg-primary text-primary-foreground hover:opacity-90',
  secondary:
    'bg-card text-foreground border border-border hover:bg-muted',
  ghost:
    'text-muted-foreground hover:text-foreground hover:bg-muted',
} as const;

const sizes = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-xs sm:text-sm',
  lg: 'px-5 py-2.5 text-sm',
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
