# AGENTS.md

# HIMS Fleet & Transportation Management Frontend

## Project Overview

This repository contains the frontend of the Fleet & Transportation Management module for the Hospital Information Management System (HIMS).

Current scope:

- Dashboard
- Vehicle Management
- Reservation Management
- Dispatch Management
- Maintenance Management
- Fuel Management (Upcoming)
- Reports (Upcoming)

Backend integration will be implemented later using Laravel.

---

# Tech Stack

Frontend

- HTML5
- CSS3
- Bootstrap 5
- Vanilla JavaScript (ES6)

Backend (Future)

- Laravel
- MySQL

---

# General Rules

Implement only the requested feature.

Never rewrite working code.

Never refactor unrelated files.

Never modify another module unless explicitly requested.

Only modify the files listed in the task.

---

# JavaScript Rules

Use:

- const by default
- let only if reassignment is required

Never use:

- var

Prefer:

- Event Delegation
- Modular functions
- Guard clauses

Avoid:

- Duplicate listeners
- Global variables
- Inline JavaScript

---

# Modal Pattern

Every modal follows this lifecycle:

Component HTML

↓

include.js loads component

↓

init...

↓

Open

↓

Populate

↓

Validate

↓

Save / Update

↓

Close

Do not combine responsibilities.

---

# Validation

Validation belongs only inside the module validation file.

Never validate:

- include.js
- createRow()

---

# Table Rules

Every module uses createRow().

Hidden values are stored in:

data-\*

Never parse visible text when dataset exists.

---

# Search

Search controls visibility only.

Never delete rows.

---

# Filters

Filters must use dataset flags.

Example:

dataset.matchesFilter

Never use style.display as filter state.

---

# Pagination

Pagination affects only visible rows.

Never modify filter state.

---

# Statistics

Statistics update after:

- Add
- Edit
- Delete

Ignore helper rows.

---

# Export

Excel

PDF

Print

must export filtered data.

Never export helper rows.

---

# HTML

Use semantic HTML.

All labels must match controls.

Maintain accessibility.

---

# CSS

Reuse existing classes.

Avoid duplicate styles.

Avoid inline styles.

Never rename existing classes.

---

# Quality Checklist

Before finishing any task:

- No duplicate listeners
- No duplicate IDs
- No inline CSS
- No inline JS
- No console errors
- Existing functionality preserved
- git diff --check passes

---

# Response Format

Always end with:

Files modified

Functions implemented

Validation result
