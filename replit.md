# KDCI v4.2 — Replit Project

## Overview
KDCI Operations marketing/CMS site built with React 19 + Vite + TypeScript + Tailwind CSS.

## Architecture

### Frontend
- **Framework:** React 19 + Vite (port 5000)
- **Styling:** Tailwind CSS (CDN) + custom utilities
- **Routing:** Client-side via `activeView` state in `App.tsx` (no router library)
- **Key files:** `App.tsx`, `pages/`, `components/`, `types.ts`, `data.ts`

### Backend (Local Dev API)
- **Server:** `server.js` — Express on port 3001
- **Database:** Replit PostgreSQL (replaces Supabase for local testing)
- **Auth:** JWT-based (`jsonwebtoken` + `bcryptjs`)
- **Proxy:** Vite proxies `/local-api` → `http://localhost:3001`

### Database Client
- `localClient.ts` — implements the same chainable Supabase interface (`.from().select().eq().order()` etc.) but calls the local Express API
- `supabaseClient.ts` — auto-detects: uses `localClient` when no Supabase env vars are set, falls back to real Supabase when `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` are present

## Database Tables
All tables live in the Replit PostgreSQL instance:
- `jobs` — job listings
- `blog_posts` — blog articles
- `case_studies` — client case studies
- `ebooks` — downloadable ebooks
- `guides` — resource guides
- `webinars` — webinar records
- `hubspot_forms` — HubSpot form configs
- `staff` — CMS users (email + password_hash + role)

## Default Admin Login
- **Email:** `admin@kdci.com`
- **Password:** `admin123`

## Switching Between Local DB and Supabase
- **Local DB (default):** No env vars needed — auto-detected
- **Supabase:** Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as secrets

## Workflow
Single workflow `Start application` runs both services:
```
node server.js & npm run dev
```

## Dependencies
- `express`, `pg`, `jsonwebtoken`, `bcryptjs`, `cors` — backend
- `@supabase/supabase-js` — remote Supabase (only used when creds are set)
- `react`, `react-dom`, `vite`, `@vitejs/plugin-react` — frontend
- `lucide-react`, `recharts`, `clsx`, `tailwind-merge` — UI
