/* ==========================================
   Delete Vehicle Modal
========================================== */

function openDeleteVehicleModal(modal) {
  if (!modal.classList.contains("show")) {
    modal.dataset.previousBodyOverflow = document.body.style.overflow;
  }

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeDeleteVehicleModal(modal) {
  if (!modal.classList.contains("show")) return;

  modal.classList.remove("show");
  document.body.style.overflow = modal.dataset.previousBodyOverflow || "";
  delete modal.dataset.previousBodyOverflow;
  modal.currentRow = null;
}

function refreshVehicleAfterDelete() {
  if (typeof updateVehicleStats === "function") {
    updateVehicleStats();
  }

  if (typeof applyVehicleFilters === "function") {
    applyVehicleFilters();
  } else if (typeof refreshVehiclePagination === "function") {
    refreshVehiclePagination();
  }

  if (typeof refreshVehicleBulkState === "function") {
    refreshVehicleBulkState();
  }
}

function initDeleteVehicleModal() {
  const modal = document.getElementById("deleteVehicleModal");
  const cancelButton = document.getElementById("cancelDeleteVehicle");
  const confirmButton = document.getElementById("confirmDeleteVehicle");
  const vehicleNameElement = document.getElementById("deleteVehicleName");

  if (!modal || modal.dataset.deleteVehicleModalInitialized === "true") {
    return;
  }

  modal.dataset.deleteVehicleModalInitialized = "true";

  document.addEventListener("click", (event) => {
    if (!event.target || typeof event.target.closest !== "function") return;

    const deleteButton = event.target.closest(".action-btn.delete");

    if (!deleteButton) return;

    const row = deleteButton.closest("tr");

    if (!row) return;

    const name = row.querySelector(".vehicle-name")?.textContent.trim() ||
      "this vehicle";

    modal.currentRow = row;

    if (vehicleNameElement) {
      vehicleNameElement.textContent = name;
    }

    openDeleteVehicleModal(modal);
  });

  cancelButton?.addEventListener("click", () => closeDeleteVehicleModal(modal));

  confirmButton?.addEventListener("click", () => {
    const row = modal.currentRow;

    if (!row) return;

    row.remove();
    closeDeleteVehicleModal(modal);
    refreshVehicleAfterDelete();

    if (typeof window.showToast === "function") {
      window.showToast("Vehicle deleted successfully.", "success");
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeDeleteVehicleModal(modal);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeDeleteVehicleModal(modal);
    }
  });
}
