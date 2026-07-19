# Technology Stack

## Fleet & Transportation Management Module

**Hospital Information Management System (HIMS)**

| Field | Value |
| ----- | ----- |
| **Module** | Fleet & Transportation Management |
| **Document purpose** | Official technology inventory, ownership, and integration boundaries |
| **Frontend version** | Unversioned |
| **Structure freeze** | 1.0 |
| **Related entry docs** | [00-START-HERE.md](./00-START-HERE.md), [01-PROJECT-OVERVIEW.md](./01-PROJECT-OVERVIEW.md), [03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md) |

---

## 1. Stack Summary

Only technologies verified in the repository (or explicitly planned for backend work) are listed.

| Layer | Technology | Purpose | Status |
| ----- | ---------- | ------- | ------ |
| Markup | HTML5 | Pages, forms, component fragments | Current |
| Styling | CSS3 | Design system, layout, themes, components | Current |
| UI framework | Bootstrap 5.3.7 (CDN) | Grid/utilities and Bootstrap JS bundle where pages include it | Current |
| Application logic | Vanilla JavaScript (ES6) | Shell, modules, validation presentation, client workflows | Current |
| Icons | Phosphor Icons (CDN) | Interface icons | Current |
| Charts | Custom CSS/SVG chart rendering | Reports and cost-analysis visuals (not Chart.js) | Current |
| Spreadsheet export | SheetJS / xlsx (CDN) | Excel export on modules that load it | Current |
| PDF export | jsPDF + jsPDF-AutoTable (CDN) | PDF export on modules that load it | Current |
| Client storage | `localStorage` / `sessionStorage` | Theme, session simulation, selected preferences and datasets | Current (partially temporary) |
| Auth (current) | Frontend session simulation | Local UI login flow only | Temporary |
| Backend (planned) | Laravel (PHP) | Auth, validation, business rules, APIs/controllers | Planned |
| Database (planned) | MySQL | Persistent relational storage | Planned |
| Version control | Git | Source control | Current |
| Hosting remote | GitHub | Remote origin for this repository | Current |

There is **no** `package.json`, npm application toolchain, Composer project, Vite/Webpack app config, or jQuery dependency in this repository.

---

## 2. Frontend Stack

### HTML5

| | |
| --- | --- |
| **Purpose** | Structure every screen and shared fragment |
| **Responsibilities** | Semantic layout, forms, accessibility landmarks, component markup |
| **Advantages** | Simple, portable, easy to serve statically or later map to Blade |
| **Limitations** | No server logic; fragment loading depends on HTTP + `fetch` |
| **Where used** | Module pages (`*/index.html`), `components/**/*.html`, root `index.html` |

### CSS3 + design system

| | |
| --- | --- |
| **Purpose** | Visual design, tokens, responsive rules, theme surfaces |
| **Responsibilities** | Base foundations, shared components, page-specific styles |
| **Advantages** | Central entry (`assets/css/style.css`), consistent tokens, light/dark presentation |
| **Limitations** | No CSS preprocessor in-repo; discipline required to avoid duplicate systems |
| **Where used** | `assets/css/base/`, `assets/css/components/`, `assets/css/pages/`, imported by `style.css` |

### Bootstrap 5.3.7 (CDN)

| | |
| --- | --- |
| **Purpose** | Primary UI framework for layout helpers and Bootstrap JS behaviors where referenced |
| **Responsibilities** | Grid/utilities, selected components, bundle script on pages that include it |
| **Advantages** | Fast, familiar, reduces custom layout boilerplate |
| **Limitations** | Must not be duplicated by a second UI kit; custom design system still owns product look |
| **Where used** | CDN CSS/JS links in module HTML pages |

### Vanilla JavaScript (ES6)

| | |
| --- | --- |
| **Purpose** | All application behavior without a SPA framework |
| **Responsibilities** | Includes, auth simulation, theme, toasts, CRUD UX, filters, export triggers, charts |
| **Advantages** | No build step, transparent for Laravel integrators, module isolation |
| **Limitations** | Manual script ordering; no TypeScript/bundler guarantees |
| **Where used** | `assets/js/core/`, `assets/js/components/`, `assets/js/auth/`, `assets/js/<module>/` |

