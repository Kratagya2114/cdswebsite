import { Router } from 'express';
import { contactSchema, feedbackSchema, fieldErrors } from '../validation.js';
import { sendInquiry, sendFeedback, sendAcknowledgment, EmailNotConfiguredError } from '../services/emailService.js';
import { config } from '../config.js';
import { formLimiter } from '../middleware/limits.js';

const router = Router();

const MIN_FILL_MS = 2500; // humans need more than ~2.5s to fill the form

function looksLikeBot(data) {
  if (data.website_url) return true;
  if (typeof data.startedAt === 'number' && Date.now() - data.startedAt < MIN_FILL_MS) return true;
  return false;
}

function handler(schema, deliver, ackKind) {
  return async (req, res) => {
    const parsed = schema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: 'Please fix the highlighted fields.', fields: fieldErrors(parsed.error) });
    }
    const data = parsed.data;

    if (looksLikeBot(data)) {
      // Pretend success so bots learn nothing, but send nothing.
      console.warn(`[spam] ${ackKind} submission discarded`);
      return res.json({ ok: true });
    }

    try {
      await deliver(data);
    } catch (err) {
      if (err instanceof EmailNotConfiguredError) {
        console.error('[email] SMTP credentials are not configured. Set SMTP_USER, SMTP_PASS and CONTACT_RECEIVER_EMAIL.');
        return res.status(503).json({
          ok: false,
          error: 'Our message system is being set up right now. Please email us directly at ' + config.smtp.receiver + '.',
        });
      }
      console.error(`[email] failed to send ${ackKind}:`, err.code || '', err.message);
      return res.status(502).json({
        ok: false,
        error: 'We could not send your message just now. Please try again in a moment or email us directly.',
      });
    }

    // Acknowledgment is optional and must never fail the request.
    if (config.smtp.sendAcknowledgment) {
      sendAcknowledgment(data, ackKind).catch((err) =>
        console.warn('[email] acknowledgment failed:', err.code || '', err.message),
      );
    }
    return res.json({ ok: true });
  };
}

router.post('/contact', formLimiter, handler(contactSchema, sendInquiry, 'inquiry'));
router.post('/feedback', formLimiter, handler(feedbackSchema, sendFeedback, 'feedback'));

export default router;
