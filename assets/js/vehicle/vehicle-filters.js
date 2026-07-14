/* ==========================================
   Vehicle Search & Filters
========================================== */

let vehicleFilterState = null;

function getVehicleRowText(row, columnIndex, selector) {
  const selectedElement = selector ? row.querySelector(selector) : null;
  const cell = row.children?.[columnIndex];
  const value = selectedElement ? selectedElement.textContent : cell?.textContent;

  return value ? value.trim() : "";
}

function getVehicleFilterLabel(select) {
  if (!select || select.value === "all") return "";

  const option = select.options[select.selectedIndex];

  return (option?.textContent || select.value).trim().toLowerCase();
}

function normalizeVehicleFilterValue(value) {
  return (value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/^on\s*trip$/, "on trip");
}

function getVehicleDataRows(tableBody) {
  if (!tableBody) return [];

  return Array.from(tableBody.querySelectorAll("tr")).filter((row) => {
    const isHelperRow =
      row.classList.contains("helper-row") ||
      row.classList.contains("empty-state") ||
      row.dataset.helperRow === "true" ||
      row.dataset.temporary === "true";

    return (
      !isHelperRow &&
      Boolean(
        row.querySelector(".vehicle-name") ||
          row.querySelector(".vehicle-checkbox"),
      )
    );
  });
}

function renderVehicleFilterRows(matchingRows) {
  if (!vehicleFilterState) return;

  const matchingRowSet = new Set(matchingRows);

  getVehicleDataRows(vehicleFilterState.tableBody).forEach((row) => {
    row.style.display = matchingRowSet.has(row) ? "" : "none";
  });
}

function applyVehicleFilters({ resetPage = false } = {}) {
  if (!vehicleFilterState) return [];

  const { tableBody, searchInput, typeFilter, statusFilter } = vehicleFilterState;
  const searchQuery = (searchInput?.value || "").trim().toLowerCase();
  const typeValue = normalizeVehicleFilterValue(getVehicleFilterLabel(typeFilter));
  const statusValue = normalizeVehicleFilterValue(
    getVehicleFilterLabel(statusFilter),
  );
  const matchingRows = [];

  getVehicleDataRows(tableBody).forEach((row) => {
    const searchableText = [
      getVehicleRowText(row, 1, ".vehicle-name"),
      getVehicleRowText(row, 2),
      getVehicleRowText(row, 4, ".driver-info span"),
    ]
      .join(" ")
      .toLowerCase();
    const rowType = normalizeVehicleFilterValue(getVehicleRowText(row, 3));
    const rowStatus = normalizeVehicleFilterValue(
      getVehicleRowText(row, 5, ".status-badge"),
    );
    const matchesSearch = !searchQuery || searchableText.includes(searchQuery);
    const matchesType = !typeValue || rowType === typeValue;
    const matchesStatus = !statusValue || rowStatus === statusValue;
    const isMatch = matchesSearch && matchesType && matchesStatus;

    row.dataset.vehicleMatchesFilter = String(isMatch);

    if (isMatch) {
      matchingRows.push(row);
    }
  });

  if (
    typeof refreshVehiclePagination === "function" &&
    refreshVehiclePagination({ reset: resetPage })
  ) {
    return matchingRows;
  }

  renderVehicleFilterRows(matchingRows);

  return matchingRows;
}

function initVehicleFilters() {
  const tableBody = document.getElementById("vehicleTableBody");
  const searchInput = document.getElementById("vehicleSearch");
  const typeFilter = document.getElementById("vehicleTypeFilter");
  const statusFilter = document.getElementById("vehicleStatusFilter");
  const refreshButton = document.getElementById("refreshVehicles");

  if (!tableBody || tableBody.dataset.vehicleFiltersInitialized === "true") {
    return;
  }

  tableBody.dataset.vehicleFiltersInitialized = "true";
  vehicleFilterState = {
    tableBody,
    searchInput,
    typeFilter,
    statusFilter,
  };

  searchInput?.addEventListener("input", () => {
    applyVehicleFilters({ resetPage: true });
  });
  typeFilter?.addEventListener("change", () => {
    applyVehicleFilters({ resetPage: true });
  });
  statusFilter?.addEventListener("change", () => {
    applyVehicleFilters({ resetPage: true });
  });
  refreshButton?.addEventListener("click", () => {
    if (searchInput) {
      searchInput.value = "";
    }

    if (typeFilter) {
      typeFilter.value = "all";
    }

    if (statusFilter) {
      statusFilter.value = "all";
    }

    applyVehicleFilters({ resetPage: true });
  });

  applyVehicleFilters();
}
