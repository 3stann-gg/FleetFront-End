/* ==========================================
   Vehicle Bulk Actions
========================================== */

let vehicleBulkState = null;

function getVehicleBulkRows() {
  if (!vehicleBulkState) return [];

  if (typeof getVehicleDataRows === "function") {
    return getVehicleDataRows(vehicleBulkState.tableBody);
  }

  return Array.from(
    vehicleBulkState.tableBody.querySelectorAll("tr"),
  ).filter((row) => row.querySelector(".vehicle-checkbox"));
}

function getVehicleBulkCheckboxes() {
  return getVehicleBulkRows()
    .map((row) => row.querySelector(".vehicle-checkbox"))
    .filter(Boolean);
}

function getVisibleVehicleBulkCheckboxes() {
  return getVehicleBulkRows()
    .filter((row) => row.style.display !== "none")
    .map((row) => row.querySelector(".vehicle-checkbox"))
    .filter(Boolean);
}

function refreshVehicleBulkState() {
  if (!vehicleBulkState) return;

  const { selectAll, toolbar, selectedCount } = vehicleBulkState;
  const checkboxes = getVehicleBulkCheckboxes();
  const visibleCheckboxes = getVisibleVehicleBulkCheckboxes();
  const selectedCheckboxes = checkboxes.filter((checkbox) => checkbox.checked);
  const selectedVisibleCheckboxes = visibleCheckboxes.filter(
    (checkbox) => checkbox.checked,
  );
  const allVisibleSelected =
    visibleCheckboxes.length > 0 &&
    selectedVisibleCheckboxes.length === visibleCheckboxes.length;

  selectedCount.textContent = `${selectedCheckboxes.length} vehicle${
    selectedCheckboxes.length === 1 ? "" : "s"
  } selected`;
  toolbar.classList.toggle("show", selectedCheckboxes.length > 0);
  selectAll.checked = allVisibleSelected;
  selectAll.indeterminate =
    selectedVisibleCheckboxes.length > 0 && !allVisibleSelected;
}

function clearVehicleSelection() {
  getVehicleBulkCheckboxes().forEach((checkbox) => {
    checkbox.checked = false;
  });

  if (vehicleBulkState) {
    vehicleBulkState.selectAll.checked = false;
    vehicleBulkState.selectAll.indeterminate = false;
  }

  refreshVehicleBulkState();
}

function refreshVehicleAfterBulkDelete() {
  if (typeof applyVehicleFilters === "function") {
    applyVehicleFilters();
  } else if (typeof refreshVehiclePagination === "function") {
    refreshVehiclePagination();
  }

  if (typeof updateVehicleStats === "function") {
    updateVehicleStats();
  }

  refreshVehicleBulkState();
}

function initBulkActions() {
  const tableBody = document.getElementById("vehicleTableBody");
  const selectAll = document.getElementById("selectAllVehicles");
  const toolbar = document.getElementById("bulkToolbar");
  const selectedCount = document.getElementById("selectedCount");
  const clearButton = document.getElementById("clearSelection");
  const deleteButton = document.getElementById("deleteSelected");

  if (
    !tableBody ||
    !selectAll ||
    !toolbar ||
    !selectedCount ||
    !deleteButton
  ) {
    return;
  }

  if (tableBody.dataset.vehicleBulkInitialized === "true") {
    refreshVehicleBulkState();
    return;
  }

  tableBody.dataset.vehicleBulkInitialized = "true";
  vehicleBulkState = {
    tableBody,
    selectAll,
    toolbar,
    selectedCount,
  };

  selectAll.addEventListener("change", () => {
    getVisibleVehicleBulkCheckboxes().forEach((checkbox) => {
      checkbox.checked = selectAll.checked;
    });

    refreshVehicleBulkState();
  });

  tableBody.addEventListener("change", (event) => {
    if (!event.target?.classList?.contains("vehicle-checkbox")) return;

    refreshVehicleBulkState();
  });

  clearButton?.addEventListener("click", clearVehicleSelection);

  deleteButton.addEventListener("click", () => {
    const selectedRows = getVehicleBulkCheckboxes()
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.closest("tr"))
      .filter(Boolean);

    if (selectedRows.length === 0) return;

    selectedRows.forEach((row) => row.remove());
    selectAll.checked = false;
    selectAll.indeterminate = false;
    refreshVehicleAfterBulkDelete();

    if (typeof window.showToast === "function") {
      window.showToast("Vehicle(s) deleted successfully.", "success");
    }
  });

  refreshVehicleBulkState();
}
