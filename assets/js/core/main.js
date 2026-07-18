/* =====================================
   Active Sidebar Navigation
===================================== */

function initializePage() {
  const currentPage = document.body.dataset.page;

  if (!currentPage) return;

  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");

    if (link.dataset.page === currentPage) {
      link.classList.add("active");
    }
  });
}

/* =====================================
   Desktop Sidebar Collapse
===================================== */

const HIMS_FLEET_SIDEBAR_COLLAPSED_KEY = "himsFleetSidebarCollapsed";

function isDesktopSidebarViewport() {
  return window.matchMedia("(min-width: 992px)").matches;
}

function getDesktopSidebarCollapsedPreference() {
  try {
    return localStorage.getItem(HIMS_FLEET_SIDEBAR_COLLAPSED_KEY) === "true";
  } catch {
    return false;
  }
}

function setDesktopSidebarCollapsedPreference(collapsed) {
  try {
    localStorage.setItem(HIMS_FLEET_SIDEBAR_COLLAPSED_KEY, String(collapsed));
  } catch {
    /* Storage may be unavailable; UI state still applies for the session. */
  }
}

/**
 * Apply saved desktop collapse preference early to reduce layout flash.
 * Safe to call before the toggle exists; does not bind listeners.
 */
function applyEarlyDesktopSidebarCollapsedState() {
  if (!document.body) return;

  if (isDesktopSidebarViewport() && getDesktopSidebarCollapsedPreference()) {
    document.body.classList.add("sidebar-collapsed");
  } else {
    document.body.classList.remove("sidebar-collapsed");
  }
}

function updateDesktopSidebarToggleAria(toggle, collapsed) {
  if (!toggle) return;

  const expanded = !collapsed;
  toggle.setAttribute("aria-expanded", String(expanded));
  toggle.setAttribute(
    "aria-label",
    collapsed ? "Expand sidebar" : "Collapse sidebar",
  );

  const icon = toggle.querySelector("i");

  if (icon) {
    icon.className = collapsed
      ? "ph ph-caret-double-right"
      : "ph ph-caret-double-left";
  }
}

/**
 * Sync body class + toggle ARIA for the current viewport.
 * On mobile, visual collapsed state is cleared; localStorage is preserved.
 */
function syncDesktopSidebarCollapseState(toggle) {
  const desktopToggle =
    toggle || document.getElementById("desktopSidebarToggle");
  const preferCollapsed = getDesktopSidebarCollapsedPreference();

  if (!isDesktopSidebarViewport()) {
    document.body.classList.remove("sidebar-collapsed");
    updateDesktopSidebarToggleAria(desktopToggle, false);
    return;
  }

  document.body.classList.toggle("sidebar-collapsed", preferCollapsed);
  updateDesktopSidebarToggleAria(desktopToggle, preferCollapsed);
}

function initDesktopSidebarCollapse() {
  const toggle = document.getElementById("desktopSidebarToggle");

  if (!toggle) return;

  if (toggle.dataset.desktopCollapseInitialized === "true") {
    syncDesktopSidebarCollapseState(toggle);
    return;
  }

  toggle.dataset.desktopCollapseInitialized = "true";
  toggle.type = "button";
  toggle.setAttribute("aria-controls", "sidebar");

  const desktopViewport = window.matchMedia("(min-width: 992px)");

  syncDesktopSidebarCollapseState(toggle);

  toggle.addEventListener("click", () => {
    if (!isDesktopSidebarViewport()) return;

    const nextCollapsed = !document.body.classList.contains("sidebar-collapsed");

    setDesktopSidebarCollapsedPreference(nextCollapsed);
    document.body.classList.toggle("sidebar-collapsed", nextCollapsed);
    updateDesktopSidebarToggleAria(toggle, nextCollapsed);
  });

  const onViewportChange = () => {
    syncDesktopSidebarCollapseState(toggle);
  };

  if (typeof desktopViewport.addEventListener === "function") {
    desktopViewport.addEventListener("change", onViewportChange);
  } else {
    desktopViewport.addListener(onViewportChange);
  }
}

applyEarlyDesktopSidebarCollapsedState();

/* =====================================
   Global Theme System
===================================== */

const HIMS_FLEET_THEME_KEY = "himsFleetTheme";

