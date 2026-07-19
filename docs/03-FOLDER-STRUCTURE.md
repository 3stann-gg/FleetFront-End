# HIMS Fleet Frontend Folder Structure

**Structure freeze version:** 1.0  
**Freeze date:** 2026-07-19  
**Project name:** HIMS Fleet & Transportation Management Frontend  
**Repository:** Fleet-Transportation-Frontend-Starter  

---

## FRONTEND STRUCTURE FREEZE

The folder structure documented here is the approved frontend architecture baseline after repository cleanup.

Do not rename, move, merge, or delete existing production files during Laravel integration without:

1. identifying every active reference,
2. updating all affected paths,
3. testing every module,
4. documenting the change,
5. receiving approval from the project maintainer.

Laravel integration must adapt to the frozen frontend structure unless a justified migration is formally approved.

---

## 1. Scope

This document freezes the **current cleaned frontend repository structure**.

It is the official architecture baseline for:

- Laravel backend developers
- frontend maintainers
- QA testers
- capstone documentation
- deployment and integration work

This freeze does **not**:

- redesign the UI
- reorganize production files
- introduce Laravel/Blade
- change routes, storage keys, authentication, or theme behavior

It documents the **actual** structure present after cleanup, not a speculative target architecture.

---

## 2. Exact cleaned repository tree

Inventory generated from the live repository after cleanup.  
Excluded from architecture tree: `.git`, `node_modules`, temporary editor caches, OS junk files, generated artifacts.

