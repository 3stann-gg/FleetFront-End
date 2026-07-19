# Component System

## Fleet & Transportation Management Module

**Hospital Information Management System (HIMS)**

| Field | Value |
| ----- | ----- |
| **Document purpose** | Official inventory and usage rules for reusable UI components |
| **Intended readers** | Frontend developers, Laravel integrators, QA, maintainers |
| **Component system status** | Active; presentation-owned under structure freeze 1.0 |
| **Related architecture** | [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md), [docs/04-PROJECT-ARCHITECTURE.md](./04-PROJECT-ARCHITECTURE.md), [docs/05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md) |

---

## 1. Component System Overview

The Fleet frontend uses a **reusable component architecture**.

| Principle | Meaning |
| --------- | ------- |
| Shared UI is not duplicated | Shell fragments live under `components/shared/` and are injected into pages |
| Design-system classes are shared | Buttons, cards, forms, tables, badges, modals, toasts use `assets/css/components/` |
| Domain modals are shared fragments | Add/edit/view/delete modals under `components/<domain>/` |
| Presentation is frontend-owned | HTML/CSS/JS interaction remain the UI contract |
| Laravel supplies data only | Backend should not invent parallel component trees |

Loading pipeline for protected app pages:

1. Page provides host markers (`#sidebar`, `#navbar`, modal hosts, `#toast`).  
2. `assets/js/core/include.js` fetches HTML fragments via `loadComponent()`.  
3. Core/shell scripts initialize behavior (`main.js`, `navbar.js`, `dropdown.js`, toast, theme, profile).  
4. Module scripts bind domain logic.

Login is intentionally **shell-free** (no sidebar/navbar).

Do not copy sidebar or navbar markup into every page.

---

## 2. Component Inventory

Only verified shared presentation building blocks are listed. Domain pages also compose these patterns; module-specific page CSS may refine layout without creating a second system.

| Component | Files | Responsibility | Used by |
| --------- | ----- | -------------- | ------- |
| Sidebar | `components/shared/sidebar.html`, `assets/css/components/sidebar.css`, shell logic in `assets/js/core/main.js` | Primary navigation, brand, collapse, profile footer | All protected modules |
| Navbar | `components/shared/navbar.html`, `assets/css/components/navbar.css`, `assets/js/components/navbar.js` | Top bar, menu toggle, global search host, notification/message buttons | All protected modules |
| Profile menu | Sidebar footer markup + `initSidebarProfileDropdown()` in `main.js`, `user-profile.js` | Profile, settings, appearance, help, logout | Shell |
| Appearance menu | Sidebar appearance submenu + `initThemeControls()` / `applyTheme()` in `main.js` | Light / Dark / System selection | Shell (+ settings theme linkage) |
| Search | `assets/css/components/search.css`, navbar/toolbar markup, `navbar.js` | Global and module search presentation | Navbar; module toolbars |
| Toolbar | `assets/css/components/toolbar.css`, module HTML | List actions, filters, export host | CRUD modules, analytics toolbars |
| Buttons | `assets/css/components/buttons.css` | Primary/outline/danger/success, icon, filter, table, row actions | Entire app |
| Cards | `assets/css/components/cards.css` | Content cards, stats grid, KPI cards | Dashboard and modules |
| Statistics cards | `.stats-grid`, `.stat-card`, `.stat-icon` in `cards.css` | KPI presentation | Most modules + dashboard/reports |
| Forms / inputs | `assets/css/components/forms.css` | Labels, fields, validation presentation | Modals, settings, profile, login |
| Tables | `assets/css/components/tables.css` | `.fleet-table`, selection, sort headers | List modules |
| Pagination | `assets/css/components/pagination.css` + module pagination scripts | Page controls for visible rows | List modules |
| Dropdowns | `assets/css/components/dropdown.css`, `assets/js/components/dropdown.js` | Export/action menus (Print/PDF/Excel) | List cards that include export dropdown |
| Modals | `assets/css/components/modal.css`, `components/<domain>/*-modal.html` | Overlay dialogs for CRUD | Vehicle, reservation, dispatch, driver, maintenance, fuel |
| Confirmation dialogs | Delete modal fragments (e.g. `delete-*-modal.html`); logout uses `window.confirm` via auth | Destructive confirms | Modules + logout |
| Toast | `components/shared/toast.html`, `assets/css/components/toast.css`, `assets/js/core/toast.js` | Transient feedback | All pages that host toast |
| Badges / status chips | `assets/css/components/badges.css` (+ some page overrides) | Status presentation | Tables, dashboard, modules |
| Loading skeleton | `assets/css/components/skeleton.css` | Pure CSS skeleton placeholders | Opt-in via classes |
| Empty states | Module-specific classes (e.g. `.route-empty-state`, `.report-chart-empty`, `.cost-chart-empty`, table empty-state helpers) | No-data presentation | Routes, reports, cost, list modules |
| Theme controls | Appearance submenu + settings theme fields; theme CSS tokens | Appearance switching | Shell / settings |
| Auth gate (UX) | Login page; `auth-boot.js` / `requireAuth()` (not a visual widget) | Client redirect gate | Protected routes |
| Login card UI | `login/index.html`, `assets/css/pages/login.css`, `assets/js/auth/login.js` | Standalone sign-in presentation | Login only |

