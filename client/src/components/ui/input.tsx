import type { InputHTMLAttributes, TextareaHTMLAttributes, LabelHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';
export const Input = ({ className, ...p }: InputHTMLAttributes<HTMLInputElement>) => <input data-slot="input" className={cn(className)} {...p} />;
export const Textarea = ({ className, ...p }: TextareaHTMLAttributes<HTMLTextAreaElement>) => <textarea data-slot="textarea" className={cn(className)} {...p} />;
export const Label = ({ className, ...p }: LabelHTMLAttributes<HTMLLabelElement>) => <label data-slot="label" className={cn(className)} {...p} />;
