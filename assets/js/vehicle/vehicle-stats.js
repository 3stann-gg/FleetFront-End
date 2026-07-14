/* ==========================================
   Dashboard Statistics
========================================== */

function updateVehicleStats() {
  const rows = document.querySelectorAll("#vehicleTableBody tr");

  let total = 0;
  let available = 0;
  let trip = 0;
  let maintenance = 0;

  rows.forEach((row) => {
    if (row.style.display === "none") return;

    total++;

    const status =
      row.querySelector(".status-badge")?.textContent.trim().toLowerCase() ||
      "";

    switch (status) {
      case "available":
        available++;
        break;

      case "on trip":
      case "ontrip":
        trip++;
        break;

      case "maintenance":
        maintenance++;
        break;
    }
  });

  document.getElementById("totalVehicles").textContent = total;

  document.getElementById("availableVehicles").textContent = available;

  document.getElementById("onTripVehicles").textContent = trip;

  document.getElementById("maintenanceVehicles").textContent = maintenance;
}
