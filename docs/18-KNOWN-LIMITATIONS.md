# Known Limitations

## Fleet & Transportation Management System

**Hospital Information Management System (HIMS)**  
Developer Documentation

---

## 1. Overview

**Purpose of this document**

This file lists what the Fleet frontend **can and cannot do today**. It helps students, advisers, and future maintainers set correct expectations before Laravel work begins.

**Why document limitations?**

- Avoids claiming features that are only UI demos.  
- Guides backend planning (what must be built next).  
- Helps QA write the right tests for each phase.  
- Makes the capstone status honest and clear.

**Current vs future**

| Phase | Meaning |
| ----- | ------- |
| **Current** | Frontend screens, design system, demo data, simulated login |
| **Future** | Laravel, MySQL, real auth, live data, roles, deployment on HostForge |

Limitations here are **expected** for a frontend-first build. They are not always “bugs.”

---

## 2. Current Project Scope

| Area | Status |
| ---- | ------ |
| Frontend interface | **Completed** — pages, components, modules, theme, navigation |
| Folder structure | **Frozen** (see structure documentation) |
| Developer documentation | In progress / largely available under `docs/` |
| Backend (Laravel) | **Not in this repository** — planned next |
| Database (MySQL) | **Not connected** — planned with Laravel |
| Production deployment | **Pending** backend readiness and HostForge setup |

The system is ready as a **presentation layer**. It is not yet a full production hospital backend system.

---

## 3. Current Limitations

Only limitations verified against this repository are listed.

### 3.1 Data and persistence

| Limitation | Detail |
| ---------- | ------ |
| No database connection | Browser does not talk to MySQL |
| Sample / static data | Many tables and dashboard KPIs use demo or hard-coded sample content |
| Client-side storage only for some features | Keys such as `himsFleetSession`, `himsFleetTheme`, `himsFleetSettings`, routes, budgets, presets (see local storage guide) |
| Optional localStorage operational keys | Reports/cost/navbar may read keys like `himsFleetVehicles` if present; not a full DB |
| Dashboard metrics not live | Overview numbers and some charts are sample or static presentation |
| Cost Analysis / Reports | Built on samples and/or browser data, not server queries |

### 3.2 Authentication and security

| Limitation | Detail |
| ---------- | ------ |
| No real authentication | Demo login only (`auth.js` session simulation) |
| Not secure for production | Demo credentials exist in frontend code/UI for local testing |
| Client-only route guards | `auth-boot.js` / `requireAuth()` are UX redirects, not server security |
| No role-based authorization | UI does not enforce multi-role permissions |
| Password recovery | “Forgot password” is a placeholder message only |
| CSRF / password hashing | Not applicable on frontend-only demo auth |

### 3.3 Backend and API

| Limitation | Detail |
| ---------- | ------ |
| No Laravel application in this repo | No controllers, models, or routes here |
| No API integration | Module JS does not call a production backend |
| No server validation | Only client-side form checks |
| No server-side business rules | Approvals, conflicts, and policies are not enforced on a server |

### 3.4 Module-specific gaps

| Area | Limitation |
| ---- | ---------- |
| Route Planning | Map is a **visual placeholder**; Google Maps (or similar) is **not** integrated |
| Notifications / Messages | Navbar buttons are presentation; no full messaging backend |
| Help Center | Profile menu help is not a connected help system |
| Settings “Clear Demo Data” | UI notes limitations around operational demo data |
| Settings theme form | Light/Dark radios; **System** is available in profile Appearance menu, not fully in Settings form |
| Exports | Excel/PDF often generated **in the browser** (CDN libraries), not on a report server |
| File storage | Uploads are not backed by Laravel storage yet |

### 3.5 Runtime and tooling

| Limitation | Detail |
| ---------- | ------ |
| Requires HTTP server | `include.js` uses `fetch` for components; `file://` often breaks shell loading |
| No npm app toolchain | No `package.json` build pipeline in this frontend starter |
| CDN dependence | Bootstrap, Phosphor, fonts, xlsx/jsPDF need network (or cache) in typical use |

---

## 4. Future Improvements

These match the project’s planned direction (documented across the `docs/` set). They are **not** implemented as backend features in this repository.

