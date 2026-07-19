# HIMS UI Design Standard

## Official UI Kit for the Hospital Information Management System

**Reference implementation:** Fleet & Transportation Management System Frontend  
**Audience:** Frontend developers, backend integrators, maintainers, and student teams building other HIMS modules  
**Related Fleet docs:** [05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md), [06-COMPONENT-SYSTEM.md](./06-COMPONENT-SYSTEM.md), [10-THEME-SYSTEM.md](./10-THEME-SYSTEM.md), [03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md)

---

## 1. Introduction

### Purpose of the HIMS UI Kit

This document defines the **official visual and interaction standard** for Hospital Information Management System (HIMS) module frontends.

Its goal is simple: every HIMS module should look and behave like one product, not like separate student projects with different layouts and colors.

### Why one design standard

| Benefit | Explanation |
| ------- | ----------- |
| Consistency | Users learn one navigation and control language |
| Faster development | Teams reuse shell, CSS, and components instead of redesigning |
| Easier maintenance | Shared classes and tokens reduce duplicate CSS |
| Cleaner Laravel integration | Stable presentation while backends connect module by module |
| Professional delivery | Capstone and multi-module HIMS demos feel unified |

### Fleet as the reference implementation

The **Fleet & Transportation Management** frontend in this repository is the **reference design**.

Other HIMS modules should reuse the same:

- Layout shell (sidebar + navbar + main content)
- Colors and design tokens
- Typography
- Cards, buttons, forms, tables, modals, dropdowns
- Toast notifications and feedback patterns
- Theme system (light / dark / system)
- Responsive behavior

**What may change per module**

- Module title and page copy  
- Sidebar menu labels, icons, and links  
- Statistics labels and values  
- Table columns and form fields  
- Domain-specific badges/statuses  
- Module-only page CSS under a pages stylesheet  

**What must not change without approval**

- Shell structure and shared class names  
- Primary mint brand and token system  
- Global component CSS systems  
- Theme storage/application approach  

### Who should use this document

- Frontend developers building or extending HIMS modules  
- Backend developers integrating Laravel without redesigning UI  
- Future maintainers and capstone teams  
- Student teams assigned to other HIMS modules  

---

## 2. Design Goals

| Goal | Meaning in HIMS |
| ---- | --------------- |
| Consistency | Same shell, spacing, and controls across modules |
| Clean hospital interface | Calm surfaces, clear hierarchy, restrained shadows |
| Simple navigation | Dark sidebar, grouped menu, predictable routes |
| Readable content | Poppins type scale, muted secondary text, strong titles |
| Reusable components | Shared CSS components + HTML fragments |
| Responsive layout | Desktop collapse + off-canvas mobile sidebar |
| Accessible controls | Labels, focus rings, keyboard-friendly menus |
| Easy backend integration | Stable DOM/classes while data becomes server-driven |
| Student-manageable | Vanilla HTML/CSS/JS + Bootstrap utilities; no heavy SPA required |

---

## 3. HIMS Interface Structure

### Standard authenticated page skeleton

Every protected HIMS module page should follow this structure (as in Fleet):

```html
<body data-page="module-key">
  <div class="app">
    <div id="sidebar"></div>

    <main class="main-content">
      <div id="navbar"></div>

      <section class="page-wrapper">
        <!-- Module content -->
      </section>
    </main>

    <div id="toast"></div>
  </div>
</body>
```

| Region | Class / host | Role |
| ------ | ------------ | ---- |
| App shell | `.app` | Flex row; full viewport height |
| Sidebar host | `#sidebar` | Loads shared sidebar fragment |
| Main column | `.main-content` | Offset by sidebar width |
| Navbar host | `#navbar` | Loads shared top bar |
| Page content | `.page-wrapper` | Padding around module content |
| Toast host | `#toast` | Global notifications |

### Standard content stack (list/CRUD modules)

Typical order used in Fleet modules such as Vehicles:

1. **Page header** (`.page-header`) — title, short description, primary action button  
2. **Statistics** (`.stats-grid` + `.stat-card`) — KPI summary cards  
3. **Toolbar** (`.toolbar`) — search, filters, secondary actions  
4. **Main card / table** (`.card` + `.fleet-table` or module content)  
5. **Pagination / footer** (`.table-footer`, `.pagination`) when listing data  
6. **Modals** — add / view / edit / delete hosts loaded as fragments  

### Dashboard-style content

Dashboard uses a similar shell, with executive header, KPI grid, and section cards instead of a single data table.

### Login exception

Login is **shell-free** (no sidebar/navbar). Use a centered card layout (see Fleet `login/`). Other HIMS auth entry pages should follow the same idea: standalone, branded, themed.

### Breadcrumb / page location

Fleet primarily communicates location through:

