# Fast Food Management — Admin Panel 🔐🍕🍟🍔🔐

A React + Vite admin dashboard for managing a fast-food business: manage foods, orders/bookings, users, contacts, and reporting. This repository contains a Vite-powered frontend with modular features, a Supabase helper, and UI primitives to build an admin console.

## Overview

This project provides a full-featured management interface for a fast-food operation. It includes screens for creating and editing foods, viewing and updating orders, managing users and contacts, and viewing sales statistics.

## Demo

<img src="public/ff-management-demo-1.gif" width="840" alt="Demo GIF 1">
<br>
<img src="public/ff-management-demo-2.gif" width="840" alt="Demo GIF 2">
<br>
<img src="public/ff-management-demo-3.gif" width="840" alt="Demo GIF 3">

## Main features

- Admin dashboard: manage foods, orders/bookings, users, and contacts.
- Food management: add/update/delete foods and manage metadata.
- Order & booking management: list, filter, update status, and view details.
- Authentication helpers and user management components.
- Payment page scaffold and integration helpers.
- Real-time-ish reporting: charts and dashboard stats using `recharts`.
- Reusable UI primitives: buttons, forms, tables, modals.

## Tech stack

![Vite](https://img.shields.io/badge/Vite-5.4.1-brightgreen?logo=vite)&nbsp;
![React](https://img.shields.io/badge/React-18-blue?logo=react)&nbsp;
![Styled Components](https://img.shields.io/badge/Styled--Components-5.0-8A4BFF?logo=styled-components)&nbsp;
![React Router](https://img.shields.io/badge/React_Router-6.26.2-red?logo=react-router)&nbsp;
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-7.53.0-4AB8A0?logo=reacthookform)&nbsp;
![TanStack Query](https://img.shields.io/badge/TanStack_Query-4.36.1-0052CC?logo=tanstack)&nbsp;
![Supabase](https://img.shields.io/badge/Supabase-2.x-3ECF8E?logo=supabase)&nbsp;
![Recharts](https://img.shields.io/badge/Recharts-2.x-F78C1B?logo=apache)&nbsp;

- Vite — dev server and build tool
- React 18
- Styled Components for styling
- React Router Dom for routing
- React Hook Form for form handling
- TanStack Query (React Query) for server state and caching
- Supabase client (included in `src/services/supabase.js`) for data/auth (optional)
- Recharts for charts and visualizations

## Repository structure

- `src/` — application source
  - `features/` — feature modules (authentication, bookings, foods, contact, dashboard, payment, etc.)
  - `services/` — API clients and Supabase helper (`src/services/supabase.js`)
  - `ui/` — UI primitives and layout components
  - `pages/` — top-level pages used by the app
  - `context/`, `hooks/`, `utils/` — app utilities and helpers
- `public/` — static assets
- `.env`, `.env.local` — environment variables (not committed)

## Environment variables

Create a `.env.local` in the project root with any keys required by your Supabase project or other third-party services. Typical variables used by this project:

- `VITE_SUPABASE_URL` — your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` — your Supabase anon/public key

Keep secrets out of version control. If you add additional services (Cloudinary, payment providers), add their keys here as well.

## Install & development

Install dependencies and run the dev server:

```powershell
npm install
npm run dev
```

Available npm scripts (from `package.json`):

- `dev` — runs `vite` (development server)
- `build` — runs `vite build` (production build)
- `preview` — runs `vite preview` (production preview)
- `lint` — runs `eslint .`

Open `http://localhost:5173` (Vite default) to view the app.

## Build & Production Preview

Build for production and preview locally:

```powershell
npm run build
npm run preview
```

## Notes

- The project includes a Supabase helper in `src/services/supabase.js` — configure your Supabase keys in `.env.local`.
- Styling uses `styled-components` and a global styles file at `src/styles/GlobalStyles.js`.
- Feature modules live in `src/features/` — follow the existing structure when adding new features.

## Contributing

- Fork the repository, create a feature branch, and open a pull request. Keep UI components modular and add docs/tests for new features.

## License

Add a `LICENSE` file to declare a license (MIT recommended).
