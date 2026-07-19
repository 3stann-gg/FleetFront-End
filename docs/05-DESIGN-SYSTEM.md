# Design System

## Fleet & Transportation Management Module

**Hospital Information Management System (HIMS)**

| Field | Value |
| ----- | ----- |
| **Document purpose** | Official visual and presentation contract for the Fleet frontend |
| **Intended readers** | Frontend maintainers, Laravel integrators, QA, designers working against this UI |
| **Design system status** | Active and frozen as the presentation baseline for structure freeze 1.0 |
| **Relationship to architecture** | Complements [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md) and [docs/04-PROJECT-ARCHITECTURE.md](./04-PROJECT-ARCHITECTURE.md); does not authorize path or redesign changes |
| **Canonical CSS entry** | `assets/css/style.css` |
| **Token source of truth** | `assets/css/base/variables.css` (Version comment: 1.1 — Theme System) |

This document defines the **approved visual contract**. Laravel integration must preserve it.

---

## 1. Design System Overview

The Fleet UI is a professional hospital operations interface with:

| Verified quality | Evidence |
| ---------------- | -------- |
| Mint-green brand accent | `--color-primary: #00a86b` (light); `#12b87a` (dark) |
| Clean modern presentation | Card surfaces, restrained shadows, Poppins typography |
| Card-based layouts | `.card`, `.stat-card`, dashboard/report cards |
| Reusable components | Shared CSS under `assets/css/components/` |
| Consistent spacing | 8px-based `--space-*` scale |
| Responsive behavior | Custom rules in `base/responsive.css` + Bootstrap utilities where used |
| Light / Dark / System appearance | `himsFleetTheme` + `html[data-theme]` |
| Dark hospital sidebar shell | `--sidebar-bg: #071e27` (light theme tokens) |

The design system is **token-driven** for themeable surfaces and **component-class driven** for reusable UI. Page CSS may refine module-specific layouts without replacing shared primitives.

---

## 2. Source Files

All pages load styles through:

```html
<link rel="stylesheet" href="../assets/css/style.css" />
```

### Import order (`assets/css/style.css`)

1. Base foundations  
2. Shared components  
3. Page styles  
4. Responsive overrides last  

### Base

| File | Responsibility | Scope |
| ---- | -------------- | ----- |
| `assets/css/base/variables.css` | Design tokens (light/dark), layout dimensions, z-index | Global |
| `assets/css/base/reset.css` | Browser reset / normalize | Global |
| `assets/css/base/typography.css` | Font import (Google Poppins), headings, body, utility type classes | Global |
| `assets/css/base/utilities.css` | Lightweight helpers (flex, truncate, sr-only, gaps) | Global |
| `assets/css/base/layout.css` | `.app`, `.main-content`, `.page-wrapper`, page header | Shell layout |
| `assets/css/base/motion.css` | Transitions, focus-visible language, reduced-motion | Global interaction |
| `assets/css/base/responsive.css` | Shared responsive overrides for shell, grids, tables, modals | Global (last) |

### Components

| File | Responsibility | Scope |
| ---- | -------------- | ----- |
| `assets/css/components/sidebar.css` | Sidebar, collapse, profile menu, tooltips | Shell |
| `assets/css/components/navbar.css` | Top navbar, search host, actions | Shell |
| `assets/css/components/search.css` | Search box controls | Shared |
| `assets/css/components/buttons.css` | Button and action control system | Shared |
| `assets/css/components/cards.css` | Cards, stats grid, KPI cards | Shared |
| `assets/css/components/forms.css` | Form groups, inputs, validation presentation | Shared |
| `assets/css/components/tables.css` | `.fleet-table`, selection, sort headers | Shared |
| `assets/css/components/badges.css` | Status badges and chips | Shared |
| `assets/css/components/modal.css` | Overlay, modal chrome, header/body/footer | Shared |
| `assets/css/components/toast.css` | Toast container and message variants | Shared |
| `assets/css/components/dropdown.css` | Dropdown menus | Shared |
| `assets/css/components/pagination.css` | Pagination controls | Shared |
| `assets/css/components/toolbar.css` | List toolbars | Shared |
| `assets/css/components/skeleton.css` | Skeleton loading placeholders | Shared |

### Pages

