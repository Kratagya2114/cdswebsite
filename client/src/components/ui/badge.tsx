import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
export const Badge = ({ className, ...p }: HTMLAttributes<HTMLSpanElement>) => <span data-slot="badge" className={cn('chip', className)} {...p} />;
