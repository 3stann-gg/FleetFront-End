/* ==========================================
   View Vehicle Modal
========================================== */

function initViewVehicleModal() {
  const modal = document.getElementById("viewVehicleModal");

  if (!modal) return;

  const closeBtn = document.getElementById("closeViewVehicleModal");
  const closeFooterBtn = document.getElementById("closeViewBtn");

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  // CLICK VIEW BUTTON (works even for newly added rows)
  document.addEventListener("click", (e) => {
    console.log("CLICK");
    const btn = e.target.closest(".action-btn.view");

    if (!btn) return;

    const row = btn.closest("tr");

    const vehicleName =
      row.querySelector(".vehicle-name")?.textContent.trim() || "";

    const vehicleImage =
      row.querySelector(".vehicle-photo")?.src ||
      "../assets/images/vehicle-placeholder.png";

    const plate = row.children[2].textContent.trim();

    const type = row.children[3].textContent.trim();

    const driver =
      row.querySelector(".driver-info span")?.textContent.trim() || "";

    const status = row.querySelector(".status-badge")?.textContent.trim() || "";

    const fuel =
      row.querySelector(".fuel-progress span")?.textContent.trim() || "100%";

    // Header
    modal.querySelector("#viewVehicleImage").src = vehicleImage;

    modal.querySelector(".vehicle-profile h3").textContent = vehicleName;

    modal.querySelector(".vehicle-profile p").textContent = type;

    // Detail section
    const details = modal.querySelectorAll(".detail-item p");

    details[0].textContent = plate;
    details[1].textContent = type;
    details[2].textContent = driver;
    details[3].textContent = "Diesel";
    details[4].textContent = fuel;
    details[5].textContent = "58,240 km";
    details[6].textContent = "July 12, 2025";
    details[7].textContent = "July 12, 2027";

    const badge = modal.querySelector(".status-badge");

    badge.textContent = status;

    badge.className = "status-badge";

    switch (status.toLowerCase()) {
      case "available":
        badge.classList.add("available");
        break;

      case "maintenance":
        badge.classList.add("maintenance");
        break;

      case "ontrip":
      case "on trip":
        badge.classList.add("trip");
        break;

      case "out of service":
        badge.classList.add("out");
        break;
    }

    openModal();
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (closeFooterBtn) {
    closeFooterBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
}