| File | Responsibility | Scope |
| ---- | -------------- | ----- |
| `assets/css/pages/dashboard.css` | Dashboard-specific layout and interactions | Dashboard |
| `assets/css/pages/vehicle.css` | Vehicles (`fleet/`) page refinements | Vehicles |
| `assets/css/pages/driver.css` | Drivers page refinements (includes some status overrides) | Drivers |
| `assets/css/pages/fuel.css` | Fuel page refinements | Fuel |
| `assets/css/pages/maintenance.css` | Maintenance page refinements | Maintenance |
| `assets/css/pages/reservation.css` | Reservation status badge color overrides | Reservations |
| `assets/css/pages/route-planning.css` | Route planning layout | Routes |
| `assets/css/pages/cost-analysis.css` | Cost analysis charts/tables layout | Cost |
| `assets/css/pages/reports.css` | Reports layout | Reports |
| `assets/css/pages/settings.css` | Settings sections | Settings |
| `assets/css/pages/profile.css` | Profile page | Profile |
| `assets/css/pages/login.css` | Standalone login shell (no sidebar/navbar) | Login |

**Rule:** Reusable patterns belong in `components/`. Module-only refinements belong in `pages/`. Do not add a second design-system tree.

---

## 3. Design Tokens

Source: `assets/css/base/variables.css`.

### Colors (light — `:root` / `html[data-theme="light"]`)

| Token | Current value | Purpose |
| ----- | ------------- | ------- |
| `--color-bg` | `#f5f7fa` | App background |
| `--color-surface` | `#ffffff` | Cards, surfaces |
| `--color-surface-secondary` | `#f3f4f6` | Secondary surface |
| `--color-surface-hover` | `#e5e7eb` | Hover surface |
| `--color-surface-muted` | `#f8fafc` | Muted surface / table header |
| `--color-surface-soft` | `#f9fafb` | Soft surface |
| `--color-text` | `#24313f` | Primary text |
| `--color-text-muted` | `#6b7280` | Secondary / muted text |
| `--color-text-light` | `#9ca3af` | Tertiary / placeholder-like text |
| `--color-text-inverse` | `#ffffff` | Text on primary/dark fills |
| `--color-border` | `#e5e7eb` | Default border |
| `--color-border-subtle` | `#f3f4f6` | Subtle border |
| `--color-border-strong` | `#d1d5db` | Strong border |
| `--color-border-input` | `#dbe2ea` | Input border |
| `--color-primary` | `#00a86b` | Brand / primary actions |
| `--color-primary-hover` | `#008f5b` | Primary hover |
| `--color-primary-active` | `#007a4d` | Primary active |
| `--color-primary-soft` | `#e7f7f0` | Soft primary fill |
| `--color-primary-light` | `#c5efdc` | Light primary |
| `--color-primary-dark` | `#006d43` | Dark primary text/accent |
| `--color-success` | `#00a86b` | Success |
| `--color-success-strong` | `#16a34a` | Strong success |
| `--color-success-soft` | `#dcfce7` | Success soft fill |
| `--color-success-text` | `#15803d` | Success text |
| `--color-warning` | `#f59e0b` | Warning |
| `--color-warning-soft` | `#fef3c7` | Warning soft fill |
| `--color-warning-text` | `#d97706` | Warning text |
| `--color-danger` | `#dc2626` | Danger |
| `--color-danger-hover` | `#b91c1c` | Danger hover |
| `--color-danger-soft` | `#fee2e2` | Danger soft fill |
| `--color-danger-text` | `#dc2626` | Danger text |
| `--color-info` | `#3b82f6` | Info |
| `--color-info-soft` | `#dbeafe` | Info soft fill |
| `--color-info-text` | `#1d4ed8` | Info text |
| `--sidebar-bg` | `#071e27` | Sidebar background |
| `--sidebar-hover` | `#0c2d3a` | Sidebar hover |
| `--modal-overlay` | `rgba(15, 23, 42, 0.45)` | Modal backdrop |
| `--focus-ring` | `rgba(0, 168, 107, 0.18)` | Focus ring tint |

Legacy aliases still present: `--color-background` → `--color-bg`; `--color-text-primary` → `--color-text`; `--color-text-secondary` → `--color-text-muted`.

### Colors (dark — `html[data-theme="dark"]`)

Selected verified overrides (full set in `variables.css`):

| Token | Current value |
| ----- | ------------- |
| `--color-bg` | `#0b1220` |
| `--color-surface` | `#111827` |
| `--color-text` | `#f3f4f6` |
| `--color-text-muted` | `#9ca3af` |
| `--color-border` | `#2d3748` |
| `--color-primary` | `#12b87a` |
| `--color-primary-hover` | `#34d399` |
| `--sidebar-bg` | `#050d12` |
| `--modal-overlay` | `rgba(2, 6, 23, 0.72)` |
| `--focus-ring` | `rgba(18, 184, 122, 0.28)` |

