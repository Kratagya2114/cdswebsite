import type { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
type P = HTMLAttributes<HTMLDivElement>;
export const Card = ({ className, ...p }: P) => <div data-slot="card" className={cn('card', className)} {...p} />;
export const CardHeader = ({ className, ...p }: P) => <div data-slot="card-header" className={cn('card-header', className)} {...p} />;
export const CardTitle = ({ className, ...p }: P) => <h3 data-slot="card-title" className={className} {...p} />;
export const CardContent = ({ className, ...p }: P) => <div data-slot="card-content" className={className} {...p} />;
