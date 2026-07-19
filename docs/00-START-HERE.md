# Fleet & Transportation Management

## Developer Handover — Start Here

| Field | Value |
| ----- | ----- |
| **Project** | Hospital Information Management System (HIMS) |
| **Module** | Fleet & Transportation Management |
| **Frontend version** | Unversioned |
| **Structure freeze version** | 1.0 (see [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md)) |
| **Document purpose** | Onboard developers for Laravel backend integration against the completed frontend |
| **Intended readers** | Backend integrators, frontend maintainers, QA, capstone reviewers |

---

> This repository contains the completed and frozen frontend implementation of the Fleet & Transportation Management module.
>
> The next development phase is Laravel backend integration.
>
> Do not redesign the interface, rename production paths, duplicate existing utilities, or restructure the frontend unless a formal change is approved and documented.

---

## 1. Project Summary

This repository is the **frontend** for one HIMS module: **Fleet & Transportation Management**.

**Purpose.** Support hospital fleet and transportation operations—vehicles, reservations, dispatch, drivers, maintenance, fuel, route planning, cost analysis, reports, settings, and user profile—through a single responsive web UI.

**Frontend stack (verified in repository).**

- HTML5
- CSS3 (design-system styles under `assets/css/`)
- Bootstrap 5 (CDN)
- Vanilla JavaScript (ES6 modules as plain script files under `assets/js/`)
- Phosphor Icons (CDN)

**Intended backend (not implemented in this repository).**

- Laravel
- MySQL

**Current data behavior.** Where no backend exists, the UI uses frontend-only simulation: in-page demo data, static dashboard/report samples where coded that way, and browser storage for specific features (session, theme, profile, settings, routes, and related keys listed in Section 10). This is **not** server-backed persistence and **not** secure authentication.

---

## 2. Current Project Status

Statuses below describe the **frontend** as it exists after cleanup and structure freeze. They do **not** mean production backend security or real authentication.

| Area | Status | Notes |
| ---- | ------ | ----- |
| Login page | Complete — Frontend | `login/index.html`; no app sidebar/navbar |
| Frontend authentication simulation | Simulated — Frontend Only | Session key `himsFleetSession`; demo credentials; not secure |
| Route protection (client) | Simulated — Frontend Only | `auth-boot.js` + `requireAuth()`; not a security control |
| Dashboard | Complete — Frontend | `dashboard/index.html`; sample/static metrics and chart UX |
| Vehicles | Complete — Frontend | Page route `fleet/index.html`; logic under `assets/js/vehicle/` |
| Reservations | Complete — Frontend | `reservation/` |
| Dispatch | Complete — Frontend | `dispatch/` |
| Drivers | Complete — Frontend | `driver/` |
| Maintenance | Complete — Frontend | `maintenance/` |
| Fuel Management | Complete — Frontend | `fuel/` |
| Route Planning | Complete — Frontend | `route-planning/`; client storage for routes/templates |
| Cost Analysis | Complete — Frontend | `cost-analysis/`; client budgets/presets + sample fallbacks |
| Reports and Analytics | Complete — Frontend | `reports/`; client presets + optional localStorage + samples |
| User Profile | Complete — Frontend | `profile/`; client profile storage |
| Fleet Settings | Complete — Frontend | `settings/`; client settings storage |
| Theme system | Complete — Frontend | Light / Dark / System via `himsFleetTheme` |
| Shared navigation | Complete — Frontend | Sidebar + navbar components |
| Responsive layout | Complete — Frontend | Design system + shell behavior |
| Folder structure | Frozen | Documented in `docs/03-FOLDER-STRUCTURE.md` |
| Backend integration | Pending — Laravel Integration | No Laravel/MySQL implementation in this repo |
| Real authentication / authorization | Pending — Laravel Integration | Replace frontend session simulation |
| Server-side validation & persistence | Pending — Laravel Integration | — |
| Secure sessions / CSRF / roles | Pending — Laravel Integration | — |

Do not describe frontend authentication or client storage as production security.

---

## 3. Important Architecture Rule

**The cleaned frontend folder structure is frozen.**

**Required reading:** [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md)

That document defines:

- path ownership
- file responsibilities
- frontend / backend integration boundaries
- change classification (Additive, Corrective, Integrative, Breaking)
- rules for adding files