Mint identity is retained in dark mode with brighter primary values for contrast on dark surfaces.

### Typography tokens

| Token | Value |
| ----- | ----- |
| `--font-family` | `"Poppins", sans-serif` |
| `--font-size-xs` | `12px` |
| `--font-size-sm` | `13px` |
| `--font-size-md` | `15px` |
| `--font-size-lg` | `17px` |
| `--font-size-xl` | `20px` |
| `--font-size-2xl` | `26px` |
| `--font-size-3xl` | `32px` |
| `--font-size-kpi` | `26px` |
| `--font-size-label` | `13px` |
| `--font-size-meta` | `12px` |
| `--line-height-tight` | `1.2` |
| `--line-height-snug` | `1.35` |
| `--line-height-body` | `1.55` |
| `--font-light` … `--font-bold` | `300` / `400` / `500` / `600` / `700` |

### Spacing (8px grid)

| Token | Value |
| ----- | ----- |
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-7` | `32px` |
| `--space-8` | `40px` |
| `--space-9` | `48px` |
| `--space-10` | `64px` |
| `--space-11` | `80px` |
| `--space-12` | `96px` |
| `--card-gap` | `var(--space-6)` |
| `--section-gap` | `var(--space-7)` |
| `--toolbar-gap` | `var(--space-5)` |

### Border radius

| Token | Value |
| ----- | ----- |
| `--radius-sm` | `8px` |
| `--radius-md` | `10px` |
| `--radius-lg` | `14px` |
| `--radius-xl` | `18px` |
| `--radius-pill` | `999px` |
| `--radius-card` | `var(--radius-lg)` |
| `--radius-control` | `var(--radius-md)` |
| `--radius-button` | `var(--radius-md)` |

### Shadows (light)

| Token | Value |
| ----- | ----- |
| `--shadow-xs` | `0 1px 2px rgba(15, 23, 42, 0.04)` |
| `--shadow-sm` | `0 2px 8px rgba(15, 23, 42, 0.05)` |
| `--shadow-md` | `0 6px 16px rgba(15, 23, 42, 0.06)` |
| `--shadow-lg` | `0 12px 28px rgba(15, 23, 42, 0.08)` |
| `--shadow-primary` | `0 6px 16px rgba(0, 168, 107, 0.18)` |

### Motion / transitions

| Token | Value |
| ----- | ----- |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` |
| `--duration-fast` | `150ms` |
| `--duration-normal` | `180ms` |
| `--duration-slow` | `220ms` |
| `--transition-fast` | `var(--duration-fast) var(--ease-out)` |
| `--transition-normal` | `var(--duration-normal) var(--ease-out)` |
| `--transition-slow` | `var(--duration-slow) var(--ease-out)` |

### Layout dimensions

| Token | Value | Purpose |
| ----- | ----- | ------- |
| `--sidebar-width` | `280px` | Expanded sidebar |
| `--sidebar-collapsed-width` | `88px` | Desktop collapsed sidebar |
| `--navbar-height` | `72px` | Navbar height reference |
| `--control-height` | `48px` | Default control height |
| `--control-height-sm` | `44px` | Compact control height |
| `--content-padding` | `30px` | Content padding token (page wrapper also uses space scale) |

### Z-index

| Token | Value |
| ----- | ----- |
| `--z-dropdown` | `100` |
| `--z-sticky` | `500` |
| `--z-sidebar` | `700` |
| `--z-navbar` | `800` |
| `--z-modal` | `1000` |

Additional hard-coded layering appears in responsive sidebar/backdrop rules (e.g. mobile sidebar `z-index: 1100`, backdrop `1050` in `responsive.css`) and toast (`calc(var(--z-modal) + 50)`).

### Hardcoded values still in the implementation

Some page or component CSS uses literal values instead of tokens. Verified examples:

| Location | Example | Note |
| -------- | ------- | ---- |
| `pages/reservation.css` | Status badge hex colors (`#fef3c7`, `#ede9fe`, etc.) | Reservation-specific badge palette overrides shared badge tokens |
| `base/responsive.css` | Some `12px` / `24px` navbar paddings; mobile table `min-width: 800px` | Responsive refinements |
| `components/buttons.css` | Fixed icon button `40px`, table-btn `32px` heights | Control density variants |
| `components/badges.css` | `.status-chip` font-size `11px` | Chip density |

Prefer tokens when extending styles. Do not normalize these values in this documentation task.

---

