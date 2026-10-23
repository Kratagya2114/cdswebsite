import { cloneElement, isValidElement, type ButtonHTMLAttributes, type ReactElement } from 'react';
import { cn } from '../../lib/utils';

const variants = { default: 'btn btn--primary', outline: 'btn', dark: 'btn btn--dark', ghost: 'btn btn--ghost' } as const;
const sizes = { default: '', sm: 'btn--sm' } as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  asChild?: boolean;
}

export function Button({ variant = 'default', size = 'default', asChild, className, children, ...props }: ButtonProps) {
  const cls = cn(variants[variant], sizes[size], className);
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, { ...props, className: cn(cls, child.props.className) } as object);
  }
  return <button data-slot="button" className={cls} {...props}>{children}</button>;
}
