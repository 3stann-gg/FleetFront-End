# HIMS Design Tokens & Theme Engine

**Hospital Information Management System (HIMS)**  
Official design token standard and theme engine documentation

| Field | Value |
| ----- | ----- |
| **Catalog path** | `hims-ui-kit/design-tokens/` |
| **Live production tokens** | `assets/css/base/variables.css` |
| **Theme boot** | `assets/js/core/theme-boot.js` |
| **Theme runtime** | `assets/js/core/main.js` |
| **Storage key** | `himsFleetTheme` |
| **Related** | [HIMS-UI-DESIGN-STANDARD.md](./HIMS-UI-DESIGN-STANDARD.md), [10-THEME-SYSTEM.md](./10-THEME-SYSTEM.md), [05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md) |

---

## 1. Purpose

Design tokens are the **single source of truth** for visual values used across HIMS modules:

- Colors (brand, surfaces, text, status, dark theme)
- Typography
- Spacing
- Border radius
- Shadows / elevation
- Animations and transitions
- Z-index
- Breakpoints and shell component sizes
- Icon library practice

Every module should **consume tokens** (`var(--…)`) instead of inventing local hex values, arbitrary spacing, or a private theme engine.

This package **documents and catalogs** verified values from the Fleet reference implementation. It does **not** redesign the UI or change production page wiring.

---

## 2. How tokens work

### Architecture

```text
Authoritative values (production)
  assets/css/base/variables.css
        ↑ loaded by
  assets/css/style.css
        ↑ used by
  All Fleet / HIMS pages

Catalog (this package — documentation + reusable token CSS)
  hims-ui-kit/design-tokens/*.css
  hims-ui-kit/design-tokens/theme.css  (imports layers)
```

1. Tokens are CSS custom properties on `:root` / `html[data-theme]`.
2. Components and pages reference tokens: `background: var(--color-surface)`.
3. Theme switching changes `data-theme` on `<html>`; dark overrides reassign color/shadow tokens.
4. Structural tokens (spacing, type scale, radius, z-index) generally stay the same across themes.

### Catalog files

| File | Role |
| ---- | ---- |
| `colors.css` | Brand, surface, background, border, text, success/warning/danger/info, dark |
| `typography.css` | Family, sizes, weights, line heights, letter spacing |
| `spacing.css` | Space scale + layout rhythm |
| `radius.css` | Corner radius scale |
| `shadow.css` | Elevation levels |
| `animation.css` | Durations, easing, transitions, sidebar motion |
| `breakpoints.css` | Verified breakpoints + shell sizes |
| `z-index.css` | Stacking scale |
| `theme.css` | Aggregates all token files + theme notes |
| `README.md` | Package quickstart |

---

## 3. Naming convention

| Prefix | Domain | Examples |
| ------ | ------ | -------- |
| `--color-*` | Semantic color | `--color-primary`, `--color-border` |
| `--font-family`, `--font-size-*`, `--font-*` | Typography | `--font-size-md`, `--font-semibold` |
| `--line-height-*` | Line height | `--line-height-body` |
| `--letter-spacing-*` | Letter spacing | `--letter-spacing-tight` |
| `--space-*` | Spacing | `--space-4` |
| `--radius-*` | Radius | `--radius-card` |
| `--shadow-*` | Elevation | `--shadow-sm` |
| `--duration-*`, `--transition-*`, `--ease-*` | Motion | `--transition-fast` |
| `--z-*` | Stacking | `--z-modal` |
| `--bp-*` | Breakpoint reference | `--bp-md-max` |
| Shell aliases | Layout chrome | `--sidebar-width`, `--navbar-height` |

**Rules**

- Prefer **semantic** names (`--color-danger`) over raw palette names (`--red-500`).
- Prefer **aliases** for roles (`--radius-card`) when multiple components share intent.
- Do not invent a second naming system per module.

---

## 4. How modules should consume tokens

### Required for standard HIMS pages

Load the shared design system (includes live tokens):

```html
<script src="../../../assets/js/core/theme-boot.js"></script>
<link rel="stylesheet" href="../../../assets/css/style.css" />
```

Adjust `../` depth for your page location.

### In module CSS

```css
/* Good */
.module-banner {
  background: var(--color-primary-soft);
  color: var(--color-text);
  padding: var(--space-4) var(--space-5);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-xs);
}

/* Avoid */
.module-banner {
  background: #e7f7f0;
  padding: 18px 22px;
  border-radius: 11px;
}
```

### Optional catalog entrypoint

For documentation previews or experimental packaging:

```html
<link rel="stylesheet" href="hims-ui-kit/design-tokens/theme.css" />
```

Do **not** double-load conflicting token sheets on production Fleet pages.

### JavaScript

Read theme preference only through the shared key and helpers:

- Storage: `localStorage.getItem("himsFleetTheme")`
- Prefer `applyTheme` / `getThemePreference` from `main.js` when available

Do not invent `himsMyModuleTheme`.

---

## 5. Verified color groups

Extracted from `variables.css` (light / dark).

### Brand

