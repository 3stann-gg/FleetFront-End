/* ==========================================
   View Vehicle Modal
========================================== */

function initViewVehicleModal() {
  const modal = document.getElementById("viewVehicleModal");

  if (!modal) return;

  const viewButtons = document.querySelectorAll(".action-btn.view");

  const closeBtn = document.getElementById("closeViewVehicleModal");

  const closeFooterBtn = document.getElementById("closeViewBtn");

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  viewButtons.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (closeFooterBtn) {
    closeFooterBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
}
