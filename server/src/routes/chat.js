import { Router } from 'express';
import { chatSchema } from '../validation.js';
import { generateReply, getLocalFallbackReply } from '../services/geminiService.js';
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
    console.error('[chat] Handled error in chat route:', err.message);
    const reply = getLocalFallbackReply(parsed.data.messages);
    res.json({ ok: true, reply });
  }
});

export default router;
