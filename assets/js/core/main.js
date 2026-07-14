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