- Active sidebar link (`.nav-link.active` via `data-page`)  
- Page title in `.page-header` / dashboard header  
- Optional navbar app identity text  

A separate breadcrumb component is **not required** by the reference UI. If a module adds breadcrumbs later, style them with existing text tokens and spacing—do not invent a second navigation chrome.

---

## 4. Shell Components

### Sidebar

| Item | Reference |
| ---- | --------- |
| Markup | `components/shared/sidebar.html` |
| Styles | `assets/css/components/sidebar.css` |
| Width | `--sidebar-width: 280px`; collapsed `--sidebar-collapsed-width: 88px` |
| Background | Dark hospital shell (`--sidebar-bg: #071e27` light theme tokens) |
| Active item | Primary accent on active nav link |
| Profile footer | Avatar/initials, name, role, dropdown |
| Appearance | Light / Dark / System submenu |
| Collapse | Desktop edge toggle; body class `sidebar-collapsed` |

**Other HIMS modules:** keep the same sidebar chrome; only change menu groups, labels, icons, and `href` / `data-page` values.

### Navbar

| Item | Reference |
| ---- | --------- |
| Markup | `components/shared/navbar.html` |
| Styles | `assets/css/components/navbar.css` |
| Height token | `--navbar-height: 72px` |
| Left | Menu toggle (mobile) + app identity |
| Center | Global search box |
| Right | Utility icon buttons (notifications, messages) |

Notifications/messages in Fleet are presentation-level. Other modules may keep the same chrome even before real data is connected.

### Toast / notifications

| Item | Reference |
| ---- | --------- |
| Host | `#toast` + `components/shared/toast.html` |
| Styles | `assets/css/components/toast.css` |
| API | `showToast(message, type)` |
| Types | `success`, `error`, `warning`, `info` |

Use toasts for short system feedback. Use field errors for form validation.

---

## 5. Design Tokens (CSS Variables)

**Source of truth:** `assets/css/base/variables.css`  
**Entry stylesheet:** `assets/css/style.css`

HIMS modules must consume tokens with `var(--token-name)` rather than inventing new global palettes.

### Brand and semantic colors (light)

| Token | Value | Use |
| ----- | ----- | --- |
| `--color-primary` | `#00a86b` | Primary actions, active nav accent |
| `--color-primary-hover` | `#008f5b` | Primary hover |
| `--color-primary-active` | `#007a4d` | Primary pressed |
| `--color-primary-soft` | `#e7f7f0` | Soft fills, selected rows |
| `--color-primary-dark` | `#006d43` | Strong primary text/accents |
| `--color-bg` | `#f5f7fa` | App background |
| `--color-surface` | `#ffffff` | Cards, panels |
| `--color-text` | `#24313f` | Primary text |
| `--color-text-muted` | `#6b7280` | Secondary text |
| `--color-border` | `#e5e7eb` | Default borders |
| `--color-success*` | success set | Positive / available states |
| `--color-warning*` | warning set | Pending / caution |
| `--color-danger*` | danger set | Delete / errors |
| `--color-info*` | info set | In-progress / informational |

Dark theme overrides live under `html[data-theme="dark"]` (mint primary becomes slightly brighter, e.g. `#12b87a`).

### Spacing (8px grid)

| Token | Value |
| ----- | ----- |
| `--space-1` … `--space-12` | 4px → 96px scale |
| `--card-gap` | `var(--space-6)` |
| `--section-gap` | `var(--space-7)` |
| `--toolbar-gap` | `var(--space-5)` |

### Radius, shadows, controls

| Token | Value / note |
| ----- | ------------ |
| `--radius-sm` / `md` / `lg` / `xl` | 8 / 10 / 14 / 18px |
| `--radius-pill` | 999px (badges) |
| `--radius-card` | `var(--radius-lg)` |
| `--shadow-xs` … `--shadow-lg` | Restrained elevation |
| `--control-height` | 48px |
| `--control-height-sm` | 44px |

### Shell dimensions

| Token | Value |
| ----- | ----- |
| `--sidebar-width` | 280px |
| `--sidebar-collapsed-width` | 88px |
| `--navbar-height` | 72px |

Full token lists and dark values: [05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md).

---

## 6. Typography

| Item | Standard |
| ---- | -------- |
| Font family | Poppins (`--font-family`) |
| Delivery | Google Fonts CDN in `typography.css` (not local font files) |
| Weights | 300, 400, 500, 600, 700 |
| Body size | `--font-size-md` (15px) |
| Labels | `--font-size-label` (13px), semibold |
| Meta / table headers | `--font-size-meta` (12px) |
| KPI values | `--font-size-kpi` (26px), tabular nums via `.fleet-kpi-value` |
| Page titles | `.page-title` / `.page-header h1` with clamp sizing |