function getSavedTheme() {
  try {
    return localStorage.getItem(HIMS_FLEET_THEME_KEY) === "dark"
      ? "dark"
      : "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme, options = {}) {
  const persist = options.persist !== false;
  const next = theme === "dark" ? "dark" : "light";

  document.documentElement.setAttribute("data-theme", next);

  if (persist) {
    try {
      localStorage.setItem(HIMS_FLEET_THEME_KEY, next);
    } catch {
      /* Storage may be unavailable */
    }
  }

  syncThemeMenuState();
}

function syncThemeMenuState() {
  const current = getSavedTheme();
  const options = document.querySelectorAll("[data-theme-option]");

  options.forEach((option) => {
    const value = option.getAttribute("data-theme-option");
    const isActive = value === current;

    option.classList.toggle("is-active", isActive);

    if (option.getAttribute("role") === "menuitemradio") {
      option.setAttribute("aria-checked", String(isActive));
    }
  });
}

function applyEarlyTheme() {
  applyTheme(getSavedTheme(), { persist: false });
}

function initThemeControls() {
  const menu = document.getElementById("sidebarProfileMenu");

  if (!menu) return;

  if (menu.dataset.themeControlsInitialized === "true") {
    syncThemeMenuState();
    return;
  }

  menu.dataset.themeControlsInitialized = "true";

  menu.addEventListener("click", (event) => {
    const option = event.target?.closest?.("[data-theme-option]");

    if (!option || option.disabled || option.getAttribute("aria-disabled") === "true") {
      return;
    }

    const theme = option.getAttribute("data-theme-option");

    if (theme !== "light" && theme !== "dark") {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    applyTheme(theme);
  });

  syncThemeMenuState();
}

applyEarlyTheme();

/* =====================================
   Sidebar Profile Dropdown
===================================== */

function initSidebarProfileDropdown() {
  const wrap = document.querySelector(".sidebar-profile-wrap");
  const toggle = document.getElementById("sidebarProfileToggle");
  const menu = document.getElementById("sidebarProfileMenu");

  if (!wrap || !toggle || !menu) return;

  if (wrap.dataset.profileDropdownInitialized === "true") {
    return;
  }

  wrap.dataset.profileDropdownInitialized = "true";

  const setOpen = (open) => {
    wrap.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));

    if (open) {
      menu.removeAttribute("hidden");
    } else {
      menu.setAttribute("hidden", "");
    }
  };

  const isOpen = () => wrap.classList.contains("is-open");

  const closeMenu = () => {
    if (!isOpen()) return;
    setOpen(false);
  };

  const openMenu = () => {
    setOpen(true);
  };

  const toggleMenu = () => {
    if (isOpen()) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleMenu();
  });

  toggle.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (!isOpen()) return;

    const target = event.target;

    if (!(target instanceof Node) || !wrap.contains(target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || !isOpen()) return;

    closeMenu();
    toggle.focus();
  });

  menu.addEventListener("click", (event) => {
    if (event.target?.closest?.("[data-theme-option]")) {
      return;
    }

    const item = event.target?.closest?.('[role="menuitem"], [role="menuitemradio"]');

    if (!item) return;

    /* Frontend placeholder — no navigation or auth */
    event.preventDefault();
    closeMenu();
  });
}

/* =====================================
   Responsive Sidebar Navigation
===================================== */

function initResponsiveNavigation() {
  const sidebarHost = document.getElementById("sidebar");
  const navbarHost = document.getElementById("navbar");
  const sidebar = sidebarHost?.querySelector(".sidebar");
  const menuButton = navbarHost?.querySelector(".menu-toggle");

  if (!sidebar || !menuButton) return;

  const compactViewport = window.matchMedia("(max-width: 991px)");
  let backdrop = document.querySelector(".sidebar-backdrop");

  if (!backdrop) {
    backdrop = document.createElement("div");
    backdrop.className = "sidebar-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    document.body.appendChild(backdrop);
  }

  menuButton.type = "button";
  menuButton.setAttribute("aria-controls", "sidebar");

  const closeSidebar = () => {
    document.body.classList.remove("sidebar-open");
    menuButton.setAttribute("aria-expanded", "false");
    backdrop.setAttribute("aria-hidden", "true");
  };

  const openSidebar = () => {
    if (!compactViewport.matches) return;

    document.body.classList.add("sidebar-open");
    menuButton.setAttribute("aria-expanded", "true");
    backdrop.setAttribute("aria-hidden", "false");
  };

  const syncSidebarState = () => {
    if (!compactViewport.matches) {
      closeSidebar();
      return;
    }

    menuButton.setAttribute(
      "aria-expanded",
      String(document.body.classList.contains("sidebar-open")),
    );
  };

  if (sidebar.dataset.responsiveNavigationInitialized === "true") {
    syncSidebarState();
    return;
  }

  sidebar.dataset.responsiveNavigationInitialized = "true";
  menuButton.setAttribute("aria-label", "Toggle navigation menu");
  menuButton.setAttribute("aria-expanded", "false");

  menuButton.addEventListener("click", () => {
    if (!compactViewport.matches) return;

    if (document.body.classList.contains("sidebar-open")) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  backdrop.addEventListener("click", closeSidebar);

  sidebar.addEventListener("click", (event) => {
    const navigationLink = event.target?.closest?.(".nav-link");

    if (!compactViewport.matches || !navigationLink) {
      return;
    }

    closeSidebar();
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      compactViewport.matches &&
      document.body.classList.contains("sidebar-open")
    ) {
      closeSidebar();
    }
  });

  if (typeof compactViewport.addEventListener === "function") {
    compactViewport.addEventListener("change", syncSidebarState);
  } else {
    window.addEventListener("resize", syncSidebarState);
  }

  syncSidebarState();
}
