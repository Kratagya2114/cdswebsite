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

const shell = (title, badge, body, actionBtn = '') => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no"/>
  <title>${esc(title)}</title>
  <style type="text/css">
    body { margin:0; padding:0; -webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; background:#F6F4F0; }
    table { border-collapse:collapse; mso-table-lspace:0pt; mso-table-rspace:0pt; }
    td { word-break:break-word; }
    a { color:#5B4BFF; text-decoration:none; }
    @media only screen and (max-width: 600px) {
      .email-wrapper { padding:10px 8px !important; }
      .email-card { border-radius:14px !important; width:100% !important; max-width:100% !important; }
      .mobile-p-20 { padding:20px 16px !important; }
      .mobile-p-16 { padding:14px 14px !important; }
      .mobile-stack-cell { display:block !important; width:100% !important; box-sizing:border-box !important; padding:0 0 10px 0 !important; }
      .mobile-btn { display:block !important; width:100% !important; text-align:center !important; box-sizing:border-box !important; }
      .mobile-hide { display:none !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#F6F4F0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F6F4F0;width:100%;">
    <tr>
      <td align="center" class="email-wrapper" style="padding:28px 12px;">
        <table role="presentation" class="email-card" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;background:#ffffff;border:1px solid #E6E0F0;border-radius:18px;overflow:hidden;box-shadow:0 8px 30px rgba(27,23,48,0.06);">
          
          <!-- Header -->
          <tr>
            <td style="padding:26px 28px 24px 28px;background:#1B1730;background-image:linear-gradient(135deg,#1B1730 0%,#2D2354 100%);color:#ffffff;" class="mobile-p-20">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <div style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#A99BFF;margin-bottom:6px;">
                      Infincode
                    </div>
                    <div style="font-size:20px;font-weight:700;line-height:1.25;color:#ffffff;letter-spacing:-0.01em;">
                      ${esc(title)}
                    </div>
                  </td>
                  ${
                    badge
                      ? `<td align="right" class="mobile-stack-cell" style="vertical-align:middle;">
                    <span style="display:inline-block;padding:6px 12px;background:rgba(255,255,255,0.12);border:1px solid rgba(255,255,255,0.18);border-radius:100px;color:#ECE9FF;font-size:11px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;">${esc(
                      badge,
                    )}</span>
                  </td>`
                      : ''
                  }
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="padding:26px 28px;" class="mobile-p-20">
              ${body}
              ${actionBtn ? `<div style="margin-top:24px;padding-top:20px;border-top:1px solid #EFEAF7;">${actionBtn}</div>` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 28px;background:#FAF9FC;border-top:1px solid #EFEAF7;font-size:12px;line-height:1.5;color:#7A7491;" class="mobile-p-16">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="color:#7A7491;font-size:12px;">
                    <strong style="color:#1B1730;">Infincode</strong> · Website Notifications
                  </td>
                  <td align="right" class="mobile-hide" style="color:#A19BB5;font-size:11px;">
                    Reply directly to client
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

async function send(mail) {
  if (!emailConfigured()) throw new EmailNotConfiguredError();
  const info = await getTransporter().sendMail(mail);
  if (!info.accepted || info.accepted.length === 0) {
    throw new Error('SMTP server did not accept any recipients.');
  }
  return info;
}

export async function sendInquiry(data) {
  const initial = (data.name || 'C').trim().charAt(0).toUpperCase();
  const replySubject = encodeURIComponent(`Re: ${data.projectType || 'Project'} Inquiry — Infincode`);
  const replyMailto = `mailto:${encodeURIComponent(data.email)}?subject=${replySubject}`;

  const body = `
    <!-- Contact Info Card -->
    <div style="background:#FAF9FC;border:1px solid #EBE4FA;border-radius:14px;padding:18px 20px;margin-bottom:20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width:48px;vertical-align:top;" class="mobile-stack-cell">
            <div style="width:44px;height:44px;border-radius:50%;background:#5B4BFF;color:#ffffff;font-size:18px;font-weight:700;line-height:44px;text-align:center;">
              ${esc(initial)}
            </div>
          </td>
          <td style="padding-left:14px;vertical-align:middle;" class="mobile-stack-cell">
            <div style="font-size:17px;font-weight:700;color:#1B1730;line-height:1.3;margin-bottom:3px;">
              ${esc(data.name)}
            </div>
            <div style="font-size:13px;color:#5B4BFF;line-height:1.4;margin-bottom:2px;">
              <a href="mailto:${esc(data.email)}" style="color:#5B4BFF;text-decoration:none;font-weight:500;">${esc(data.email)}</a>
            </div>
            ${
              data.company
                ? `<div style="font-size:12px;color:#6B6683;line-height:1.4;">
              Company: <strong style="color:#1B1730;">${esc(data.company)}</strong>
            </div>`
                : ''
            }
          </td>
        </tr>
      </table>
    </div>

    <!-- Project Scope Badges -->
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
      <tr>
        <td class="mobile-stack-cell" style="width:33.33%;padding:0 6px 0 0;vertical-align:top;">
          <div style="background:#FAF8FF;border:1px solid #EBE4FA;border-radius:12px;padding:12px 14px;height:100%;box-sizing:border-box;">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#7864E6;margin-bottom:4px;">Project Type</div>
            <div style="font-size:13px;font-weight:600;color:#1B1730;line-height:1.35;word-break:break-word;">${esc(data.projectType)}</div>
          </div>
        </td>
        <td class="mobile-stack-cell" style="width:33.33%;padding:0 3px;vertical-align:top;">
          <div style="background:#FAF8FF;border:1px solid #EBE4FA;border-radius:12px;padding:12px 14px;height:100%;box-sizing:border-box;">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#7864E6;margin-bottom:4px;">Budget</div>
            <div style="font-size:13px;font-weight:600;color:#1B1730;line-height:1.35;word-break:break-word;">${esc(data.budget || 'Not specified')}</div>
          </div>
        </td>
        <td class="mobile-stack-cell" style="width:33.33%;padding:0 0 0 6px;vertical-align:top;">
          <div style="background:#FAF8FF;border:1px solid #EBE4FA;border-radius:12px;padding:12px 14px;height:100%;box-sizing:border-box;">
            <div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#7864E6;margin-bottom:4px;">Timeline</div>
            <div style="font-size:13px;font-weight:600;color:#1B1730;line-height:1.35;word-break:break-word;">${esc(data.timeline || 'Flexible')}</div>
          </div>
        </td>
      </tr>
    </table>

    <!-- Project Description -->
    <div style="background:#FFFFFF;border:1px solid #E6E0F0;border-left:4px solid #5B4BFF;border-radius:12px;padding:16px 18px;margin-bottom:16px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#5B4BFF;margin-bottom:8px;">
        Project Description
      </div>
      <div style="font-size:14px;line-height:1.65;color:#1B1730;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;">
        ${esc(data.message)}
      </div>
    </div>

    <!-- Reference Links (if any) -->
    ${
      data.links
        ? `<div style="background:#FBF9FC;border:1px solid #EAE5F3;border-radius:12px;padding:14px 16px;margin-bottom:16px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#6B6683;margin-bottom:6px;">Reference Links</div>
      <div style="font-size:13px;line-height:1.5;color:#4A4560;word-break:break-all;">${esc(data.links)}</div>
    </div>`
        : ''
    }
  `;

  const actionBtn = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a href="${replyMailto}" class="mobile-btn" style="display:inline-block;padding:12px 24px;background:#5B4BFF;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:600;font-size:14px;box-shadow:0 4px 14px rgba(91,75,255,0.28);">
            Reply to ${esc(data.name.split(' ')[0])} &rarr;
          </a>
        </td>
      </tr>
    </table>
  `;

  const html = shell('New Project Inquiry', data.projectType, body, actionBtn);

  const text = [
    `New project inquiry from ${data.name}`,
    `----------------------------------------`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.company && `Company: ${data.company}`,
    `Project type: ${data.projectType}`,
    data.budget && `Budget: ${data.budget}`,
    data.timeline && `Timeline: ${data.timeline}`,
    `\nMessage:\n${data.message}`,
    data.links && `\nReference links:\n${data.links}`,
  ]
    .filter(Boolean)
    .join('\n');

  return send({
    from: `"Infincode Website" <${config.smtp.sender}>`,
    to: config.smtp.receiver,
    replyTo: `"${data.name.replace(/"/g, '')}" <${data.email}>`,
    subject: `New inquiry: ${data.projectType} — ${data.name}`,
    html,
    text,
  });
}

export async function sendFeedback(data) {
  const initial = (data.name || 'C').trim().charAt(0).toUpperCase();
  const stars = '★'.repeat(Math.max(1, Math.min(5, Number(data.rating) || 5)));
  const replySubject = encodeURIComponent(`Thank you for your feedback — Infincode`);
  const replyMailto = `mailto:${encodeURIComponent(data.email)}?subject=${replySubject}`;

  const body = `
    <!-- Client Info Card -->
    <div style="background:#FAF9FC;border:1px solid #EBE4FA;border-radius:14px;padding:18px 20px;margin-bottom:20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width:48px;vertical-align:top;" class="mobile-stack-cell">
            <div style="width:44px;height:44px;border-radius:50%;background:#5B4BFF;color:#ffffff;font-size:18px;font-weight:700;line-height:44px;text-align:center;">
              ${esc(initial)}
            </div>
          </td>
          <td style="padding-left:14px;vertical-align:middle;" class="mobile-stack-cell">
            <div style="font-size:17px;font-weight:700;color:#1B1730;line-height:1.3;margin-bottom:3px;">
              ${esc(data.name)}
            </div>
            <div style="font-size:13px;color:#5B4BFF;line-height:1.4;margin-bottom:2px;">
              <a href="mailto:${esc(data.email)}" style="color:#5B4BFF;text-decoration:none;font-weight:500;">${esc(data.email)}</a>
            </div>
            <div style="font-size:12px;color:#6B6683;line-height:1.4;">
              ${data.role ? `${esc(data.role)}` : ''}${data.company ? ` at <strong style="color:#1B1730;">${esc(data.company)}</strong>` : ''}
            </div>
          </td>
        </tr>
      </table>
    </div>

    <!-- Rating Highlight -->
    <div style="background:#FAF8FF;border:1px solid #EBE4FA;border-radius:12px;padding:14px 18px;margin-bottom:16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td>
            <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#7864E6;margin-bottom:2px;">Rating</div>
            <div style="font-size:20px;color:#F59E0B;letter-spacing:2px;font-weight:700;">${stars} <span style="font-size:14px;color:#1B1730;font-weight:600;margin-left:6px;">(${esc(data.rating)}/5)</span></div>
          </td>
          <td align="right" class="mobile-stack-cell">
            <span style="display:inline-block;padding:4px 10px;background:#E7F9EE;border:1px solid #C1EED2;border-radius:100px;font-size:11px;font-weight:600;color:#0F766E;">
              Public Display Approved
            </span>
          </td>
        </tr>
      </table>
    </div>

    <!-- Feedback Message -->
    <div style="background:#FFFFFF;border:1px solid #E6E0F0;border-left:4px solid #5B4BFF;border-radius:12px;padding:16px 18px;margin-bottom:16px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#5B4BFF;margin-bottom:8px;">
        Client Review
      </div>
      <div style="font-size:14px;line-height:1.65;color:#1B1730;white-space:pre-wrap;word-break:break-word;overflow-wrap:anywhere;">
        ${esc(data.message)}
      </div>
    </div>

    <p style="font-size:12px;color:#7A7491;margin:12px 0 0 0;line-height:1.5;">
      💡 To display this review on your website, copy it into <code style="background:#FAF8FF;border:1px solid #EBE4FA;padding:2px 6px;border-radius:4px;color:#5B4BFF;">client/src/data/reviews.ts</code>.
    </p>
  `;

  const actionBtn = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td>
          <a href="${replyMailto}" class="mobile-btn" style="display:inline-block;padding:12px 24px;background:#5B4BFF;color:#ffffff;text-decoration:none;border-radius:10px;font-weight:600;font-size:14px;box-shadow:0 4px 14px rgba(91,75,255,0.28);">
            Thank ${esc(data.name.split(' ')[0])} via Email &rarr;
          </a>
        </td>
      </tr>
    </table>
  `;

  const html = shell('New Client Feedback', `${data.rating}/5 Stars`, body, actionBtn);

  return send({
    from: `"Infincode Website" <${config.smtp.sender}>`,
    to: config.smtp.receiver,
    replyTo: `"${data.name.replace(/"/g, '')}" <${data.email}>`,
    subject: `New client feedback (${data.rating}/5) — ${data.name}`,
    html,
    text: `Feedback from ${data.name} <${data.email}> (${data.rating}/5)\n\n${data.message}`,
  });
}