```text
Fleet-Transportation-Frontend-Starter/
|-- .vscode/
|   +-- settings.json
|-- assets/
|   |-- css/
|   |   |-- base/
|   |   |   |-- layout.css
|   |   |   |-- motion.css
|   |   |   |-- reset.css
|   |   |   |-- responsive.css
|   |   |   |-- typography.css
|   |   |   |-- utilities.css
|   |   |   +-- variables.css
|   |   |-- components/
|   |   |   |-- badges.css
|   |   |   |-- buttons.css
|   |   |   |-- cards.css
|   |   |   |-- dropdown.css
|   |   |   |-- forms.css
|   |   |   |-- modal.css
|   |   |   |-- navbar.css
|   |   |   |-- pagination.css
|   |   |   |-- search.css
|   |   |   |-- sidebar.css
|   |   |   |-- skeleton.css
|   |   |   |-- tables.css
|   |   |   |-- toast.css
|   |   |   +-- toolbar.css
|   |   |-- pages/
|   |   |   |-- cost-analysis.css
|   |   |   |-- dashboard.css
|   |   |   |-- driver.css
|   |   |   |-- fuel.css
|   |   |   |-- login.css
|   |   |   |-- maintenance.css
|   |   |   |-- profile.css
|   |   |   |-- reports.css
|   |   |   |-- reservation.css
|   |   |   |-- route-planning.css
|   |   |   |-- settings.css
|   |   |   +-- vehicle.css
|   |   +-- style.css
|   |-- images/
|   |   |-- brand/
|   |   |   |-- favicon.svg
|   |   |   |-- hims-fleet-logo.svg
|   |   |   +-- hims-fleet-mark.svg
|   |   +-- vehicle-placeholder.svg
|   +-- js/
|       |-- auth/
|       |   +-- login.js
|       |-- components/
|       |   |-- dropdown.js
|       |   +-- navbar.js
|       |-- core/
|       |   |-- auth.js
|       |   |-- auth-boot.js
|       |   |-- include.js
|       |   |-- main.js
|       |   |-- pending-action.js
|       |   |-- theme-boot.js
|       |   |-- toast.js
|       |   +-- user-profile.js
|       |-- cost-analysis/
|       |   |-- cost-budget.js
|       |   |-- cost-charts.js
|       |   |-- cost-data.js
|       |   |-- cost-export.js
|       |   |-- cost-init.js
|       |   |-- cost-pipeline.js
|       |   |-- cost-presets.js
|       |   +-- cost-table.js
|       |-- dashboard/
|       |   +-- dashboard.js
|       |-- dispatch/
|       |   |-- dispatch-add.js
|       |   |-- dispatch-bulk.js
|       |   |-- dispatch-delete.js
|       |   |-- dispatch-edit.js
|       |   |-- dispatch-export.js
|       |   |-- dispatch-filter.js
|       |   |-- dispatch-modal.js
|       |   |-- dispatch-pagination.js
|       |   |-- dispatch-print.js
|       |   |-- dispatch-sort.js
|       |   |-- dispatch-stats.js
|       |   +-- dispatch-view.js
|       |-- driver/
|       |   |-- driver.js
|       |   |-- driver-add.js
|       |   |-- driver-bulk.js
|       |   |-- driver-delete.js
|       |   |-- driver-edit.js
|       |   |-- driver-export.js
|       |   |-- driver-filter.js
|       |   |-- driver-pagination.js
|       |   |-- driver-print.js
|       |   |-- driver-search.js
|       |   |-- driver-sort.js
|       |   |-- driver-stats.js
|       |   +-- driver-view.js
|       |-- fuel/
|       |   |-- fuel-add.js
|       |   |-- fuel-bulk.js
|       |   |-- fuel-delete.js
|       |   |-- fuel-edit.js
|       |   |-- fuel-export.js
|       |   |-- fuel-modal.js
|       |   |-- fuel-pagination.js
|       |   |-- fuel-print.js
|       |   |-- fuel-search.js
|       |   |-- fuel-sort.js
|       |   |-- fuel-statistics.js
|       |   +-- fuel-view.js
|       |-- maintenance/
|       |   |-- maintenance-add.js
|       |   |-- maintenance-bulk.js
|       |   |-- maintenance-delete.js
|       |   |-- maintenance-edit.js
|       |   |-- maintenance-export.js
|       |   |-- maintenance-modal.js
|       |   |-- maintenance-pagination.js
|       |   |-- maintenance-print.js
|       |   |-- maintenance-search.js
|       |   |-- maintenance-sort.js
|       |   |-- maintenance-statistics.js
|       |   +-- maintenance-view.js
|       |-- profile/
|       |   +-- profile-page.js
|       |-- reports/
|       |   |-- reports.js
|       |   |-- reports-charts.js
|       |   |-- reports-data.js
|       |   |-- reports-export.js
|       |   |-- reports-pipeline.js
|       |   |-- reports-presets.js
|       |   +-- reports-table.js
|       |-- reservation/
|       |   |-- reservation-add.js
|       |   |-- reservation-bulk.js
|       |   |-- reservation-delete.js
|       |   |-- reservation-edit.js
|       |   |-- reservation-export.js
|       |   |-- reservation-filter.js
|       |   |-- reservation-modal.js
|       |   |-- reservation-pagination.js
|       |   |-- reservation-print.js
|       |   |-- reservation-sort.js
|       |   |-- reservation-stats.js
|       |   +-- reservation-view.js
|       |-- route-planning/
|       |   |-- route-export.js
|       |   |-- route-modal.js
|       |   |-- route-pipeline.js
|       |   |-- route-store.js
|       |   +-- route-templates.js
|       |-- settings/
|       |   |-- settings.js
|       |   +-- settings-store.js
|       +-- vehicle/
|           |-- vehicle-add.js
|           |-- vehicle-bulk.js
|           |-- vehicle-delete.js
|           |-- vehicle-edit.js
|           |-- vehicle-export.js
|           |-- vehicle-filters.js
|           |-- vehicle-form.js
|           |-- vehicle-image.js
|           |-- vehicle-modal.js
|           |-- vehicle-pagination.js
|           |-- vehicle-print.js
|           |-- vehicle-sort.js
|           |-- vehicle-stats.js
|           +-- vehicle-view.js
|-- components/
|   |-- dispatch/
|   |   |-- add-dispatch-modal.html
|   |   |-- delete-dispatch-modal.html
|   |   |-- edit-dispatch-modal.html
|   |   +-- view-dispatch-modal.html
|   |-- driver/
|   |   |-- add-driver-modal.html
|   |   |-- delete-driver-modal.html
|   |   |-- edit-driver-modal.html
|   |   +-- view-driver-modal.html
|   |-- fuel/
|   |   |-- add-fuel-modal.html
|   |   |-- delete-fuel-modal.html
|   |   |-- edit-fuel-modal.html
|   |   +-- view-fuel-modal.html
|   |-- maintenance/
|   |   |-- add-maintenance-modal.html
|   |   |-- delete-maintenance-modal.html
|   |   |-- edit-maintenance-modal.html
|   |   +-- view-maintenance-modal.html
|   |-- reservation/
|   |   |-- add-reservation-modal.html
|   |   |-- delete-reservation-modal.html
|   |   |-- edit-reservation-modal.html
|   |   +-- view-reservation-modal.html
|   |-- shared/
|   |   |-- navbar.html
|   |   |-- sidebar.html
|   |   +-- toast.html
|   +-- vehicle/
|       |-- add-vehicle-modal.html
|       |-- delete-vehicle-modal.html
|       |-- edit-vehicle-modal.html
|       +-- view-vehicle-modal.html
|-- cost-analysis/
|   +-- index.html
|-- dashboard/
|   +-- index.html
|-- dispatch/
|   +-- index.html
|-- docs/
|   |-- 03-FOLDER-STRUCTURE.md
|   +-- design-system.md
|-- driver/
|   +-- index.html
|-- fleet/
|   +-- index.html
|-- fuel/
|   +-- index.html
|-- login/
|   +-- index.html
|-- maintenance/
|   +-- index.html
|-- profile/
|   +-- index.html
|-- reports/
|   +-- index.html
|-- reservation/
|   +-- index.html
|-- route-planning/
|   +-- index.html
|-- settings/
|   +-- index.html
|-- .gitignore
|-- index.html
+-- README.md
```

