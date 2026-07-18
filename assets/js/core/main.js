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
