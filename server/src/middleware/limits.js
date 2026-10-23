import rateLimit from 'express-rate-limit';

const make = (windowMs, limit, message) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: true,
    legacyHeaders: false,
    message: { ok: false, error: message },
  });

export const formLimiter = make(
  15 * 60 * 1000,
  5,
  'Too many submissions from this connection. Please try again in a few minutes.',
);

export const chatLimiter = make(60 * 1000, 20, 'You are sending messages very quickly. Please wait a moment.');
