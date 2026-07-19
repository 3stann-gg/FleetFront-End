# Fleet & Transportation Management Module

## Project Overview

| Field | Value |
| ----- | ----- |
| **Project Name** | Hospital Information Management System (HIMS) |
| **Module** | Fleet & Transportation Management |
| **Document purpose** | Explain what this module is, who uses it, what is finished on the frontend, and what Laravel integration must still deliver |
| **Current development phase** | Frontend complete; backend integration pending |
| **Frontend version** | Unversioned |
| **Structure freeze** | 1.0 ([docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md)) |
| **Entry document** | [docs/00-START-HERE.md](./00-START-HERE.md) |

---

## 1. Module Overview

The Fleet & Transportation Management module is part of the **Hospital Information Management System (HIMS)**.

Its purpose is to support hospital transportation operations through a single web interface used by fleet and operations staff.

Verified operational areas covered by the current frontend include:

- hospital vehicles (page route: `fleet/`)
- drivers
- reservations
- dispatch
- maintenance
- fuel management
- route planning
- cost analysis
- operational reports and analytics
- fleet settings and user profile
- login and frontend session simulation

The UI is designed for hospital branding and day-to-day operational workflows (tables, filters, modals, exports, theme support). Backend persistence, real security, and live enterprise data are **not** implemented in this repository.

---

## 2. Project Objectives

| Objective | Description |
| --------- | ----------- |
| Centralize fleet operations | Provide one module surface for vehicles, people, trips, and related costs |
| Reduce manual processes | Support structured create / view / edit / delete, search, filter, bulk actions, and export flows in the UI |
| Improve vehicle tracking | Present vehicle inventory and status through the Vehicles module |
| Improve reservation workflow | Support reservation records and related list/filter/export UX |
| Improve dispatch coordination | Support dispatch records, status/priority handling, and operational list tools |
| Improve maintenance scheduling | Support maintenance records and list workflows |
| Improve fuel visibility | Support fuel logging and related statistics views |
| Support route planning | Support route records, templates, and planning UI |
| Provide management views | Dashboard KPIs, cost analysis, and reports presentation |
| Prepare Laravel integration | Keep a frozen folder structure, shared components, and clear auth/data seams |

---

## 3. Target Users

The current frontend presents a single default operator identity for demo login. Role-based access control is **not** implemented.

| User / role | Status | Notes |
| ----------- | ------ | ----- |
| Fleet Administrator | Present (demo identity) | Default session user label from frontend auth/profile (`Fleet Administrator`) |
| Dispatcher | Planned | Dispatch UI exists; no separate role enforcement |
| Driver Coordinator | Planned | Drivers module exists; no separate role enforcement |
| Maintenance Personnel | Planned | Maintenance UI exists; no separate role enforcement |
| Hospital Management | Planned | Dashboard/reports/cost views support management-style reading; no RBAC |
| System / Platform Administrators | Planned | Settings UI exists; authorization is not server-backed |

Laravel integration is expected to introduce real users, roles, and authorization.

---

## 4. Current Frontend Implementation

| Area | Status | Notes |
| ---- | ------ | ----- |
| Login | Complete (Frontend) | `login/index.html`; standalone shell (no sidebar/navbar) |
| Dashboard | Complete (Frontend) | `dashboard/index.html`; sample/static presentation where coded |
| Vehicles | Complete (Frontend) | `fleet/index.html`; scripts under `assets/js/vehicle/` |
| Reservations | Complete (Frontend) | `reservation/` |
| Dispatch | Complete (Frontend) | `dispatch/` |
| Drivers | Complete (Frontend) | `driver/` |
| Maintenance | Complete (Frontend) | `maintenance/` |
| Fuel Management | Complete (Frontend) | `fuel/` |
| Route Planning | Complete (Frontend) | `route-planning/`; client route/template storage where implemented |
| Cost Analysis | Complete (Frontend) | `cost-analysis/`; client budgets/presets + sample fallbacks |
| Reports & Analytics | Complete (Frontend) | `reports/`; client charts/tables + sample/storage fallbacks |
| Profile | Complete (Frontend) | `profile/`; client profile storage |
| Settings | Complete (Frontend) | `settings/`; client settings storage |
| Theme System | Complete (Frontend) | Light / Dark / System (`himsFleetTheme`) |
| Shared Components | Complete (Frontend) | Sidebar, navbar, toast, domain modals under `components/` |
| Responsive Layout | Complete (Frontend) | Design system + shell behavior |
| Authentication | Simulated | Frontend session only (`himsFleetSession`); not secure |
| Folder structure | Frozen | Documented in structure freeze 1.0 |
| Backend Integration | Pending Laravel | No Laravel/MySQL code in this repository |
| Real roles / authorization | Not Implemented | — |
| Real-time GPS / live tracking | Not Implemented | — |
| Server-side notifications | Not Implemented | Navbar notification UI is presentation/placeholder level |