**Warning.** Do not rename `fleet/` and `vehicle/` paths, or any other active production path, without a documented **Breaking** change, full reference updates, module testing, and maintainer approval.

Canonical pairing (accepted freeze convention):

| Concern | Path |
| ------- | ---- |
| Vehicles page | `fleet/index.html` |
| Vehicles JS | `assets/js/vehicle/` |
| Vehicles CSS | `assets/css/pages/vehicle.css` |

---

## 4. How to Run the Frontend

There is **no** `package.json`, npm script, Composer, or Vite/Webpack config in this repository. Do not invent build commands.

Component loading uses `fetch()` (`assets/js/core/include.js`). A local **HTTP** server is required; opening pages via `file://` will often break includes.

### Steps

1. Clone or open the repository root (`Fleet-Transportation-Frontend-Starter`).
2. Start a local web server **from the repository root**. Examples that work for static HTML:
   - **VS Code / Cursor Live Server** (serve project root)
   - **Python:** `python -m http.server 8080` (from repo root)
   - **Node (if installed globally):** `npx --yes serve -l 8080 .`
3. Open the login route, for example:  
   `http://localhost:8080/login/index.html`  
   (Root `index.html` redirects to login or dashboard based on frontend session.)
4. Sign in with the **demo credentials** shown on the login page (also in Section 5).
5. Confirm successful login navigates to `dashboard/index.html`.

### Primary routes

| Screen | Path |
| ------ | ---- |
| Entry | `index.html` |
| Login | `login/index.html` |
| Dashboard | `dashboard/index.html` |
| Vehicles | `fleet/index.html` |
| Reservations | `reservation/index.html` |
| Dispatch | `dispatch/index.html` |
| Drivers | `driver/index.html` |
| Maintenance | `maintenance/index.html` |
| Fuel | `fuel/index.html` |
| Route Planning | `route-planning/index.html` |
| Cost Analysis | `cost-analysis/index.html` |
| Reports | `reports/index.html` |
| Settings | `settings/index.html` |
| Profile | `profile/index.html` |

---

## 5. Demo Authentication Notice

Current authentication is a **frontend session simulation** for local UI flow only.

| Fact | Detail |
| ---- | ------ |
| Not secure | Do not treat as real authentication or authorization |
| Session key | `himsFleetSession` (sessionStorage by default; localStorage if “Remember me”) |
| Password storage | Passwords are **not** stored; only a small session object after successful demo login |
| Session API | `assets/js/core/auth.js` |
| Early gate | `assets/js/core/auth-boot.js` |
| Login page controller | `assets/js/auth/login.js` |
| Login UI | `login/index.html` |

**Demo credentials (frontend only; labeled on the login page):**

- Email: `admin@talahospital.com`
- Password: `admin123`

These exist only to exercise the UI. They are **not** secure credentials and must be replaced by **Laravel Breeze** (or the approved Laravel authentication stack) with server sessions/cookies, validation, and authorization.

**Primary integration seam:** `assets/js/core/auth.js`  
(`login()`, `logout()`, `isAuthenticated()`, `requireAuth()`, `getCurrentUser()`, `performFleetLogout()`)

Client-side route guards must **never** be relied on for security after backend integration.

---

## 6. Backend Developer First Tasks

Integrate **incrementally**. Do not wire every module at once.

1. Read [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md).
2. Inspect authentication: `assets/js/core/auth.js`, `assets/js/core/auth-boot.js`, `assets/js/auth/login.js`, `login/index.html`.
3. Set up Laravel and MySQL **outside or behind** the approved frontend boundary (do not restructure the frozen tree without approval).
4. Replace the frontend session simulation with Laravel session/cookie authentication.
5. Define database migrations and relationships.
6. Create controllers, services, form requests/validation, and authorization policies.
7. Connect **one module at a time** (see Section 7).
8. Replace mock or browser persistence for a module **only after** its backend endpoint works.
9. Preserve current frontend loading, empty, validation, success, and error presentation states.
10. Test every existing route after each integration change.

---

## 7. Recommended Integration Order

Use this sequence unless a verified dependency forces a temporary reorder:

1. Authentication and user session  
2. User profile and roles  
3. Shared API client and error handling  
4. Vehicles  
5. Drivers  
6. Reservations  
7. Dispatch  
8. Maintenance  
9. Fuel Management  
10. Route Planning  
11. Cost Analysis  
12. Dashboard metrics  
13. Reports and Analytics  
14. Notifications and messages  
15. Fleet Settings  

