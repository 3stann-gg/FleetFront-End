# 🚑 Fleet & Transportation Management System

## Capstone Project

**Title:**

> Development of a Smart Fleet and Transportation Management System for Hospital Information Management System (HIMS) with AI-based Dispatching and Route Optimization

---

# 📌 Module

Fleet & Transportation Management

This repository contains the frontend development of the Fleet & Transportation Management module for the Hospital Information Management System (HIMS).

The frontend is developed using HTML, CSS, Bootstrap, and JavaScript, and is structured to be easily migrated into Laravel Blade templates during backend integration.

---

# 📋 Project Overview

The Fleet & Transportation Management System is a frontend application built for the Hospital Information Management System (HIMS). It provides hospital transport teams with tools to manage vehicles, reservations, and dispatch operations through a clean, responsive, and professional interface. The frontend is structured to be easily migrated into Laravel Blade templates during backend integration.

---

# ✨ Features

- Responsive dashboard with overview cards and sample/frontend statistics
- Vehicle management (create, view, edit, delete, search, filter, export)
- Reservation management (create, view, edit, delete, search, filter, export)
- Dispatch management (create, view, edit, delete, search, filters, bulk actions, export)
- Driver, maintenance, and fuel management modules
- Route planning, cost analysis, and reports UI
- Login, profile, settings, and theme support (light / dark / system)
- Excel, PDF, and print export support (client-side where implemented)
- Bulk selection and bulk delete
- Sorting and pagination
- Mobile-responsive UI

---

# 📊 Current Project Status

| Module                 | Status                                      |
| ---------------------- | ------------------------------------------- |
| Login                  | ✅ Completed (frontend session simulation)  |
| Dashboard              | ✅ Completed (frontend)                     |
| Vehicle Management     | ✅ Completed (frontend)                     |
| Reservation Management | ✅ Completed (frontend)                     |
| Dispatch Management    | ✅ Completed (frontend)                     |
| Driver Management      | ✅ Completed (frontend)                     |
| Maintenance Management | ✅ Completed (frontend)                     |
| Fuel Management        | ✅ Completed (frontend)                     |
| Route Planning         | ✅ Completed (frontend; map is a placeholder)|
| Cost Analysis          | ✅ Completed (frontend)                     |
| Reports                | ✅ Completed (frontend)                     |
| Profile                | ✅ Completed (frontend)                     |
| Settings               | ✅ Completed (frontend)                     |
| Laravel / MySQL        | ⏳ Pending backend integration             |

---

# ✅ Completed Modules (Frontend)

- Login
- Dashboard
- Vehicle Management (`fleet/`)
- Reservation Management
- Dispatch Management
- Driver Management
- Maintenance Management
- Fuel Management
- Route Planning
- Cost Analysis
- Reports
- Profile
- Settings

---

# 🧩 Completed Features by Module

## Dashboard

- Overview cards and sample/frontend statistics (not live production data)
- Responsive layout
- Navigation shortcuts into fleet modules

## Vehicle Management

- Create
- View
- Edit
- Delete
- Search
- Filtering
- Sorting
- Pagination
- Export / print
- Responsive UI

## Reservation Management

- Create
- View
- Edit
- Delete
- Search
- Filtering
- Sorting
- Pagination
- Export / print
- Responsive UI

## Dispatch Management

- Create
- View
- Edit
- Delete
- Search
- Status Filter
- Priority Filter
- Date Filter
- Frontend statistics cards
- Sorting
- Pagination
- Excel Export
- PDF Export
- Print
- Bulk Selection
- Bulk Delete
- Responsive UI
- View → Edit integration

## Driver, Maintenance, and Fuel Management

- List, search/filter, CRUD modals, statistics, pagination, and export patterns as implemented in each module

## Route Planning, Cost Analysis, and Reports

- Full frontend UI for planning, cost views, and multi-view reports
- Client-side charts (custom CSS/SVG) and export tooling where implemented
- Route map area is a visual placeholder until backend map integration

## Login, Profile, and Settings

- Frontend login session simulation (not production security)
- Profile and fleet settings UI with browser storage where used
- Shared light / dark / system theme support

---

# 🔜 Upcoming Work

- Laravel backend integration
- MySQL database connection
- Laravel Breeze session authentication (replace frontend session simulation)
- Live dashboard metrics and server-side reports
- Role-based access control
- HostForge production deployment

> Developer documentation for architecture, modules, limitations, and integration is available under `docs/` (start with `docs/00-START-HERE.md`).

---

# 💻 Tech Stack

## Frontend

- HTML5
- CSS3
- Bootstrap 5.3
- JavaScript (ES6)
- Phosphor Icons (CDN)

## Backend (Planned)

- Laravel (PHP)

## Database (Planned)

- MySQL

## Authentication

- Frontend session simulation (current, local UI only)
- Laravel Breeze with session-based authentication (planned)

## API (Planned)

- RESTful API / web integration with Laravel
- Google Maps API (planned for route map integration)
- Postman (API testing during backend work)

## Version Control

- Git
- GitHub
- GitHub Desktop

