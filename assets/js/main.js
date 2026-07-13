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
