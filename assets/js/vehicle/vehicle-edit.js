/* ==========================================
   Edit Vehicle Modal
========================================== */

function getEditVehicleRowText(row, columnIndex, selector) {
  const selectedElement = selector ? row.querySelector(selector) : null;
  const cell = row.children?.[columnIndex];
  const value = selectedElement ? selectedElement.textContent : cell?.textContent;

  return value && value.trim() ? value.trim() : "";
}

function setEditVehicleFieldValue(id, value) {
  const field = document.getElementById(id);

  if (field) {
    field.value = value;
  }
}

function setEditVehicleSelectValue(id, value) {
  const select = document.getElementById(id);

  if (!select) return;

  if (
    value &&
    !Array.from(select.options).some((option) => option.value === value)
  ) {
    const option = document.createElement("option");

    option.value = value;
    option.textContent = value;
    select.appendChild(option);
  }

  select.value = value;
}

function openEditVehicleModal(modal) {
  if (!modal) return;

  if (!modal.classList.contains("show")) {
    modal.dataset.previousBodyOverflow = document.body.style.overflow;
  }

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeEditVehicleModal(modal) {
  if (!modal || !modal.classList.contains("show")) return;

  modal.classList.remove("show");
  document.body.style.overflow = modal.dataset.previousBodyOverflow || "";
  delete modal.dataset.previousBodyOverflow;
  modal.currentRow = null;
}

function populateEditVehicleModal(modal, row) {
  if (!modal || !row) return;

  modal.currentRow = row;

  setEditVehicleFieldValue(
    "editVehicleName",
    getEditVehicleRowText(row, 1, ".vehicle-name"),
  );
  setEditVehicleFieldValue("editVehiclePlate", getEditVehicleRowText(row, 2));
  setEditVehicleSelectValue("editVehicleType", getEditVehicleRowText(row, 3));
  setEditVehicleSelectValue(
    "editVehicleDriver",
    getEditVehicleRowText(row, 4, ".driver-info span"),
  );
  setEditVehicleSelectValue(
    "editVehicleFuel",
    row.dataset.fuelType || "Diesel",
  );
  setEditVehicleSelectValue(
    "editVehicleStatus",
    getEditVehicleRowText(row, 5, ".status-badge"),
  );
  setEditVehicleFieldValue("editVehicleNotes", row.dataset.notes || "");
}

function updateVehicleActionLabels(row, name) {
  const checkbox = row.querySelector(".vehicle-checkbox");
  const viewButton = row.querySelector(".action-btn.view");
  const editButton = row.querySelector(".action-btn.edit");
  const deleteButton = row.querySelector(".action-btn.delete");

  checkbox?.setAttribute("aria-label", `Select ${name}`);
  viewButton?.setAttribute("aria-label", `View ${name}`);
  editButton?.setAttribute("aria-label", `Edit ${name}`);
  deleteButton?.setAttribute("aria-label", `Delete ${name}`);
}

function refreshVehicleAfterEdit() {
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

function initEditVehicleModal() {
  const modal = document.getElementById("editVehicleModal");
  const form = document.getElementById("editVehicleForm");
  const closeButton = document.getElementById("closeEditVehicleModal");
  const cancelButton = document.getElementById("cancelEditVehicle");

  if (!modal || !form || modal.dataset.editVehicleModalInitialized === "true") {
    return;
  }

  modal.dataset.editVehicleModalInitialized = "true";

  document.addEventListener("click", (event) => {
    if (!event.target || typeof event.target.closest !== "function") return;

    const editButton = event.target.closest(".action-btn.edit");

    if (!editButton) return;

    const row = editButton.closest("tr");

    if (!row) return;

    populateEditVehicleModal(modal, row);
    openEditVehicleModal(modal);
  });

  closeButton?.addEventListener("click", () => closeEditVehicleModal(modal));
  cancelButton?.addEventListener("click", () => closeEditVehicleModal(modal));

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeEditVehicleModal(modal);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeEditVehicleModal(modal);
    }
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const row = modal.currentRow;

    if (!row) return;

    const name = document.getElementById("editVehicleName")?.value.trim() || "";
    const plate = document.getElementById("editVehiclePlate")?.value.trim() || "";
    const type = document.getElementById("editVehicleType")?.value || "";
    const driver = document.getElementById("editVehicleDriver")?.value || "";
    const fuelType = document.getElementById("editVehicleFuel")?.value || "";
    const status = document.getElementById("editVehicleStatus")?.value || "";
    const notes = document.getElementById("editVehicleNotes")?.value.trim() || "";
    const nameElement = row.querySelector(".vehicle-name");
    const subtitleElement = row.querySelector(".vehicle-info small");
    const driverElement = row.querySelector(".driver-info span");
    const driverAvatar = row.querySelector(".driver-avatar");
    const statusBadge = row.querySelector(".status-badge");

    if (nameElement) {
      nameElement.textContent = name;
    }

    if (subtitleElement) {
      subtitleElement.textContent = type;
    }

    if (row.children[2]) {
      row.children[2].textContent = plate;
    }

    if (row.children[3]) {
      row.children[3].textContent = type;
    }

    if (driverElement) {
      driverElement.textContent = driver;
    }

    if (driverAvatar) {
      driverAvatar.textContent = driver.substring(0, 2).toUpperCase();
    }

    if (statusBadge) {
      const statusClass =
        typeof getVehicleStatusClass === "function"
          ? getVehicleStatusClass(status)
          : "out";

      statusBadge.textContent = status;
      statusBadge.className = `status-badge ${statusClass}`;
    }

    row.dataset.fuelType = fuelType;
    row.dataset.notes = notes;
    updateVehicleActionLabels(row, name);
    refreshVehicleAfterEdit();

    form.reset();
    closeEditVehicleModal(modal);

    if (typeof window.showToast === "function") {
      window.showToast("Vehicle updated successfully.", "success");
    }
  });
}
