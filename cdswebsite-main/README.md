<<<<<<< HEAD
# Crafting Digital Solution (CDS) website

React + TypeScript + Vite frontend, Node/Express backend (Nodemailer email + Gemini chatbot).

## Quick start

```bash
npm run install:all
cp server/.env.example server/.env     # then fill in the values below
npm run dev:server                      # API on :5000
npm run dev:client                      # site on :5173 (proxies /api to :5000)
```

Production: `npm run build` then `npm start`. The Express server serves `client/dist` and the API from one host.

## Required secrets (server/.env only, never in frontend code)

| Variable | What it is |
| --- | --- |
| `SMTP_PASS` | Gmail **App Password** for keshavdeepakvyas@gmail.com (Google Account > Security > 2-Step Verification > App passwords). Your normal Gmail password will not work. |
| `GEMINI_API_KEY` | Key from https://aistudio.google.com/apikey |
| `CLIENT_ORIGINS` | Only needed if the frontend is hosted on a different domain than the API |

Other variables have working defaults (see `.env.example`). Check `GET /api/health` to see whether email and chat are configured. Until they are, the forms and chatbot show friendly "not set up yet" messages and never fake a success.

If the frontend and backend are on different hosts, set `VITE_API_URL=https://your-api-host` when building the client.

## Where to edit content

All in `client/src/data/`: `services.ts`, `techstack.ts`, `projects.ts` (demo projects, replace with real ones), `team.ts` (placeholders), `reviews.ts` (empty until you add genuine reviews), `site.ts` (nav, copy, socials, why-choose-us). The founder story is the `story` array in `client/src/pages/About.tsx`.

## Before launch

- Replace demo projects and team placeholders with real ones.
- Add genuine reviews to `reviews.ts` (feedback submitted on the site arrives in your inbox).
- Add real social links in `site.ts`.
- Review the Privacy Policy with your actual practices.
- Add canonical URLs, sitemap and the production domain in `robots.txt` once known.
- Hosting note: the backend needs a Node host (Render, Railway, a VPS). Static-only hosts cannot run it.

## Backend structure

`server/src/`: `index.js` (app), `config.js`, `validation.js` (zod schemas), `routes/forms.js` (contact + feedback), `routes/chat.js`, `services/emailService.js` (Nodemailer), `services/geminiService.js`, `middleware/limits.js` (rate limits). Spam protection: honeypot field, minimum fill time, rate limiting, server-side validation.
=======
# cdswebsite
>>>>>>> 3b625c262843624a5104192e81cd1dbf273f44ce
this is demo readme