## 4. Color System

### Semantic usage

| Role | Tokens / classes | Typical usage |
| ---- | ---------------- | ------------- |
| Primary actions | `--color-primary*`, `.btn-primary` | Save, create, primary CTAs |
| Secondary / quiet actions | `.btn-outline`, `.btn-filter` | Cancel, filters, secondary tools |
| Danger | `--color-danger*`, `.btn-danger`, `.action-btn.danger` | Delete, destructive confirms |
| Success | `--color-success*`, `.btn-success`, success badges/toasts | Completed/available states |
| Warning | `--color-warning*` | Pending, maintenance, caution |
| Info | `--color-info*` | On trip / in progress / informational |
| Backgrounds | `--color-bg`, `--color-surface*` | App chrome and cards |
| Text | `--color-text`, `--color-text-muted`, `--color-text-light` | Hierarchy |
| Borders | `--color-border*` | Dividers, inputs, cards |
| Shell | `--sidebar-bg`, `--navbar-bg` | Navigation chrome |

### Accessibility considerations

| Verified | Detail |
| -------- | ------ |
| Focus rings | Primary focus outline/offset and `--focus-ring` used on buttons/inputs (`buttons.css`, `forms.css`, `motion.css`) |
| Reduced motion | `prefers-reduced-motion: reduce` disables some transitions (`typography.css`, `layout.css`, `motion.css`) |
| Contrast | Dark theme adjusts primary and status colors for dark surfaces |
| Future validation | Full WCAG contrast audit of every status combination is a recommended QA activity, not claimed complete here |

Do not replace the mint primary palette casually; it is the product identity.

---

## 5. Typography

| Concern | Implementation |
| ------- | -------------- |
| Primary family | Poppins via Google Fonts import in `typography.css` |
| Fallback | `sans-serif` in `--font-family` |
| Local font files | **Not** bundled under `assets/fonts/` in the cleaned repository |
| Body | `body` uses `--font-size-md` (15px), `--font-regular`, `--line-height-body` |
| Headings | `h1`–`h6` map to size tokens; also `.fleet-display`, `.fleet-h1`, `.fleet-h2`, `.fleet-h3` |
| Labels | `.fleet-label`, form labels use `--font-size-label` + semibold |
| Meta / captions | `.fleet-meta`, `.fleet-caption`, table headers use meta size |
| KPI numbers | `.fleet-kpi-value` with tabular nums and `--font-size-kpi` |
| Page titles | `.page-title` / `.page-header h1` with clamp sizing in `layout.css` |
| Buttons | Button text typically `--font-size-sm` / semibold (`buttons.css`) |
| Tables | `.fleet-table` body `--font-size-sm` |

Typography is **centralized in tokens** with semantic classes; some page CSS still applies local clamp sizes for large titles.

---

## 6. Spacing and Layout

| Concept | Verified behavior |
| ------- | ----------------- |
| Spacing strategy | 8px grid via `--space-*` |
| App shell | `.app` flex row; `.main-content` offset by sidebar width |
| Page padding | `.page-wrapper` uses `var(--space-7) var(--space-6) var(--space-8)` (reduced at smaller breakpoints) |
| Section rhythm | `.section` margin-bottom `--space-8`; stats use `--section-gap` |
| Card gap | `--card-gap` / `var(--space-6)` in `.stats-grid` |
| Sidebar width | `280px` expanded; `88px` collapsed (desktop `min-width: 992px`) |
| Navbar height token | `72px` (`--navbar-height`); responsive navbar may grow (`height: auto; min-height: 80px` at ≤1199px) |
| Control height | `48px` default inputs/buttons; toolbar may use `--control-height-sm` |
| Modal spacing | Header/body/footer use `--space-5`–`--space-7` padding in `modal.css` |
| Table cell padding | `12px 16px` in `tables.css` |

Shared dimensions live in tokens; component-specific density (icon buttons, chips) may use fixed px values as noted in Section 3.

---

## 7. Responsive System

### Verified custom breakpoints (`base/responsive.css` and layout)

| Breakpoint | Behavior |
| ---------- | -------- |
| `min-width: 992px` | Desktop collapsed sidebar (`body.sidebar-collapsed`) adjusts main content margin/width |
| `max-width: 1199px` | Laptop/compact: 2-column stats, single-column dashboard grid, navbar wraps, toolbar stacks |
| `max-width: 991px` | Off-canvas sidebar; main content full width; backdrop; table horizontal scroll (`min-width: 800px` on `.fleet-table`) |
| `max-width: 767px` | Single-column stats; tighter page padding; toast moves to bottom; further header/form stacking |