**Inventory summary (freeze baseline):**

| Category | Count (approx.) |
| -------- | --------------- |
| Production folders | 48 |
| Production files | ~192 (+ this document) |
| HTML pages + fragments | 41 |
| CSS files | 34 |
| JavaScript files | 110 |
| SVG assets | 4 |

---

## 3. Major folder responsibilities

### Root

| Path | Responsibility |
| ---- | -------------- |
| `index.html` | Application entry. Auth-aware redirect to login or dashboard. |
| `README.md` | Project overview and high-level structure. |
| `.gitignore` | Git ignore rules. |
| `.vscode/` | Editor workspace settings only (not runtime). |
| `docs/` | Developer documentation only. |

### Module page folders

Each business module owns one canonical HTML entry: `<module>/index.html`.

| Folder | Module / screen | Notes |
| ------ | --------------- | ----- |
| `login/` | Sign-in (no app shell) | Standalone auth page |
| `dashboard/` | Fleet Dashboard | Protected |
| `fleet/` | Vehicles | HTML route is `fleet/`; JS/CSS use `vehicle` naming |
| `reservation/` | Reservations | Protected |
| `dispatch/` | Dispatch | Protected |
| `driver/` | Drivers | Protected |
| `maintenance/` | Maintenance | Protected |
| `fuel/` | Fuel Management | Protected |
| `route-planning/` | Route Planning | Protected |
| `cost-analysis/` | Cost Analysis | Protected |
| `reports/` | Reports & Analytics | Protected |
| `settings/` | Fleet Settings | Protected |
| `profile/` | User Profile | Protected |

### `assets/`

Runtime frontend assets: CSS design system, JavaScript, and images.

### `assets/css/`

