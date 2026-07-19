/* ==========================================
   Frontend session simulation (not real auth)
   Key: himsFleetSession
   Ready to replace with Laravel Breeze later
========================================== */

const HIMS_FLEET_SESSION_KEY = "himsFleetSession";
const HIMS_FLEET_DEMO_EMAIL = "admin@talahospital.com";
const HIMS_FLEET_DEMO_PASSWORD = "admin123";

function getAuthLoginPath() {
  const path = (window.location.pathname || "").replace(/\\/g, "/");
  if (/\/login(\/|$)/i.test(path) || /login\/index\.html/i.test(path)) {
    return "./index.html";
  }
  /* Module pages live one level deep */
  if (
    /\/(dashboard|fleet|reservation|dispatch|driver|maintenance|fuel|route-planning|cost-analysis|reports|settings|profile)(\/|$)/i.test(
      path,
    )
  ) {
    return "../login/index.html";
  }
  return "./login/index.html";
}

function getAuthDashboardPath() {
  const path = (window.location.pathname || "").replace(/\\/g, "/");
  if (/\/login(\/|$)/i.test(path) || /login\/index\.html/i.test(path)) {
    return "../dashboard/index.html";
  }
  if (
    /\/(dashboard|fleet|reservation|dispatch|driver|maintenance|fuel|route-planning|cost-analysis|reports|settings|profile)(\/|$)/i.test(
      path,
    )
  ) {
    return "../dashboard/index.html";
  }
  return "./dashboard/index.html";
}

function isLoginPage() {
  const path = (window.location.pathname || "").replace(/\\/g, "/");
  return /\/login(\/|$)/i.test(path) || /login\/index\.html/i.test(path);
}

function readSessionFrom(storage) {
  try {
    const raw = storage.getItem(HIMS_FLEET_SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.authenticated !== true) return null;
    return parsed;
  } catch {
    return null;
  }
}

function getSessionRecord() {
  return (
    readSessionFrom(sessionStorage) || readSessionFrom(localStorage) || null
  );
}

function isAuthenticated() {
  return Boolean(getSessionRecord());
}

function getCurrentUser() {
  const session = getSessionRecord();
  if (!session) return null;
  return {
    user: session.user || "Fleet Administrator",
    email: session.email || HIMS_FLEET_DEMO_EMAIL,
    loginTime: session.loginTime || null,
    remember: Boolean(session.remember),
  };
}

function clearAuthSessionOnly() {
  try {
    sessionStorage.removeItem(HIMS_FLEET_SESSION_KEY);
  } catch {
    /* ignore */
  }
  try {
    localStorage.removeItem(HIMS_FLEET_SESSION_KEY);
  } catch {
    /* ignore */
  }
}

/**
 * Frontend-only login simulation.
 * Never stores passwords.
 */
function login(email, password, remember) {
  const normalizedEmail = String(email || "")
    .trim()
    .toLowerCase();
  const pass = String(password || "");

  if (!normalizedEmail || !pass) {
    return { ok: false, error: "Email and password are required." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (
    normalizedEmail !== HIMS_FLEET_DEMO_EMAIL ||
    pass !== HIMS_FLEET_DEMO_PASSWORD
  ) {
    return {
      ok: false,
      error: "Invalid demo credentials. Use the demo account shown on this page.",
    };
  }

  const session = {
    authenticated: true,
    user: "Fleet Administrator",
    email: HIMS_FLEET_DEMO_EMAIL,
    loginTime: new Date().toISOString(),
    remember: Boolean(remember),
  };

  clearAuthSessionOnly();
  try {
    const payload = JSON.stringify(session);
    if (remember) {
      localStorage.setItem(HIMS_FLEET_SESSION_KEY, payload);
    } else {
      sessionStorage.setItem(HIMS_FLEET_SESSION_KEY, payload);
    }
  } catch (error) {
    console.error("Unable to store frontend session:", error);
    return {
      ok: false,
      error: "Unable to create a session. Storage may be unavailable.",
    };
  }

  return { ok: true, session };
}

/**
 * Clears only himsFleetSession. Preserves theme, profile, settings, fleet data.
 */
function logout() {
  clearAuthSessionOnly();
  return true;
}

/**
 * Redirect unauthenticated users away from protected pages.
 * Returns false when redirecting.
 */
function requireAuth() {
  if (isLoginPage()) return true;
  if (isAuthenticated()) return true;
  const loginPath = getAuthLoginPath();
  window.location.replace(loginPath);
  return false;
}

/**
 * Redirect authenticated users away from login.
 */
function redirectIfAuthenticated() {
  if (!isLoginPage()) return false;
  if (!isAuthenticated()) return false;
  window.location.replace(getAuthDashboardPath());
  return true;
}

function confirmFleetLogout() {
  const message =
    "Sign out of HIMS Fleet?\n\nYou will need to sign in again to continue.\nTheme, profile, and fleet settings will be kept.";
  return window.confirm(message);
}

function performFleetLogout() {
  if (!confirmFleetLogout()) return false;
  logout();
  window.location.replace(getAuthLoginPath());
  return true;
}
