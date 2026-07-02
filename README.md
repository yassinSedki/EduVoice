# Edu Voice

**Edu Voice** is the front end for a platform that aims to simplify communication in the education system by putting teachers, parents, school administration, and — ultimately — the government in a single shared space.

**Live demo:** [edu-voice-rouge.vercel.app](https://edu-voice-rouge.vercel.app/)

## Why this project matters

Today, a teacher's daily reality — a broken heater, an unmanageable class size, a policy that doesn't work on the ground — rarely reaches anyone who can act on it. A parent's concern about their child's school often goes nowhere beyond a hallway conversation. Administrations and ministries make decisions with little direct, honest signal from the people actually living the system day to day.

Edu Voice exists to close that gap. It gives teachers a space to speak freely about what they're facing, good or bad, without it disappearing into silence — and gives that voice a real path upward, toward the school administration and eventually the government bodies that set policy. Parents get the same: a legitimate channel to raise concerns and be heard, instead of informal complaints that go unanswered. Administrations get visibility into real, aggregated feedback instead of finding out about problems too late. The goal is a single platform where everyone involved in a child's education — teacher, parent, school, government — can communicate, instead of each acting on partial information in isolation.

**This repository is an MVP** — an early, front-end-only prototype built to validate the idea and its core interactions before investing in a full backend, real accounts, and integration with actual school/government bodies.

## Roles and what each one can do

- **Teacher** — posts freely in the Staff Room about workload, pedagogy, and resource gaps; can also raise a formal Claim that is routed to the school administration, and can be publicly thanked on the Gratitude Wall.
- **Parent** — posts in the Parents' Forum to ask questions, raise academic or infrastructure concerns, and give feedback about their child's school; can file formal Claims and celebrate teachers on the Gratitude Wall.
- **Administration (admin)** — reviews and responds to formal Claims submitted by teachers and parents, moving them through a status pipeline (Submitted → Under Review → Response Issued → Resolved/Escalated) and issuing official responses that are visible back to the community.
- **Government** — the intended long-term recipient of aggregated, anonymized signal from Claims and community sentiment across schools, so that policy decisions can be informed by what's actually happening on the ground. This role is represented conceptually in the current MVP and is not yet a distinct account type in the product.

Each of the four "spaces" in the app reflects this separation of concerns:

- **Staff Room** — teacher-only discussion.
- **Parents' Forum** — parent-only discussion.
- **Claims** — the formal escalation channel from teachers/parents to the administration.
- **Gratitude Wall** — public recognition of teachers, including a "Teacher of the Month" highlight.

Posts can be tagged, filtered by school and topic, and reacted to or commented on. Users register as a teacher, parent, or admin and get a role-appropriate view, including notifications and a "My Posts" history. The UI supports English, French, and Arabic (with RTL layout).

As an MVP, all data (schools, users, posts) is currently mocked in-memory in this front end — there is no backend yet, so nothing persists across a page reload. The next steps toward the full vision are a real backend, authentication, and a way to route claims/feedback to actual administration and government stakeholders.

## Tech stack

- **React 19** + **TypeScript**, built with **Vite**
- **React Router** for client-side routing
- **Zustand** for app state (posts, filters, selections)
- **Tailwind CSS v4** for styling
- **i18next / react-i18next** for English, French, and Arabic localization
- **lucide-react** for icons

There is no backend — this is a client-only single-page app with mocked data (`src/data/mockData.ts`).

## Project structure

```
src/
├─ pages/                # Route-level screens (Landing, Login, Register, App feed, School profile, Notifications, My Posts, Admin claims)
├─ components/
│  ├─ layout/            # App shell, topbar, sidebar, bottom nav
│  ├─ landing/           # Marketing/landing page sections
│  ├─ spaces/            # SpaceFeed — the shared feed component for all four spaces
│  └─ ui/                # Shared primitives (PostCard, Modal, FilterBar, Avatar, Tag, ...)
├─ store/                # Zustand store
├─ data/                 # Mock schools, posts, and space configuration
└─ locales/              # en / fr / ar translation files
```

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build for production
npm run lint      # run ESLint
npm run preview   # preview the production build locally
```
