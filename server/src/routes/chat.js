import { Router } from 'express';
import { chatSchema } from '../validation.js';
import { generateReply, ChatNotConfiguredError } from '../services/geminiService.js';
import { chatLimiter } from '../middleware/limits.js';

const router = Router();

router.post('/chat', chatLimiter, async (req, res) => {
  const parsed = chatSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: 'Invalid chat request.' });

  const last = parsed.data.messages[parsed.data.messages.length - 1];
  if (last.role !== 'user' || !last.content.trim()) {
    return res.status(400).json({ ok: false, error: 'Please type a message first.' });
  }

  try {
    const reply = await generateReply(parsed.data.messages);
    res.json({ ok: true, reply });
  } catch (err) {
    if (err instanceof ChatNotConfiguredError) {
      console.error('[chat] GEMINI_API_KEY is not set.');
      return res.status(503).json({
        ok: false,
        error: "I'm not fully switched on yet. Please use the Contact page or email keshavdeepakvyas@gmail.com.",
      });
    }
    console.error('[chat] Gemini error:', err.status || '', err.message, err.detail || '');
    res.status(502).json({ ok: false, error: 'I had trouble thinking just now. Please try again in a moment.' });
  }
});

export default router;
