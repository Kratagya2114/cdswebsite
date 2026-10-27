const BASE = (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ?? '';

export interface ApiResult {
  ok: boolean;
  error?: string;
  fields?: Record<string, string>;
}

async function post<T extends ApiResult>(path: string, body: unknown, timeoutMs = 25000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(`${BASE}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const data = await res.json().catch(() => null) as T | null;
    if (data) return data;
    return {
      ok: false,
      error: `The server returned an unexpected response (HTTP ${res.status}). Please try again or email us directly.`,
    } as T;
  } catch {
    return { ok: false, error: 'Could not reach the server. Please check your connection and try again.' } as T;
  } finally {
    clearTimeout(timer);
  }
}

export interface ContactPayload {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  message: string;
  links: string;
  website_url: string; // honeypot
  startedAt: number;
}

export const submitContact = (payload: ContactPayload) => post<ApiResult>('/api/contact', payload);

export interface FeedbackPayload {
  name: string;
  email: string;
  company: string;
  role: string;
  rating: number;
  message: string;
  consent: boolean;
  website_url: string;
  startedAt: number;
}

export const submitFeedback = (payload: FeedbackPayload) => post<ApiResult>('/api/feedback', payload);

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const sendChat = (messages: ChatMessage[]) => post<ApiResult & { reply?: string }>('/api/chat', { messages }, 30000);
