# HIMS UI Kit

**Hospital Information Management System (HIMS)**  
Official reusable frontend kit

**Reference implementation:** Fleet & Transportation Management frontend (this repository)

---

## Purpose

This folder is a **copy-friendly UI kit** for other HIMS modules (Patient, Laboratory, Pharmacy, Billing, and more).

It reuses the **same design language** as Fleet:

- Layout shell (sidebar + navbar + main content)
- CSS design system (`assets/css/style.css` in the parent project)
- Buttons, cards, forms, tables, modals, badges, toasts
- Theme system (light / dark / system)
- Responsive shell behavior

It does **not** include Fleet business logic (vehicle CRUD, dispatch rules, etc.).

---

## Folder map

```text
hims-ui-kit/
├── README.md                 ← this file
├── assets/
│   └── README.md             ← how to link shared CSS/JS (no CSS copy)
├── components/               ← reusable HTML fragments
├── templates/                ← full page skeletons
└── examples/                 ← sample modules using the kit
    ├── patient/
    ├── laboratory/
    ├── pharmacy/
    └── billing/
```

---

## How to copy templates

1. Keep this repository (or the shared HIMS design assets) available so you can load **parent** CSS/JS.
2. Copy the page template you need from `templates/` into your module folder.
3. Copy or include fragments from `components/` as needed.
4. Point stylesheet links to the shared design system:

   ```html
   <link rel="stylesheet" href="../assets/css/style.css" />
   ```

   From a nested example path, adjust relative depth (examples use `../../../assets/css/style.css`).

5. Load shared scripts the same way Fleet does when you wire a real module:
   - `theme-boot.js` in `<head>`
   - Bootstrap + Phosphor CDN
   - Shell scripts (`include.js`, `main.js`, toast) when using live sidebar/navbar injection

6. Replace sample labels, icons, stats, table columns, and form fields with your module content.

---

## How to customize modules

| Customize freely | How |
| ---------------- | --- |
| Module title and descriptions | Edit page header text |
| Sidebar menu items | Edit `components/sidebar.html` (or your module’s sidebar) labels, icons, `href`, `data-page` |
| Navbar identity text | Edit `app-identity-title` / subtitle |
| Statistics cards | Change icons, labels, and values |
| Table columns | Change headers and cells |
| Forms | Change fields inside form templates / modals |
| Status badges | Reuse `.status-badge` + semantic modifiers; add domain labels |
| Module-only CSS | Prefer a single page CSS file imported through the main design system strategy |

---

## What should never be modified

Do **not** create a second design language. Prefer **not** to edit these for module-specific look-and-feel:

| Shared resource | Location (parent project) |
| --------------- | ------------------------- |
| Design tokens | `assets/css/base/variables.css` |
| Component CSS systems | `assets/css/components/*` |
| Global CSS entry | `assets/css/style.css` |
| Theme engine | `assets/js/core/theme-boot.js`, theme APIs in `main.js` |
| Shared button/card/table/modal classes | Existing class names (`.btn-primary`, `.fleet-table`, etc.) |

If a true suite-wide visual change is required, update the **shared design system once**, then all modules benefit.

Also do **not**:

- Duplicate Bootstrap/Phosphor/design CSS inside `hims-ui-kit/assets/` as a parallel skin  
- Invent new primary color systems per module  
- Paste a different sidebar/navbar look per module  

---

## What can be customized

- Module name and branding text in the sidebar  
- Menu groups and destinations  
- Page-specific content blocks  
- Domain statuses and icons  
- Example data in tables  
- Optional module page CSS (layout tweaks only, tokens preferred)  

---

## Compatibility with Fleet

This kit is **compatible with the Fleet frontend**:

- Same CSS classes and tokens  
- Same shell structure (`.app`, `#sidebar`, `#navbar`, `.page-wrapper`)  
- Same control heights, spacing scale, and theme attributes  

Fleet production pages should continue to use the live `components/` and `assets/` trees. Treat `hims-ui-kit/` as the **starter pack for new modules**, not a replacement for Fleet’s running code.

---

## Documentation

| Document | Use |
| -------- | --- |
| [docs/HIMS-UI-DESIGN-STANDARD.md](../docs/HIMS-UI-DESIGN-STANDARD.md) | Official HIMS UI standard |
| [docs/05-DESIGN-SYSTEM.md](../docs/05-DESIGN-SYSTEM.md) | Tokens and visual contract |
| [docs/06-COMPONENT-SYSTEM.md](../docs/06-COMPONENT-SYSTEM.md) | Component inventory |

---

## Quick start checklist

- [ ] Copy a template from `templates/`  
- [ ] Set `body data-page="your-module"`  
- [ ] Update sidebar links for your module  
- [ ] Link parent `style.css` + CDNs  
- [ ] Replace sample content  
- [ ] Serve over HTTP when using fetch-based includes  
- [ ] Keep shared classes; only change module content  
