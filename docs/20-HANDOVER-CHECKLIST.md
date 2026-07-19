# Handover Checklist

## Fleet & Transportation Management System

**Hospital Information Management System (HIMS)**  
Developer Documentation

---

## 1. Overview

**Purpose of this document**

This checklist is a practical guide for turning over the Fleet project to another developer (especially backend/Laravel work). It shows what is already done and what should be verified before the next phase.

**Why a handover checklist is important**

- Reduces missed steps during project turnover.  
- Makes status clear for advisers and teammates.  
- Prevents “starting over” on a finished frontend.  
- Separates completed UI work from pending backend work.

**Who should use this checklist**

| Audience | How they use it |
| -------- | --------------- |
| Backend / Laravel developers | Confirm UI readiness, then plan integration |
| Future maintainers | Verify repo health after receiving the project |
| Frontend developers | Confirm UI items still work before handoff |
| Project lead / adviser | Quick status review |

---

## 2. Project Information

| Field | Verified information |
| ----- | -------------------- |
| Project name | Fleet & Transportation Management System |
| System name | Hospital Information Management System (HIMS) |
| Current module | Fleet & Transportation Management |
| Frontend status | Interface complete (presentation layer) |
| Frontend technologies | HTML5, CSS3, Bootstrap 5 (CDN), vanilla JavaScript (ES6), Phosphor Icons (CDN), Poppins (Google Fonts) |
| Planned backend | Laravel |
| Planned database | MySQL |
| Auth direction | Laravel Breeze (session auth); current login is frontend simulation only |
| Local full-stack (planned) | Laragon |
| Version control | Git / GitHub |
| Production hosting (planned) | School-provided HostForge; Fleet subdomain |
| Frontend version | Unversioned |
| Structure freeze | 1.0 (`docs/03-FOLDER-STRUCTURE.md`) |

---

## 3. Frontend Completion Checklist

Check each item when verifying the received repository. Use a local **HTTP** server from the project root (not `file://`).

### Shell and layout

- [ ] App shell loads (sidebar + navbar on protected pages)
- [ ] Login page has **no** sidebar/navbar
- [ ] Toast notifications can appear
- [ ] Light / Dark theme works
- [ ] System theme works from profile Appearance menu
- [ ] Desktop sidebar collapse works (≥992px)
- [ ] Mobile/off-canvas sidebar works (≤991px)
- [ ] Profile dropdown opens (Profile, Settings, Appearance, Logout)

### Navigation and routes

- [ ] Root `index.html` redirects to login or dashboard based on session
- [ ] Sidebar links open all module pages
- [ ] Active menu state matches `data-page`
- [ ] Vehicles is available at `fleet/` (not a separate `vehicles/` folder)

### Modules (verified pages present)

- [ ] Login — `login/index.html`
- [ ] Dashboard — `dashboard/index.html`
- [ ] Vehicles — `fleet/index.html`
- [ ] Reservations — `reservation/index.html`
- [ ] Dispatch — `dispatch/index.html`
- [ ] Drivers — `driver/index.html`
- [ ] Maintenance — `maintenance/index.html`
- [ ] Fuel Management — `fuel/index.html`
- [ ] Route Planning — `route-planning/index.html`
- [ ] Cost Analysis — `cost-analysis/index.html`
- [ ] Reports — `reports/index.html`
- [ ] Profile — `profile/index.html`
- [ ] Settings — `settings/index.html`

### Module UI capabilities (spot-check)

- [ ] List modules show tables/toolbars where expected
- [ ] Add/View/Edit/Delete modals open on CRUD modules that have them
- [ ] Search/filter/pagination behave on list pages
- [ ] Export menus appear where implemented (Print/PDF/Excel patterns)
- [ ] Dashboard navigation shortcuts open other modules
- [ ] Route Planning map area is a **placeholder** (not live Google Maps)
- [ ] Cost Analysis and Reports charts render (custom CSS/SVG, sample/local data)

### Authentication (frontend simulation only)