**Why this order.** Authentication and shared API plumbing unblock every protected page. Vehicles and drivers are reference data for reservations and dispatch. Operational modules (reservation → dispatch → maintenance → fuel) build on those entities. Aggregations (cost, dashboard, reports) and settings should consume real API data last so charts and KPIs are not rebuilt twice.

---

## 8. Frontend-Owned Responsibilities

Backend work should supply **data and authorization** without unnecessarily rewriting:

- visual design and CSS design system (`assets/css/`)
- responsive behavior
- accessibility presentation
- shared component presentation (`components/shared/`, modals under `components/<domain>/`)
- modal and form presentation lifecycle
- table and card layouts
- loading, empty, and client interaction states
- theme presentation (Light / Dark / System)

Keep shell behavior (`include.js`, `main.js`, sidebar/navbar) stable unless an Integrative change is approved.

---

## 9. Laravel-Owned Responsibilities

Implement on the server:

- real authentication  
- sessions and secure cookies  
- authorization and roles  
- CSRF protection  
- validation  
- database persistence  
- API or web controllers  
- business rules  
- audit logs  
- file storage  
- report queries  
- notification data  
- server-side error handling  
- security controls  

Client route guards and demo login are **UI helpers only**, not substitutes for the above.

---

## 10. Data That Must Be Replaced

Only **verified** browser keys and auth/demo sources found in the repository are listed. Module CRUD pages primarily use in-page/demo table data and JS logic under `assets/js/<module>/`; reports and cost analysis also fall back to embedded sample datasets when storage is empty.

### Authentication / session

| Key / source | Location | Notes |
| ------------ | -------- | ----- |
| `himsFleetSession` | `assets/js/core/auth.js`, `auth-boot.js`, root `index.html` | Frontend session object; no password field |
| Demo email/password constants | `assets/js/core/auth.js` | UI demo only |
| Demo credential UI text | `login/index.html` | Frontend only |

### Theme / shell / UX helpers

| Key | Location | Notes |
| --- | -------- | ----- |
| `himsFleetTheme` | `theme-boot.js`, `main.js`, settings | Values: `light` \| `dark` \| `system` |
| `himsFleetSidebarCollapsed` | `main.js` | Desktop sidebar preference |
| `himsFleetPendingAction` | `pending-action.js` | Cross-page UI action helper |

### Profile / settings

| Key | Location |
| --- | -------- |
| `himsFleetUserProfile` | `assets/js/core/user-profile.js` |
| `himsFleetSettings` | `assets/js/settings/settings-store.js` |

### Routes / cost / reports

| Key | Location |
| --- | -------- |
| `himsFleetRoutes` | `assets/js/route-planning/route-store.js` |
| `himsFleetRouteTemplates` | `assets/js/route-planning/route-store.js` |
| `himsFleetCostAnalysisBudget` | `assets/js/cost-analysis/cost-budget.js` |
| `himsFleetCostAnalysisBudgetHistory` | `assets/js/cost-analysis/cost-budget.js` |
| `himsFleetCostAnalysisPresets` | `assets/js/cost-analysis/cost-presets.js` |
| `himsFleetReportPresets` | `assets/js/reports/reports-presets.js` |

### Keys read as optional operational data (reports / cost / navbar helpers)

These string keys appear as **read** targets (localStorage) when present; they are not the sole source of all CRUD UIs:

| Key | Referenced from |
| --- | --------------- |
| `himsFleetVehicles` | `reports-data.js`, `cost-data.js`, `navbar.js` |
| `himsFleetDrivers` | `reports-data.js`, `navbar.js` |
| `himsFleetReservations` | `reports-data.js`, `cost-data.js`, `navbar.js` |
| `himsFleetDispatches` | `reports-data.js`, `cost-data.js`, `navbar.js` |
| `himsFleetMaintenance` | `reports-data.js`, `cost-data.js` |
| `himsFleetFuel` | `reports-data.js`, `cost-data.js` |

### Other frontend-only sources

- Static / sample dashboard content and chart messaging (`assets/js/dashboard/dashboard.js`, dashboard HTML)
- Embedded sample datasets inside reports and cost-analysis modules when storage is empty
- Placeholder notifications / messages UI in the navbar layer (`assets/js/components/navbar.js`)
- Simulated profile defaults via `user-profile.js` / profile page scripts

