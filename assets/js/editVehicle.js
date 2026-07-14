/* ==========================================
   Edit Vehicle Modal
========================================== */

function initEditVehicleModal() {
  const modal = document.getElementById("editVehicleModal");

  if (!modal) return;

  const closeBtn = document.getElementById("closeEditVehicleModal");
  const cancelBtn = document.getElementById("cancelEditVehicle");

  function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  // Close Buttons
  closeBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);

  // Click Outside
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  /* ===============================
      CLICK EDIT BUTTON
  =============================== */

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".action-btn.edit");

    if (!btn) return;

    const row = btn.closest("tr");

    // Save row para magamit mamaya sa Save Changes
    modal.currentRow = row;

    const name = row.querySelector(".vehicle-name")?.textContent.trim() || "";

    const fuel =
      row.querySelector(".fuel-progress span")?.textContent.trim() || "100%";

    const plate = row.children[2].textContent.trim();

    const type = row.children[3].textContent.trim();

    const driver =
      row.querySelector(".driver-info span")?.textContent.trim() || "";

    const status = row.querySelector(".status-badge")?.textContent.trim() || "";

    // Fill Form
    document.getElementById("editVehicleName").value = name;

    document.getElementById("editVehiclePlate").value = plate;

    document.getElementById("editVehicleType").value = type;

    document.getElementById("editVehicleDriver").value = driver;

    document.getElementById("editVehicleStatus").value = status;

    // Optional lang muna dahil wala pang fuel column sa row
    document.getElementById("editVehicleFuel").value = "Diesel";

    openModal();
  });
  const form = document.getElementById("editVehicleForm");

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const row = modal.currentRow;

    if (!row) return;

    const name = document.getElementById("editVehicleName").value;

    const plate = document.getElementById("editVehiclePlate").value;

    const type = document.getElementById("editVehicleType").value;

    const driver = document.getElementById("editVehicleDriver").value;

    const status = document.getElementById("editVehicleStatus").value;

    // Vehicle Name
    row.querySelector(".vehicle-name").textContent = name;

    // Subtitle
    row.querySelector(".vehicle-info small").textContent = type;

    // Plate
    row.children[2].textContent = plate;

    // Type
    row.children[3].textContent = type;

    // Driver
    row.querySelector(".driver-info span").textContent = driver;

    row.querySelector(".driver-avatar").textContent = driver
      .substring(0, 2)
      .toUpperCase();

    // Status
    const badge = row.querySelector(".status-badge");

    badge.textContent = status;

    badge.className = "status-badge";

    switch (status.toLowerCase()) {
      case "available":
        badge.classList.add("available");
        break;

      case "maintenance":
        badge.classList.add("maintenance");
        break;

      case "on trip":
      case "ontrip":
        badge.classList.add("trip");
        break;

      case "out of service":
        badge.classList.add("out");
        break;
    }

    closeModal();

    updateVehicleStats();

    if (typeof showToast === "function") {
      showToast("Vehicle updated successfully.", "success");
    }
  });
}
