# Role Matrix

## Fleet & Transportation Management System

**Hospital Information Management System (HIMS)**  
Developer Documentation

---

## 1. Overview

**Purpose of the Role Matrix**

This document defines the **approved user roles** for the Fleet module and describes what each role should be allowed to do. It is the official reference when building role-based access control (RBAC).

**Why role-based access is important**

- Hospital fleet data should only be changed by the right staff.  
- Drivers, finance, and dispatchers need different screens and actions.  
- Least privilege reduces accidents and abuse.  
- Clear roles make Laravel policies and middleware easier to design.

**How this supports backend implementation**

- Laravel can map each role identifier to gates, policies, and middleware.  
- Frontend can hide menus for better UX using the same rules.  
- QA can test “allowed” vs “denied” paths per role.  
- Advisers and maintainers have one shared permission source.

**Important status note**

The current frontend does **not** enforce multi-role authorization yet. Login is a frontend session simulation with a default “Fleet Administrator” display identity. Real role enforcement must be implemented in **Laravel**.

---

## 2. User Roles

| Role | Primary responsibility |
| ---- | ---------------------- |
| **Fleet Manager** | Oversees the whole fleet unit: vehicles, people, operations, and high-level performance |
| **Dispatcher** | Coordinates daily trips: reservations, dispatch, drivers, vehicles, and routes |
| **Driver** | Uses limited self-service views related to assigned work and personal profile |
| **Department Head** | Requests and tracks transport for a department; limited operational visibility |
| **Finance** | Reviews costs, fuel spend, and reports; limited ability to change operational records |
| **Maintenance** | Manages vehicle service, fuel logs, and vehicle condition-related data |
| **IT Admin** | Configures system settings, supports users, and handles technical administration |

These seven roles are the **approved** set for this project. Do not invent extra production roles without updating this document.

---

## 3. Laravel Role Identifiers

Use these identifiers in code (roles table, enums, middleware checks):

| Display name | Laravel identifier |
| ------------ | ------------------ |
| Fleet Manager | `fleet_manager` |
| Dispatcher | `dispatcher` |
| Driver | `driver` |
| Department Head | `department_head` |
| Finance | `finance` |
| Maintenance | `maintenance` |
| IT Admin | `it_admin` |

**Naming rules**

- Prefer the identifier (`fleet_manager`) in backend code.  
- Prefer the display name in UI labels.  
- Keep identifiers lowercase with underscores.

---

## 4. Module Access Matrix

Access levels used below:

| Indicator | Meaning |
| --------- | ------- |
| **Full Access** | View + create/edit/delete (and approve where the module supports it), within policy limits |
| **Limited Access** | Some actions only (for example create/view own, or edit subset of fields) |
| **View Only** | Read and export/view screens; no create/edit/delete |
| **No Access** | Module hidden in navigation and blocked by the server |

### Access by module and role

| Module | Fleet Manager | Dispatcher | Driver | Department Head | Finance | Maintenance | IT Admin |
| ------ | ------------- | ---------- | ------ | --------------- | ------- | ----------- | -------- |
| Dashboard | Full Access | Full Access | Limited Access | Limited Access | View Only | Limited Access | View Only |
| Vehicles | Full Access | Limited Access | View Only | View Only | View Only | Limited Access | View Only |
| Reservations | Full Access | Full Access | Limited Access | Limited Access | View Only | No Access | View Only |
| Dispatch | Full Access | Full Access | Limited Access | View Only | No Access | No Access | View Only |
| Drivers | Full Access | Full Access | View Only | No Access | No Access | View Only | View Only |
| Maintenance | Full Access | View Only | No Access | No Access | View Only | Full Access | View Only |
| Fuel Management | Full Access | View Only | Limited Access | No Access | View Only | Full Access | View Only |
| Route Planning | Full Access | Full Access | View Only | No Access | No Access | No Access | View Only |
| Cost Analysis | Full Access | View Only | No Access | View Only | Full Access | View Only | View Only |
| Reports | Full Access | Limited Access | No Access | Limited Access | Full Access | Limited Access | View Only |
| Profile | Limited Access | Limited Access | Limited Access | Limited Access | Limited Access | Limited Access | Full Access |
| Settings | Full Access | No Access | No Access | No Access | No Access | No Access | Full Access |

### Notes for Limited Access (interpretation guide)