- [ ] Demo login works with credentials shown on the login page
- [ ] Successful login goes to Dashboard
- [ ] Protected pages redirect to Login when not signed in
- [ ] Logout returns to Login and clears `himsFleetSession` only
- [ ] Theme still works after logout (`himsFleetTheme` kept)

### Quality spot-checks

- [ ] No obvious missing CSS (layout intact)
- [ ] No console errors on initial load of Dashboard after login
- [ ] Favicon loads
- [ ] Vehicle placeholder image path works where used

---

## 4. Backend Preparation Checklist

These items are **planned** for Laravel work. They are **not** complete inside this frontend repository.

### Project setup

- [ ] Laravel project created (separate or integrated path as team decides)
- [ ] PHP and Composer available (e.g. via Laragon)
- [ ] `.env` configured for local development
- [ ] `APP_KEY` generated
- [ ] Application runs locally (`php artisan serve` or Laragon vhost)

### Database

- [ ] MySQL running
- [ ] Database created
- [ ] Migrations planned/written from [docs/13-DATABASE-MAPPING.md](./13-DATABASE-MAPPING.md)
- [ ] Seeders optional for demo users/data

### Authentication

- [ ] Laravel Breeze (or approved session auth) installed
- [ ] Real login/logout working
- [ ] Session cookies working on local domain
- [ ] Demo frontend session no longer treated as production security
- [ ] Password reset planned if required by scope

### Authorization

- [ ] Roles defined (see future Role Matrix doc)
- [ ] Middleware / policies planned for module access
- [ ] Unauthorized actions rejected on the server

### Application features

- [ ] CRUD for core modules planned (Vehicles, Drivers, Reservations, Dispatch, etc.)
- [ ] Validation rules on all write operations
- [ ] Web routes and/or API responses defined without inventing random contracts mid-demo
- [ ] File upload storage planned (vehicle/driver images)
- [ ] Reports/dashboard queries planned against real tables

### Frontend connection

- [ ] One module integrated end-to-end first (recommended: auth, then vehicles)
- [ ] Existing UI classes and modals reused
- [ ] Error responses map to field errors / toasts
- [ ] Demo data fallbacks removed only after real data works

---

## 5. Database Checklist

Verify before connecting the UI to live data:

- [ ] Schema matches module needs (vehicles, drivers, reservations, dispatches, maintenance, fuel, routes, users, settings)
- [ ] Primary keys on all tables
- [ ] Foreign keys for vehicle/driver/reservation links
- [ ] Status fields support UI badge values (or mapped cleanly)
- [ ] Relationships documented and tested
- [ ] Indexes on common filters (status, dates) considered
- [ ] Sample/seed data available for demos
- [ ] No passwords stored in plain text
- [ ] Backup/restore approach known for local DB

Reference: [docs/13-DATABASE-MAPPING.md](./13-DATABASE-MAPPING.md).

---

## 6. Deployment Checklist

### Approved workflow

| Stage | Environment |
| ----- | ----------- |
| Development | Local (frontend HTTP server; later Laragon + Laravel + MySQL) |
| Version control | GitHub |
| Production | School **HostForge** |
| Public access | Fleet **subdomain** (exact name from school/HostForge) |

### Before any production deploy

- [ ] Code pushed to GitHub on the agreed branch
- [ ] Backend integration tested locally
- [ ] `.env` production values prepared (not committed with secrets)
- [ ] `APP_DEBUG=false` for real production
- [ ] Database credentials confirmed on HostForge
- [ ] HTTPS/SSL available as required by school
- [ ] Subdomain DNS points to HostForge
- [ ] Laravel `public` document root configured correctly
- [ ] Storage/link permissions set if uploads are used
- [ ] Login works on production URL
- [ ] At least one full CRUD path works on production
- [ ] Known limitations reviewed so demo claims stay honest

---

## 7. Testing Checklist

### Frontend (now)