---

## 5. Feature Summary

### Login

| | |
| --- | --- |
| **Purpose** | Gate entry to protected module pages for local UI flow |
| **Major UI features** | Email/password form, remember me, forgot-password placeholder, demo credential notice, validation and toast feedback |
| **Current frontend behavior** | Demo credentials create `himsFleetSession`; redirect to dashboard; reverse-redirect if already “signed in” |
| **Future backend responsibility** | Laravel authentication (e.g. Breeze), secure cookies/sessions, server validation |

### Dashboard

| | |
| --- | --- |
| **Purpose** | Operational overview of fleet activity |
| **Major UI features** | KPI cards, banners, charts/placeholders, navigation shortcuts into modules |
| **Current frontend behavior** | Presentation and navigation; sample/static metrics where no live API exists |
| **Future backend responsibility** | Aggregated live metrics and activity feeds from the database |

### Vehicles (`fleet/`)

| | |
| --- | --- |
| **Purpose** | Manage hospital fleet inventory |
| **Major UI features** | Table list, search/filter/sort/pagination, add/view/edit/delete modals, bulk actions, export/print, image placeholder |
| **Current frontend behavior** | Full CRUD UX on frontend data model |
| **Future backend responsibility** | Vehicle entity CRUD API, validation, attachments, authorization |

### Reservations

| | |
| --- | --- |
| **Purpose** | Manage vehicle reservation requests |
| **Major UI features** | List tools, filters, modals, bulk actions, export |
| **Current frontend behavior** | Full reservation CRUD UX on frontend |
| **Future backend responsibility** | Reservation lifecycle, conflicts, approvals, links to vehicles/drivers |

### Dispatch

| | |
| --- | --- |
| **Purpose** | Coordinate assigned trips / dispatches |
| **Major UI features** | Status and priority filters, CRUD modals, bulk tools, export |
| **Current frontend behavior** | Full dispatch CRUD UX on frontend |
| **Future backend responsibility** | Dispatch assignment rules, status transitions, audit history |

### Drivers

| | |
| --- | --- |
| **Purpose** | Maintain driver roster for fleet operations |
| **Major UI features** | List tools, search/filter, CRUD modals, export |
| **Current frontend behavior** | Full driver CRUD UX on frontend |
| **Future backend responsibility** | Driver records, license fields, availability, links to trips |

### Maintenance

| | |
| --- | --- |
| **Purpose** | Track vehicle maintenance work |
| **Major UI features** | List tools, CRUD modals, statistics, export |
| **Current frontend behavior** | Full maintenance CRUD UX on frontend |
| **Future backend responsibility** | Work orders, costs, schedules, vehicle linkage |

### Fuel Management

| | |
| --- | --- |
| **Purpose** | Log and review fuel consumption and cost |
| **Major UI features** | List tools, CRUD modals, statistics, export |
| **Current frontend behavior** | Full fuel CRUD UX on frontend |
| **Future backend responsibility** | Fuel transactions, cost aggregation, vehicle linkage |

### Route Planning

| | |
| --- | --- |
| **Purpose** | Plan and manage operational routes |
| **Major UI features** | Route UI, templates, pipeline/export tooling as implemented |
| **Current frontend behavior** | Client-side route/template persistence where coded |
| **Future backend responsibility** | Route entities, optimization inputs/outputs, shared templates |

### Cost Analysis

| | |
| --- | --- |
| **Purpose** | Analyze operating cost across fleet activity |
| **Major UI features** | Filters, charts, tables, budgets, presets, export |
| **Current frontend behavior** | Frontend aggregation from available local/sample sources |
| **Future backend responsibility** | Authoritative cost queries and budgets |

### Reports & Analytics

| | |
| --- | --- |
| **Purpose** | Management reporting across fleet domains |
| **Major UI features** | Multi-view charts/tables, presets, export |
| **Current frontend behavior** | Client charts and sample/storage-backed datasets |
| **Future backend responsibility** | Server report queries and export payloads |

### Profile

| | |
| --- | --- |
| **Purpose** | Display and edit operator profile presentation |
| **Major UI features** | Profile form/overview, sync with shell identity UI |
| **Current frontend behavior** | Client profile storage (`himsFleetUserProfile`) |
| **Future backend responsibility** | Authenticated user profile from Laravel user model |

