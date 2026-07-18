/**
 * Pre-paint theme bootstrap.
 * Load in <head> before styles so dark mode avoids a light flash.
 */
(function applyHimsFleetThemeBoot() {
  try {
    const theme = localStorage.getItem("himsFleetTheme");
    document.documentElement.setAttribute(
      "data-theme",
      theme === "dark" ? "dark" : "light",
    );
  } catch {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
