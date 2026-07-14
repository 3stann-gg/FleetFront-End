/* ==========================================
   Dashboard Statistics
========================================== */

function updateVehicleStats() {
  const totalVehicles = document.getElementById("totalVehicles");
  const availableVehicles = document.getElementById("availableVehicles");
  const onTripVehicles = document.getElementById("onTripVehicles");
  const maintenanceVehicles = document.getElementById("maintenanceVehicles");
  const tableBody = document.getElementById("vehicleTableBody");

  if (
    !totalVehicles ||
    !availableVehicles ||
    !onTripVehicles ||
    !maintenanceVehicles ||
    !tableBody
  ) {
    return;
  }

  let total = 0;
  let available = 0;
  let onTrip = 0;
  let maintenance = 0;

  tableBody.querySelectorAll("tr").forEach((row) => {
    const isHelperRow =
      row.classList.contains("helper-row") ||
      row.classList.contains("empty-state") ||
      row.classList.contains("temporary-row") ||
      row.dataset.helperRow === "true" ||
      row.dataset.temporary === "true";
    const isVehicleRow = Boolean(
      row.querySelector(".vehicle-name") ||
        row.querySelector(".vehicle-checkbox"),
    );

    if (isHelperRow || !isVehicleRow) return;

    total += 1;

    const status = (row.querySelector(".status-badge")?.textContent || "")
      .trim()
      .toLowerCase()
      .replace(/[\s-]+/g, "");

    if (status === "available") {
      available += 1;
    } else if (status === "ontrip") {
      onTrip += 1;
    } else if (status === "maintenance") {
      maintenance += 1;
    }
  });

  totalVehicles.textContent = total;
  availableVehicles.textContent = available;
  onTripVehicles.textContent = onTrip;
  maintenanceVehicles.textContent = maintenance;
}