Replace each source with Laravel-backed data **module by module**. Do not delete a fallback until its replacement works.

---

## 11. Critical Rules During Integration

- Do not delete a frontend fallback until its Laravel replacement is working.
- Do not duplicate auth, theme, toast, modal, storage, export, or API utilities.
- Do not put secrets in JavaScript.
- Do not expose database credentials in frontend files.
- Do not bypass Laravel validation.
- Do not rely on client-side route guards for security.
- Do not rename active routes casually.
- Do not convert all pages to Blade in one uncontrolled change.
- Do not mix unrelated refactoring with backend integration.
- Commit module integrations separately.

---

## 12. Documentation Reading Order

### Existing documents (read these)

| Order | Document | Purpose |
| ----- | -------- | ------- |
| 1 | [docs/00-START-HERE.md](./00-START-HERE.md) | Handover entry, status, integration seams |
| 2 | [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md) | Frozen structure, ownership, change control |
| 3 | [docs/design-system.md](./design-system.md) | UI design system notes |
| 4 | [README.md](../README.md) | High-level project intro (may lag behind freeze status tables) |

### Planned documentation

The following are **not** created in this task. Suggested future sequence for the project team:

| Suggested order | Planned document | Purpose |
| --------------- | ---------------- | ------- |
| — | Project Overview | Expanded product context |
| — | Tech Stack | Frontend + Laravel stack detail |
| — | Project Architecture | End-to-end architecture |
| — | JavaScript Architecture | Module JS conventions |
| — | Routing | Frontend routes ↔ Laravel routes |
| — | Authentication | Breeze / session / guard design |
| — | Modules | Per-module integration notes |
| — | Backend Integration | Playbook and ownership |
| — | Database Mapping | Tables ↔ UI entities |
| — | API Contract | Endpoints and payloads |
| — | Storage | Migration off browser keys |
| — | Known Limitations | Explicit gaps |
| — | Troubleshooting | Common integration failures |
| — | Handover Checklist | Sign-off criteria |

---

## 13. Quick Verification Checklist

Use this after opening the app on a local HTTP server (before backend work), and again after each integration slice:

- [ ] Login page loads (`login/index.html`)
- [ ] Valid demo login reaches dashboard
- [ ] Logout returns to login
- [ ] Protected pages redirect to login when unauthenticated
- [ ] Authenticated visit to login redirects to dashboard
- [ ] Sidebar navigation works for all modules
- [ ] Navbar actions render
- [ ] Light theme works
- [ ] Dark theme works
- [ ] System theme works
- [ ] All module pages load (dashboard, fleet, reservation, dispatch, driver, maintenance, fuel, route-planning, cost-analysis, reports, settings, profile)
- [ ] No missing CSS (`assets/css/style.css` and imports)
- [ ] No missing scripts
- [ ] No missing icons or images (favicon, placeholders, CDN icons)
- [ ] No console errors on initial load of shell pages

---

## 14. Definition of a Safe Integration

A **safe** integration is one where:

- the frontend appearance remains unchanged unless a deliberate, approved UI change is documented
- the backend becomes the source of truth for auth and data
- server validation is authoritative
- frontend loading / empty / error / success states remain usable
- active paths remain valid (or are updated under Breaking change control)
- no duplicate architecture is introduced (second design system, second auth stack, parallel folders)
- mock or browser data is removed only after replacement
- tests confirm no regression on existing routes

---

## 15. Contact and Ownership

| Role | Contact |
| ---- | ------- |
| Frontend Maintainer | [Project team to complete] |
| Backend Integrator | [Project team to complete] |
| Repository Owner | [Project team to complete] |
| Approval Required From | [Project lead or maintainer] |

Structural, Breaking, and Integrative path changes require maintainer approval as defined in [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md).

---

## 16. Final Recommendation

**FINAL RECOMMENDATION**

Read [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md) before changing any production file.

Treat `assets/js/core/auth.js` and each module’s current storage/data boundary as the first Laravel integration seams.

Replace frontend simulations incrementally, preserve the current frontend contracts, and document every approved structural or breaking change.

Do not rename `fleet/` and `vehicle/` paths without formal approval and change documentation.

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `docs/00-START-HERE.md` |
| Type | Developer handover entry |
| Depends on | Structure freeze 1.0 |
| Production code changes in this task | None |