| Token | Light | Dark |
| ----- | ----- | ---- |
| `--color-primary` | `#00a86b` | `#12b87a` |
| `--color-primary-hover` | `#008f5b` | `#34d399` |
| `--color-primary-active` | `#007a4d` | `#059669` |
| `--color-primary-soft` | `#e7f7f0` | `rgba(0, 168, 107, 0.16)` |
| `--color-primary-light` | `#c5efdc` | `rgba(0, 168, 107, 0.26)` |
| `--color-primary-dark` | `#006d43` | `#059669` |
| `--focus-ring` | `rgba(0, 168, 107, 0.18)` | `rgba(18, 184, 122, 0.28)` |

### Background

| Token | Light | Dark |
| ----- | ----- | ---- |
| `--color-bg` | `#f5f7fa` | `#0b1220` |
| `--color-background` | alias of `--color-bg` | same |

### Surface

| Token | Light | Dark |
| ----- | ----- | ---- |
| `--color-surface` | `#ffffff` | `#111827` |
| `--color-surface-secondary` | `#f3f4f6` | `#1f2937` |
| `--color-surface-hover` | `#e5e7eb` | `#374151` |
| `--color-surface-muted` | `#f8fafc` | `#1a2332` |
| `--color-surface-soft` | `#f9fafb` | `#151c2c` |

### Border

| Token | Light | Dark |
| ----- | ----- | ---- |
| `--color-border` | `#e5e7eb` | `#2d3748` |
| `--color-border-subtle` | `#f3f4f6` | `#1f2937` |
| `--color-border-strong` | `#d1d5db` | `#4b5563` |
| `--color-border-input` | `#dbe2ea` | `#374151` |

### Typography (text colors)

| Token | Light | Dark |
| ----- | ----- | ---- |
| `--color-text` | `#24313f` | `#f3f4f6` |
| `--color-text-muted` | `#6b7280` | `#9ca3af` |
| `--color-text-light` | `#9ca3af` | `#6b7280` |
| `--color-text-inverse` | `#ffffff` | `#ffffff` |

### Success / Warning / Danger / Info

See `hims-ui-kit/design-tokens/colors.css` for the full verified matrix (including soft and text variants).

### Hover

Verified hover tokens (not freehand hex):

- `--color-primary-hover`, `--color-danger-hover`
- `--color-surface-hover`, `--dropdown-hover`, `--sidebar-hover`
- Motion: `--hover-shadow`, `--hover-lift` (`0`)

### Disabled

No dedicated `--color-disabled` hex exists in production variables.  
Verified pattern: control **opacity** (e.g. `0.55` on some disabled buttons in settings CSS). Prefer opacity/cursor patterns rather than inventing a new disabled brand color without approval.

### Shell (sidebar)

| Token | Light | Dark |
| ----- | ----- | ---- |
| `--sidebar-bg` | `#071e27` | `#050d12` |
| `--sidebar-hover` | `#0c2d3a` | `#0c1a22` |

---

## 6. Typography tokens

| Category | Tokens / values |
| -------- | --------------- |
| Family | `--font-family: "Poppins", sans-serif` |
| Sizes | `xs 12` · `sm 13` · `md 15` · `lg 17` · `xl 20` · `2xl 26` · `3xl 32` · `kpi 26` · `label 13` · `meta 12` |
| Weights | light 300 · regular 400 · medium 500 · semibold 600 · bold 700 |
| Line heights | tight 1.2 · snug 1.35 · body 1.55 |
| Letter spacing | headings `letter-spacing: -0.02em` (catalog: `--letter-spacing-tight`); labels often `0.04em` / `0.06em` in page CSS |

---

## 7. Spacing tokens

Scale (verified):

`4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96` px → `--space-1` … `--space-12`

| Context | Guidance |
| ------- | -------- |
| Cards | Padding / stack gaps via `--space-5`–`--space-6`, `--card-gap` |
| Forms | Field spacing `--space-3`–`--space-5` |
| Sections | `--section-gap` (`--space-7`) |
| Tables | Toolbar `--toolbar-gap`; cell padding via table component CSS |
| Modals | Padding aligned with space scale; overlay padding at tablet breakpoints |
| Navigation | Content inset `--content-padding` (30px); nav item gaps from space scale |

---

## 8. Radius tokens

| Token | Value | Typical use |
| ----- | ----- | ----------- |
| `--radius-sm` | 8px | Compact chips / tight UI |
| `--radius-md` | 10px | Controls, buttons |
| `--radius-lg` | 14px | Cards (`--radius-card`) |
| `--radius-xl` | 18px | Large soft surfaces |
| `--radius-pill` | 999px | Full pills only |

---

## 9. Shadow tokens

| Level | Use when |
| ----- | -------- |
| `--shadow-xs` | Barely elevated separation |
| `--shadow-sm` | Default cards; hover (`--hover-shadow`) |
| `--shadow-md` | Dropdowns / elevated panels |
| `--shadow-lg` | Modals / high emphasis |
| `--shadow-primary` | Brand-tinted emphasis |

Dark theme redefines shadow RGBA values for visibility on dark surfaces.

---

## 10. Breakpoint tokens