### Sidebar behavior

| Mode | Behavior |
| ---- | -------- |
| Desktop expanded | Fixed width `--sidebar-width`; main content reserved width |
| Desktop collapsed | `body.sidebar-collapsed`; width `--sidebar-collapsed-width`; icon rail + tooltips |
| ≤991px | Sidebar off-canvas (`translateX`); `body.sidebar-open` shows it; `.sidebar-backdrop` |

### Bootstrap vs custom

| Source | Role |
| ------ | ---- |
| Bootstrap 5.3.7 CDN | Utility/grid helpers and Bootstrap JS where pages include the bundle |
| Custom CSS | Product shell, design tokens, components, and the breakpoints above |

Do not assume Bootstrap’s default breakpoint names alone describe this product; **custom media queries own the shell**.

---

## 8. Theme System

| Item | Verified detail |
| ---- | --------------- |
| Modes | **Light**, **Dark**, **System** |
| Storage key | `himsFleetTheme` |
| Preference values | `light` \| `dark` \| `system` |
| Applied attribute | `document.documentElement` → `data-theme="light"` or `data-theme="dark"` |
| Early init | `assets/js/core/theme-boot.js` in `<head>` before CSS |
| System detection | `window.matchMedia("(prefers-color-scheme: dark)")` |
| Interactive API (`main.js`) | `getThemePreference()`, `getResolvedTheme()`, `getSavedTheme()`, `applyTheme(theme, options)`, `syncThemeMenuState()`, `getSystemTheme()`, `updateAppearanceTriggerLabel()` |
| Profile menu | Sidebar Appearance submenu options use `[data-theme-option]` |
| Settings | Settings theme radios use `name="settingsTheme"` and must stay synchronized with the shared key (not a second theme engine) |

**Do not create a second theme system.** CSS tokens switch under `html[data-theme="light"]` and `html[data-theme="dark"]`.

---

## 9. Buttons

Defined primarily in `assets/css/components/buttons.css`.

| Class / variant | Purpose | Hierarchy / usage | States |
| --------------- | ------- | ----------------- | ------ |
| `.btn-primary` | Primary CTA | Highest emphasis (save, add, sign in) | hover, active, focus-visible, disabled, `.is-loading` |
| `.btn-outline` | Secondary / cancel / tools | Medium-low emphasis | hover, active, focus-visible, disabled, loading |
| `.btn-danger` | Destructive | Delete / critical | hover, focus-visible, disabled, loading |
| `.btn-success` | Positive confirm | Success-aligned actions | hover, focus-visible, disabled |
| `.btn-sm` / `.btn-lg` | Size variants | Optional density | same base states |
| Toolbar density | `.toolbar .btn-outline`, `.toolbar .btn-primary` | Compact toolbars | inherits |
| `.icon-btn` | Icon-only control | Navbar/tools | hover, focus-visible, disabled |
| `.table-btn` / `.table-btn-outline` | Compact table actions | Inline table ops | hover, focus-visible |
| `.btn-filter` | Quiet filter chip button | Charts/filters | hover, focus-visible |
| `.action-btn` | Row action icons | View/edit/delete rows | hover; `.danger` / `.action-delete` danger hover |

Accessibility expectations:

- Prefer visible labels or `aria-label` on icon-only controls.  
- Use `:focus-visible` rings already defined.  
- Disabled uses reduced opacity and `pointer-events: none` on primary variants.

Do not introduce parallel button class families during Laravel work.

---

## 10. Cards

Primary definitions: `assets/css/components/cards.css` (+ page CSS).

| Pattern | Classes | Notes |
| ------- | ------- | ----- |
| Standard card | `.card` | Surface, `--radius-card`, padding `--space-6`, border, `--shadow-xs` |
| Stats grid | `.stats-grid` | 4 columns default; 3 columns for 5–6 cards; responsive collapse |
| KPI / stat card | `.stat-card`, `.dashboard-kpi`, `.report-kpi-card` | Min-height 112px; icon + content; hover elevates shadow |
| Stat icon plate | `.stat-icon` (+ `.success` `.warning` `.danger` `.info`) | 48×48, soft semantic fills |
| Chart / analytics cards | Page classes (e.g. dashboard/report/cost chart cards) | Build on `.card` patterns |
| Settings / profile cards | Page CSS (`settings.css`, `profile.css`) | Section cards on those pages |

Hover: subtle border/shadow change—not dramatic motion (`--hover-lift: 0` in tokens).

---