### Settings

| | |
| --- | --- |
| **Purpose** | Fleet unit preferences and operational toggles |
| **Major UI features** | Multi-section settings form, import/export settings, appearance linkage |
| **Current frontend behavior** | Client settings storage (`himsFleetSettings`); theme via shared key |
| **Future backend responsibility** | Persisted tenant/unit settings and policy defaults |

### Theme & Shared Shell

| | |
| --- | --- |
| **Purpose** | Consistent hospital-grade UI chrome |
| **Major UI features** | Sidebar, navbar, toast, appearance submenu, light/dark/system |
| **Current frontend behavior** | Centralized theme boot and shell includes |
| **Future backend responsibility** | Optional server preference sync; UI remains frontend-owned |

---

## 6. Project Scope

### Included (this repository)

- Fleet operations UI for the modules listed above
- Vehicle, reservation, dispatch, driver, maintenance, and fuel management interfaces
- Route planning, cost analysis, and reports presentation
- Dashboard overview presentation
- Login and frontend session simulation
- Theme system (light / dark / system)
- Shared components (sidebar, navbar, toast, modals)
- Responsive layout and design-system CSS
- Client export helpers where modules include Excel/PDF/print tooling
- Frozen folder structure and developer documentation baseline

### Not included (this repository)

- Real authentication or password security
- Server sessions, CSRF, or authorization policies
- Database persistence
- REST/API or web controllers
- Real-time GPS / vehicle telemetry
- Production notification delivery
- Server-side report generation
- Multi-tenant hospital administration beyond UI presentation
- Laravel Blade conversion of all pages

### Future work

- Laravel application setup
- MySQL schema and migrations
- Authentication (e.g. Laravel Breeze or approved alternative)
- Role permissions and policies
- Module APIs and validation
- Audit logging
- File/image storage
- Live dashboard and report queries
- Real notifications/messages backend
- Controlled Blade/Vite adoption if approved under structure change control

---

## 7. Technology Summary

Only technologies verified in the repository are listed.

### Frontend (current)

| Technology | Usage |
| ---------- | ----- |
| HTML5 | Page structure and component fragments |
| CSS3 | Design system under `assets/css/` |
| Bootstrap 5.3.7 (CDN) | Layout utilities / bundle where referenced |
| Vanilla JavaScript (ES6) | Application logic under `assets/js/` |
| Phosphor Icons (CDN) | UI icons |
| Custom chart rendering | Reports and cost-analysis chart scripts (not a separate Chart.js dependency in-repo) |
| SheetJS / xlsx (CDN) | Excel export on modules that include it |
| jsPDF + autotable (CDN) | PDF export on modules that include it |

### Future backend (intended; not present in this repository)

| Technology | Role |
| ---------- | ---- |
| Laravel | Application framework, auth, validation, controllers |
| MySQL | Primary relational datastore |

There is no `package.json`, Composer project, or Vite/Webpack app config in this frontend repository.

---

## 8. Current Architecture

The frontend is **self-contained**.

| Concern | Current approach |
| ------- | ---------------- |
| Presentation | HTML pages + shared components + CSS design system |
| Business logic | Module JS under `assets/js/<module>/`; simulated where no API exists |
| Shared UI | `components/` fragments loaded via `include.js` |
| Theme | Centralized early boot (`theme-boot.js`) + shell controls |
| Authentication | Simulated session API (`assets/js/core/auth.js`) |
| Persistence | Browser storage for selected features; in-page/demo data for many CRUD UIs; sample datasets for some analytics |
| Navigation | Canonical module folders; sidebar/profile routes |

**Integration principle.** Laravel should replace **data**, **authentication**, and **authorization** layers while preserving the frozen presentation architecture unless a formal Breaking or Integrative change is approved.

See [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md) for path ownership and [docs/00-START-HERE.md](./00-START-HERE.md) for integration seams and order.

---

## 9. Project Status

| Workstream | Status |
| ---------- | ------ |
| Repository cleanup | Completed |
| Folder structure freeze (v1.0) | Completed |
| Developer start document | Completed (`docs/00-START-HERE.md`) |
| Project overview document | Completed (this file) |
| Additional technical documentation | In progress / planned (see Section 13) |
| Frontend module UI | Completed for listed modules |
| Frontend testing | Suitable for local UI verification; not a substitute for backend QA |
| Laravel integration | Pending |
| Backend / database | Not started in this repository |
| Production deployment | Pending backend and environment readiness |

---

## 10. Development Principles