| Path | Responsibility |
| ---- | -------------- |
| `style.css` | Single entry stylesheet. Imports base, components, pages, then responsive. |
| `base/` | Foundations: tokens, reset, typography, utilities, layout, motion, responsive. |
| `components/` | Reusable shared UI styles (sidebar, navbar, forms, tables, modals, etc.). |
| `pages/` | Module- or page-specific styles only. |

### `assets/js/`

| Path | Responsibility |
| ---- | -------------- |
| `core/` | Shared app bootstrap, shell, auth session API, theme boot, toast, includes. |
| `components/` | Reusable component behavior (`dropdown.js`, `navbar.js`). |
| `auth/` | Login page controller only. |
| `<module>/` | Module-specific logic (CRUD, filters, export, stats, modals). |

### `assets/images/`

| Path | Responsibility |
| ---- | -------------- |
| `brand/` | Production branding (favicon, logo, mark). |
| `vehicle-placeholder.svg` | Shared vehicle image placeholder. |

Icons are loaded from the Phosphor Icons CDN in page HTML (no local `assets/icons/` tree in this freeze).

### `components/`

HTML fragments loaded by `include.js` (or module loaders). Paths are relative to the **host page** (module folders), not relative to the component file location.

| Path | Responsibility |
| ---- | -------------- |
| `shared/` | App shell fragments: sidebar, navbar, toast host markup. |
| `vehicle/`, `reservation/`, `dispatch/`, `driver/`, `maintenance/`, `fuel/` | Module modal fragments (add / edit / view / delete). |

### `docs/`

Technical documentation only. Not loaded by the application runtime.

---

## 4. Important root files

| File | Purpose |
| ---- | ------- |
| `index.html` | Root entry. Checks `himsFleetSession` and redirects to `./login/index.html` or `./dashboard/index.html`. |
| `README.md` | Human-readable project intro and structure summary. Must be updated when approved structural changes occur. |
| `.gitignore` | Keeps non-production artifacts out of version control. |

---

## 5. CSS organization rules

### Canonical entry

All pages load:

```html
<link rel="stylesheet" href="../assets/css/style.css" />
```

(`login/` uses the same relative path pattern.)

`style.css` import order:

1. `base/*` foundations  
2. `components/*` shared UI  
3. `pages/*` page-specific  
4. `base/responsive.css` last for responsive overrides  

### Placement rules

| Kind of style | Location |
| ------------- | -------- |
| Design tokens, reset, typography, utilities, layout, motion | `assets/css/base/` |
| Shared button, card, form, table, modal, toast, dropdown, sidebar, navbar, etc. | `assets/css/components/` |
| Styles used by only one module/page | `assets/css/pages/` |
| Do not | Duplicate component systems or add undocumented inline CSS |

### Naming note (accepted)

- Vehicles page CSS: `assets/css/pages/vehicle.css`  
- Vehicles page HTML: `fleet/index.html`  

This HTML/CSS naming split is intentional in the frozen structure.

---

## 6. JavaScript organization rules

### Core (`assets/js/core/`)

| File | Responsibility |
| ---- | -------------- |
| `theme-boot.js` | Early theme application before paint (`himsFleetTheme`). |
| `auth-boot.js` | Early frontend session gate (redirect unauthenticated users; reverse-redirect login). |
| `auth.js` | Session API: `isAuthenticated`, `login`, `logout`, `requireAuth`, `getCurrentUser`, `performFleetLogout`. |
| `include.js` | Loads shared shell components and shared scripts; secondary `requireAuth()`. |
| `main.js` | Shell behavior: sidebar, theme controls, profile dropdown, appearance submenu, responsive nav, logout wiring. |
| `toast.js` | Toast notifications. |
| `pending-action.js` | Cross-page pending action helper. |
| `user-profile.js` | Frontend profile display sync. |

### Components (`assets/js/components/`)

| File | Responsibility |
| ---- | -------------- |
| `dropdown.js` | Shared dropdown behavior used by list/export UIs. |
| `navbar.js` | Navbar interactions (search, notifications/messages UI). |

