import { useRef, useState } from 'react';

export type Status = 'idle' | 'submitting' | 'success' | 'error';

/** Shared state for forms: status, field errors, general error, and a duplicate-submit guard. */
export function useFormState() {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState('');
  const inFlight = useRef(false);
  const startedAt = useRef(Date.now());

  return {
    status, setStatus, errors, setErrors, formError, setFormError, inFlight, startedAt,
  };
}

export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