Helper classes: `.fleet-label`, `.fleet-meta`, `.fleet-caption`, `.fleet-body`, `.fleet-small`.

---

## 7. Component Catalog

Reuse existing component CSS under `assets/css/components/`. Do not create parallel button/card/table systems.

### Buttons

| Class | Use |
| ----- | --- |
| `.btn-primary` | Main CTA (Add, Save, Sign In) |
| `.btn-outline` | Secondary / Cancel |
| `.btn-danger` | Destructive |
| `.btn-success` | Positive confirm |
| `.btn-sm` / `.btn-lg` | Optional sizes |
| `.icon-btn` | Navbar utilities |
| `.action-btn` | Row icon actions |
| `.btn-filter` | Quiet filter chips |
| `.table-btn` | Compact table actions |

States: hover, active, `:focus-visible`, `:disabled`, `.is-loading`.

### Cards and statistics

| Class | Use |
| ----- | --- |
| `.card` | Section container |
| `.stats-grid` | KPI grid (responsive columns) |
| `.stat-card` | Metric card |
| `.stat-icon` (+ `.success` / `.warning` / `.danger` / `.info`) | Icon plate |

### Forms

| Class | Use |
| ----- | --- |
| `.form-grid` | Two-column form layout |
| `.form-group` | Label + control stack |
| `.is-invalid` | Invalid control |
| `.field-error` / `.error-text` | Validation message |
| `.form-helper` | Help text |
| `.form-check` | Checkbox/radio rows |

Laravel validation errors should map into these classes—not a new form skin.

### Tables

| Class | Use |
| ----- | --- |
| `.fleet-table` | Data table |
| `.table-responsive` | Horizontal scroll wrapper |
| `tr.is-selected` / `.selected` | Bulk selection |
| `.sortable` | Sortable headers |
| `.action-buttons` | Row actions |

### Badges / status

| Class | Use |
| ----- | --- |
| `.status-badge` + semantic modifier | Status chips |
| `.badge-green` | Soft primary badge |
| `.status-chip` + modifiers | Compact chips |

Modules may add domain statuses, but should reuse soft semantic colors.

### Modals

| Class | Use |
| ----- | --- |
| `.modal-overlay` + `.show` | Backdrop |
| `.custom-modal` | Dialog panel |
| `.modal-header` / `.modal-body` / `.modal-footer` | Structure |
| `.modal-close` | Close control |
| `.delete-modal` | Destructive confirm layout |

### Dropdowns / export menus

| Class | Use |
| ----- | --- |
| `.export-dropdown` | Export menu root |
| `.export-menu-toggle` | Toggle |
| `.export-menu` / `.export-menu-item` | Items |

### Toolbar

| Class | Use |
| ----- | --- |
| `.toolbar` | List controls row |
| `.toolbar-left` / `.toolbar-right` | Split actions |
| `.search-box` | Search field chrome |
| `.filter-select` | Filter controls |

### Loading / empty

| Pattern | Use |
| ------- | --- |
| `.skeleton`, `.skeleton-line`, etc. | Loading placeholders |
| Module empty states / chart empty messages | No-data presentation |

Component inventory detail: [06-COMPONENT-SYSTEM.md](./06-COMPONENT-SYSTEM.md).

---

## 8. Icons

| Rule | Standard |
| ---- | -------- |
| Library | Phosphor Icons (CDN) |
| Load | `https://unpkg.com/@phosphor-icons/web` |
| Markup | `<i class="ph ...">` or `ph-fill` |
| Decorative icons | Prefer `aria-hidden="true"` when text label exists |
| Icon-only buttons | Provide `aria-label` |

Do not introduce a second icon library for other HIMS modules unless the whole suite adopts it formally.

---

## 9. Theme System

| Item | Standard |
| ---- | -------- |
| Preference key | `himsFleetTheme` in `localStorage` |
| Values | `light`, `dark`, `system` |
| Applied attribute | `html[data-theme="light|dark"]` |
| Early boot | `assets/js/core/theme-boot.js` in `<head>` before CSS |
| Runtime API | `applyTheme()`, `getThemePreference()`, `syncThemeMenuState()` in `main.js` |
| UI | Sidebar Appearance submenu; settings may expose theme controls using the **same key** |

Other HIMS modules must load theme boot the same way and must not invent a second theme storage key.

Details: [10-THEME-SYSTEM.md](./10-THEME-SYSTEM.md).

---

## 10. Responsive Behavior

Custom breakpoints used by the reference shell (not only Bootstrap defaults):

