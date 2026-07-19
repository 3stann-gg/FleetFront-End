# Troubleshooting Guide

## Fleet & Transportation Management System

**Hospital Information Management System (HIMS)**  
Developer Documentation

---

## 1. Overview

**Purpose of this document**

This guide lists common problems you may hit while working on the Fleet frontend (and later Laravel), plus simple steps to fix them.

**Why troubleshooting matters**

- Saves time during demos and development.  
- Prevents “random” fixes that break the frozen structure.  
- Helps teammates solve the same issues the same way.

**When to use this guide**

- A page looks broken or blank.  
- Sidebar, CSS, or JavaScript does not load.  
- Login redirect loops or fails.  
- GitHub does not show your latest work.  
- Local server or browser behaves oddly.  
- After backend work: database, auth, or deploy errors.

---

## 2. Frontend Issues

These issues match how **this** project is built (static HTML pages, `include.js` fetch, shared CSS/JS, CDN assets).

### Component not loading (empty sidebar / navbar / modals)

| Likely cause | What to do |
| ------------ | ---------- |
| Opened via `file://` | Serve the project from an **HTTP** server (Live Server, `python -m http.server`, etc.) from the **repo root** |
| Wrong working directory | Start the server at the project root so paths like `../components/...` resolve |
| Missing host element | Page must include hosts such as `#sidebar`, `#navbar`, modal containers, `#toast` |
| Network error in DevTools | Check Console/Network for failed `fetch` of `components/shared/sidebar.html` |
| Typo in path | Compare with `assets/js/core/include.js` load paths |

### Broken layout

| Likely cause | What to do |
| ------------ | ---------- |
| `style.css` not loaded | Confirm `<link rel="stylesheet" href="../assets/css/style.css" />` (or correct relative path) |
| Bootstrap CDN blocked | Check Network tab; restore CDN link used by the page |
| Sidebar width vs main content | Desktop uses reserved sidebar width; test at ≥992px and ≤991px separately |
| Collapsed sidebar stuck | Clear or check `localStorage` key `himsFleetSidebarCollapsed` |
| Missing `.app` / `.main-content` structure | Compare with a working module page such as `dashboard/index.html` |

### CSS not updating

| Likely cause | What to do |
| ------------ | ---------- |
| Browser cache | Hard refresh (`Ctrl+F5`) or disable cache in DevTools |
| Edited wrong file | Shared styles are under `assets/css/components/`; page-only under `assets/css/pages/` |
| Forgot import | New CSS files must be imported in `assets/css/style.css` |
| Theme looks “wrong” | Check `html[data-theme]` and `localStorage` key `himsFleetTheme` |

### JavaScript not working

| Likely cause | What to do |
| ------------ | ---------- |
| Script order | Core scripts (`auth.js`, `main.js`, `include.js`, toast) must load before module scripts that depend on them |
| Console error stops execution | Open DevTools → Console; fix the first red error |
| Function never called | Many modules need an `init...` call from `include.js` or the page |
| Auth redirected away | Unauthenticated users are sent to login—create a demo session first |
| Duplicate listeners | Avoid attaching the same listener twice; prefer existing init guards |

### Missing images

| Likely cause | What to do |
| ------------ | ---------- |
| Wrong relative path | From module pages use `../assets/images/...` |
| File not in repo | Brand files live in `assets/images/brand/`; placeholder is `vehicle-placeholder.svg` |
| Icons missing | Icons are **Phosphor CDN**, not local files—check network for `unpkg.com/@phosphor-icons/web` |

### Navigation issues

| Likely cause | What to do |
| ------------ | ---------- |
| Wrong active menu | Body needs correct `data-page` (Vehicles page uses `data-page="vehicles"` while path is `fleet/`) |
| Link 404 | Use paths from sidebar: `../fleet/index.html`, `../dashboard/index.html`, etc. |
| Root redirect confusion | Root `index.html` sends users to login or dashboard based on `himsFleetSession` |
| Login loop | Clear session keys or complete demo login; see [docs/09-AUTHENTICATION.md](./09-AUTHENTICATION.md) |
| Mobile menu not opening | Use navbar menu toggle; sidebar is off-canvas at ≤991px |