### Auth page (`assets/js/auth/`)

| File | Responsibility |
| ---- | -------------- |
| `login.js` | Login form validation, submit, demo credential handling, redirect. |

### Modules (`assets/js/<module>/`)

Module folders own CRUD, filters, sort, pagination, export/print, stats, and modal controllers for that domain only.

| JS folder | Paired page folder |
| --------- | ------------------ |
| `dashboard/` | `dashboard/` |
| `vehicle/` | `fleet/` |
| `reservation/` | `reservation/` |
| `dispatch/` | `dispatch/` |
| `driver/` | `driver/` |
| `maintenance/` | `maintenance/` |
| `fuel/` | `fuel/` |
| `route-planning/` | `route-planning/` |
| `cost-analysis/` | `cost-analysis/` |
| `reports/` | `reports/` |
| `settings/` | `settings/` |
| `profile/` | `profile/` |

### Rules

- Shared utilities stay in `core/` or existing shared component scripts.
- Module CRUD stays in the module folder.
- Do not duplicate auth, theme, toast, storage helpers, export, modal, or shell utilities.
- One file → one clear responsibility.
- Never create versioned duplicates (`*-new.js`, `*-final.js`, `*-v2.js`, `*-backup.js`).

---

## 7. Component organization rules

### Shared shell

Loaded into host markers (`#sidebar`, `#navbar`, `#toast`) by `include.js`:

- `components/shared/sidebar.html`
- `components/shared/navbar.html`
- `components/shared/toast.html`

### Module modals

Loaded by module pages / include hooks as needed:

- `components/<domain>/add-*-modal.html`
- `components/<domain>/edit-*-modal.html`
- `components/<domain>/view-*-modal.html`
- `components/<domain>/delete-*-modal.html`

Domains present: `vehicle`, `reservation`, `dispatch`, `driver`, `maintenance`, `fuel`.

### Rules

- Shared markup belongs in `components/`.
- Do not copy sidebar/navbar markup into every page.
- Do not create duplicate production modal variants without retiring the previous one through change control.
- Component-relative asset paths must resolve when the fragment is injected into a module page (paths written as `../assets/...` from page context).

---

## 8. Page and route organization

### Canonical routes

| Route | Entry file |
| ----- | ---------- |
| `/` | `index.html` → login or dashboard |
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

### Navigation sources

- Sidebar: `components/shared/sidebar.html` (`href="../<module>/index.html"`)
- Profile dropdown: Profile → `../profile/index.html`, Settings → `../settings/index.html`, Logout → session clear + login
- Root: `index.html` auth-aware redirect
- Login success: `../dashboard/index.html`
- Logout: `../login/index.html` (from module context)

### Protected routes

All module pages except `login/` load:

- `../assets/js/core/auth-boot.js` (head, early)
- `../assets/js/core/auth.js` (body scripts)

Unauthenticated access redirects to `../login/index.html`.  
Authenticated visit to login redirects to `../dashboard/index.html`.

---

## 9. Asset organization

| Asset | Location | Usage |
| ----- | -------- | ----- |
| Favicon | `assets/images/brand/favicon.svg` | Linked on all pages |
| Logo / mark SVGs | `assets/images/brand/` | Production branding assets |
| Vehicle placeholder | `assets/images/vehicle-placeholder.svg` | Fleet/vehicle UI |
| Icons | Phosphor CDN in HTML | Not a local folder in this freeze |
| Fonts | Design system / browser stack | No local `assets/fonts/` in this freeze |

### Rules

- Keep only production-used assets.
- Prefer lowercase kebab-case names.
- Do not store screenshots, mockups, backups, or temporary exports under production asset folders.

---

## 10. Authentication file locations

