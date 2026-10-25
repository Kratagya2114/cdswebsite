import Icon from './Icon';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { sendChat, type ChatMessage } from '../lib/api';

interface Msg extends ChatMessage {
  error?: boolean;
}

const GREETING: Msg = {
  role: 'assistant',
  content: "Hey! I'm Cody, Infincode's assistant. Ask me about our services, tech stack, or how to start a project.",
};

const SUGGESTIONS = ['What services do you offer?', 'Can you build an AI agent?', 'Which languages do you use?', 'How do I start a project?'];

/** Floating AI assistant rendered on every page (bottom-right). Talks to the backend /api/chat (Gemini). */
export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fabRef = useRef<HTMLButtonElement>(null);

  // Show a friendly one-time nudge shortly after load.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem('infincode-chat-nudge') === '1';
    } catch { /* storage unavailable */ }
    if (dismissed) return;
    const t = window.setTimeout(() => setNudge(true), 2500);
    return () => window.clearTimeout(t);
  }, []);

  const dismissNudge = () => {
    setNudge(false);
    try { sessionStorage.setItem('infincode-chat-nudge', '1'); } catch { /* ignore */ }
  };

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, busy, open]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      const onKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setOpen(false);
          fabRef.current?.focus();
        }
      };
      document.addEventListener('keydown', onKey);
      return () => document.removeEventListener('keydown', onKey);
    }
  }, [open]);

  const send = async (text: string) => {
    const content = text.trim();
    if (!content || busy) return;
    const next: Msg[] = [...messages.filter((m) => !m.error), { role: 'user', content }];
    setMessages(next);
    setInput('');
    setBusy(true);
    // Skip the local greeting when sending history so the conversation starts with the user.
    const history: ChatMessage[] = next.filter((m, i) => !(i === 0 && m === GREETING)).map(({ role, content: c }) => ({ role, content: c }));
    const res = await sendChat(history);
    setBusy(false);
    if (res.ok && res.reply) {
      setMessages((m) => [...m, { role: 'assistant', content: res.reply as string }]);
    } else {
      setMessages((m) => [...m, { role: 'assistant', content: res.error ?? 'Something went wrong. Please try again.', error: true }]);
    }
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    void send(input);
  };

  const toggle = () => {
    dismissNudge();
    setOpen((o) => !o);
  };

  return (
    <div className="chat-root">
      <section id="chat-panel" className="chat-panel" role="dialog" aria-label="Infincode assistant chat" hidden={!open}>
        <div className="chat-head">
          <span className="bot" aria-hidden="true"><Icon name="bot" /></span>
          <div>
            <strong>Cody · Infincode Assistant</strong>
            <small>AI assistant — ask anything about Infincode</small>
          </div>
          <button className="close" onClick={toggle} aria-label="Close chat"><Icon name="close" /></button>
        </div>
        <div className="chat-log" ref={logRef} role="log" aria-live="polite">
          {messages.map((m, i) => (
            <div key={i} className={`msg ${m.error ? 'msg--error' : m.role === 'user' ? 'msg--user' : 'msg--bot'}`}>
              {m.content}
            </div>
          ))}
          {busy && (
            <div className="msg msg--bot" aria-label="Cody is typing">
              <span className="typing"><i /><i /><i /></span>
            </div>
          )}
        </div>
        {messages.length === 1 && !busy && (
          <div className="suggest">
            {SUGGESTIONS.map((s) => (
              <button key={s} type="button" onClick={() => void send(s)}>{s}</button>
            ))}
          </div>
        )}
        <form className="chat-form" onSubmit={onSubmit}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question…"
            aria-label="Your message"
            maxLength={500}
            autoComplete="off"
          />
          <button type="submit" disabled={busy || !input.trim()} aria-label="Send message"><Icon name="send" /></button>
        </form>
      </section>

      {!open && nudge && (
        <div className="chat-nudge" role="status">
          <button className="link" onClick={toggle}>Hi! Need help choosing a service? Chat with Cody</button>
          <button className="x" onClick={dismissNudge} aria-label="Dismiss message">×</button>
        </div>
      )}

      <div className="chat-fab-wrap">
        <button
          ref={fabRef}
          className="chat-fab"
          onClick={toggle}
          aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
          aria-expanded={open}
          aria-controls="chat-panel"
        >
          {open ? <Icon name="close" size={26} /> : <Icon name="message" size={26} />}
        </button>
        {!open && <span className="dot" aria-hidden="true" />}
      </div>
    </div>
  );
}
