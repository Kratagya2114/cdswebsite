import { Label } from './ui/input';
import { Textarea } from './ui/input';
import { Input } from './ui/input';
import { Button } from './ui/button';
import Icon from './Icon';
import { useState, type FormEvent } from 'react';
import { submitContact } from '../lib/api';
import { budgets, projectTypes, timelines } from '../data/formOptions';
import { site } from '../data/site';
import { emailRe, useFormState } from './useFormState';

const empty = { name: '', email: '', company: '', projectType: '', budget: '', timeline: '', message: '', links: '' };

export default function ContactForm({ defaultType = '' }: { defaultType?: string }) {
  const [values, setValues] = useState({ ...empty, projectType: defaultType });
  const [honeypot, setHoneypot] = useState('');
  const { status, setStatus, errors, setErrors, formError, setFormError, inFlight, startedAt } = useFormState();

  const set = (k: keyof typeof empty) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: '' }));
  };

  const validate = () => {
    const er: Record<string, string> = {};
    if (values.name.trim().length < 2) er.name = 'Please tell us your name.';
    if (!emailRe.test(values.email.trim())) er.email = 'Please enter a valid email address.';
    if (!values.projectType) er.projectType = 'Please choose a project type.';
    if (values.message.trim().length < 20) er.message = 'Please describe your project in at least 20 characters.';
    return er;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (inFlight.current) return; // prevent duplicate submissions
    const er = validate();
    setErrors(er);
    setFormError('');
    if (Object.keys(er).length) {
      document.getElementById(`f-${Object.keys(er)[0]}`)?.focus();
      return;
    }
    inFlight.current = true;
    setStatus('submitting');
    const res = await submitContact({ ...values, website_url: honeypot, startedAt: startedAt.current });
    inFlight.current = false;
    if (res.ok) {
      setStatus('success');
      setValues({ ...empty });
    } else {
      setStatus('error');
      if (res.fields) setErrors(res.fields);
      setFormError(res.error ?? 'Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="success-panel card" role="status">
        <div className="big" aria-hidden="true"><Icon name="party" size={48} /></div>
        <h2>Message received!</h2>
        <p className="lead" style={{ margin: '0 auto 20px' }}>
          Thanks for reaching out. We’ve received your inquiry and will reply personally, usually within one to two working days.
        </p>
        <Button variant="outline" onClick={() => setStatus('idle')}>Send another inquiry</Button>
      </div>
    );
  }

  const err = (k: string) => errors[k] ? <span className="field__error" id={`e-${k}`} role="alert">{errors[k]}</span> : null;
  const aria = (k: string) => ({ 'aria-invalid': errors[k] ? true : undefined, 'aria-describedby': errors[k] ? `e-${k}` : undefined } as const);
  const busy = status === 'submitting';

  return (
    <form className="form" onSubmit={onSubmit} noValidate aria-busy={busy}>
      {status === 'error' && formError && (
        <div className="alert alert--error" role="alert">
          {formError} <br />You can also email us at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </div>
      )}
      <div className="form-row">
        <div className="field">
          <Label htmlFor="f-name">Full name <span className="req" aria-hidden="true">*</span></Label>
          <Input id="f-name" className="input" value={values.name} onChange={set('name')} autoComplete="name" required {...aria('name')} />
          {err('name')}
        </div>
        <div className="field">
          <Label htmlFor="f-email">Work email <span className="req" aria-hidden="true">*</span></Label>
          <Input id="f-email" type="email" className="input" value={values.email} onChange={set('email')} autoComplete="email" required {...aria('email')} />
          {err('email')}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <Label htmlFor="f-company">Company or brand <span className="opt">(optional)</span></Label>
          <Input id="f-company" className="input" value={values.company} onChange={set('company')} autoComplete="organization" />
        </div>
        <div className="field">
          <Label htmlFor="f-projectType">Project type <span className="req" aria-hidden="true">*</span></Label>
          <select id="f-projectType" className="input" value={values.projectType} onChange={set('projectType')} required {...aria('projectType')}>
            <option value="">Select a project type…</option>
            {projectTypes.map((t) => (<option key={t}>{t}</option>))}
          </select>
          {err('projectType')}
        </div>
      </div>
      <div className="form-row">
        <div className="field">
          <Label htmlFor="f-budget">Estimated budget <span className="opt">(optional)</span></Label>
          <select id="f-budget" className="input" value={values.budget} onChange={set('budget')}>
            <option value="">Prefer not to say</option>
            {budgets.map((b) => (<option key={b}>{b}</option>))}
          </select>
        </div>
        <div className="field">
          <Label htmlFor="f-timeline">Project timeline <span className="opt">(optional)</span></Label>
          <select id="f-timeline" className="input" value={values.timeline} onChange={set('timeline')}>
            <option value="">Not sure yet</option>
            {timelines.map((t) => (<option key={t}>{t}</option>))}
          </select>
        </div>
      </div>
      <div className="field">
        <Label htmlFor="f-message">Project description <span className="req" aria-hidden="true">*</span></Label>
        <Textarea id="f-message" className="input" value={values.message} onChange={set('message')} placeholder="What are you building, and what should it help you achieve?" required maxLength={4000} {...aria('message')} />
        {err('message')}
      </div>
      <div className="field">
        <Label htmlFor="f-links">Reference website or portfolio links <span className="opt">(optional)</span></Label>
        <Input id="f-links" className="input" value={values.links} onChange={set('links')} placeholder="https://…" />
      </div>
      {/* Honeypot: hidden from people, tempting to bots */}
      <div className="hp" aria-hidden="true">
        <Label htmlFor="f-website_url">Leave this field empty</Label>
        <Input id="f-website_url" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>
      <Button type="submit" disabled={busy}>
        {busy ? 'Sending…' : <>Send Inquiry <Icon name="upright" /></>}
      </Button>
    </form>
  );
}