### Login / session issues (frontend demo)

| Symptom | What to do |
| ------- | ---------- |
| “Invalid demo credentials” | Use email/password shown on the login page (frontend demo only) |
| Cannot open Dashboard | Sign in first; session key is `himsFleetSession` |
| Logout did not clear theme | Expected—logout clears **session only**, not `himsFleetTheme` |
| Storage error on login | Browser blocked storage; try another browser or allow site data |

---

## 3. Git and GitHub Issues

| Problem | Simple solution |
| ------- | --------------- |
| Repository not updated on your PC | `git pull` (or pull via GitHub Desktop / VS Code) |
| Forgot to pull before editing | Pull first; resolve conflicts; then continue |
| Merge conflicts | Open conflicted files, keep correct code, remove conflict markers, then add + commit |
| Commit not on GitHub | Ensure you **pushed** after commit (`git push`) |
| Commit not appearing locally | Confirm you committed on the correct branch |
| Branch mismatch | Check `git branch` / status; switch to the team branch before work |
| “Your branch is ahead” | You have local commits not pushed yet—push when ready |
| Accidental large/unrelated files | Do not commit secrets or OS junk; unstage and use `.gitignore` |
| Detached HEAD | Checkout a named branch (e.g. `main`) before new commits |

**Habit:** pull → change → test → commit → push.

---

## 4. Local Development Issues

### VS Code / Cursor

| Problem | Solution |
| ------- | -------- |
| Live Server opens wrong folder | Open the **repository root** as the workspace |
| Paths break | Serve from root so `dashboard/`, `assets/`, `components/` are siblings |
| Extensions conflict | Disable extra formatters if they rewrite HTML unexpectedly |

### Local HTTP server

| Problem | Solution |
| ------- | -------- |
| Components fail | Do not rely on double-clicking HTML files (`file://`) |
| Port already in use | Choose another port or stop the other process |
| 404 on assets | Confirm URL is like `http://localhost:PORT/login/index.html` from project root |

This frontend starter does **not** require an npm app build (`package.json` app toolchain is not part of this static project).

### Laragon (for later Laravel work)

| Problem | Solution |
| ------- | -------- |
| Apache/Nginx or MySQL not running | Start Laragon services |
| PHP version mismatch | Select a PHP version supported by your Laravel version |
| Project not reachable | Point virtual host / path to the Laravel app when it exists |

Laragon is for the **future full stack**. The pure frontend can run without Laragon using any static server.

### Browser cache

| Problem | Solution |
| ------- | -------- |
| Old CSS/JS still showing | Hard refresh or clear cache for localhost |
| Stuck theme/session | Clear site data for localhost or remove specific keys in Application → Local Storage / Session Storage |

---

## 5. Backend Integration Issues

These apply when Laravel is connected later. They are general; this repo is still frontend-first.

| Problem | What to check |
| ------- | ------------- |
| Laravel not returning data | Route exists? Controller returns data? Browser Network tab shows request? |
| Database connection problems | `.env` DB host, database name, user, password; MySQL running |
| Authentication errors | Breeze/login routes; session driver; correct credentials in DB |
| Session issues | Cookie domain, `SESSION_DRIVER`, HTTPS vs HTTP, browser blocking cookies |
| Missing environment config | Copy `.env.example` to `.env`, run `php artisan key:generate` when using Laravel |
| CORS errors (if using separate API origin) | Same-origin setup preferred under Fleet host; configure CORS only if needed |
| 419 / CSRF errors | Include CSRF token on web forms; check session still valid |
| 403 Forbidden | Role/policy denied—fix authorization, not only the UI |
| Frontend still shows demo data | Module JS may still use samples—swap data loading to the backend response |

Do not invent endpoints here; see [docs/14-API-CONTRACT.md](./14-API-CONTRACT.md) and [docs/12-BACKEND-INTEGRATION.md](./12-BACKEND-INTEGRATION.md).

---

## 6. Deployment Issues

### Approved setup (project plan)

