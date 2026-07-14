function initBulkActions() {
  const selectAll = document.getElementById("selectAllVehicles");

  const toolbar = document.getElementById("bulkToolbar");

  const selectedCount = document.getElementById("selectedCount");

  const clearBtn = document.getElementById("clearSelection");

  const deleteBtn = document.getElementById("deleteSelected");

  if (!selectAll || !toolbar || !deleteBtn) return;

  function updateToolbar() {
    const checkboxes = document.querySelectorAll(".vehicle-checkbox");

    const checked = document.querySelectorAll(".vehicle-checkbox:checked");

    selectedCount.textContent = `${checked.length} vehicle${checked.length !== 1 ? "s" : ""} selected`;

    toolbar.classList.toggle("show", checked.length > 0);

    selectAll.checked =
      checkboxes.length > 0 && checked.length === checkboxes.length;
  }

  selectAll.addEventListener("change", () => {
    document.querySelectorAll(".vehicle-checkbox").forEach((cb) => {
      cb.checked = selectAll.checked;
    });

    updateToolbar();
  });

  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("vehicle-checkbox")) {
      updateToolbar();
    }
  });

  clearBtn?.addEventListener("click", () => {
    selectAll.checked = false;

    document.querySelectorAll(".vehicle-checkbox").forEach((cb) => {
      cb.checked = false;
    });

    updateToolbar();
  });

  deleteBtn.addEventListener("click", () => {
    const checked = document.querySelectorAll(".vehicle-checkbox:checked");

    if (!checked.length) return;

    checked.forEach((cb) => {
      cb.closest("tr").remove();
    });

    updateVehicleStats();

    updateToolbar();

    if (typeof initVehiclePagination === "function") {
      initVehiclePagination();
    }

    showToast("Vehicle(s) deleted successfully.", "success");
  });

  updateToolbar();
}