### Domain modal fragments (HTML)

| Domain | Folder | Variants |
| ------ | ------ | -------- |
| Vehicles | `components/vehicle/` | add, view, edit, delete |
| Reservations | `components/reservation/` | add, view, edit, delete |
| Dispatch | `components/dispatch/` | add, view, edit, delete |
| Drivers | `components/driver/` | add, view, edit, delete |
| Maintenance | `components/maintenance/` | add, view, edit, delete |
| Fuel | `components/fuel/` | add, view, edit, delete |

Loaded by `include.js` when matching host element IDs exist on the page.

**Not separate shared component packages:** Alerts as a distinct Bootstrap-alert component library are not a first-class shared fragment; transient feedback prefers **toast**. Chart empty messages are page/module patterns, not a global alert component.

---

## 3. Sidebar

### Purpose

Primary application navigation and operator identity for all protected Fleet pages.

### Structure

Verified regions in `components/shared/sidebar.html`:

| Region | Classes / IDs | Content |
| ------ | ------------- | ------- |
| Root | `.sidebar` > `.sidebar-panel` | Full-height shell |
| Brand header | `.sidebar-header`, `.sidebar-logo`, `.brand-mark` | HIMS Fleet mark + title + taglines |
| Navigation | `.sidebar-nav` | Grouped links with `.nav-title` sections |
| Links | `.nav-link` + `data-page` + `data-tooltip` | Icon + `.nav-label` |
| Profile footer | `.sidebar-footer`, `.sidebar-profile-wrap` | Profile toggle + menu |
| Desktop collapse control | `#desktopSidebarToggle` | Edge toggle outside scroll panel |

### Navigation groups (verified labels)

- **MAIN MENU** — Dashboard  
- **FLEET MANAGEMENT** — Vehicles, Reservations, Dispatch  
- **OPERATIONS** — Drivers, Maintenance, Fuel, Route Planning  
- **ANALYTICS** — Cost Analysis, Reports  
- **SYSTEM** — Settings (and related links as present in markup)

Routes use relative paths such as `../dashboard/index.html`, `../fleet/index.html`, etc.

### Active state

- Page body sets `data-page="..."`.  
- `initializePage()` in `main.js` marks the matching `.nav-link[data-page]` as `.active`.

### Collapsed mode

| Concern | Behavior |
| ------- | -------- |
| Preference key | `himsFleetSidebarCollapsed` (`main.js`) |
| Body class | `body.sidebar-collapsed` (desktop `min-width: 992px`) |
| Width tokens | Expanded `280px`; collapsed `88px` (`variables.css`) |
| Labels | Brand text / nav labels hide; icons remain |
| Toggle | `#desktopSidebarToggle` updates `aria-expanded` and caret icon |

### Tooltip behavior

- Links and profile use `data-tooltip`.  
- `initSidebarCollapsedTooltips()` provides floating tooltips when collapsed (avoids nav overflow clipping).

### Scrollable area

- `.sidebar-nav` scrolls independently inside the panel.  
- Profile footer remains in the footer region; collapse control sits outside the scroll panel.

### Profile footer

| Element | Role |
| ------- | ---- |
| `#sidebarProfileToggle` | Opens profile menu; shows avatar initials, name, role |
| `#sidebarProfileMenu` | `role="menu"` with Profile, System Settings, Appearance, Help, Logout |
| Identity sync | `syncUserProfileUI()` from `user-profile.js` updates name/role/avatar presentation |

### Appearance submenu (inside profile menu)

| Control | Behavior |
| ------- | -------- |
| `#profileAppearanceTrigger` | Opens theme submenu |
| `#profileAppearanceSubmenu` | Light / Dark / System as `role="menuitemradio"` with `data-theme-option` |
| `#profileAppearanceCurrent` | Shows current preference label |
| Theme API | `applyTheme()`, `syncThemeMenuState()`, storage key `himsFleetTheme` |