- [ ] Navigation between all modules
- [ ] Responsive layout (desktop / tablet / mobile widths)
- [ ] Forms open, validate, and show errors in UI
- [ ] Primary/outline/danger buttons behave correctly
- [ ] Frontend demo authentication flows
- [ ] Theme light / dark / system
- [ ] Modals open/close
- [ ] Tables: search, filter, pagination (where present)
- [ ] Export menus open (where present)

### After backend integration

- [ ] Real authentication and session timeout behavior
- [ ] API/web request success and failure handling
- [ ] CRUD persists after refresh
- [ ] Validation errors from Laravel show in the UI
- [ ] Role permissions block forbidden actions
- [ ] Dashboard/report numbers match database
- [ ] Multi-user basic test (two browsers/accounts if available)

---

## 8. Documentation Checklist

Confirm these docs exist and are readable in `docs/`:

- [ ] `00-START-HERE.md` — entry guide
- [ ] `01-PROJECT-OVERVIEW.md` — project overview
- [ ] `02-TECH-STACK.md` — technologies
- [ ] `03-FOLDER-STRUCTURE.md` — frozen structure
- [ ] `04-PROJECT-ARCHITECTURE.md` — architecture
- [ ] `05-DESIGN-SYSTEM.md` — UI/design tokens
- [ ] `06-COMPONENT-SYSTEM.md` — components
- [ ] `07-JAVASCRIPT-ARCHITECTURE.md` — JavaScript
- [ ] `08-ROUTING.md` — routes
- [ ] `09-AUTHENTICATION.md` — auth
- [ ] `10-THEME-SYSTEM.md` — theme
- [ ] `11-MODULES.md` — modules
- [ ] `12-BACKEND-INTEGRATION.md` — backend plan
- [ ] `13-DATABASE-MAPPING.md` — database guide
- [ ] `14-API-CONTRACT.md` — communication guide
- [ ] `15-LOCAL-STORAGE.md` — browser storage
- [ ] `16-ASSETS.md` — assets
- [ ] `17-CODING-STANDARDS.md` — coding rules
- [ ] `18-KNOWN-LIMITATIONS.md` — limitations
- [ ] `19-TROUBLESHOOTING.md` — troubleshooting
- [ ] `20-HANDOVER-CHECKLIST.md` — this checklist
- [ ] Root `README.md` reviewed (may lag freeze docs; prefer `docs/` for current detail)
- [ ] Planned later: Role Matrix (`21-ROLE-MATRIX.md`) when approved

---

## 9. Final Verification

Complete this list before calling the frontend “ready for backend integration” or handing over the repo.

### Repository

- [ ] Latest code available on GitHub
- [ ] Working tree understood (no secret files committed)
- [ ] Main branch (or agreed branch) identified
- [ ] Clone/open works on a second machine if possible

### Frontend readiness

- [ ] Frontend completion checklist above is mostly checked
- [ ] Known limitations understood (`docs/18-KNOWN-LIMITATIONS.md`)
- [ ] Demo login credentials known (UI demo only)
- [ ] Project runs on local HTTP server without console errors on happy path

### Handover communication

- [ ] Incoming developer received link to `docs/00-START-HERE.md`
- [ ] Incoming developer told not to redesign UI without approval
- [ ] Incoming developer told `fleet/` = Vehicles page
- [ ] Backend preparation checklist reviewed together
- [ ] Contact persons filled in (if used by the team)

### Sign-off (fill in during real handover)

| Item | Name / date |
| ---- | ----------- |
| Frontend ready for backend integration | _______________ |
| Repository owner | _______________ |
| Incoming developer | _______________ |
| Adviser / project lead (optional) | _______________ |

---

## 10. Conclusion

Completing this checklist makes turnover safer and clearer. The Fleet frontend is already a full presentation layer; the next major work is Laravel authentication, MySQL, and module data connections—without rebuilding screens that already work.

Use this list at the start of backend integration and again before HostForge deployment so nothing important is skipped.

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `docs/20-HANDOVER-CHECKLIST.md` |
| Type | Handover / turnover checklist |
| Production code changes | None |
| Frontend modules verified in repo | 12 business pages + login + root entry |
| Backend in this repository | Not present (planned) |