## 11. Forms

Primary definitions: `assets/css/components/forms.css`.

| Element | Classes / behavior |
| ------- | ------------------ |
| Form stacks | `.vehicle-form`, `.fleet-form` |
| Grid | `.form-grid` (2 columns); `.form-group.full-width` spans |
| Groups | `.form-group` + `label` + control |
| Required | `.required` / `.req` (danger color) |
| Controls | `input`, `select`, `textarea` height `--control-height`; focus primary ring |
| Checkbox/radio rows | `.form-check`, `.form-check-row` |
| Helper text | `.form-helper`, `.helper-text` |
| Errors | `.field-error`, `.error-text`; invalid controls `.is-invalid` |
| Disabled | opacity 0.65, muted background |

### Laravel validation presentation

Backend field errors should map into the **existing** UI:

1. Add/keep `.is-invalid` on the control.  
2. Show message in `.field-error` / `.error-text` (or module-equivalent error nodes already used).  
3. Prefer toast for form-level failures where modules already use `showToast`.  

Do not replace forms with a new Laravel-only form CSS system.

---

## 12. Tables

Primary definitions: `assets/css/components/tables.css`.

| Concern | Implementation |
| ------- | -------------- |
| Table | `.fleet-table` |
| Wrapper | `.table-responsive` (horizontal scroll when needed) |
| Header | Muted meta text, surface-muted background, 48px height |
| Body rows | 56px cell height; hover `--table-row-hover` |
| Selection | `tr.is-selected` / `tr.selected` with primary soft fill |
| Actions | `.action-buttons` / `.table-actions` + `.action-btn` |
| Sort | `.sortable`, `.sort-icon` |
| Empty states | Module markup/JS (not a single global empty component class) |
| Pagination | `assets/css/components/pagination.css` + module pagination scripts |
| Bulk selection | Selected row styles; module checkboxes where implemented |

### Backend data

Server pagination/filter results should populate the **existing** table DOM patterns (headers, status badges, action buttons). Do not invent a second table component library here; API contracts belong in future API docs.

---

## 13. Badges and Status States

Shared classes: `assets/css/components/badges.css`. Additional reservation-specific colors: `pages/reservation.css`. Driver page also defines some status refinements.

| Status / class | Visual basis | Meaning (UI) | Used in (typical) |
| -------------- | ------------ | ------------ | ----------------- |
| `.status-badge.available` / `.Available` / `.active` | success soft | Available / active | Vehicles, drivers |
| `.status-badge.trip` / `.OnTrip` / `.ongoing` | info soft | On trip / ongoing | Vehicles, dispatch |
| `.status-badge.maintenance` / `.scheduled` | warning soft | Maintenance / scheduled | Vehicles, maintenance |
| `.status-badge.pending` | warning soft (shared); reservation override hex | Pending | Reservations and others |
| `.status-badge.completed` | success soft | Completed | Multiple modules |
| `.status-badge.cancelled` / `.canceled` | danger soft (shared); reservation override | Cancelled | Multiple modules |
| `.status-badge.inactive` / `.offline` | muted surface | Inactive / offline | Drivers/vehicles |
| `.status-badge.archived` | muted | Archived | Records |
| `.status-badge.in-progress` / `.InProgress` | info soft | In progress | Maintenance and others |
| `.status-badge.approved` | reservation.css blues | Approved | Reservations |
| `.status-badge.rejected` | reservation.css danger soft | Rejected | Reservations |
| `.badge-green` | primary soft | General positive chip | Dashboard / headers |
| `.status-chip` + `--success|--warning|--danger|--info` | chip variants | Compact chips | Dashboard lists |

This is **visual semantics only**, not authorization.

---

## 14. Modals and Dialogs

Primary definitions: `assets/css/components/modal.css`.

| Part | Class | Behavior |
| ---- | ----- | -------- |
| Overlay | `.modal-overlay` | Fixed; hidden by default; `.show` displays flex center |
| Container | `.custom-modal` | Max width 960px; max-height min(90vh, 900px); column flex |
| Header | `.modal-header` | Title + optional description; close control |
| Close | `.modal-close` | Icon button with focus ring |
| Body | `.modal-body` | Scrollable; `overscroll-behavior: contain` |
| Footer | `.modal-footer` | Action buttons right-aligned |
| Confirmation | Module delete modals + `window.confirm` for logout | Presentation varies by flow |

Responsive: overlay padding and max-height adjust at ≤991px.

Laravel may receive modal form posts/API calls, but should **keep** this modal chrome and class structure.

