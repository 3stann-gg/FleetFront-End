let deleteMaintenanceInitialized = false;
const deleteMaintenanceModal = {
  currentRow: null,
  opener: null,
};

function populateDeleteMaintenance(row) {
  if (!row) {
    return;
  }

  const getText = (selector, fallback = "Not available") => {
    const el = row.querySelector(selector);
    return el ? el.textContent.trim() : fallback;
  };

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value;
    }
  };

  const number = getText(".maintenance-number");
  const vehicle = getText(".maintenance-vehicle");

  setText("deleteMaintenanceNumber", number);
  setText("deleteMaintenanceVehicle", vehicle);
}

function initDeleteMaintenanceModal() {
  if (deleteMaintenanceInitialized) {
    return;
  }

  const modal = document.getElementById("deleteMaintenanceModal");

  if (!modal || modal.dataset.deleteMaintenanceModalInitialized === "true") {
    return;
  }

  modal.dataset.deleteMaintenanceModalInitialized = "true";
  modal.currentRow = null;

  const openModal = (row) => {
    if (!modal || !row) return;

    modal.currentRow = row;
    populateDeleteMaintenance(row);
    modal.classList.add("show");
    document.body.style.overflow = "hidden";

    const cancelBtn = document.getElementById("cancelDeleteMaintenance");
    if (cancelBtn) {
      cancelBtn.focus();
    }
  };

  const closeModal = (opener) => {
    if (!modal || !modal.classList.contains("show")) return;

    modal.classList.remove("show");
    document.body.style.overflow = "";
    modal.currentRow = null;

    if (opener && opener.isConnected) {
      opener.focus();
    }
  };

  document.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".action-btn.delete-maintenance");

    if (deleteButton) {
      const row = deleteButton.closest("tr");

      if (row) {
        deleteMaintenanceModal.opener = deleteButton;
        openModal(row);
      }
    }
  });

  const closeButton = document.getElementById("closeDeleteMaintenanceModal");
  if (closeButton) {
    closeButton.addEventListener("click", () => {
      closeModal(deleteMaintenanceModal.opener);
    });
  }

  const cancelButton = document.getElementById("cancelDeleteMaintenance");
  if (cancelButton) {
    cancelButton.addEventListener("click", () => {
      closeModal(deleteMaintenanceModal.opener);
    });
  }

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal(deleteMaintenanceModal.opener);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeModal(deleteMaintenanceModal.opener);
    }
  });

  const confirmButton = document.getElementById("confirmDeleteMaintenance");
  if (confirmButton) {
    confirmButton.addEventListener("click", () => {
      if (!modal) {
        return;
      }

      const row = modal.currentRow;
      if (!row || !row.isConnected) {
        closeModal(deleteMaintenanceModal.opener);
        modal.currentRow = null;
        return;
      }

      row.remove();

      closeModal(deleteMaintenanceModal.opener);
      modal.currentRow = null;

      if (typeof updateMaintenanceStatistics === "function") {
        updateMaintenanceStatistics();
      }

      if (typeof updateMaintenancePagination === "function") {
        updateMaintenancePagination();
      }

      if (typeof refreshMaintenanceBulkState === "function") {
        refreshMaintenanceBulkState();
      }

      if (typeof showToast === "function") {
        showToast("Maintenance record deleted successfully.", "success");
      }

      const addBtn = document.getElementById("addMaintenanceBtn");
      if (addBtn && addBtn.isConnected) {
        addBtn.focus();
        return;
      }

      const searchInput = document.getElementById("maintenanceSearch");
      if (searchInput && searchInput.isConnected) {
        searchInput.focus();
      }
    });
  }

  deleteMaintenanceInitialized = true;
}
