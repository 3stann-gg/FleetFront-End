# Module Setup Guide

## 1. Prerequisites

- Copy of this starter folder  
- Access to the parent HIMS design system (`assets/css/style.css`, theme boot)  
- Local HTTP server for previews  
- Read [HIMS UI Design Standard](../../docs/HIMS-UI-DESIGN-STANDARD.md)

## 2. Setup steps

1. Duplicate `hims-module-starter/`.  
2. Fill in [MODULE-CONFIG.md](./MODULE-CONFIG.md).  
3. Apply names/icons to sidebar and navbar.  
4. Fix asset paths so pages load parent CSS/JS.  
5. Customize sample tables and stats.  
6. Wire module JS in `assets/js/main.js` if needed.  
7. Test light/dark theme and responsive layout.  
8. Complete checklists in [CHECKLISTS.md](./CHECKLISTS.md).

## 3. Shared assets (do not fork)

| Asset | Parent path |
| ----- | ----------- |
| Design system CSS | `assets/css/style.css` |
| Theme boot | `assets/js/core/theme-boot.js` |
| Optional shell scripts | `assets/js/core/main.js`, `include.js`, `toast.js` |
| Brand images | `assets/images/brand/` |

From `pages/dashboard/index.html`, a typical relative path is:

```text
../../../assets/css/style.css
../../../assets/js/core/theme-boot.js
```

## 4. UI Kit reuse

Prefer fragments from:

- `../hims-ui-kit/components/`  
- `../hims-ui-kit/templates/`  
- Catalog: `../hims-ui-kit/component-library.html`

## 5. What not to do

- Do not redesign the sidebar/navbar look.  
- Do not create a new color system.  
- Do not add React/Vue/Tailwind for the starter.  
- Do not copy Fleet business logic into this package.
