# HIMS Component Library Guide

**Hospital Information Management System (HIMS)**  
Visual component catalog for shared frontend development

---

## Purpose

The Component Library is a **visual reference** for reusable HIMS interface pieces.

It helps developers:

- See which components already exist  
- Copy correct markup and class names  
- Avoid inventing duplicate CSS or JavaScript  
- Stay aligned with the Fleet reference design  

It is **not** a second design system. Styles come from the shared Fleet/HIMS design system.

---

## How to open the component library

1. Serve the **repository root** over HTTP (required for consistent asset paths).  
2. Open:

   `hims-ui-kit/component-library.html`

   Example: `http://localhost:8080/hims-ui-kit/component-library.html`

3. Use the table of contents or scroll sections to browse components.  
4. Switch Light / Dark / System from the Theme Preview section (uses the shared theme key `himsFleetTheme`).

---

## How to find components

| Area | Where to look |
| ---- | ------------- |
| Visual catalog | `hims-ui-kit/component-library.html` |
| Copy-friendly fragments | `hims-ui-kit/components/` |
| Full page skeletons | `hims-ui-kit/templates/` |
| Module demos | `hims-ui-kit/examples/` |
| Design rules | `docs/HIMS-UI-DESIGN-STANDARD.md` |
| Tokens / deep design | `docs/05-DESIGN-SYSTEM.md` |
| Fleet component inventory | `docs/06-COMPONENT-SYSTEM.md` |

Each catalog section is labeled **Implemented**, **Included in UI Kit**, or **Recommended for Future**.

---

## How to copy markup

1. Open the component section in the library.  
2. Expand **HTML example** (collapsible `<details>`).  
3. Copy the sample into your module page.  
4. Replace labels, IDs, and field names for your domain.  
5. Keep shared classes (`.btn-primary`, `.stat-card`, `.fleet-table`, etc.).

Prefer fragments under `hims-ui-kit/components/` when you need a clean partial.

---

## How to reuse shared styles

| Do | Do not |
| -- | ------ |
| Link parent `assets/css/style.css` | Copy button/card/modal CSS into your module |
| Use CSS variables from `variables.css` | Invent a second primary color system |
| Use Phosphor Icons (CDN) | Mix another icon library casually |
| Use catalog CSS only for docs layout | Put product UI rules in `component-library.css` |

`hims-ui-kit/assets/css/component-library.css` is **catalog-only** (swatches, code blocks, section layout).

---

## Implemented vs recommended

| Status | Meaning |
| ------ | ------- |
| **Implemented** | Exists in Fleet production CSS/JS and is safe to use |
| **Included in UI Kit** | Provided as a reusable kit fragment/template for modules |
| **Recommended for Future** | Pattern shown for consistency; not a full production subsystem yet |

Do not treat “Recommended” items as finished product features.

Examples of implemented: primary buttons, stats cards, fleet table, status badges, modal chrome, toast styles, skeleton classes, theme engine.

Examples of recommended/demo: standalone alert strip styles in the catalog, some message/notification list richness beyond the basic navbar icon buttons.

---

## How to propose a new shared component

1. Check whether an existing class or kit fragment already covers the need.  
2. If not, implement first as module-only markup using tokens.  
3. If two or more modules need it, propose promotion to shared CSS/components.  
4. Document the component here and in the design standard.  
5. Avoid `component-v2` forks.

---

## How to avoid duplicate designs

- Start from the library or kit, not a blank CSS file.  
- Match spacing to `--space-*` and controls to `--control-height`.  
- Keep sidebar/navbar chrome identical across HIMS modules.  
- Change only content: labels, icons, columns, stats, forms.  
- Review [docs/17-CODING-STANDARDS.md](../../docs/17-CODING-STANDARDS.md).

---

## Related files

- `hims-ui-kit/README.md`  
- `hims-ui-kit/component-library.html`  
- `hims-ui-kit/components/`  
- `hims-ui-kit/templates/`  
- `hims-ui-kit/examples/`  
- `docs/HIMS-UI-DESIGN-STANDARD.md`  
- `docs/05-DESIGN-SYSTEM.md`  
- `docs/06-COMPONENT-SYSTEM.md`  
- `docs/17-CODING-STANDARDS.md`  

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `hims-ui-kit/docs/COMPONENT-LIBRARY-GUIDE.md` |
| Type | Component library usage guide |
| Production Fleet files modified | No |
