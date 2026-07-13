/* ==========================================
   Delete Vehicle Modal
========================================== */

function initDeleteVehicleModal() {
  const modal = document.getElementById("deleteVehicleModal");

  if (!modal) return;

  const deleteButtons = document.querySelectorAll(".action-btn.delete");

  const cancelBtn = document.getElementById("cancelDeleteVehicle");

  const confirmBtn = document.getElementById("confirmDeleteVehicle");

  function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  cancelBtn?.addEventListener("click", closeModal);

  confirmBtn?.addEventListener("click", () => {
    showToast("Vehicle deleted successfully.");

    closeModal();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}