## Development Environment

- Local HTTP server or Laragon for static frontend preview
- Laragon for full-stack Laravel development (planned)
- HostForge for production hosting (planned)

---

# 🛠️ Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Open the project folder in your preferred code editor.

3. Use a local development server from the **project root** (e.g., Live Server, Laragon, or `python -m http.server`) so shared components load correctly.

4. Open `login/index.html` (or `index.html`, which redirects to login or dashboard based on frontend session).

> Note: This repository contains the frontend only. Data and login shown in the UI are frontend-only. Backend integration with Laravel is planned. See `docs/00-START-HERE.md` for details.

---

# 📝 Development Notes

- The frontend is structured to be migrated into Laravel Blade templates.
- No Laravel backend is implemented in this repository; data handling shown in the UI is frontend-only (sample data and/or browser storage where used).
- All listed fleet modules above are complete on the frontend; remaining work is primarily backend integration and live data.
- Follow the existing coding standards, CSS architecture, and naming conventions. Prefer `docs/17-CODING-STANDARDS.md` and `docs/03-FOLDER-STRUCTURE.md` for the current frozen structure.
- Use the defined Git commit conventions (`feat:`, `fix:`, `style:`, `refactor:`) for all changes.

---

# 🎯 Objectives

Develop a professional, responsive, and scalable Fleet Management module that supports:

- Fleet & Vehicle Management
- Vehicle Reservation & Dispatch
- Driver & Trip Monitoring
- Fuel Management
- Transport Cost Analysis
- Route Planning & Optimization
- AI-based Dispatch Dashboard (Frontend Placeholder)

---

# 📁 Project Structure

```text
Fleet-Transportation/
│
├── login/
├── dashboard/
├── fleet/
├── reservation/
├── dispatch/
├── driver/
├── maintenance/
├── fuel/
├── cost-analysis/
├── route-planning/
├── reports/
├── settings/
├── profile/
│
├── components/
│   ├── shared/
│   ├── vehicle/
│   ├── reservation/
│   ├── dispatch/
│   ├── driver/
│   ├── maintenance/
│   └── fuel/
│
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
│
├── docs/
├── README.md
└── index.html
```

---

# 🎨 Design System

## Font

Poppins

---

## Theme

Modern

Clean

Professional

Enterprise Dashboard

Healthcare Inspired

Minimalist

Responsive

---

## Primary Colors

| Name       | Hex     |
| ---------- | ------- |
| Primary    | #00A86B |
| Dark Green | #006D43 |
| Sidebar    | #071E27 |
| Background | #F5F5F5 |
| Card       | #FFFFFF |
| Text       | #3D4A41 |

---

# 📱 Responsive Breakpoints

| Device     | Width  |
| ---------- | ------ |
| Desktop XL | 1920px |
| Desktop    | 1440px |
| Laptop     | 1366px |
| Tablet     | 1024px |
| Mobile     | 768px  |

---

# 🧱 Coding Standards

## HTML

- Use Semantic HTML5
- Avoid inline styles
- Avoid inline JavaScript

---

## CSS

- Use CSS Variables
- Component-based CSS
- Reusable classes
- Mobile responsive

---

## JavaScript

- ES6 Syntax
- Modular structure
- No jQuery
- No inline events

---

# 📂 CSS Architecture

assets/css/

base/

components/

pages/

---

# 📂 JavaScript Architecture

assets/js/

core/

components/

auth/

dashboard/

vehicle/

reservation/

dispatch/

driver/

maintenance/

fuel/

route-planning/

cost-analysis/

reports/

settings/

profile/

---

# 📌 Naming Convention

## CSS

fleet-card

fleet-btn

fleet-sidebar

fleet-table

fleet-form

fleet-modal

---

## JavaScript

initSidebar()

initNavbar()

initDashboard()

initVehicleTable()

---

# 🌿 Git Commit Convention

Feature

feat:

Example

feat: create dashboard cards

Bug Fix

fix:

Example

fix: sidebar active state

Style

style:

Example

style: improve button spacing

Refactor

refactor:

Example

refactor: optimize sidebar component

---

# 🚀 Development Roadmap

## Sprint 0

Project Foundation

- Folder Structure
- Design System
- Variables
- Typography
- Reset CSS
- Layout
- Utilities

---

## Sprint 1

Core Layout

- Sidebar
- Navbar
- Footer
- Breadcrumb

---

## Sprint 2

Fleet Dashboard

---

## Sprint 3

Fleet & Vehicle Management

---

## Sprint 4

Vehicle Reservation & Dispatch

---

## Sprint 5

Driver & Trip Monitoring

---

## Sprint 6

Fuel Management

---

## Sprint 7

Transport Cost Analysis

---

## Sprint 8

Route Planning & Optimization

---

## Sprint 9

Responsive Optimization

---

## Sprint 10

Laravel Integration Ready

---

# 👨‍💻 Developers

Bachelor of Science in Information Technology

Capstone Project

Hospital Information Management System

Fleet & Transportation Management Module

---

# 📄 License

This project is developed solely for academic purposes.
