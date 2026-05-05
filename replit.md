# KDCI v4.2 — AI-Powered Business Solutions Website

## Project Overview
A multi-page React + Vite single-page application (SPA) for KDCI, showcasing AI-powered business solutions across multiple service verticals and industries.

## Tech Stack
- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite 6
- **Styling**: Tailwind CSS (via CDN in index.html)
- **Charts**: Recharts
- **Icons**: Lucide React
- **AI Integration**: @google/genai (Gemini API)

## Project Structure
- `App.tsx` — Main SPA router using `activeView` state
- `pages/` — All page components (Home, Services, Industries, Resources, etc.)
- `components/` — Shared components (Navbar, Footer, Logo, etc.)
- `data.ts` — Static data for content
- `types.ts` — TypeScript types (ViewType, etc.)
- `lib/utils.ts` — Utility functions

## Key Pages
- **Home**: Landing page
- **Services**: Solutions Hub, Software Engineering, Creative Production, Customer Support, Staff Augmentation, Agentic Recruitment, Property Management
- **Industries**: E-Commerce, Fintech, Healthcare, Marketing, Retail, Logistics, Travel, EdTech, Legal, Insurance, Media, Consumer Tech, Telecom, Auto, Fashion, Energy, Professional Services, Government
- **Resources**: Blog, Case Studies, Guides, Webinars, Ebooks, FAQs, Glossary
- **CMS**: Publisher Dashboard, Career Ops, Blog Ops, Resources Ops, Portfolio Ops

## Environment Variables
- `GEMINI_API_KEY` — Required for AI features

## Development
- Port: 5000 (configured in vite.config.ts)
- Host: 0.0.0.0 (Replit proxy compatible)
- `allowedHosts: true` set for Replit iframe proxy compatibility

## Deployment
- Type: Static site
- Build command: `npm run build`
- Public dir: `dist`