| Stage | Environment |
| ----- | ----------- |
| Development | Local machine (frontend HTTP server; later Laragon + Laravel + MySQL) |
| Source control | GitHub |
| Production | School-provided **HostForge** |
| Public shape | Fleet **subdomain** (exact hostname from school/HostForge) |

### Common production problems

| Problem | Simple checks |
| ------- | ------------- |
| Environment variables | Production `.env` values set; `APP_KEY` present; `APP_DEBUG=false` in real production |
| Domain / subdomain | DNS points to HostForge; vhost serves the Laravel `public` folder |
| Subdomain access | Confirm `fleet.<school-domain>` (placeholder) resolves; wait for DNS if new |
| SSL / HTTPS | Certificate installed; force HTTPS when school requires it |
| Database credentials | HostForge MySQL user/password/host match `.env` |
| 500 after deploy | Check Laravel logs; storage permissions; missing vendor packages |
| Assets 404 | Build/public path correct; clear caches if using Laravel asset pipeline later |
| Login fails only on server | Cookie `Secure`/`SameSite` settings; HTTPS required for secure cookies |

Exact HostForge hostnames and panels are provided by the school—not hard-coded in this frontend repo.

---

## 7. Browser Issues

| Topic | Tips |
| ----- | ---- |
| Cache | Hard refresh after CSS/JS changes |
| Cookies | Needed later for Laravel sessions; clear if stuck logged-in state |
| Responsive testing | Use DevTools device mode; test widths around 1199px, 991px, 767px (project breakpoints) |
| Developer tools | **Console** for JS errors; **Network** for failed CSS/JS/component fetches; **Application** for storage keys |
| Private mode | May block storage—login simulation can fail |
| Extensions | Ad blockers can block CDNs; try a clean profile if Bootstrap/icons fail |

---

## 8. Best Practices

1. **Always check the browser console** first.  
2. When using Laravel, **read `storage/logs/laravel.log`**.  
3. **Test locally** before pushing or deploying.  
4. **Commit working code** in small, clear commits.  
5. **Backup or branch** before large experiments.  
6. Pull latest code before major work.  
7. Prefer fixing root cause (wrong path, server not running) over random file edits.  
8. Keep the frozen structure—do not “fix” paths mid-debug without docs.  
9. Document new recurring issues in this file.  
10. For demo day: use HTTP server + known demo login + hard refresh.

---

## 9. Related Documentation

| Document | Use when |
| -------- | -------- |
| [docs/00-START-HERE.md](./00-START-HERE.md) | How to run the frontend |
| [docs/03-FOLDER-STRUCTURE.md](./03-FOLDER-STRUCTURE.md) | Where files should live |
| [docs/08-ROUTING.md](./08-ROUTING.md) | Page paths and redirects |
| [docs/09-AUTHENTICATION.md](./09-AUTHENTICATION.md) | Login/session behavior |
| [docs/10-THEME-SYSTEM.md](./10-THEME-SYSTEM.md) | Theme storage and apply |
| [docs/12-BACKEND-INTEGRATION.md](./12-BACKEND-INTEGRATION.md) | Laravel connection plan |
| [docs/15-LOCAL-STORAGE.md](./15-LOCAL-STORAGE.md) | Storage keys |
| [docs/16-ASSETS.md](./16-ASSETS.md) | CSS/JS/images/CDN assets |
| [docs/18-KNOWN-LIMITATIONS.md](./18-KNOWN-LIMITATIONS.md) | Expected missing backend features |
| [docs/19-TROUBLESHOOTING.md](./19-TROUBLESHOOTING.md) | This guide |

---

## 10. Conclusion

Most Fleet frontend problems come from a few causes: serving over `file://`, wrong paths, cache, missing script order, or demo-session redirects.

If you follow the documented folder structure, run a local HTTP server from the project root, and check the browser console, most issues can be fixed quickly. Backend and HostForge problems will add Laravel logs and environment checks—but the same habit applies: observe, isolate, fix, then retest.

---

## Document control

| Field | Value |
| ----- | ----- |
| Path | `docs/19-TROUBLESHOOTING.md` |
| Type | Troubleshooting guide |
| Production code changes | None |
| Frontend runtime | Static multi-page app + CDNs |
| npm app build | Not required for this starter |
