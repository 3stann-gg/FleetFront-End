# Coding Standards

## Fleet & Transportation Management System

**Hospital Information Management System (HIMS)**  
Developer Documentation

---

## 1. Overview

**Purpose of coding standards**

Coding standards are simple rules that keep the Fleet frontend readable and consistent. Everyone on the team writes code in a similar way so the project stays easy to understand.

**Why consistency matters**

- New developers can learn the project faster.  
- Bugs are easier to find.  
- Laravel integration is safer when paths and patterns do not change randomly.  
- Code reviews take less time.

**Benefits for teamwork and maintenance**

- Shared components stay reusable.  
- Files stay in expected folders.  
- Fewer “duplicate” buttons, styles, or scripts.  
- Capstone and HostForge handoff stay cleaner.

These standards follow what this repository already does: HTML pages, a CSS design system, vanilla JavaScript modules, and frozen folder paths.

---

## 2. General Rules

1. **Write clean code** — prefer clear names and short functions over clever tricks.  
2. **Keep files organized** — put code in the correct module or shared folder.  
3. **Avoid duplicate code** — reuse existing components, CSS classes, and helpers.  
4. **Reuse existing components** — sidebar, navbar, modals, toasts, buttons, tables.  
5. **Comment only when necessary** — explain *why*, not every obvious line.  
6. **Do not redesign the UI** during backend work unless approved.  
7. **Do not rename frozen paths** without documenting a breaking change.  
8. **Implement only the requested feature** — avoid unrelated refactors.  
9. **Test in the browser** after changes (especially with a local HTTP server).  
10. **Never store passwords** or secrets in frontend code for production.

---

## 3. HTML Standards

| Practice | Guidance in this project |
| -------- | ------------------------ |
| Semantic HTML | Use real elements: `header`, `main`, `nav`, `section`, `table`, `form`, `label` |
| Indentation | Keep nested tags indented consistently |
| Meaningful classes | Prefer design-system classes (`.btn-primary`, `.fleet-table`, `.stat-card`) |
| Layout consistency | Protected pages use sidebar + navbar hosts + page content |
| Avoid inline styles | Put styles in CSS files |
| Avoid inline JavaScript | Put scripts in `.js` files and load with `<script src="...">` |
| Accessibility | Labels for inputs, useful `aria-*` where the UI already uses them, visible errors |
| IDs | Keep IDs unique; do not duplicate modal host IDs |
| Components | Load shared fragments via `include.js` — do not paste sidebar/navbar into every page |

Login stays a **standalone** page (no sidebar/navbar).

---

## 4. CSS Standards

| Practice | Guidance |
| -------- | -------- |
| Use existing variables | Prefer tokens from `assets/css/base/variables.css` (`--color-primary`, `--space-*`, etc.) |
| Keep styles organized | Base → components → pages → responsive (via `style.css`) |
| Reuse component styles | Buttons, cards, forms, tables, modals live under `assets/css/components/` |
| Separate page styles | Module-only rules go in `assets/css/pages/` |
| Avoid duplicate CSS | Do not create a second button/card system |
| Follow folder structure | Do not invent parallel CSS trees |
| One entry stylesheet | Pages link `assets/css/style.css` |
| Theme support | Style through `data-theme` tokens for light/dark |
| No drive-by renames | Do not rename existing class names without updating all HTML/JS |

Details: [docs/05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md).

---

## 5. JavaScript Standards

This project uses **vanilla ES6** (no jQuery, no SPA framework, no bundler required).

| Practice | Guidance |
| -------- | -------- |
| Meaningful names | e.g. `initVehiclePagination`, `showToast`, `applyTheme` |
| Reusable functions | Prefer small helpers with one job |
| Separate module scripts | Keep vehicle logic under `assets/js/vehicle/`, etc. |
| Avoid globals when possible | Prefer functions; do not introduce unnecessary global state |
| Focused functions | One responsibility per function where practical |
| `const` by default | Use `let` only when reassignment is needed; avoid `var` |
| Event handling | Prefer delegated listeners and init guards (no duplicate listeners) |
| Guard clauses | Exit early when elements are missing |
| Validation | Keep validation logic in the right module validation/form files |
| Tables | Use `data-*` attributes when present; do not parse visible text if dataset exists |
| Search | Search should hide/show rows, not delete them |
| Shared utilities | Use core auth, theme, toast, include — do not copy them into modules |

Details: [docs/07-JAVASCRIPT-ARCHITECTURE.md](./07-JAVASCRIPT-ARCHITECTURE.md).

---

## 6. Naming Conventions

Use the styles already found in the repository:

| Item | Style in this project | Examples |
| ---- | --------------------- | -------- |
| HTML / CSS classes | kebab-case, often with role prefix | `.btn-primary`, `.fleet-table`, `.stat-card`, `.nav-link` |
| CSS files | kebab-case | `route-planning.css`, `cost-analysis.css`, `vehicle.css` |
| JavaScript files | kebab-case with module prefix | `vehicle-add.js`, `dispatch-filter.js`, `reports-charts.js` |
| Core JS files | short kebab-case | `auth.js`, `theme-boot.js`, `include.js` |
| Component HTML | kebab-case action + entity | `add-vehicle-modal.html`, `delete-driver-modal.html` |
| Page folders | kebab-case | `route-planning/`, `cost-analysis/` |
| Images | kebab-case | `hims-fleet-logo.svg`, `vehicle-placeholder.svg` |
| Storage keys | camelCase with `himsFleet` prefix | `himsFleetTheme`, `himsFleetSession` |
| Body page markers | `data-page` values | `dashboard`, `vehicles`, `route-planning` |

**Special case (do not “fix” casually):**

| UI name | Folder / files |
| ------- | -------------- |
| Vehicles page | `fleet/` |
| Vehicle scripts / CSS | `assets/js/vehicle/`, `assets/css/pages/vehicle.css` |

---

## 7. Folder Organization

| Area | Purpose |
| ---- | ------- |
| `*/index.html` module folders | One main page per feature |
| `components/` | Shared HTML fragments (shell + modals) |
| `assets/css/` | Design system and page CSS |
| `assets/js/` | Core, shared, and module scripts |
| `assets/images/` | Brand and placeholder images |
| `docs/` | Developer documentation |
| `login/` | Standalone authentication UI |
| Root `index.html` | Entry redirect |

Full tree and freeze rules: [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md).

---

## 8. Comments

**Add comments when they help**

- Explain a non-obvious business rule.  
- Warn about a temporary frontend-only behavior (for example demo login).  
- Mark integration seams for Laravel later.  
- Clarify a frozen naming exception (`fleet` vs `vehicle`).

**Avoid comments that only restate the code**

```js
// bad: increment i
i = i + 1;
```

Prefer clear function and variable names instead of long comment blocks.

File headers that state module purpose (already common in this repo) are fine when short.

---

## 9. Git Guidelines

Simple team practices for this project:

| Practice | Why |
| -------- | --- |
| Write clear commit messages | Others can understand history quickly |
| Commit related changes together | Easier review and rollback |
| Pull before pushing | Reduces merge conflicts |
| Test before committing | Avoid broken pages in `main` |
| Do not commit secrets | No passwords, API keys, or `.env` with secrets |
| Prefer small commits | One feature or fix per commit when possible |
| Do not commit generated junk | OS files, editor caches, large temp exports |
| Mention docs when structure changes | Update folder/docs if paths change |

Suggested message style:

```text
Add fuel export empty-state handling
Fix sidebar active state on settings page
Docs: add coding standards guide
```

---

## 10. Best Practices

1. Keep code **readable** first.  
2. Keep **formatting consistent** with nearby files.  
3. **Reuse** buttons, modals, toasts, and tables.  
4. **Remove unused code** when you are sure nothing references it.  
5. **Test before pushing** — open the page over HTTP, not only `file://`.  
6. Preserve **light / dark / system** theme behavior.  
7. Preserve **accessibility** basics (labels, focus, errors).  
8. For lists: update stats after add/edit/delete; ignore helper rows.  
9. For filters: use dataset flags, not only `style.display` as state.  
10. For Laravel work: change **data sources**, not the whole UI.

Quality checklist before finishing a task:

- No duplicate listeners  
- No duplicate IDs  
- No inline CSS/JS  
- No console errors on the changed flow  
- Existing features still work  
- `git diff --check` clean when possible  

---

## 11. Related Documentation

| Document | Topic |
| -------- | ----- |
| [docs/00-START-HERE.md](./00-START-HERE.md) | Project entry |
| [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md) | Frozen structure |
| [docs/05-DESIGN-SYSTEM.md](./05-DESIGN-SYSTEM.md) | CSS and UI rules |
| [docs/06-COMPONENT-SYSTEM.md](./06-COMPONENT-SYSTEM.md) | Components |
| [docs/07-JAVASCRIPT-ARCHITECTURE.md](./07-JAVASCRIPT-ARCHITECTURE.md) | JS architecture |
| [docs/16-ASSETS.md](./16-ASSETS.md) | Assets layout |
| [docs/17-CODING-STANDARDS.md](./17-CODING-STANDARDS.md) | This document |

---

## 12. Conclusion

Coding standards keep the Fleet frontend consistent as more people contribute and as Laravel is connected later.

If everyone reuses the same structure, names, and components, the project stays easier to develop, review, test, and maintain—without redesigning screens that already work.

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `docs/17-CODING-STANDARDS.md` |
| Type | Coding standards guide |
| Production code changes | None |
| Language level | Student-friendly, practical |