Verified from `assets/css/base/responsive.css`:

| Query | Role |
| ----- | ---- |
| `min-width: 992px` | Desktop shell collapse behavior |
| `max-width: 1199px` | Laptop / compact desktop |
| `max-width: 991px` | Tablet landscape — **off-canvas** sidebar |
| `max-width: 767px` | Tablet portrait / large mobile |
| `max-width: 575px` | Small phones |
| `max-width: 399px` | Very small phones |
| `@media print` | Print cleanup |

Shell component sizes:

| Token | Value |
| ----- | ----- |
| `--sidebar-width` | 280px |
| `--sidebar-collapsed-width` | 88px |
| `--navbar-height` | 72px |
| `--control-height` | 48px |
| `--control-height-sm` | 44px |

---

## 11. Animation tokens

| Token | Value | Common use |
| ----- | ----- | ---------- |
| `--duration-fast` | 150ms | Hover, theme color crossfade |
| `--duration-normal` | 180ms | Modal in, dropdowns |
| `--duration-slow` | 220ms | Slower UI emphasis |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Standard easing |
| `--sidebar-transition-duration` | 380ms | Sidebar open/close |
| `--sidebar-label-transition-duration` | 240ms | Label fade on collapse |
| `--sidebar-tooltip-duration` | 140ms | Collapsed tooltips |

Always respect `prefers-reduced-motion: reduce` (production motion.css does).

---

## 12. Z-index tokens

| Token | Value |
| ----- | ----- |
| `--z-dropdown` | 100 |
| `--z-sticky` | 500 |
| `--z-sidebar` | 700 |
| `--z-navbar` | 800 |
| `--z-modal` | 1000 |
| `--sidebar-tooltip-z` | 1200 |

Mobile shell also uses **1050** (backdrop) and **1100** (off-canvas sidebar) in `responsive.css`.

---

## 13. Icons

| Item | Verified practice |
| ---- | ----------------- |
| Library | Phosphor Icons (`@phosphor-icons/web`) |
| Usage | Classes `ph` / `ph-fill` + icon name |
| Rule | Do not introduce a second icon font system per module |

---

## 14. Theme engine

### Light theme

Default. Applied when preference is `light`, or `system` resolves to light.  
Selector: `:root` / `html[data-theme="light"]`.

### Dark theme

Selector: `html[data-theme="dark"]`.  
Overrides **colors and shadows**; inherits spacing, typography scale, radius, z-index, and most layout sizes.

### Future high-contrast theme (recommended)

| Recommendation | Detail |
| -------------- | ------ |
| Selector | `html[data-theme="high-contrast"]` |
| Scope | Stronger borders, higher text contrast, possibly thicker focus rings |
| Do not | Fork component CSS files or invent a new storage key without migration plan |
| Extend | theme-boot + `applyTheme` validators carefully after design approval |

### Current storage implementation (do not modify for this task)

| Item | Value |
| ---- | ----- |
| Key | `himsFleetTheme` |
| Values | `light` \| `dark` \| `system` |
| Resolved DOM | `data-theme="light"` or `data-theme="dark"` only |
| Boot | `theme-boot.js` reads localStorage before paint |
| Runtime | `main.js` `applyTheme`, system media listener, sidebar appearance menu |
| Settings | Radios use shared key; not a second theme store |

### Recommended shared storage key

**`himsFleetTheme`** — keep for all HIMS modules for cross-module consistency (name is historical to Fleet reference; still the official shared key).

### How dark mode should inherit tokens

1. Keep structural tokens on `:root` only (spacing, fonts, radii, z-index, durations).
2. Under `html[data-theme="dark"]`, reassign only visual tokens (colors, shadows, some shell chrome).
3. Components should never hardcode light-only hex; they should use semantic tokens so dark mode works automatically.
4. Theme transitions may animate `background-color` and `color` with `--transition-fast`.

---

## 15. How future themes should be added

1. Design approval against HIMS UI Standard.
2. Add a new `html[data-theme="name"]` block that overrides **semantic color/shadow** tokens only.
3. Update catalog files under `hims-ui-kit/design-tokens/` to match.
4. Extend theme preference allow-list (`light` | `dark` | `system` | new value) in boot + runtime **in a dedicated implementation task**.
5. Do not create parallel CSS variable trees (`--dark-color-primary` alongside `--color-primary`).

---

## 16. Change control

| Action | Rule |
| ------ | ---- |
| New module styling | Use existing tokens |
| Missing token need | Propose addition to shared tokens; do not local-hardcode long-term |
| Production token change | Update `variables.css` (implementation) **and** this catalog |
| This documentation task | Catalog + docs only — **no production page modifications** |

---

## 17. Quick reference paths

```text
hims-ui-kit/design-tokens/
  colors.css
  typography.css
  spacing.css
  radius.css
  shadow.css
  animation.css
  breakpoints.css
  z-index.css
  theme.css
  README.md

docs/HIMS-DESIGN-TOKENS.md   ← this file
assets/css/base/variables.css  ← live production tokens
assets/js/core/theme-boot.js   ← pre-paint theme
```