### Phosphor Icons (CDN)

| | |
| --- | --- |
| **Purpose** | Iconography across shell and modules |
| **Responsibilities** | Visual affordances for navigation, actions, status |
| **Advantages** | Lightweight CDN load; consistent icon set |
| **Limitations** | Requires network/CDN access in local/dev unless cached |
| **Where used** | `<i class="ph ...">` usage in HTML components and pages |

### Custom charts (CSS/SVG rendering)

| | |
| --- | --- |
| **Purpose** | Visualize report and cost-analysis data |
| **Responsibilities** | Draw bars/donuts/trends from frontend data models |
| **Advantages** | No extra charting library dependency; full control of styling |
| **Limitations** | Not a full analytics engine; data quality depends on frontend samples/storage until APIs exist |
| **Where used** | `assets/js/reports/reports-charts.js`, `assets/js/cost-analysis/cost-charts.js` (and related page markup) |

**Not present:** Chart.js (or similar third-party chart CDN) is not a repository dependency. Comments in export code explicitly note CSS/SVG charts rather than canvas Chart.js.

### SheetJS / xlsx (CDN)

| | |
| --- | --- |
| **Purpose** | Client-side Excel export |
| **Responsibilities** | Build workbooks from filtered table/export datasets |
| **Where used** | Modules that include `xlsx.full.min.js` and export scripts |

### jsPDF + AutoTable (CDN)

| | |
| --- | --- |
| **Purpose** | Client-side PDF export |
| **Responsibilities** | Generate printable PDF tables/reports in the browser |
| **Where used** | Modules that include jsPDF scripts and PDF export helpers |

### Browser storage APIs

| | |
| --- | --- |
| **Purpose** | Temporary or preference persistence without a backend |
| **Responsibilities** | Session simulation, theme, profile/settings, selected module preferences |
| **Where used** | Core and module scripts (see Section 5) |
| **Status** | Partially temporary — preferences may later sync from server; operational truth must move to MySQL |

### How the frontend stack fits together

1. HTML pages load Bootstrap + icons + `style.css` + core scripts.  
2. `include.js` injects shared shell components over HTTP.  
3. Module scripts implement domain UX against tables/modals.  
4. Theme boot runs before paint; auth boot gates protected pages.  
5. Export and chart helpers enhance presentation without a backend.

---

## 3. Backend Stack (Planned)

These technologies are **intended** for integration. They are **not implemented** in this frontend repository.

### Laravel (PHP)

| | |
| --- | --- |
| **Why Laravel** | Fits hospital modular backends, strong auth/validation ecosystem, natural path from static HTML toward Blade or API-driven pages |
| **Planned role** | Authentication, authorization, validation, business rules, controllers/services, optional API surface |
| **What Laravel will replace** | Frontend session simulation, mock/local operational persistence, client-only “source of truth” for CRUD and reports data |
| **What Laravel will NOT replace** | Design system CSS, shared component presentation, responsive behavior, theme presentation layer, general UI interaction patterns |

**Do not invent packages.** No Laravel package list is frozen in this repository beyond the documented intent to use an approved auth approach such as **Laravel Breeze** (named in frontend auth comments and handover docs as the expected replacement direction).

### MySQL

| | |
| --- | --- |
| **Why MySQL** | Standard relational store for hospital operational records (vehicles, trips, fuel, maintenance, users) |
| **Planned role** | Durable persistence, reporting queries, referential integrity |
| **What MySQL will replace** | Browser storage and in-page demo datasets as the system of record |
| **What MySQL will NOT replace** | Client theme preference UX (may still cache presentation preference) |

### PHP runtime

Implied by Laravel hosting. Not present as application code in this repository.

---

## 4. Authentication

### Current (frontend only)