| Breakpoint | Behavior |
| ---------- | -------- |
| `min-width: 992px` | Desktop sidebar; optional collapse |
| `max-width: 1199px` | Compact desktop: stats often 2 columns; navbar may wrap |
| `max-width: 991px` | Off-canvas sidebar + backdrop; main content full width |
| `max-width: 767px` | Single-column stats; tighter padding; toast may move to bottom |

**HIMS modules must preserve** this shell responsive behavior. Module page CSS may refine grids, but should not break sidebar/navbar rules.

---

## 11. Page Types in the UI Kit

| Page type | Shell | Typical content |
| --------- | ----- | --------------- |
| Dashboard | Yes | KPIs, section cards, shortcuts |
| List / CRUD | Yes | Header, stats, toolbar, table, modals |
| Analytics / reports | Yes | Filters, charts, tables, export |
| Settings | Yes | Section cards and forms |
| Profile | Yes | Profile form/overview |
| Login / standalone | No | Centered brand + card form |

---

## 12. Standard Head Assets (reference order)

Authenticated module pages typically include (Fleet pattern):

1. Bootstrap 5.3.x CSS (CDN)  
2. Phosphor Icons script (CDN)  
3. `theme-boot.js`  
4. Auth boot (module-specific if using Fleet auth gate)  
5. `assets/css/style.css`  

Scripts at bottom: shared include/core scripts + module scripts.  
Serve pages over **HTTP** so shared components load via `fetch`.

---

## 13. Rules for Other HIMS Modules

### DO

- Copy the `.app` / sidebar / navbar / page-wrapper structure  
- Reuse shared CSS classes and tokens  
- Reuse modal, table, button, and toast patterns  
- Put module-only styles in a page CSS file imported by the shared stylesheet strategy  
- Keep menu active state via `body[data-page]` + nav `data-page`  
- Keep presentation stable when connecting Laravel  

### DO NOT

- Redesign the sidebar or invent a new primary color system  
- Create alternate button/card/modal CSS frameworks  
- Use inline styles or inline JavaScript for core UI  
- Add a second theme engine or theme key  
- Replace Phosphor with mixed icon sets casually  
- Rely on frontend menu hiding as security (Laravel must authorize)  

### What each module team owns

| Shared (HIMS UI Kit) | Module-specific |
| -------------------- | --------------- |
| Shell, tokens, components | Domain labels, fields, table columns |
| Theme and responsive shell | Domain stats and filters |
| Toast/modal chrome | Domain validation messages and records |

---

## 14. Accessibility Baseline

| Expectation | Practice |
| ----------- | -------- |
| Labels | Every control has a visible label |
| Focus | Use existing `:focus-visible` rings |
| Keyboard | Menus and modals should remain operable by keyboard |
| Errors | Visible field errors + optional toast |
| Contrast | Prefer token pairs; test light and dark |
| Reduced motion | Respect existing reduced-motion CSS where present |
| Icons | Do not rely on color or icon alone for critical meaning |

---

## 15. Backend Integration Note

Laravel (or other backends) should:

- Supply data and authorization  
- Return validation errors compatible with `.is-invalid` / `.field-error`  
- Leave layout, tokens, and component classes unchanged  

The UI kit is a **presentation contract**. Data sources may change; the shell and components should not.

---

## 16. Reference File Map

| Need | Location |
| ---- | -------- |
| Tokens | `assets/css/base/variables.css` |
| Layout | `assets/css/base/layout.css` |
| Typography | `assets/css/base/typography.css` |
| Responsive | `assets/css/base/responsive.css` |
| Components CSS | `assets/css/components/*` |
| Main CSS entry | `assets/css/style.css` |
| Sidebar / navbar / toast HTML | `components/shared/` |
| Theme boot | `assets/js/core/theme-boot.js` |
| Shell behavior | `assets/js/core/main.js`, `include.js` |
| Example list page | `fleet/index.html` |
| Example dashboard | `dashboard/index.html` |
| Example login | `login/index.html` |
| Official Fleet design doc | [05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md) |
| Component inventory | [06-COMPONENT-SYSTEM.md](./06-COMPONENT-SYSTEM.md) |

---

## 17. Conclusion

The HIMS UI Design Standard exists so every hospital module can share one professional interface language.

The Fleet & Transportation Management frontend is the reference kit: reuse its shell, tokens, components, theme, and responsive behavior. Change only module-specific content—labels, icons, statistics, forms, tables, and navigation items.

Following this standard keeps multi-module HIMS development consistent, student-manageable, and ready for Laravel integration without redesign.

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `docs/HIMS-UI-DESIGN-STANDARD.md` |
| Type | Cross-module HIMS UI kit / design standard |
| Reference product | Fleet & Transportation Management frontend |
| Production code changes | None |
| Official Fleet deep dive | `docs/05-DESIGN-SYSTEM.md` |
| Legacy notes | `docs/design-system.md` (archived; do not override this standard) |