### Logout

- Menu item `data-profile-action="logout"`.  
- Handled in profile menu click logic → `performFleetLogout()` (session clear + redirect).  
- Uses browser confirm; not a modal fragment.

### Responsive behavior

| Viewport | Behavior |
| -------- | -------- |
| ≥992px | Fixed sidebar; optional collapse |
| ≤991px | Off-canvas sidebar; `body.sidebar-open`; backdrop; desktop edge toggle hidden |
| Mobile open | Driven by navbar `.menu-toggle` via `initResponsiveNavigation()` |

### Role-based visibility (future — documentation only)

Sidebar item visibility may later follow an approved User Role Matrix for roles such as:

- Fleet Manager  
- Dispatcher  
- Driver  
- Department Head  
- Finance  
- Maintenance  
- IT Admin  

**Do not implement permissions in CSS.** Frontend hiding is UX only. Laravel policies/middleware must enforce authorization.

### Dependencies

| Dependency | Path |
| ---------- | ---- |
| Markup | `components/shared/sidebar.html` |
| Styles | `assets/css/components/sidebar.css` (+ tokens/layout/responsive) |
| Init | `include.js` → load into `#sidebar` |
| Behavior | `main.js` (page active state, collapse, profile menu, theme, tooltips, responsive shell) |
| Profile data | `user-profile.js` |
| Auth logout | `auth.js` |

### Files summary

```text
components/shared/sidebar.html
assets/css/components/sidebar.css
assets/js/core/include.js
assets/js/core/main.js
assets/js/core/user-profile.js
assets/js/core/auth.js
```

---

## 4. Navbar

### Purpose

Top application chrome for identity strip, global search host, and utility icon actions.

### Structure (`components/shared/navbar.html`)

| Region | Content |
| ------ | ------- |
| `.navbar-left` | `.menu-toggle` (mobile), app identity title/subtitle |
| `.navbar-center` | `.search-box` with magnifying glass + text input |
| `.navbar-right` | Notifications and Messages `.icon-btn` controls |

### Behavior

| Function area | Implementation |
| ------------- | -------------- |
| Load | `include.js` → `#navbar` |
| Interactions | `assets/js/components/navbar.js` (`initNavbarInteractions`) |
| Global search | Client-side index from optional localStorage keys + navigation helpers |
| Notifications / messages | Presentation buttons; not a full messaging backend |
| Responsive | Search row wraps at compact widths; menu toggle opens off-canvas sidebar |

### Files

```text
components/shared/navbar.html
assets/css/components/navbar.css
assets/css/components/search.css
assets/js/components/navbar.js
```

---

## 5. Profile Menu and Appearance Menu

Documented with Sidebar (Section 3). Additional notes:

| Concern | Detail |
| ------- | ------ |
| Profile page link | `../profile/index.html` |
| Settings link | `../settings/index.html` (`data-profile-action="account-settings"`) |
| Help | Placeholder toast path when selected |
| Theme options | `light`, `dark`, `system` only |
| Settings page theme | Uses shared `himsFleetTheme`; must not become a second theme engine |

---

## 6. Search

| Variant | Location | Notes |
| ------- | -------- | ----- |
| Global search | Navbar `.search-box` | `aria-label="Global search"`; behavior in `navbar.js` |
| Module search | Toolbar `.search-box` | Filters module tables; module-owned JS |
| Styles | `search.css`, toolbar overrides in `toolbar.css` | Shared visual language |

Search controls visibility of rows where implemented; it does not delete data rows (project rule for list modules).

---

## 7. Toolbar

| Class | Role |
| ----- | ---- |
| `.toolbar` | Flex row of list controls |
| `.toolbar-left` | Search, filters, bulk tools |
| `.toolbar-right` | Primary actions, export dropdown |
| Utility bars | `.fleet-utility-bar`, `.reports-presets-bar`, `.cost-presets-bar`, `.route-templates-bar` | Module utility strips |

Used across CRUD list pages and some analytics modules. Actions remain module-specific; chrome is shared.

---

## 8. Buttons

Canonical classes in `buttons.css` (see also [docs/05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md)):

| Class | Role |
| ----- | ---- |
| `.btn-primary` | Primary CTA |
| `.btn-outline` | Secondary / cancel |
| `.btn-danger` | Destructive |
| `.btn-success` | Positive confirm |
| `.btn-sm` / `.btn-lg` | Optional sizes |
| `.icon-btn` | Icon-only (navbar utilities) |
| `.table-btn` | Compact table button |
| `.btn-filter` | Quiet filter chip |
| `.action-btn` | Row icon actions (view/edit/delete) |

