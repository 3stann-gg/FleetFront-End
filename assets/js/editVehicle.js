/* ==========================================
   Edit Vehicle Modal
========================================== */

function initEditVehicleModal() {
  const modal = document.getElementById("editVehicleModal");

  if (!modal) return;

  const editButtons = document.querySelectorAll(".action-btn.edit");

  const closeBtn = document.getElementById("closeEditVehicleModal");

  const cancelBtn = document.getElementById("cancelEditVehicle");

  const editFromView = document.getElementById("editVehicleBtn");

  function openModal() {
    // Isara ang View Modal kung bukas
    const viewModal = document.getElementById("viewVehicleModal");

    if (viewModal) {
      viewModal.classList.remove("show");
    }

    // Siguraduhing sarado ang Delete Modal
    const deleteModal = document.getElementById("deleteVehicleModal");

    if (deleteModal) {
      deleteModal.classList.remove("show");
    }

    // Buksan ang Edit Modal
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  editButtons.forEach((btn) => {
    btn.addEventListener("click", openModal);
  });

  if (editFromView) {
    editFromView.addEventListener("click", openModal);
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
  // Submit Edit Vehicle Form
  const form = modal.querySelector("form");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      // TODO: Update vehicle data dito kapag may backend na

      closeModal();

      if (typeof showToast === "function") {
        showToast("Vehicle updated successfully.", "success");
      }
    });
  }
}