| Planned improvement | Goal |
| ------------------- | ---- |
| Laravel backend | Real server application |
| MySQL database | Durable operational records |
| Laravel Breeze (session auth) | Secure login, logout, sessions |
| Role-based permissions | Align with User Role Matrix (planned doc) |
| Module CRUD via server | Vehicles, drivers, reservations, dispatch, etc. |
| Live dashboard statistics | Real aggregates from DB |
| Live reports & cost analysis | Server queries; optional server PDF/Excel later |
| Notifications | Real notification data when designed |
| Map integration | Google Maps (or approved provider) after backend phase |
| HostForge deployment | School production environment under Fleet subdomain |
| Optional Main HIMS auth later | Only after an approved central strategy (not SSO design now) |

---

## 5. Deployment Limitations

| Environment | Current reality |
| ----------- | --------------- |
| Local development | Frontend can run on a simple HTTP server; full stack later with Laragon + Laravel + MySQL |
| Production | Planned on **school-provided HostForge** |
| Fleet hosting shape | Planned Fleet subdomain (exact hostname from school/HostForge) |
| When to deploy full system | After backend integration and testing—not frontend-demo-only as “production secure” |

Until Laravel auth and database are live, do not treat the static demo as a secure hospital production system.

---

## 6. Testing Considerations

### What is realistic to test now (frontend)

| Focus | Examples |
| ----- | -------- |
| Layout and design system | Cards, tables, forms, theme light/dark/system |
| Navigation | Sidebar routes, profile menu, root redirect |
| UI flows | Open modals, filters, pagination, export menus |
| Responsive behavior | Desktop collapse, tablet off-canvas sidebar, mobile |
| Frontend session UX | Demo login, logout, protected page redirect |
| Accessibility basics | Labels, focus, visible errors (ongoing QA) |

### What must be tested after backend integration

| Focus | Examples |
| ----- | -------- |
| Authentication | Real login/logout, session expiry |
| Database | Data survives refresh and multi-user use |
| CRUD | Create/update/delete actually persist |
| API / web requests | Success, validation errors, 401/403/500 |
| Authorization | Roles cannot access forbidden actions |
| Reports | Numbers match database |
| Deployment | HTTPS, cookies, HostForge environment |

---

## 7. Best Practices

1. **Document new limitations** when you discover a real gap.  
2. **Update this file** after major frontend or backend milestones.  
3. **Do not remove a limitation** until the feature is verified working.  
4. **Review this list before deployment** so claims match reality.  
5. **Separate bugs from scope limits** — missing backend is a phase limit, not always a coding error.  
6. **Be honest in demos and reports** — say “frontend complete; backend pending.”  
7. **Prioritize auth + core tables** before advanced analytics polish.  
8. **Keep UI stable** while replacing data sources underneath.

---

## 8. Related Documentation

| Document | Why it helps |
| -------- | ------------ |
| [docs/00-START-HERE.md](./00-START-HERE.md) | Project entry and status |
| [docs/01-PROJECT-OVERVIEW.md](./01-PROJECT-OVERVIEW.md) | Scope and objectives |
| [docs/09-AUTHENTICATION.md](./09-AUTHENTICATION.md) | Demo vs real auth |
| [docs/11-MODULES.md](./11-MODULES.md) | Module capabilities |
| [docs/12-BACKEND-INTEGRATION.md](./12-BACKEND-INTEGRATION.md) | How Laravel will connect |
| [docs/13-DATABASE-MAPPING.md](./13-DATABASE-MAPPING.md) | Future tables |
| [docs/14-API-CONTRACT.md](./14-API-CONTRACT.md) | Frontend–backend communication |
| [docs/15-LOCAL-STORAGE.md](./15-LOCAL-STORAGE.md) | Browser storage limits |
| [docs/18-KNOWN-LIMITATIONS.md](./18-KNOWN-LIMITATIONS.md) | This document |
| `docs/21-ROLE-MATRIX.md` | Planned role permissions |

---

## 9. Conclusion

These limitations are **normal** for a frontend-first Fleet module. The interface, navigation, and design system are in place so backend work can focus on Laravel, MySQL, security, and live data.

As authentication, database tables, and APIs are completed, items on this list should move from “limitation” to “resolved”—and this document should be updated to match.

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `docs/18-KNOWN-LIMITATIONS.md` |
| Type | Known limitations register |
| Production code changes | None |
| Backend in this repo | Not present |
| Real auth / DB / API | Not present |