---

## 15. Navigation Design

| Element | Notes |
| ------- | ----- |
| Sidebar | `components/shared/sidebar.html` + `sidebar.css` |
| Collapsed sidebar | Desktop `body.sidebar-collapsed`; icon rail + tooltips |
| Active link | `.nav-link` + `data-page` matching (`initializePage` in `main.js`) |
| Icons | Phosphor classes in markup |
| Profile footer | Fixed profile block with dropdown (profile, settings, appearance, logout) |
| Appearance submenu | Light / Dark / System via `data-theme-option` |
| Navbar | `components/shared/navbar.html` + `navbar.css` / `navbar.js` |
| Search | Navbar center search box |
| Notifications / messages | Navbar presentation (not full messaging backend) |
| Mobile nav | Menu toggle + off-canvas sidebar + backdrop |

**Role-based visibility (future UX):** hide navigation items or actions clientside for clarity per the approved User Role Matrix. **This is not security.** Laravel must enforce permissions.

---

## 16. Feedback and System States

| State | Mechanism |
| ----- | --------- |
| Toast | `.toast-container` / `#toast`, `.toast-message` + `.success` `.error` `.warning` `.info` |
| Confirmation | Modal delete flows; logout uses confirm dialog |
| Loading | `.is-loading` on buttons; skeleton styles in `skeleton.css` |
| Disabled | Button/input disabled styles |
| Empty | Module empty messages / chart empty paragraphs |
| Error | Field errors, toast error, invalid controls |
| Success | Toast success; success badges |
| Alert | Prefer toast for transient feedback; form errors for field-level |

### Laravel mapping

| Backend result | Frontend mapping |
| -------------- | ---------------- |
| 200/success | Existing success toast / row refresh pattern |
| 422 validation | Field `.is-invalid` + messages |
| 401/403 | Redirect/login or unauthorized toast + hide action |
| 500 | Error toast; keep UI recoverable |
| Empty list | Existing empty state markup |

---

## 17. Iconography

| Item | Verified |
| ---- | -------- |
| Library | Phosphor Icons via `https://unpkg.com/@phosphor-icons/web` |
| Usage | `<i class="ph ...">` / `ph-fill` variants in HTML |
| Sizing | Context-driven (e.g. stat icon ~22px font-size; toast icons 20px) |
| Placement | Sidebar nav, KPI plates, row actions, modal close, navbar |
| Accessibility | Decorative icons should be `aria-hidden="true"` when a text label exists; icon-only controls need accessible names |
| Rule | **Do not introduce another icon library** during integration |

---

## 18. Charts and Data Visualization

| Item | Verified |
| ---- | -------- |
| Third-party chart library | **Not used** (no Chart.js dependency in repository) |
| Implementation | Custom CSS/SVG rendering in `assets/js/reports/reports-charts.js` and `assets/js/cost-analysis/cost-charts.js` |
| Types | Bars, donuts/trends, ranking-style visuals as implemented in those modules |
| Empty data | `.report-chart-empty` / `.cost-chart-empty` (and related) messages |
| Theme | Charts inherit theme surface/text colors via CSS variables and currentColor patterns where coded |
| Backend ownership | Future APIs supply datasets; presentation scripts remain frontend-owned |

---

## 19. Accessibility Rules

### Verified current behaviors

| Area | Behavior |
| ---- | -------- |
| Semantic structure | Page landmarks and headings used across modules |
| Labels | Form labels associated with controls in shared form patterns |
| Focus | `:focus-visible` outlines on interactive elements (`motion.css`, components) |
| Keyboard | Dropdowns/menus and shell handlers include keyboard paths in JS |
| Reduced motion | Honored in multiple CSS files |
| Screen-reader utility | `.u-sr-only` in utilities |
| Modal scroll containment | `overscroll-behavior: contain` on modal body |

### Recommended future checks (not claimed complete)

- Full keyboard audit of every module modal  
- Contrast audit for reservation hardcoded badge colors in dark theme  
- Consistent `aria-live` for toast announcements  
- Focus trap verification on all modals  

---

## 20. Role-Based UI Presentation

Reference the future dedicated matrix document: **planned** `docs/21-ROLE-MATRIX.md`.

Illustrative roles for presentation planning (not implemented as enforced RBAC in this frontend):

- Fleet Manager  
- Dispatcher  
- Driver  
- Department Head  
- Finance  
- Maintenance  
- IT Admin  

Design-system support expectations:

