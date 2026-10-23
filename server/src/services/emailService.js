import nodemailer from 'nodemailer';
import { config, emailConfigured } from '../config.js';

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: config.smtp.host,
      port: config.smtp.port,
      secure: config.smtp.secure,
      auth: { user: config.smtp.user, pass: config.smtp.pass },
    });
  }
  return transporter;
}

export class EmailNotConfiguredError extends Error {
  constructor() {
    super('Email is not configured on the server.');
    this.name = 'EmailNotConfiguredError';
  }
}

const esc = (value = '') =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const row = (label, value) =>
  value
    ? `<tr><td style="padding:10px 14px;background:#F4F0FF;font:600 12px Arial,sans-serif;color:#4A3FD1;text-transform:uppercase;letter-spacing:.06em;width:150px;vertical-align:top">${esc(label)}</td><td style="padding:10px 14px;font:15px/1.55 Arial,sans-serif;color:#1B1730;white-space:pre-wrap">${esc(value)}</td></tr>`
    : '';

const shell = (title, body) => `<!doctype html><html><body style="margin:0;padding:24px;background:#FBF9F6">
<div style="max-width:620px;margin:0 auto;background:#fff;border:1px solid #E8E2F5;border-radius:16px;overflow:hidden">
<div style="padding:22px 24px;background:#1B1730;color:#fff;font:700 18px Arial,sans-serif">CDS · ${esc(title)}</div>
<div style="padding:20px 24px">${body}</div>
<div style="padding:14px 24px;background:#FBF9F6;font:12px Arial,sans-serif;color:#7A7491">Crafting Digital Solution</div>
</div></body></html>`;

async function send(mail) {
  if (!emailConfigured()) throw new EmailNotConfiguredError();
  const info = await getTransporter().sendMail(mail);
  // Only treat as success if the SMTP server actually accepted the recipient.
  if (!info.accepted || info.accepted.length === 0) {
    throw new Error('SMTP server did not accept any recipients.');
  }
  return info;
}

export async function sendInquiry(data) {
  const html = shell(
    'New project inquiry',
    `<table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:separate;border-spacing:0 6px">
      ${row('Name', data.name)}${row('Email', data.email)}${row('Company', data.company)}
      ${row('Project type', data.projectType)}${row('Budget', data.budget)}${row('Timeline', data.timeline)}
      ${row('Description', data.message)}${row('Reference links', data.links)}
    </table>`,
  );
  const text = [
    `New project inquiry`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company && `Company: ${data.company}`,
    `Project type: ${data.projectType}`,
    data.budget && `Budget: ${data.budget}`,
    data.timeline && `Timeline: ${data.timeline}`,
    `\n${data.message}`,
    data.links && `\nLinks: ${data.links}`,
  ]
    .filter(Boolean)
    .join('\n');

  return send({
    from: `"CDS Website" <${config.smtp.sender}>`,
    to: config.smtp.receiver,
    replyTo: `"${data.name.replace(/"/g, '')}" <${data.email}>`,
    subject: `New inquiry: ${data.projectType} — ${data.name}`,
    html,
    text,
  });
}

export async function sendFeedback(data) {
  const html = shell(
    'New client feedback',
    `<table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:separate;border-spacing:0 6px">
      ${row('Name', data.name)}${row('Email', data.email)}${row('Company', data.company)}${row('Role', data.role)}
      ${row('Rating', `${data.rating} / 5`)}${row('Feedback', data.message)}${row('Display consent', 'Yes — agreed to public display')}
    </table>
    <p style="font:13px Arial,sans-serif;color:#7A7491">To show it on the site, add it to <code>client/src/data/reviews.ts</code>.</p>`,
  );
  return send({
    from: `"CDS Website" <${config.smtp.sender}>`,
    to: config.smtp.receiver,
    replyTo: `"${data.name.replace(/"/g, '')}" <${data.email}>`,
    subject: `New client feedback (${data.rating}/5) — ${data.name}`,
    html,
    text: `Feedback from ${data.name} <${data.email}> (${data.rating}/5)\n\n${data.message}`,
  });
}

export async function sendAcknowledgment(data, kind = 'inquiry') {
  const isFeedback = kind === 'feedback';
  const first = data.name.split(' ')[0];
  const html = shell(
    isFeedback ? 'Thanks for your feedback' : 'We got your message',
    `<p style="font:16px/1.6 Arial,sans-serif;color:#1B1730">Hi ${esc(first)},</p>
     <p style="font:16px/1.6 Arial,sans-serif;color:#1B1730">${
       isFeedback
         ? 'Thank you for taking the time to share your feedback with Crafting Digital Solution. It genuinely helps us improve.'
         : 'Thanks for reaching out to Crafting Digital Solution. We have received your project inquiry and will get back to you personally, usually within one to two working days.'
     }</p>
     <p style="font:16px/1.6 Arial,sans-serif;color:#1B1730">— Keshav &amp; the CDS team</p>`,
  );
  return send({
    from: `"Crafting Digital Solution" <${config.smtp.sender}>`,
    to: data.email,
    replyTo: config.smtp.receiver,
    subject: isFeedback ? 'Thanks for your feedback — CDS' : 'We received your inquiry — CDS',
    html,
    text: `Hi ${first},\n\n${
      isFeedback
        ? 'Thank you for sharing your feedback with Crafting Digital Solution.'
        : 'Thanks for reaching out to Crafting Digital Solution. We have received your inquiry and will reply within one to two working days.'
    }\n\n— Keshav & the CDS team`,
  });
}
