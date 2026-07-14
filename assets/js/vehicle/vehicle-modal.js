/* ==========================================
   Vehicle Modal
========================================== */

function initVehicleModal() {
  const modal = document.getElementById("vehicleModal");

  if (!modal) return;

  const openBtn = document.getElementById("addVehicleBtn");
  const closeBtn = document.getElementById("closeVehicleModal");
  const cancelBtn = modal.querySelector(".btn-outline");

  function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  if (openBtn) {
    openBtn.addEventListener("click", openModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeModal);
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

