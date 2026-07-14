/* ==========================================
   Delete Vehicle Modal
========================================== */

function initDeleteVehicleModal() {
  const modal = document.getElementById("deleteVehicleModal");

  if (!modal) return;

  const cancelBtn = document.getElementById("cancelDeleteVehicle");
  const confirmBtn = document.getElementById("confirmDeleteVehicle");

  let selectedRow = null;

  function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
    selectedRow = null;
  }

  /* ==========================
      CLICK DELETE BUTTON
  ========================== */

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".action-btn.delete");

    if (!btn) return;

    selectedRow = btn.closest("tr");

    const vehicleName =
      selectedRow.querySelector(".vehicle-name")?.textContent.trim() ||
      "this vehicle";

    modal.querySelector("strong").textContent = vehicleName;

    openModal();
  });

  /* ==========================
      CANCEL
  ========================== */

  cancelBtn?.addEventListener("click", closeModal);

  /* ==========================
      CONFIRM DELETE
  ========================== */

  confirmBtn?.addEventListener("click", () => {
    if (!selectedRow) return;

    selectedRow.remove();

    /* Update Dashboard Cards */
    if (typeof updateVehicleStats === "function") {
      updateVehicleStats();
    }

    /* Refresh Pagination */
    if (typeof initVehiclePagination === "function") {
      initVehiclePagination();
    }

    /* Refresh Bulk Toolbar */
    if (typeof initBulkActions === "function") {
      initBulkActions();
    }

    closeModal();

    if (typeof initVehiclePagination === "function") {
      initVehiclePagination();
    }

    if (typeof showToast === "function") {
      showToast("Vehicle deleted successfully.", "success");
    }
  });

  /* ==========================
      CLICK OUTSIDE
  ========================== */

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  /* ==========================
      ESC
  ========================== */

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
}