export async function sendAcknowledgment(data, kind = 'inquiry') {
  const isFeedback = kind === 'feedback';
  const first = data.name.trim().split(' ')[0];

  const body = `
    <div style="font-size:16px;font-weight:700;color:#1B1730;margin-bottom:12px;">
      Hi ${esc(first)},
    </div>
    <div style="font-size:15px;line-height:1.65;color:#4A4560;margin-bottom:18px;">
      ${
        isFeedback
          ? 'Thank you for taking the time to share your feedback with Infincode! Your thoughts and experience help us constantly improve the quality of our service and software.'
          : 'Thank you for reaching out to Infincode! We have received your project inquiry and our team is already reviewing the details.'
      }
    </div>

    ${
      !isFeedback
        ? `
    <!-- Next Steps Card -->
    <div style="background:#FAF8FF;border:1px solid #EBE4FA;border-radius:14px;padding:18px 20px;margin-bottom:20px;">
      <div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#7864E6;margin-bottom:10px;">
        What happens next?
      </div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="padding:4px 0;font-size:14px;color:#1B1730;line-height:1.5;">
            <strong>1. Requirement review:</strong> We will evaluate your scope, timeline, and tech stack.
          </td>
        </tr>
        <tr>
          <td style="padding:4px 0;font-size:14px;color:#1B1730;line-height:1.5;">
            <strong>2. Direct response:</strong> Keshav or a project lead will reply personally within 1–2 working days.
          </td>
        </tr>
        <tr>
          <td style="padding:4px 0;font-size:14px;color:#1B1730;line-height:1.5;">
            <strong>3. Discovery call:</strong> If suitable, we will arrange a quick discovery session to finalize architecture and pricing.
          </td>
        </tr>
      </table>
    </div>`
        : ''
    }

    <div style="font-size:14px;line-height:1.6;color:#6B6683;margin-top:16px;">
      Warm regards,<br />
      <strong style="color:#1B1730;font-size:15px;">Keshav Vyas &amp; the Infincode Team</strong><br />
      Infincode<br />
      <a href="https://craftingdigitalsolution.com" style="color:#5B4BFF;text-decoration:none;font-size:13px;">craftingdigitalsolution.com</a>
    </div>
  `;

  const html = shell(
    isFeedback ? 'Thank You for Your Feedback' : 'We Received Your Inquiry',
    'Received',
    body,
  );

  return send({
    from: `"Infincode" <${config.smtp.sender}>`,
    to: data.email,
    replyTo: config.smtp.receiver,
    subject: isFeedback ? 'Thanks for your feedback — Infincode' : 'We received your inquiry — Infincode',
    html,
    text: `Hi ${first},\n\n${
      isFeedback
        ? 'Thank you for sharing your feedback with Infincode.'
        : 'Thanks for reaching out to Infincode. We have received your inquiry and will reply within one to two working days.'
    }\n\n— Keshav Vyas & team`,
  });
}
