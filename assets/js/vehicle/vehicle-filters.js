/* ==========================================
   Vehicle Search & Filters
========================================== */

function initVehicleFilters() {
  const searchInput = document.getElementById("vehicleSearch");
  const typeFilter = document.getElementById("vehicleTypeFilter");
  const statusFilter = document.getElementById("vehicleStatusFilter");
  const refreshBtn = document.getElementById("refreshVehicles");

  if (!searchInput || !typeFilter || !statusFilter) return;

  function filterVehicles() {
    const keyword = searchInput.value.toLowerCase();
    const type = typeFilter.value.toLowerCase();
    const status = statusFilter.value.toLowerCase();

    document.querySelectorAll("#vehicleTableBody tr").forEach((row) => {
      const vehicle =
        row.querySelector(".vehicle-name")?.textContent.toLowerCase() || "";

      const plate = row.children[2]?.textContent.toLowerCase() || "";

      const vehicleType = row.children[3]?.textContent.toLowerCase() || "";

      const driver =
        row.querySelector(".driver-info span")?.textContent.toLowerCase() || "";

      const vehicleStatus =
        row.querySelector(".status-badge")?.textContent.toLowerCase() || "";

      const matchesSearch =
        vehicle.includes(keyword) ||
        plate.includes(keyword) ||
        driver.includes(keyword);

      const matchesType = type === "all" || vehicleType === type;

      const matchesStatus = status === "all" || vehicleStatus.trim() === status;

      row.style.display =
        matchesSearch && matchesType && matchesStatus ? "" : "none";
    });
  }

  searchInput.addEventListener("input", filterVehicles);
  typeFilter.addEventListener("change", filterVehicles);
  statusFilter.addEventListener("change", filterVehicles);

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      searchInput.value = "";
      typeFilter.value = "all";
      statusFilter.value = "all";
      filterVehicles();
    });
  }
}

