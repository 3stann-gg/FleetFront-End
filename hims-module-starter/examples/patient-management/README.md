# Example: Patient Management Module

This folder demonstrates how to customize the **HIMS Module Starter** for a real domain (Patient Management).

It is a **demonstration only**. It is not production Patient EMR software and does not include Fleet or clinical business logic.

---

## What was customized

| Starter default | Patient example |
| --------------- | --------------- |
| Module Name | Patient Management |
| Icon | `ph-users` / `ph-user` |
| Sidebar items | Dashboard, Patients, Admissions, Reports, Settings, Profile |
| Stats labels | Registered, Admitted, Pending intake, ER today |
| Table columns | Patient ID, Name, Ward, Status, Actions |
| Navbar title | Patient Management |

---

## Files

| File | Purpose |
| ---- | ------- |
| `index.html` | Patient registry (management page) |
| `dashboard.html` | Patient module dashboard |
| `create.html` | Register patient form sample |

Shared design system (do not fork):

- `../../../assets/css/style.css`
- `../../../assets/js/core/theme-boot.js`

Module starter assets (optional):

- `../../assets/css/module.css`
- `../../assets/js/*.js`

---

## How this maps to starter steps

1. Copy `hims-module-starter/`
2. Rename module in config + sidebar + navbar
3. Keep HIMS UI classes (`stat-card`, `fleet-table`, `btn-primary`, etc.)
4. Change only labels, icons, columns, and sample data
5. Stay compliant with `docs/HIMS-UI-DESIGN-STANDARD.md`

---

## Open in browser

Serve the repository over HTTP (recommended), then open:

- `hims-module-starter/examples/patient-management/index.html`