| Item | Detail |
| ---- | ------ |
| Mechanism | Frontend session simulation |
| Primary API | `assets/js/core/auth.js` |
| Early gate | `assets/js/core/auth-boot.js` |
| Login UI | `login/index.html` + `assets/js/auth/login.js` |
| Storage key | `himsFleetSession` (`sessionStorage` or `localStorage` with Remember me) |
| Security | **Not secure** — demo credentials for local UI only; passwords are not stored |

### Future (planned)

| Item | Detail |
| ---- | ------ |
| Direction | Laravel Breeze or other **approved** Laravel authentication implementation |
| Backend owns | Authentication, sessions/cookies, authorization, CSRF, password handling |
| Frontend owns | Login presentation, error display, post-login navigation UX |

Client route guards must never be treated as security after backend integration.

---

## 5. Storage

### Browser storage in use today

| Storage | Typical use in this project |
| ------- | --------------------------- |
| `sessionStorage` | Default frontend auth session when Remember me is off |
| `localStorage` | Remembered session, theme, profile, settings, selected module preferences |

### Verified keys (non-exhaustive ownership map)

| Key | Concern | Laravel direction |
| --- | ------- | ----------------- |
| `himsFleetSession` | Simulated auth | **Replace** with server session/cookie auth |
| `himsFleetTheme` | Theme preference | Frontend presentation remains; optional server sync later |
| `himsFleetUserProfile` | Profile fields | **Replace** with authenticated user profile |
| `himsFleetSettings` | Fleet settings | **Replace** with persisted settings |
| `himsFleetSidebarCollapsed` | Shell UX preference | Frontend-owned (optional sync) |
| `himsFleetPendingAction` | Cross-page UI helper | Frontend-owned or redesign with API flows |
| `himsFleetRoutes` / `himsFleetRouteTemplates` | Route planning data | **Replace** with DB entities |
| `himsFleetCostAnalysisBudget` / `History` / `Presets` | Cost analysis | **Replace** with DB entities |
| `himsFleetReportPresets` | Report presets | **Replace** with DB preferences |
| `himsFleetVehicles`, `Drivers`, `Reservations`, `Dispatches`, `Maintenance`, `Fuel` | Optional reads for reports/cost/navbar | **Replace** with APIs; do not treat browser as system of record |

Many CRUD modules primarily operate on in-page/demo data models even when some analytics code can read optional localStorage keys. See [00-START-HERE.md](./00-START-HERE.md) for the verified key list used by integrators.

---

## 6. Frontend Responsibilities

Frontend technologies own:

- UI structure and visual design
- CSS design system and Bootstrap usage
- Theme presentation (light / dark / system)
- Shared components (sidebar, navbar, toast, modals)
- Responsive layout and motion
- Forms and **validation presentation**
- Loading, empty, success, and error presentation states
- Navigation chrome and client interaction patterns
- Client-side export rendering (until server export is introduced)
- Chart presentation from provided datasets

Backend integration should supply data and auth results without unnecessarily rewriting these presentation layers.

---

## 7. Backend Responsibilities

Laravel / MySQL (planned) own:

- Real authentication and secure sessions
- Authorization and roles
- Server-side validation
- Business rules and workflows
- Database persistence
- API or web controllers
- Authoritative reports and dashboard aggregates
- Notification data delivery
- Audit logs
- Security controls (CSRF, password hashing, access policy)
- File uploads / media storage
- Server-side processing (queues, jobs) when introduced later

---

## 8. Technology Boundaries

| Technology | Owned by | Replaceable during Laravel work? | Notes |
| ---------- | -------- | -------------------------------- | ----- |
| HTML page structure | Frontend | No (unless approved Breaking/Integrative change) | May later be wrapped by Blade without redesign |
| CSS design system | Frontend | No | Keep `assets/css/` contract |
| Bootstrap 5 | Frontend | No (do not swap UI kits casually) | Primary UI framework |
| Vanilla JS UI modules | Frontend | No for presentation; yes for data access seams | Replace mock data calls, not whole UI |
| Phosphor Icons | Frontend | Optional | Presentation dependency |
| Custom charts | Frontend | Presentation stays; data source yes | Feed from API later |
| xlsx / jsPDF client export | Frontend | Optional later server export | Keep until server export exists |
| Theme engine | Frontend | No | Preference key may sync |
| Frontend auth session | Temporary | **Yes** | Replace via Laravel auth |
| Demo credentials | Temporary | **Yes** | Remove after real auth |
| Mock / sample / local operational data | Temporary | **Yes** | Incremental per module |
| Laravel | Backend | N/A (new) | Source of truth for auth + rules |
| MySQL | Backend | N/A (new) | Source of truth for persistence |
| Git / GitHub | Process | N/A | Source control |

