# Module Configuration

Define your module identity here, then apply the same values in sidebar, navbar, and page titles.

---

## Module identity

| Setting | Value (edit me) |
| ------- | ---------------- |
| Module display name | `Module Name` |
| Short name | `Module` |
| Suite label | `Hospital Operations Suite` |
| Default page title suffix | `\| HIMS Module` |
| Primary icon (Phosphor) | `ph-folder` |
| Brand tooltip | `HIMS Module` |

---

## Theme

| Setting | Value |
| ------- | ----- |
| Theme system | Shared HIMS/Fleet theme |
| Storage key | `himsFleetTheme` |
| Allowed values | `light`, `dark`, `system` |
| Boot script | Parent `assets/js/core/theme-boot.js` |

Do **not** invent a second theme key.

---

## Sidebar items (frontend routes)

Update `components/sidebar.html` to match:

| Label | `data-page` | Suggested path | Icon |
| ----- | ----------- | -------------- | ---- |
| Dashboard | `dashboard` | `pages/dashboard/index.html` | `ph-squares-four` |
| Records | `management` | `pages/management/index.html` | `ph-folder` |
| Reports | `reports` | `pages/reports/index.html` | `ph-chart-bar` |
| Analytics | `analytics` | `pages/analytics/index.html` | `ph-chart-line` |
| Settings | `settings` | `pages/settings/index.html` | `ph-gear` |
| Profile | `profile` | `pages/profile/index.html` | `ph-user` |

Paths are relative to how you host the starter. Adjust `href` after you place the module.

---

## Page titles

| Page | Title (edit me) |
| ---- | ---------------- |
| Dashboard | Module Dashboard |
| Management | Record Management |
| Create | Create Record |
| Edit | Edit Record |
| View | Record Details |
| Reports | Reports |
| Analytics | Analytics |
| Settings | Settings |
| Profile | My Profile |

---

## Permissions (placeholder only)

Frontend visibility is **not** security. Map these to Laravel later using [docs/21-ROLE-MATRIX.md](../../docs/21-ROLE-MATRIX.md) as a guide.

| Role (example) | Access (placeholder) |
| -------------- | -------------------- |
| Module admin | Full |
| Staff | Limited |
| Viewer | View only |

---

## Routes (frontend only)

| Route key | File |
| --------- | ---- |
| dashboard | `pages/dashboard/index.html` |
| management | `pages/management/index.html` |
| create | `pages/create/index.html` |
| edit | `pages/edit/index.html` |
| view | `pages/view/index.html` |
| reports | `pages/reports/index.html` |
| analytics | `pages/analytics/index.html` |
| settings | `pages/settings/index.html` |
| profile | `pages/profile/index.html` |
| login (optional) | `layouts/authentication-layout.html` |

Backend routes will be defined during Laravel integration—not in this starter.