| Role | Module | Typical limit (planned) |
| ---- | ------ | ----------------------- |
| Driver | Dashboard | See assigned / personal operational summary only |
| Driver | Vehicles | View assigned vehicle details only |
| Driver | Reservations / Dispatch | View own assignments; no admin CRUD |
| Driver | Fuel | Log fuel only if product allows driver entry; otherwise view own |
| Driver | Profile | Edit own profile fields only |
| Department Head | Reservations | Create/view department requests; no system-wide delete |
| Department Head | Dashboard / Reports | Department-scoped views where data supports it |
| Dispatcher | Vehicles | Assign/update operational fields; avoid destructive master-data wipe without manager rights |
| Dispatcher | Reports | Operational reports only, not full finance deep-dives if restricted |
| Maintenance | Vehicles | Update status/condition related to service; not full fleet master admin unless needed |
| Finance | Fuel / Maintenance | View cost-related records; no operational dispatch control |
| IT Admin | Operational modules | View for support; configuration via Settings/Profile admin tools |

Exact field-level rules can be refined in Laravel policies without changing this matrix’s role list.

---

## 5. Permission Guidelines

Use these permission verbs when writing policies or UI checks:

| Permission | Meaning |
| ---------- | ------- |
| **View** | Open the page or record; read data |
| **Create** | Add a new record (for example new vehicle or reservation) |
| **Edit** | Change an existing record |
| **Delete** | Remove a record (soft-delete preferred in production if chosen later) |
| **Approve** | Change status into an approved/authorized state (reservations, etc.) |
| **Manage** | Administrative control over configuration or broad module settings |

**How they map to matrix levels**

| Matrix level | Typical permissions |
| ------------ | ------------------- |
| Full Access | View + Create + Edit + Delete (+ Approve/Manage when relevant) |
| Limited Access | View + subset of Create/Edit (often “own” or “department”) |
| View Only | View only |
| No Access | None |

---

## 6. Frontend and Backend Responsibilities

| Layer | Responsibility |
| ----- | -------------- |
| **Frontend** | Hide unavailable menu items; disable buttons; show read-only forms for better UX |
| **Laravel backend** | Authenticate the user; authorize every request; validate data; enforce policies |

**Critical rule**

Frontend restrictions alone are **not** security. A user can still call a URL or send a request manually. Laravel middleware and policies must reject unauthorized actions even if the button was hidden.

Recommended pattern:

1. After login, backend provides the user’s role(s).  
2. Frontend uses role to build navigation visibility.  
3. Backend checks the same role on every API/web action.  
4. Return 403 (or equivalent) when denied; frontend shows an error or redirects.

---

## 7. Best Practices

1. **Keep permissions consistent** across similar modules.  
2. Follow **least privilege** — start restrictive, then open access if needed.  
3. **Review this matrix** when a new module is added.  
4. **Update this document** whenever roles or access levels change.  
5. Use the official **Laravel identifiers** in code.  
6. Prefer **policies** for model actions and **middleware** for route groups.  
7. Log sensitive actions (approve, delete, settings changes) when audit is implemented.  
8. Test each role with a dedicated demo user account.  
9. Do not hard-code role checks in many random places—centralize where possible.  
10. Do not invent new roles in code before updating this matrix.

---

## 8. Related Documentation

| Document | Why it helps |
| -------- | ------------ |
| [docs/00-START-HERE.md](./00-START-HERE.md) | Project entry |
| [docs/08-ROUTING.md](./08-ROUTING.md) | Modules and navigation |
| [docs/09-AUTHENTICATION.md](./09-AUTHENTICATION.md) | Login and sessions |
| [docs/11-MODULES.md](./11-MODULES.md) | What each module does |
| [docs/12-BACKEND-INTEGRATION.md](./12-BACKEND-INTEGRATION.md) | Connecting Laravel |
| [docs/13-DATABASE-MAPPING.md](./13-DATABASE-MAPPING.md) | Users/roles tables guidance |
| [docs/14-API-CONTRACT.md](./14-API-CONTRACT.md) | Request authorization expectations |
| [docs/18-KNOWN-LIMITATIONS.md](./18-KNOWN-LIMITATIONS.md) | RBAC not enforced on frontend yet |
| [docs/20-HANDOVER-CHECKLIST.md](./20-HANDOVER-CHECKLIST.md) | Handover verification |
| [docs/21-ROLE-MATRIX.md](./21-ROLE-MATRIX.md) | This document |

---

## 9. Conclusion

A clear role matrix improves **security**, **maintainability**, and **consistency**. Everyone—frontend, backend, and QA—can share the same understanding of who may view or change fleet data.

Implement these roles in Laravel as the source of truth, use the frontend only to match visibility, and keep this file updated when access rules evolve.

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `docs/21-ROLE-MATRIX.md` |
| Type | Role matrix / RBAC reference |
| Approved roles | 7 (fleet_manager … it_admin) |
| Enforced in current frontend | No (planned with Laravel) |
| Production code changes | None |
| Laravel authorization code | Not created in this task |
