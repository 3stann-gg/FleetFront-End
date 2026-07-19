# Assets Documentation

## Fleet & Transportation Management System

**Hospital Information Management System (HIMS)**  
Developer Documentation

---

## 1. Overview

**Purpose of the `assets` folder**

The `assets/` folder holds the reusable frontend resources that power the Fleet UI:

- Stylesheets (CSS)  
- JavaScript  
- Images (branding and placeholders)  

**Why organization matters**

- Developers can find files quickly.  
- Pages load shared CSS and JS from known paths.  
- Cleanup and Laravel integration stay simpler.  
- Duplicate or leftover files are easier to avoid.

**Benefits of a clean structure**

- Consistent design through one CSS entry point  
- Clear module ownership for JavaScript  
- Smaller production folders (unused empty trees already removed)  
- Easier handoff to new team members  

---

## 2. Assets Folder Structure

Verified structure under `assets/` (after repository cleanup):

```text
assets/
├── css/
│   ├── base/
│   ├── components/
│   ├── pages/
│   └── style.css
├── images/
│   ├── brand/
│   └── vehicle-placeholder.svg
└── js/
    ├── auth/
    ├── components/
    ├── core/
    ├── cost-analysis/
    ├── dashboard/
    ├── dispatch/
    ├── driver/
    ├── fuel/
    ├── maintenance/
    ├── profile/
    ├── reports/
    ├── reservation/
    ├── route-planning/
    ├── settings/
    └── vehicle/
```

| Folder | Present? | Role |
| ------ | -------- | ---- |
| `assets/css/` | Yes | Design system and page styles |
| `assets/js/` | Yes | Application scripts |
| `assets/images/` | Yes | Brand SVGs and vehicle placeholder |
| `assets/icons/` | **No** | Icons load from CDN (Phosphor) |
| `assets/fonts/` | **No** | Fonts load from Google Fonts CDN |
| `assets/data/` | **No** | Removed empty placeholders in cleanup |
| `assets/vendors/` | **No** | Vendor JS/CSS loaded from CDN when needed |

Approximate counts at documentation time: **34** CSS files, **110** JS files, **4** image files.

---

## 3. CSS Assets

All pages load styles through one main file:

```text
assets/css/style.css
```

That file imports base, components, pages, then responsive rules.

### `assets/css/base/`

| File | Purpose |
| ---- | ------- |
| `variables.css` | Design tokens (colors, spacing, theme light/dark) |
| `reset.css` | Browser reset |
| `typography.css` | Font import and text styles |
| `utilities.css` | Small helper classes |
| `layout.css` | App shell layout (sidebar offset, page wrapper) |
| `motion.css` | Transitions, focus, reduced motion |
| `responsive.css` | Shared responsive overrides (imported last) |

### `assets/css/components/`

Shared UI styles, for example:

| File | Purpose |
| ---- | ------- |
| `sidebar.css` | Sidebar navigation |
| `navbar.css` | Top navbar |
| `buttons.css` | Button system |
| `cards.css` | Cards and KPI stats |
| `forms.css` | Form controls and validation look |
| `tables.css` | Data tables |
| `modal.css` | Modal dialogs |
| `toast.css` | Toast messages |
| `badges.css` | Status badges |
| `dropdown.css` | Menus (including export) |
| `pagination.css` | Pagination controls |
| `toolbar.css` | List toolbars |
| `search.css` | Search boxes |
| `skeleton.css` | Loading skeletons |

### `assets/css/pages/`

Page-specific styles only (examples):

| File | Used with |
| ---- | --------- |
| `dashboard.css` | Dashboard |
| `vehicle.css` | Vehicles (`fleet/`) |
| `driver.css` | Drivers |
| `reservation.css` | Reservations |
| `login.css` | Login |
| `settings.css` | Settings |
| `profile.css` | Profile |
| `route-planning.css` | Route Planning |
| `cost-analysis.css` | Cost Analysis |
| `reports.css` | Reports |
| `fuel.css` | Fuel |
| `maintenance.css` | Maintenance |

**Rule:** put reusable look-and-feel in `components/`; put one-page-only tweaks in `pages/`.

More detail: [docs/05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md).

---

## 4. JavaScript Assets

Scripts are plain ES6 files loaded by each page (no bundler in this repo).

### `assets/js/core/`

Shared application scripts:

| File | Purpose |
| ---- | ------- |
| `theme-boot.js` | Theme before page paint |
| `auth-boot.js` | Early login redirect gate |
| `auth.js` | Frontend session helpers |
| `include.js` | Loads sidebar/navbar/modals |
| `main.js` | Shell: sidebar, theme menu, profile menu |
| `toast.js` | Toast notifications |
| `user-profile.js` | Profile display sync |
| `pending-action.js` | Short-lived cross-page actions |

### `assets/js/components/`

| File | Purpose |
| ---- | ------- |
| `navbar.js` | Navbar search / notifications UI behavior |
| `dropdown.js` | Export dropdown menus |

### `assets/js/auth/`

| File | Purpose |
| ---- | ------- |
| `login.js` | Login form controller |

### Module folders

Each business area has its own folder of scripts (CRUD, filters, export, etc.):

