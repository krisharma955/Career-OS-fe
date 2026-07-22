# Career<i>OS</i>

CareerOS is a placement/career platform that connects **students** and **companies** through a unified onboarding, dashboard, and application workflow. This repository holds the frontend client — a React + Vite single-page application styled with Tailwind CSS.

<!-- > Live backend: [career-os-be](https://career-os-be.onrender.com) (Spring Boot) -->

## ✨ Features

- **Landing page** with hero, "why CareerOS," how-it-works, personalized ("for you"), FAQ, and CTA sections
- **Auth flow** — Login and Signup pages backed by JWT access tokens
- **Role-based onboarding** — separate onboarding flows for students and companies, shown only on first signup
- **Role-based dashboards**
  - Student dashboard — track applications, opportunities, and profile
  - Company dashboard — manage postings and candidates
- **Protected routes** — dashboard and onboarding routes are gated behind an auth guard that redirects unauthenticated users to `/login`

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| Framework | React 19 |
| Build tool | Vite 8 |
| Routing | React Router DOM 7 |
| Styling | Tailwind CSS 4 |
| Icons | lucide-react |
| Linting | ESLint 10 |
| Deployment | Vercel |

## 📁 Project Structure

```
Career-OS-fe/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/              # Static images (hero, logos)
│   ├── components/          # Landing page sections
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── WhySection.jsx
│   │   ├── HowSection.jsx
│   │   ├── ForYouSection.jsx
│   │   ├── FAQSection.jsx
│   │   ├── CTASection.jsx
│   │   └── Footer.jsx
│   ├── pages/                # Route-level pages
│   │   ├── LoginPage.jsx
│   │   ├── SignupPage.jsx
│   │   ├── StudentOnboarding.jsx
│   │   ├── StudentDashboard.jsx
│   │   ├── CompanyOnboarding.jsx
│   │   └── CompanyDashboard.jsx
│   ├── lib/
│   │   └── api.js            # Fetch wrapper + auth headers
│   ├── App.jsx                # Landing page composition
│   ├── main.jsx               # Router + route guards
│   └── index.css
├── vercel.json                 # SPA rewrite rules
├── vite.config.js
└── package.json
```

## 🧭 Routes

| Path | Access | Description |
|---|---|---|
| `/` | Public | Landing page |
| `/login` | Public | Login |
| `/signup` | Public | Signup |
| `/onboarding/student` | Private | First-time student onboarding |
| `/onboarding/company` | Private | First-time company onboarding |
| `/dashboard/student` | Private | Student dashboard |
| `/dashboard/company` | Private | Company dashboard |

Private routes are wrapped in a `PrivateRoute` guard that checks for an `accessToken` in `localStorage` and redirects to `/login` if absent.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/krisharma955/Career-OS-fe.git
cd Career-OS-fe
npm install
```

### Development

```bash
npm run dev
```

The app runs on the default Vite dev server (typically `http://localhost:5173`).

### Build

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## 🔗 Backend Integration

The app talks to the CareerOS backend via `src/lib/api.js`, which wraps `fetch` with:
- Base URL configuration
- Automatic `Authorization: Bearer <token>` header injection from `localStorage`
- Centralized error handling for non-OK responses

> **Note:** `BASE_URL` in `src/lib/api.js` currently needs to be set explicitly per environment (local vs. production) before building for deployment — consider moving this to a Vite environment variable (e.g. `import.meta.env.VITE_API_BASE_URL`) for cleaner environment switching.

## ☁️ Deployment

This project is configured for **Vercel** with a SPA rewrite rule (`vercel.json`) so all routes fall back to `index.html`, keeping client-side routing functional on refresh/direct links.

<br>

*Developed By Krish Sharma*