| UX technique | Purpose |
| ------------ | ------- |
| Hide unavailable nav items | Reduce noise |
| Hide unauthorized actions | Avoid dead controls |
| Read-only fields | View Own / limited edit |
| Disabled controls | Temporary or constrained actions |
| Limited report views | Finance/management scoping |

**Critical:** Frontend visibility is **UX only**. Laravel policies, gates, middleware, and server validation enforce real permissions. CSS must never be treated as security.

Do not duplicate the full permission table in this design document.

---

## 21. Do and Do Not Rules

### DO

- Reuse tokens from `variables.css`  
- Reuse component classes for buttons, cards, forms, tables, modals, badges, toasts  
- Keep page-specific rules in `assets/css/pages/`  
- Preserve visual hierarchy (primary mint actions, quiet secondary tools)  
- Test Light, Dark, and System themes after UI changes  
- Preserve responsive shell behavior at 1199 / 991 / 767 custom breakpoints  
- Document approved visual changes  

### DO NOT

- Add another CSS framework or competing design system  
- Duplicate buttons/cards/forms/tables/modals/dropdowns  
- Use inline styling without documented justification  
- Create `*-final.css` / `*-v2.css` forks  
- Hardcode colors when a token already exists (except acknowledged legacy page overrides)  
- Redesign pages during Laravel integration  
- Use CSS to “enforce” security  
- Remove shared states required by other roles or modules  

---

## 22. Laravel Integration Rules

1. Laravel supplies data and authorization.  
2. Existing HTML/CSS presentation remains the UI contract.  
3. Validation errors use existing `.is-invalid` / `.field-error` patterns.  
4. Loading uses existing loading/skeleton patterns.  
5. Empty backend results use existing empty states.  
6. Unauthorized actions are hidden in UI **and** rejected by Laravel.  
7. Blade conversion, if approved, must preserve classes and structure.  
8. Do not replace Bootstrap or shared CSS during backend integration.  
9. Integrate one module at a time.  
10. Respect frozen paths and the `fleet/` page vs `vehicle/` CSS pairing.

---

## 23. Related Documentation

| Document | Status | Purpose |
| -------- | ------ | ------- |
| [docs/00-START-HERE.md](./00-START-HERE.md) | Existing | Developer handover |
| [docs/01-PROJECT-OVERVIEW.md](./01-PROJECT-OVERVIEW.md) | Existing | Product overview |
| [docs/02-TECH-STACK.md](./02-TECH-STACK.md) | Existing | Technology stack |
| [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md) | Existing | Frozen structure |
| [docs/04-PROJECT-ARCHITECTURE.md](./04-PROJECT-ARCHITECTURE.md) | Existing | Architecture blueprint |
| [docs/05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md) | Existing | This design system contract |
| [docs/design-system.md](./design-system.md) | Existing (legacy notes) | Earlier design notes; prefer this official `05` document for integration |
| [docs/06-COMPONENT-SYSTEM.md](./06-COMPONENT-SYSTEM.md) | Existing | Deeper component inventory |
| [docs/07-JAVASCRIPT-ARCHITECTURE.md](./07-JAVASCRIPT-ARCHITECTURE.md) | Existing | JS conventions |
| [docs/08-ROUTING.md](./08-ROUTING.md) | Existing | Routing map |
| [docs/09-AUTHENTICATION.md](./09-AUTHENTICATION.md) | Existing | Auth architecture |
| [docs/10-THEME-SYSTEM.md](./10-THEME-SYSTEM.md) | Existing | Theme system notes |
| [docs/11-MODULES.md](./11-MODULES.md) | Existing | Module deep dives |
| [docs/12-BACKEND-INTEGRATION.md](./12-BACKEND-INTEGRATION.md) | Existing | Integration playbook |
| [docs/21-ROLE-MATRIX.md](./21-ROLE-MATRIX.md) | Existing | User role permission matrix |

---

## 24. Final Recommendation

**FINAL RECOMMENDATION**

Treat the existing frontend design system as a stable UI contract during Laravel integration.

Reuse the verified design tokens, shared components, responsive rules, feedback states, and theme engine.

Laravel should provide secure data, authorization, validation, and persistence without redesigning or duplicating the presentation layer.

Role-based visibility must follow the approved User Role Matrix, while all real permission enforcement remains server-side.

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `docs/05-DESIGN-SYSTEM.md` |
| Type | Design system |
| Token file version comment | 1.1 — Theme System |
| Production code changes | None |
| Chart library | None (custom CSS/SVG) |
| Icon library | Phosphor Icons (CDN) |
| Font delivery | Google Fonts Poppins (not local files) |
