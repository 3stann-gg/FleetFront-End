/**
 * Navigation UX helpers — active link highlight, no routing engine.
 */
(function () {
  function setActiveNav() {
    const page = document.body.getAttribute("data-page");
    if (!page) return;
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.toggle("active", link.getAttribute("data-page") === page);
    });
  }

  function initMobileMenu() {
    const toggle = document.querySelector(".menu-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("sidebar-open");
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    setActiveNav();
    initMobileMenu();
  });
})();
