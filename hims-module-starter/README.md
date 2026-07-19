# HIMS Module Starter

**Hospital Information Management System (HIMS)**  
Official frontend starter package for new modules

**Design reference:** Fleet & Transportation Management frontend  
**UI Kit:** `../hims-ui-kit/`  
**UI Standard:** `../docs/HIMS-UI-DESIGN-STANDARD.md`

---

## Purpose

Copy this starter when you begin a **new HIMS module**. It gives you:

- Shared shell layout (sidebar + navbar + content)
- Starter pages (dashboard, management, forms, reports, settings, profile)
- Generic component placeholders
- Lightweight JavaScript architecture (no business logic, no APIs)
- Documentation and checklists

It does **not** include Fleet business rules (vehicles, dispatch, etc.).

---

## Folder structure

```text
hims-module-starter/
├── README.md
├── CHANGELOG.md
├── LICENSE.md
├── docs/
│   ├── MODULE-SETUP.md
│   ├── MODULE-CONFIG.md
│   └── CHECKLISTS.md
├── components/
├── layouts/
├── pages/
│   ├── dashboard/
│   ├── management/
│   ├── create/
│   ├── edit/
│   ├── view/
│   ├── reports/
│   ├── analytics/
│   ├── settings/
│   └── profile/
├── assets/
│   ├── css/
│   ├── js/
│   ├── images/
│   └── icons/
└── examples/
    └── patient-management/
```

---

## How to create a new module

1. **Copy** the entire `hims-module-starter/` folder to your module workspace (or rename the copy).
2. **Rename** the module in:
   - `docs/MODULE-CONFIG.md`
   - Sidebar brand/menu in `components/sidebar.html`
   - Navbar identity in `components/navbar.html`
   - Each page `<title>` and headers
3. **Link shared design system** (do not copy CSS from Fleet into a new skin):

   From `pages/dashboard/index.html` depth:

   ```html
   <link rel="stylesheet" href="../../../assets/css/style.css" />
   <script src="../../../assets/js/core/theme-boot.js"></script>
   ```

   Adjust `../` count if you move the folder.

4. **Customize content only** — stats labels, table columns, form fields, icons, menu links.
5. **Add module scripts** under `assets/js/` as needed.
6. **Serve over HTTP** when using fetch-based includes later.
7. Stay compliant with `docs/HIMS-UI-DESIGN-STANDARD.md`.

---

## How to rename the module

| Place | What to change |
| ----- | -------------- |
| `docs/MODULE-CONFIG.md` | Module name, icon, routes |
| `components/sidebar.html` | Brand title, tagline, menu items |
| `components/navbar.html` | App identity title/subtitle |
| Page titles | `<title>` and `.page-header h1` |
| `body data-page` | Match sidebar `data-page` for active link styling |

---

## Where to change navigation

Edit **`components/sidebar.html`**:

- Menu group titles (`.nav-title`)
- Links (`href`, `data-page`, labels, icons)

Optional: update navbar search placeholder in **`components/navbar.html`**.

---

## Where to add new pages

1. Create `pages/<page-name>/index.html` from a layout in `layouts/`.
2. Add a sidebar link pointing to that page.
3. Set `body data-page="..."`.
4. Register any page CSS/JS if needed.

---

## Where to add JavaScript

| File | Role |
| ---- | ---- |
| `assets/js/main.js` | Page boot / init calls |
| `assets/js/navigation.js` | Active nav, mobile menu hooks |
| `assets/js/theme.js` | Thin wrapper around shared theme behavior |
| `assets/js/modal.js` | Open/close demo modals |
| `assets/js/table.js` | Table UI helpers (no API) |
| `assets/js/form.js` | Client form UX helpers only |
| `assets/js/search.js` | Search field UX only |
| `assets/js/filters.js` | Filter control UX only |
| `assets/js/charts.js` | Placeholder chart containers |
| `assets/js/utils.js` | Small shared helpers |

**Do not** put Laravel API calls or business rules here until integration is planned.

---

## Where to add CSS

| File | Role |
| ---- | ---- |
| Parent `assets/css/style.css` | Official design system (shared) |
| `assets/css/module.css` | Module-only tweaks (prefer tokens) |

Do **not** duplicate button/card/table systems.

---

## Compliance with HIMS UI Standard

| Must keep | May change |
| --------- | ---------- |
| Shell structure (`.app`, sidebar, navbar) | Module labels and menu |
| Design tokens and component classes | Table columns and forms |
| Theme system (`himsFleetTheme` / `data-theme`) | Domain icons and stats |
| Phosphor + Bootstrap stack | Placeholder sample data |

---

## Related packages

| Package | Path |
| ------- | ---- |
| UI Kit fragments | `../hims-ui-kit/` |
| Component library catalog | `../hims-ui-kit/component-library.html` |
| Design standard | `../docs/HIMS-UI-DESIGN-STANDARD.md` |
| Design system | `../docs/05-DESIGN-SYSTEM.md` |

---

## Example

See **`examples/patient-management/`** for a customized Patient Management demo using this starter pattern.