| Folder | Page |
| ------ | ---- |
| `dashboard/` | Dashboard |
| `vehicle/` | Vehicles (`fleet/`) |
| `reservation/` | Reservations |
| `dispatch/` | Dispatch |
| `driver/` | Drivers |
| `maintenance/` | Maintenance |
| `fuel/` | Fuel |
| `route-planning/` | Route Planning |
| `cost-analysis/` | Cost Analysis |
| `reports/` | Reports |
| `settings/` | Settings |
| `profile/` | Profile |

There is **no** `assets/js/utils/` folder in the cleaned tree.

More detail: [docs/07-JAVASCRIPT-ARCHITECTURE.md](./07-JAVASCRIPT-ARCHITECTURE.md).

---

## 5. Images

Verified image assets:

```text
assets/images/
├── brand/
│   ├── favicon.svg
│   ├── hims-fleet-logo.svg
│   └── hims-fleet-mark.svg
└── vehicle-placeholder.svg
```

| Asset | Use |
| ----- | --- |
| `brand/favicon.svg` | Browser tab icon (linked from pages) |
| `brand/hims-fleet-logo.svg` | Brand logo asset (kept for branding) |
| `brand/hims-fleet-mark.svg` | Brand mark asset |
| `vehicle-placeholder.svg` | Default vehicle image in fleet/modals |

**Not present as local folders:** `avatars/`, `backgrounds/`, `illustrations/`, `vehicles/` photo libraries (removed empty folders during cleanup).

**Guidelines for future images**

- Put production brand files under `images/brand/`.  
- Use clear names (kebab-case).  
- Prefer SVG for icons/logos when possible.  
- Do not commit large unoptimized photos without need.

---

## 6. Icons

The project does **not** use a local `assets/icons/` folder.

**Current icon library:** [Phosphor Icons](https://phosphoricons.com/) loaded from CDN:

```html
<script src="https://unpkg.com/@phosphor-icons/web"></script>
```

Icons appear in HTML as classes such as `ph`, `ph-fill`, for example:

- Sidebar navigation icons  
- KPI card icons  
- Modal close and action icons  
- Navbar bell / envelope icons  

**Rule:** do not add a second icon library without a documented decision.

---

## 7. Fonts

The project does **not** ship font files under `assets/fonts/`.

**Primary font:** Poppins  
**Loaded from:** Google Fonts CDN in `assets/css/base/typography.css`

```css
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
```

**CSS token:** `--font-family: "Poppins", sans-serif;` (in `variables.css`)

Weights used in the import: 300, 400, 500, 600, 700.

---

## 8. Asset Organization Guidelines

1. **Use descriptive filenames** — e.g. `vehicle-placeholder.svg`, not `img1.svg`.  
2. **Avoid duplicates** — one logo set under `brand/`.  
3. **Compress large images** if photo assets are added later.  
4. **Keep folders by type** — css / js / images only (current layout).  
5. **Do not mix unrelated assets** (do not put scripts inside `images/`).  
6. **Do not reintroduce empty folders** unless they will hold real files soon.  
7. **Register new CSS** in `style.css` imports when adding stylesheets.  
8. **Load new JS** from the correct page and document module ownership.  
9. **Prefer CDN vendor libs** already used (Bootstrap, xlsx, jsPDF) unless the team decides otherwise.  
10. **Respect the frozen structure** — avoid random renames of `assets/` paths.

---

## 9. Best Practices

| Practice | Why |
| -------- | --- |
| Organize by type | Easier search and ownership |
| Reuse assets | One favicon, one design system, shared JS core |
| Remove unused files | Smaller, cleaner repo (cleanup already did this once) |
| Optimize images | Faster page loads |
| Keep naming consistent | kebab-case files, clear module JS prefixes |
| One CSS entry | Pages use `style.css` only |
| Module JS isolation | Vehicle logic stays under `js/vehicle/` |
| Document changes | Update this file when major asset folders change |

---

## 10. Related Documentation

| Document | Topic |
| -------- | ----- |
| [docs/02-TECH-STACK.md](./02-TECH-STACK.md) | Technologies and CDNs |
| [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md) | Full frozen tree |
| [docs/05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md) | CSS tokens and UI rules |
| [docs/06-COMPONENT-SYSTEM.md](./06-COMPONENT-SYSTEM.md) | Components using assets |
| [docs/07-JAVASCRIPT-ARCHITECTURE.md](./07-JAVASCRIPT-ARCHITECTURE.md) | JS layout |
| [docs/16-ASSETS.md](./16-ASSETS.md) | This document |

---

## 11. Conclusion

A clear `assets/` layout makes the Fleet frontend easier to learn, change, and connect to Laravel later.

CSS stays centralized, JavaScript stays modular, and images stay limited to production branding and placeholders. Icons and fonts come from known CDNs, so the repo stays light while the UI remains consistent.

When you add or remove resources, keep this structure and update the documentation so the next developer can find everything quickly.

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `docs/16-ASSETS.md` |
| Type | Assets organization guide |
| Production changes | None |
| Local icons folder | Not present |
| Local fonts folder | Not present |
| Icon library | Phosphor Icons (CDN) |
| Font | Poppins (Google Fonts CDN) |
