import 'dotenv/config';

const bool = (v, fallback) => (v === undefined || v === '' ? fallback : String(v).toLowerCase() === 'true');

export const config = {
  port: Number(process.env.PORT) || 5000,
  isProd: process.env.NODE_ENV === 'production',
  clientOrigins: (process.env.CLIENT_ORIGINS || 'http://localhost:5173')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.titan.email',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: bool(process.env.SMTP_SECURE, true),
    user: process.env.SMTP_USER || 'info@infincode.org',
    pass: process.env.SMTP_PASS || '',
    receiver: process.env.CONTACT_RECEIVER_EMAIL || 'info@infincode.org',
    sender: process.env.CONTACT_SENDER_EMAIL || process.env.SMTP_USER || 'info@infincode.org',
    sendAcknowledgment: bool(process.env.SEND_ACKNOWLEDGMENT, true),
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY || '',
    model: process.env.GEMINI_MODEL || 'gemini-3.5-flash',
  },
};

export const emailConfigured = () =>
  Boolean(config.smtp.user && config.smtp.pass && config.smtp.receiver && config.smtp.sender);

export const chatConfigured = () => Boolean(config.gemini.apiKey);
