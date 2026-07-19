/**
 * Theme helper — prefers shared applyTheme / theme-boot from parent project.
 * Fallback applies data-theme only for local previews.
 */
(function () {
  function setTheme(preference) {
    if (typeof applyTheme === "function") {
      applyTheme(preference);
      return;
    }
    let resolved = "light";
    if (preference === "dark") resolved = "dark";
    else if (preference === "system") {
      resolved =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
    }
    document.documentElement.setAttribute("data-theme", resolved);
    try {
      localStorage.setItem("himsFleetTheme", preference);
    } catch {
      /* ignore */
    }
  }

  window.himsStarterTheme = { setTheme };
})();
