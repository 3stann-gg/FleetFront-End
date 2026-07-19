/** Generic modal open/close for starter demos */
(function () {
  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("show");
  }

  function closeModal(el) {
    if (!el) return;
    el.classList.remove("show");
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("[data-modal-open]").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.getAttribute("data-modal-open")));
    });
    document.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.addEventListener("click", () => closeModal(btn.closest(".modal-overlay")));
    });
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal(overlay);
      });
    });
  });

  window.himsStarterModal = { openModal, closeModal };
})();