| Principle | Meaning for this module |
| --------- | ----------------------- |
| Single responsibility | Prefer one clear job per file/module script |
| Reusable components | Shared shell and modal fragments stay in `components/` |
| Shared styling | Design system via `assets/css/style.css` imports |
| Centralized theme | One theme key and boot path |
| Centralized authentication API | One session utility for UI flow (`auth.js`) |
| Module isolation | Domain logic stays under `assets/js/<module>/` |
| Incremental integration | Connect one backend domain at a time |
| Documentation first | Update docs when architecture or contracts change |
| Frozen frontend architecture | No casual renames, moves, or parallel trees |

---

## 11. Known Limitations

Verified limitations of the current repository:

| Limitation | Detail |
| ---------- | ------ |
| Frontend authentication only | Demo credentials and `himsFleetSession`; not secure |
| No real backend | No Laravel app, no MySQL, no API in this repo |
| No database persistence | Operational data is not server-authoritative |
| Mock / sample / local data | Analytics and some modules use samples or browser storage |
| Static or sample dashboard metrics | Not guaranteed live aggregates |
| No role authorization | UI does not enforce multi-role permissions |
| Placeholder notifications / messages | Navbar surfaces are not a full messaging backend |
| No real-time GPS | Not implemented |
| Client-only route guards | Useful for UX; not a security boundary |
| README status tables may lag | Prefer freeze and start-here docs for current truth |

Detailed storage keys and integration rules are listed in [docs/00-START-HERE.md](./00-START-HERE.md).

---

## 12. Project Success Criteria

The overall module (frontend + backend) can be considered complete for production use when all of the following are true:

| Criterion | Description |
| --------- | ----------- |
| Laravel authentication | Secure login/logout and session handling |
| Database integration | Entities persisted in MySQL (or approved store) |
| CRUD connected | Vehicles, drivers, reservations, dispatch, maintenance, fuel (and related) use APIs |
| Reports connected | Report views use server queries |
| Dashboard live data | KPIs reflect backend aggregates |
| Validation | Server-side rules are authoritative |
| Authorization | Roles/policies enforce access |
| UI contracts preserved | Frozen structure and design system remain stable |
| Responsive & accessible presentation | Existing frontend quality maintained |
| Testing | Regression coverage for routes and critical flows |
| Deployment | Staging/production environments configured |

Until those backend criteria are met, the repository remains a **complete frontend reference presentation layer**, not a fully production-secured hospital system.

---

## 13. Related Documentation

### Existing

| Document | Purpose |
| -------- | ------- |
| [docs/00-START-HERE.md](./00-START-HERE.md) | Developer handover entry; run steps; integration seams |
| [docs/01-PROJECT-OVERVIEW.md](./01-PROJECT-OVERVIEW.md) | This project overview |
| [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md) | Frozen structure, ownership, change control |
| [docs/design-system.md](./design-system.md) | UI design system notes |
| [README.md](../README.md) | High-level repository intro (may lag detailed status) |

### Planned (not created in this task)

| Planned document | Purpose |
| ---------------- | ------- |
| `docs/02-TECH-STACK.md` | Detailed technology inventory |
| `docs/04-PROJECT-ARCHITECTURE.md` | End-to-end architecture |
| `docs/07-JAVASCRIPT-ARCHITECTURE.md` | JS module conventions |
| `docs/08-ROUTING.md` | Frontend routes and future Laravel mapping |
| `docs/09-AUTHENTICATION.md` | Auth design and Breeze replacement plan |
| `docs/11-MODULES.md` | Per-module deep dives |
| `docs/12-BACKEND-INTEGRATION.md` | Integration playbook |
| `docs/13-DATABASE-MAPPING.md` | Entity / table mapping |
| `docs/14-API-CONTRACT.md` | Endpoint contracts |
| `docs/15-LOCAL-STORAGE.md` | Browser key inventory and migration |
| `docs/18-KNOWN-LIMITATIONS.md` | Expanded limitations register |
| `docs/20-HANDOVER-CHECKLIST.md` | Sign-off checklist |

---

## 14. Final Recommendation

The frontend implementation should be considered the **reference presentation layer** for this module.

Laravel integration should **extend** the existing architecture rather than replace it.

Integrate one module at a time, preserve the frozen frontend structure, and update the documentation whenever an approved architectural change is introduced.

Do not redesign the UI or rename production paths (including the `fleet/` page vs `vehicle/` script pairing) without formal change control.

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `docs/01-PROJECT-OVERVIEW.md` |
| Type | Project overview |
| Production code changes | None |
| Depends on | Structure freeze 1.0, developer start document |
