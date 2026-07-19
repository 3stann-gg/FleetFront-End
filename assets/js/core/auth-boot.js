/**
 * Early frontend session gate (not real security).
 * Runs before page paint of protected modules when loaded in <head>.
 */
(function himsFleetAuthBoot() {
  const KEY = "himsFleetSession";

  function readSession(storage) {
    try {
      const raw = storage.getItem(KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      return parsed && parsed.authenticated === true ? parsed : null;
    } catch {
      return null;
    }
  }

  function isAuthed() {
    return Boolean(readSession(sessionStorage) || readSession(localStorage));
  }

  const path = (window.location.pathname || "").replace(/\\/g, "/");
  const isLogin =
    /\/login(\/|$)/i.test(path) || /login\/index\.html/i.test(path);
  const isRootOnly =
    /\/Fleet-Transportation-Frontend-Starter\/?$/i.test(path) ||
    /\/index\.html$/i.test(path);

  /* Root entry: send users to dashboard (guarded) or login */
  if (isRootOnly && !isLogin && !/\/(dashboard|fleet|login)\//i.test(path)) {
    /* handled by index.html redirect; still fine if this runs */
  }

  if (isLogin) {
    if (isAuthed()) {
      window.location.replace("../dashboard/index.html");
    }
    return;
  }

  /* Protected app pages (one level deep under site root) */
  const isAppPage =
    /\/(dashboard|fleet|reservation|dispatch|driver|maintenance|fuel|route-planning|cost-analysis|reports|settings|profile)(\/|$)/i.test(
      path,
    );

  if (isAppPage && !isAuthed()) {
    window.location.replace("../login/index.html");
  }
})();