States: hover, active, `:focus-visible`, `:disabled`, `.is-loading`.

**Rule:** Do not invent a parallel button system for Laravel forms.

---

## 9. Cards and Statistics Cards

| Pattern | Classes | Responsibility |
| ------- | ------- | -------------- |
| Content card | `.card`, often with `.card-header` | Section container |
| Stats grid | `.stats-grid` | Responsive KPI grid |
| Stat card | `.stat-card`, `.dashboard-kpi`, `.report-kpi-card` | Metric display |
| Icon plate | `.stat-icon` (+ semantic modifiers) | Visual accent |

Used by Dashboard, Vehicles, Reservations, Dispatch, Drivers, Maintenance, Fuel, Routes, Cost Analysis, Reports (as present per page).

---

## 10. Forms and Inputs

Shared form system: `forms.css`.

| Building block | Classes |
| -------------- | ------- |
| Stack | `.fleet-form`, `.vehicle-form` |
| Grid | `.form-grid`, `.form-group`, `.full-width` |
| Validation | `.is-invalid`, `.field-error`, `.error-text` |
| Helpers | `.form-helper`, `.helper-text` |
| Checks | `.form-check`, `.form-check-row` |

Used in:

- Domain modals  
- Settings  
- Profile  
- Login (login page also uses form-group patterns)

Laravel validation should populate these classes, not replace them.

---

## 11. Tables and Pagination

| Piece | Classes / files |
| ----- | --------------- |
| Table | `.fleet-table` |
| Scroll wrapper | `.table-responsive` |
| Selection | `tr.is-selected` / `tr.selected` |
| Actions | `.action-buttons`, `.action-btn` |
| Sort | `.sortable`, `.sort-icon` |
| Footer | `.table-footer` |
| Pagination | `.pagination` buttons; module pagination JS |

Pagination affects **visible** rows only; it must not destroy filter state (project rule).

---

## 12. Dropdowns

Primary shared dropdown is the **export menu**:

| Piece | Detail |
| ----- | ------ |
| Root | `.export-dropdown` |
| Toggle | `.export-menu-toggle` |
| Menu | `.export-menu` / items |
| JS | `assets/js/components/dropdown.js` → `initExportDropdowns()` |
| Init | Called from `include.js` after shell load |

Profile menus and appearance submenu are separate sidebar constructs, not `.export-dropdown`.

---

## 13. Modals and Confirmation Dialogs

### Shared modal chrome

| Part | Class |
| ---- | ----- |
| Overlay | `.modal-overlay` (+ `.show`) |
| Panel | `.custom-modal` |
| Header / body / footer | `.modal-header`, `.modal-body`, `.modal-footer` |
| Close | `.modal-close` |

### Domain modal set

Each of vehicle, reservation, dispatch, driver, maintenance, fuel provides:

- **Add** modal  
- **View** modal  
- **Edit** modal  
- **Delete** confirmation modal (often `.delete-modal` with warning icon)

Hosts on the page (empty containers with IDs) are filled by `include.js`.

### Other confirmations

| Flow | Presentation |
| ---- | ------------ |
| Logout | `window.confirm` via `performFleetLogout()` |
| Some settings destructive actions | Confirm dialogs in settings JS |

Laravel may receive modal submissions; presentation stays on these components.

---

## 14. Toast and Feedback

| Piece | Detail |
| ----- | ------ |
| Host | Page `#toast` → loaded `toast.html` provides `#toastContainer.toast-container` |
| Message | `.toast-message` + `.success` / `.error` / `.warning` / `.info` |
| API | `showToast(message, type)` from `toast.js` |
| Fallback | `navbar.js` can ensure a toast host if needed |

Use toast for transient system feedback. Use field errors for form validation.

---

## 15. Badges and Status Chips

Shared: `badges.css`.

Common classes:

- `.status-badge` / `.status` with semantic modifiers (`available`, `trip`, `maintenance`, `pending`, `completed`, `cancelled`, `inactive`, `in-progress`, etc.)  
- `.badge-green`  
- `.status-chip` and `.status-chip--success|--warning|--danger|--info`  

Some modules override colors in page CSS (e.g. reservation statuses). Prefer shared classes when adding new statuses.

---

## 16. Loading and Empty States

| Pattern | Implementation |
| ------- | -------------- |
| Skeleton | `.skeleton`, `.skeleton-line`, `.skeleton-block`, `.skeleton-circle` (CSS-only shimmer) |
| Button loading | `.is-loading` on button variants |
| Empty charts | `.report-chart-empty`, `.cost-chart-empty` |
| Empty routes | `#routeEmptyState.route-empty-state` |
| Empty tables | Module-specific empty rows/helpers (e.g. `empty-state` class checks in stats scripts) |

