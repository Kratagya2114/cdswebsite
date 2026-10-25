import { Label } from './ui/input';
import { Textarea } from './ui/input';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Icon from './Icon';
import { useState, type FormEvent } from 'react';
import { submitFeedback } from '../lib/api';
import { emailRe, useFormState } from './useFormState';

const empty = { name: '', email: '', company: '', role: '', message: '' };

export default function FeedbackForm() {
  const [values, setValues] = useState(empty);
  const [rating, setRating] = useState(0);
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const { status, setStatus, errors, setErrors, formError, setFormError, inFlight, startedAt } = useFormState();

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: '' }));
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inFlight.current) return;
    const er: Record<string, string> = {};
    if (values.name.trim().length < 2) er.name = 'Please tell us your name.';
    if (!emailRe.test(values.email.trim())) er.email = 'Please enter a valid email address.';
    if (rating < 1) er.rating = 'Please choose a star rating.';
    if (values.message.trim().length < 20) er.message = 'Please write at least 20 characters.';
    if (!consent) er.consent = 'Please confirm we may display your feedback.';
    setErrors(er);
    setFormError('');
    if (Object.keys(er).length) return;

    inFlight.current = true;
    setStatus('submitting');
    const res = await submitFeedback({ ...values, rating, consent: true, website_url: honeypot, startedAt: startedAt.current });
    inFlight.current = false;
    if (res.ok) {
      setStatus('success');
      setValues(empty);
      setRating(0);
      setConsent(false);
    } else {
      setStatus('error');
      if (res.fields) setErrors(res.fields);
      setFormError(res.error ?? 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="success-panel card" role="status">
        <div className="big" aria-hidden="true"><Icon name="heart" size={48} /></div>
        <h3>Thank you!</h3>
        <p>Your feedback has been received. We really appreciate it.</p>
        <Button variant="outline" size="sm" onClick={() => setStatus('idle')}>Submit another</Button>
      </div>
    );
  }

  const err = (k: string) => errors[k] ? <span className="field__error" id={`fe-${k}`} role="alert">{errors[k]}</span> : null;
  const busy = status === 'submitting';

  return (
    <form className="form card" onSubmit={onSubmit} noValidate aria-busy={busy}>
      {status === 'error' && formError && <div className="alert alert--error" role="alert">{formError}</div>}
      <div className="form-row">
        <div className="field">
          <Label htmlFor="fb-name">Your name <span className="req" aria-hidden="true">*</span></Label>
          <Input id="fb-name" className="input" value={values.name} onChange={set('name')} autoComplete="name" aria-invalid={errors.name ? true : undefined} />
          {err('name')}
        </div>
        <div className="field">
          <Label htmlFor="fb-email">Email <span className="req" aria-hidden="true">*</span> <span className="opt">(not shown publicly)</span></Label>
          <Input id="fb-email" type="email" className="input" value={values.email} onChange={set('email')} autoComplete="email" aria-invalid={errors.email ? true : undefined} />
          {err('email')}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <Label htmlFor="fb-company">Company <span className="opt">(optional)</span></Label>
          <Input id="fb-company" className="input" value={values.company} onChange={set('company')} autoComplete="organization" />
        </div>
        <div className="field">
          <Label htmlFor="fb-role">Your role <span className="opt">(optional)</span></Label>
          <Input id="fb-role" className="input" value={values.role} onChange={set('role')} autoComplete="organization-title" />
        </div>
      </div>
      <fieldset className="field" style={{ border: 0, padding: 0, margin: 0 }}>
        <legend>Rating <span className="req" aria-hidden="true">*</span></legend>
        <div className="rating" role="radiogroup" aria-label="Rating out of 5">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" role="radio" aria-checked={rating === n} aria-label={`${n} star${n > 1 ? 's' : ''}`} className={n <= rating ? 'on' : ''} onClick={() => { setRating(n); if (errors.rating) setErrors((er) => ({ ...er, rating: '' })); }}><Icon name="star" /></button>
          ))}
        </div>
        {err('rating')}
      </fieldset>
      <div className="field">
        <Label htmlFor="fb-message">Your feedback <span className="req" aria-hidden="true">*</span></Label>
        <Textarea id="fb-message" className="input" value={values.message} onChange={set('message')} maxLength={2000} placeholder="What was it like working with us?" aria-invalid={errors.message ? true : undefined} />
        {err('message')}
      </div>
      <div className="hp" aria-hidden="true">
        <Label htmlFor="fb-website_url">Leave this field empty</Label>
        <Input id="fb-website_url" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
      <div className="field">
        <Label className="checkbox">
          <Input type="checkbox" checked={consent} onChange={(e) => { setConsent(e.target.checked); if (errors.consent) setErrors((er) => ({ ...er, consent: '' })); }} />
          <span>I agree that Infincode may display my feedback (name, company and role) on its website.</span>
        </Label>
        {err('consent')}
      </div>
      <Button type="submit" disabled={busy}>{busy ? 'Sending…' : <>Submit feedback <Icon name="upright" /></>}</Button>
    </form>
  );
}