---

## 9. Future Expansion

The following are **planned possibilities only**. They are **not** present as implemented stack items in this repository:

| Planned capability | Notes |
| ------------------ | ----- |
| REST (or web) API surface | Module-by-module endpoints |
| Role-based authorization | Policies/gates after real users exist |
| Queue jobs | Async work (reports, notifications) if needed |
| Email notifications | Server-triggered alerts |
| File storage | Vehicle images, attachments |
| Audit logs | Who changed operational records |
| Real-time notifications | Beyond placeholder navbar UI |
| Controlled Blade/Vite adoption | Only with approved structure change |

Introduce future technologies through documented architectural decisions, not ad hoc folder experiments.

---

## 10. Best Practices

1. **Do not duplicate UI frameworks.** Keep Bootstrap as the primary UI framework; extend with the existing design system.
2. **Do not move presentation ownership into Laravel.** Controllers supply data; CSS/components remain frontend-owned.
3. **Keep reusable JavaScript centralized** in `assets/js/core/` and `assets/js/components/`.
4. **Keep module logic isolated** under `assets/js/<module>/`.
5. **Use Laravel only for backend responsibilities** listed in Section 7.
6. **Do not duplicate authentication.** One real auth stack on the server; one UI login flow on the client.
7. **Replace simulations incrementally.** Auth first, then reference data, then operational modules, then aggregates.
8. **Do not invent npm/Composer dependencies** inside this static frontend tree without an approved toolchain decision.
9. **Do not put secrets** (DB passwords, API private keys) in JavaScript or HTML.
10. **Respect the frozen structure** ([03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md)) when adding files.

---

## 11. Related Documentation

### Existing

| Document | Purpose |
| -------- | ------- |
| [docs/00-START-HERE.md](./00-START-HERE.md) | Handover, run steps, integration order, storage keys |
| [docs/01-PROJECT-OVERVIEW.md](./01-PROJECT-OVERVIEW.md) | Product context, scope, status |
| [docs/02-TECH-STACK.md](./02-TECH-STACK.md) | This technology stack document |
| [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md) | Frozen paths and ownership |
| [docs/design-system.md](./design-system.md) | UI design system notes |
| [README.md](../README.md) | High-level repository intro |

### Planned

| Document | Purpose |
| -------- | ------- |
| `docs/04-PROJECT-ARCHITECTURE.md` | End-to-end architecture |
| `docs/07-JAVASCRIPT-ARCHITECTURE.md` | JS conventions |
| `docs/08-ROUTING.md` | Routes and Laravel mapping |
| `docs/09-AUTHENTICATION.md` | Auth replacement design |
| `docs/12-BACKEND-INTEGRATION.md` | Integration playbook |
| `docs/13-DATABASE-MAPPING.md` | Schema mapping |
| `docs/14-API-CONTRACT.md` | Endpoint contracts |
| `docs/15-LOCAL-STORAGE.md` | Full storage migration guide |

---

## 12. Final Recommendation

The technologies documented here define the official stack for the Fleet & Transportation Management module.

Frontend technologies remain responsible for presentation and user interaction.

Laravel and MySQL become the source of truth for authentication, business logic, validation, and persistence during backend integration.

Future technologies should only be introduced through documented architectural decisions.

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `docs/02-TECH-STACK.md` |
| Type | Technology stack |
| Production code changes | None |
| Verified CDN pins | Bootstrap 5.3.7; Phosphor via unpkg; jsPDF 2.5.1; jsPDF-AutoTable 3.8.2; xlsx CDN |
| Chart approach | Custom CSS/SVG (not Chart.js) |