Laravel empty list responses should toggle these existing patterns rather than inventing new empty frameworks.

---

## 17. Theme Controls (Component View)

Theme is both a **system** and a **component surface**:

| Surface | Location |
| ------- | -------- |
| Appearance submenu | Sidebar profile menu |
| Settings theme fields | Settings page (shared key) |
| Early apply | `theme-boot.js` |
| Runtime API | `main.js` theme functions |

See [docs/05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md) Section 8 for token and API detail.

---

## 18. Authentication-Related UI

| UI | Notes |
| -- | ----- |
| Login page | Standalone card; no shell components |
| Client route guard | Non-visual redirects via `auth-boot.js` / `requireAuth()` |
| Logout control | Profile menu item |

Auth simulation is temporary; presentation of login/logout remains frontend-owned when Laravel Breeze (or approved auth) replaces the session API.

---

## 19. Component Loading Rules

| Rule | Detail |
| ---- | ------ |
| HTTP required | `fetch` includes fail under `file://` |
| Host markers required | e.g. `<div id="sidebar"></div>` |
| Conditional modals | Loaded only if host IDs exist |
| Idempotent scripts | Shared script loader and export dropdown init guard against duplicates |
| Path context | Fragment asset paths assume injection into module pages (`../assets/...`) |

---

## 20. Do and Do Not

### DO

- Reuse shell fragments via `include.js`  
- Reuse design-system component classes  
- Add domain behavior in module JS, not by cloning shell HTML  
- Map Laravel errors/loading/empty into existing components  
- Hide unauthorized actions for UX only, with server enforcement  

### DO NOT

- Paste sidebar/navbar into every page  
- Create `button-v2` / parallel card systems  
- Build a second toast or modal framework  
- Use components as security controls  
- Load components with broken relative paths after unapproved moves  

---

## 21. Laravel Integration Rules for Components

1. Keep component class names and fragment structure stable.  
2. Replace data inside tables/cards/modals, not the chrome.  
3. Wire form posts/API calls from existing modal footers and toolbar actions.  
4. Return validation errors into `.is-invalid` / `.field-error`.  
5. Use toast for flash-style messages.  
6. If Blade layouts are introduced later, map to the same component slots (`sidebar`, `navbar`, modals).  
7. Integrate one module’s components/data path at a time.

---

## 22. Related Documentation

| Document | Status | Purpose |
| -------- | ------ | ------- |
| [docs/00-START-HERE.md](./00-START-HERE.md) | Existing | Handover entry |
| [docs/01-PROJECT-OVERVIEW.md](./01-PROJECT-OVERVIEW.md) | Existing | Product overview |
| [docs/02-TECH-STACK.md](./02-TECH-STACK.md) | Existing | Stack |
| [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md) | Existing | Frozen paths |
| [docs/04-PROJECT-ARCHITECTURE.md](./04-PROJECT-ARCHITECTURE.md) | Existing | Architecture |
| [docs/05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md) | Existing | Tokens, visual rules |
| [docs/06-COMPONENT-SYSTEM.md](./06-COMPONENT-SYSTEM.md) | Existing | This component inventory |
| [docs/07-JAVASCRIPT-ARCHITECTURE.md](./07-JAVASCRIPT-ARCHITECTURE.md) | Existing | JS module conventions |
| [docs/08-ROUTING.md](./08-ROUTING.md) | Existing | Routes |
| [docs/09-AUTHENTICATION.md](./09-AUTHENTICATION.md) | Existing | Auth architecture |
| [docs/11-MODULES.md](./11-MODULES.md) | Existing | Module deep dives |
| [docs/12-BACKEND-INTEGRATION.md](./12-BACKEND-INTEGRATION.md) | Existing | Integration playbook |
| [docs/21-ROLE-MATRIX.md](./21-ROLE-MATRIX.md) | Existing | Role visibility matrix |

---

## 23. Final Recommendation

Treat the component system as a stable presentation library.

Reuse shell fragments, design-system classes, and domain modals. Extend behavior through module scripts and backend data—not by duplicating UI.

Laravel integration should fill existing tables, forms, modals, toasts, and empty states with secure, authorized data while preserving this component contract.

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `docs/06-COMPONENT-SYSTEM.md` |
| Type | Component system |
| Production code changes | None |
| Shared HTML fragments | sidebar, navbar, toast + 24 domain modals |
| Shared JS components | `navbar.js`, `dropdown.js` (+ core shell/auth/toast) |