| Concern | File(s) |
| ------- | ------- |
| Early route guard | `assets/js/core/auth-boot.js` |
| Session API / login / logout / requireAuth | `assets/js/core/auth.js` |
| Login page UI logic | `assets/js/auth/login.js` |
| Login page markup | `login/index.html` |
| Login styles | `assets/css/pages/login.css` |
| Logout confirmation + redirect | `assets/js/core/auth.js` → `performFleetLogout()` wired from `main.js` |
| Root redirect | `index.html` |
| Session storage key | `himsFleetSession` |

Frontend session only — not real security. Ready for Laravel Breeze replacement at the session API boundary.

---

## 11. Theme system file locations

| Concern | File(s) |
| ------- | ------- |
| Early theme before paint | `assets/js/core/theme-boot.js` |
| Theme controls (Light / Dark / System) | `assets/js/core/main.js` (`initThemeControls`) |
| Settings appearance UI sync | `assets/js/settings/settings.js` (uses shared theme key) |
| CSS tokens / surfaces | `assets/css/base/variables.css` and component/page styles |
| Storage key | `himsFleetTheme` |

Theme must remain centralized. Do not invent a second theme key.

---

## 12. Laravel integration boundary

### FRONTEND-OWNED (must remain frontend responsibility)

- visual design and design system CSS
- shared components (sidebar, navbar, modals, toast, dropdown)
- responsive layout and motion
- accessibility presentation
- loading / empty / error presentation states
- form error presentation patterns
- modal presentation lifecycle (open → populate → validate → save UX)
- dashboard and module UI structure
- theme presentation (light / dark / system)

### TO BE REPLACED OR CONNECTED BY LARAVEL

Documented replacement points — **do not remove these frontend implementations during the freeze**:

| Frontend implementation | Storage / location | Laravel direction |
| ----------------------- | ------------------ | ----------------- |
| Demo login credentials | `auth.js` / login page | Laravel Breeze / Sanctum session or token auth |
| Frontend session simulation | `himsFleetSession` | Server session / auth middleware |
| Frontend route guards | `auth-boot.js`, `requireAuth()` | Laravel middleware + Blade/API auth |
| Mock CRUD persistence | module JS + localStorage keys | Eloquent models + API/controllers |
| Static dashboard counts | `dashboard.js` / page data | API aggregates |
| Static / client reports | `reports/*` | Server reporting endpoints |
| Placeholder notifications / messages | navbar UI | Real notification channels |
| Simulated profile | `user-profile.js` / profile page | User model + auth user |
| Simulated Fleet settings | `himsFleetSettings` | Settings tables / config |
| Client-only route/cost/report presets | module storage keys | Database-backed preferences |

### Integration principle

Laravel should **adapt to this frozen path layout** first (serve the same static tree or map Blade layouts onto these folders). Path moves require formal change control.

---

## 13. Files that must remain frontend-owned

Do not delete or replace casually:

- entire `assets/css/**` design system
- `components/shared/**` shell
- module page HTML structure
- `theme-boot.js` presentation pipeline (even if preference is server-driven later)
- toast, dropdown, modal presentation layers
- brand SVGs under `assets/images/brand/`

---

## 14. Rules for adding future files

### CSS

- Reusable styles → `assets/css/components/`
- Page-specific styles → `assets/css/pages/`
- Foundations → `assets/css/base/`
- Register new page CSS via `assets/css/style.css` import
- Do not create duplicate button/card/form/table/modal/toast/dropdown systems
- Do not add inline CSS unless strictly required and documented

### JavaScript

- Shared utilities → `assets/js/core/` (or existing shared component scripts)
- Module logic → `assets/js/<module>/`
- Login-only logic → `assets/js/auth/`
- Single responsibility per file
- No versioned duplicate filenames

### HTML

- Shared markup → `components/`
- Business pages → canonical module folders only
- One production page per module route
- Never duplicate sidebar/navbar markup into pages

### Assets

- Production-used only
- Lowercase kebab-case names
- No screenshots/mockups/backups in production asset folders

### Documentation

- Technical docs → `docs/`
- Update this file whenever an approved structural change occurs

