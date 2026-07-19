# HIMS Design Tokens

Official **design token catalog** for the Hospital Information Management System (HIMS).

**Status:** Documentation + shared token CSS reference  
**Verified source:** `assets/css/base/variables.css` (Fleet reference implementation)  
**Theme engine:** `assets/js/core/theme-boot.js` + `assets/js/core/main.js`  
**Related:** [docs/HIMS-DESIGN-TOKENS.md](../../docs/HIMS-DESIGN-TOKENS.md), [docs/HIMS-UI-DESIGN-STANDARD.md](../../docs/HIMS-UI-DESIGN-STANDARD.md)

---

## Purpose

These files are the **single catalog of verified visual tokens** for all HIMS modules:

| File | Contents |
| ---- | -------- |
| `colors.css` | Brand, surface, background, border, text, status, dark theme |
| `typography.css` | Font family, sizes, weights, line heights, letter spacing |
| `spacing.css` | 8px spacing scale + layout rhythm |
| `radius.css` | Border radius scale |
| `shadow.css` | Elevation levels (light + dark) |
| `animation.css` | Durations, easing, transitions, shell motion |
| `breakpoints.css` | Responsive breakpoints + shell component sizes |
| `z-index.css` | Stacking scale |
| `theme.css` | Imports all token layers + theme engine notes |

---

## Important rules

1. **Do not redesign** — tokens match the Fleet/HIMS production values.
2. **Do not invent colors** — only verified values from production.
3. **Do not create a second theme key** — use `himsFleetTheme`.
4. **Production pages are not rewired by this package** — they continue to use `assets/css/style.css` → `base/variables.css`.
5. **Modules consume tokens** via `var(--token-name)`, never hard-coded hex when a token exists.

---

## How modules should consume tokens

### Preferred (production Fleet / shared shell)

```html
<script src="assets/js/core/theme-boot.js"></script>
<link rel="stylesheet" href="assets/css/style.css" />
```

`style.css` already includes `variables.css` (the live token implementation).

### Optional catalog import (new packages / docs previews)

```html
<link rel="stylesheet" href="hims-ui-kit/design-tokens/theme.css" />
```

Use only when you intentionally need the catalog entrypoint. Do not load both production `variables.css` and this catalog on the same page unless values stay identical.

### In CSS

```css
.my-panel {
  background: var(--color-surface);
  color: var(--color-text);
  padding: var(--space-5);
  border-radius: var(--radius-card);
  box-shadow: var(--shadow-sm);
  transition: box-shadow var(--transition-fast);
}
```

---

## Naming convention

| Pattern | Example | Meaning |
| ------- | ------- | ------- |
| `--color-*` | `--color-primary` | Semantic color |
| `--font-*` / `--font-size-*` | `--font-size-md` | Typography |
| `--space-*` | `--space-4` | Spacing scale |
| `--radius-*` | `--radius-md` | Corners |
| `--shadow-*` | `--shadow-md` | Elevation |
| `--duration-*` / `--transition-*` | `--transition-fast` | Motion |
| `--z-*` | `--z-modal` | Stacking |
| `--bp-*` | `--bp-md-max` | Breakpoint reference |
| Component aliases | `--sidebar-width` | Shell sizing |

---

## Theme

| Item | Value |
| ---- | ----- |
| Storage key | `himsFleetTheme` |
| Preference | `light` \| `dark` \| `system` |
| DOM attribute | `html[data-theme="light\|dark"]` |
| Boot script | `theme-boot.js` in `<head>` before CSS |

Dark theme redefines **color and shadow** tokens only. Structure tokens (spacing, type, radius, z-index) are shared.

---

## Future themes

Add a new theme by overriding **semantic color tokens** under a new `html[data-theme="…"]` selector. Prefer high-contrast accessibility as the next theme. Do not fork component CSS files.

---

## Icons

| Item | Verified practice |
| ---- | ----------------- |
| Library | Phosphor Icons (`@phosphor-icons/web` CDN) |
| Classes | `ph`, `ph-fill`, e.g. `ph-fill ph-squares-four` |
| Sizing | Prefer `em` / rem relative to control; avoid inventing icon CSS systems |

---

## Change control

When production `variables.css` changes after design approval, update this catalog to match. The catalog must not drift from the reference implementation.