---

## 15. Rules for Laravel integration

1. Prefer serving or mounting the frozen frontend tree without path renames.
2. Replace session/auth at `auth.js` / `auth-boot.js` boundaries first.
3. Replace localStorage module keys with API calls inside module JS, keeping UI files stable.
4. Convert to Blade only with an approved Integrative change that maps each frozen route to a view/layout.
5. Keep CSS entry as `assets/css/style.css` unless Vite/Mix asset pipeline is formally introduced and documented.
6. Preserve relative path conventions used by module pages (`../assets/...`, `../components/...`).
7. Do not change public storage key names until migration and dual-read strategy is documented.

---

## 16. Structure change approval process

Any future structural change must be classified as one of:

| Class | Meaning |
| ----- | ------- |
| **Additive** | New file added without moving existing files |
| **Corrective** | Broken path or misplaced production file corrected |
| **Integrative** | Laravel integration requires an approved structural change |
| **Breaking** | Existing path or public frontend contract changes |

### Every approved change must update

1. `docs/03-FOLDER-STRUCTURE.md` (this file)
2. `README.md` when applicable
3. `CHANGELOG.md` when available
4. all affected import and route references
5. integration documentation for the Laravel team

### Required steps before a Breaking or Integrative path change

1. Identify every active reference.
2. Update all affected paths.
3. Test every module listed in the validation checklist.
4. Document the change.
5. Obtain project maintainer approval.

---

## 17. Responsibility validation notes (no reorg)

The following are **accepted conventions** in the freeze, not defects:

| Note | Detail |
| ---- | ------ |
| Vehicles naming split | Page folder `fleet/` vs JS `vehicle/` vs CSS `vehicle.css` |
| Theme logic split | Early boot in `theme-boot.js`; interactive controls in `main.js` |
| Shell JS in `main.js` | Sidebar collapse, profile menu, appearance submenu live in core, not in each module |
| Icons via CDN | No local icons directory in cleaned tree |
| Brand logo files | `hims-fleet-logo.svg` / `hims-fleet-mark.svg` kept as production brand assets; shell currently inlines a brand mark SVG |

No functional defect requiring file moves was found during freeze validation.

---

## 18. Validation checklist (freeze verification)

Validated against the live tree:

| Area | Result |
| ---- | ------ |
| Login / logout / route guard | Paths and scripts present; session key `himsFleetSession` |
| Dashboard and all business modules | Canonical `index.html` present |
| Settings / Profile | Present and linked from sidebar / profile menu |
| Sidebar / navbar / toast includes | `include.js` targets resolve |
| Theme boot + controls | `theme-boot.js` + `main.js` present |
| CSS imports via `style.css` | All imports resolve |
| Module script tags | Relative paths resolve from page folders |
| Sidebar navigation routes | Resolve from module page context |
| Auth-boot + auth.js on protected pages | Present on all module pages + login |
| Production assets (favicon, placeholder) | Present |
| Broken relative production paths | None found |

Feature surfaces covered by structure (not retested as a browser E2E suite in this freeze task): Login, Logout, Route guard, Dashboard, Vehicles, Reservations, Dispatch, Drivers, Maintenance, Fuel, Route Planning, Cost Analysis, Reports, Settings, Profile, Sidebar, Navbar, Search, Filters, Notifications UI, Messages UI, Profile dropdown, Appearance submenu, Light/Dark/System theme, Responsive shell.

---

## 19. Freeze declaration

**FROZEN FRONTEND STRUCTURE — VERSION 1.0**

Effective date: **2026-07-19**

This structure is the official frontend architecture baseline for Laravel backend integration, QA, deployment, and capstone documentation.

---

## Document control

| Field | Value |
| ----- | ----- |
| Document ID | `docs/03-FOLDER-STRUCTURE.md` |
| Freeze version | 1.0 |
| Status | Approved baseline after repository cleanup |
| Next action | Laravel integration planning against this tree |
