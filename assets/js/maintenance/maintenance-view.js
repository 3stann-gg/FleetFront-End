let viewMaintenanceInitialized = false;

const viewMaintenanceModal = {
  currentRow: null,
};

function initViewMaintenanceModal() {
  if (viewMaintenanceInitialized) {
    return;
  }

  const modal = document.getElementById("viewMaintenanceModal");
  const container = document.getElementById("view-maintenance-modal");

  if (!modal || !container) {
    viewMaintenanceInitialized = true;
    return;
  }

  document.addEventListener("click", (event) => {
    const openBtn = event.target.closest(".action-btn.view-maintenance");

    if (openBtn) {
      const row = openBtn.closest("tr");

      if (row) {
        openViewMaintenanceModal(row);
      }

      return;
    }

    if (event.target.closest("#closeViewMaintenanceModal")) {
      closeViewMaintenanceModal();
      return;
    }

    if (event.target.closest("#closeViewMaintenanceBtn")) {
      closeViewMaintenanceModal();
      return;
    }

    if (
      event.target === modal
    ) {
      closeViewMaintenanceModal();
      return;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeViewMaintenanceModal();
    }
  });

  viewMaintenanceInitialized = true;
}

function openViewMaintenanceModal(row) {
  const modal = document.getElementById("viewMaintenanceModal");

  if (!modal) {
    return;
  }

  viewMaintenanceModal.currentRow = row;

  const getText = (selector, fallback = "Not provided") => {
    const el = row.querySelector(selector);
    return el ? el.textContent.trim() : fallback;
  };

  const getData = (key, fallback = "Not provided") => {
    const val = row.dataset[key];
    return val && val.trim() !== "" ? val.trim() : fallback;
  };

  const number = getText(".maintenance-number");
  const vehicle = getText(".maintenance-vehicle");
  const serviceType = getText(".maintenance-service-type");
  const technician = getText(".maintenance-technician");
  const scheduledDate = getText(".maintenance-scheduled-date");
  const completionDate = getText(".maintenance-completion-date");
  const cost = getText(".maintenance-cost");
  const priority = getText(".maintenance-priority") !== "Not provided"
    ? getText(".maintenance-priority")
    : getData("priority");
  const statusText = getText(".status-badge");

  const statusMap = {
    "Scheduled": "scheduled",
    "In Progress": "trip",
    "Completed": "completed",
    "Cancelled": "cancelled"
  };
  const statusClass = statusMap[statusText] || "scheduled";

  const statusEl = document.getElementById("viewMaintenanceStatus");
  if (statusEl) {
    statusEl.className = "status-badge " + statusClass;
    statusEl.textContent = statusText;
  }

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) {
      el.textContent = value;
    }
  };

  setText("viewMaintenanceNumber", number);
  setText("viewMaintenanceVehicle", vehicle);
  setText("viewMaintenancePriority", priority);
  setText("viewMaintenanceServiceType", serviceType);
  setText("viewMaintenanceTechnician", technician);
  setText("viewMaintenanceScheduledDate", scheduledDate);
  setText("viewMaintenanceCompletionDate", completionDate);
  setText("viewMaintenanceCost", cost);
  setText("viewMaintenanceOdometer", getData("odometer"));
  setText("viewMaintenanceDescription", getData("description"));
  setText("viewMaintenancePartsUsed", getData("partsUsed"));
  setText("viewMaintenanceNotes", getData("notes"));

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeViewMaintenanceModal() {
  const modal = document.getElementById("viewMaintenanceModal");

  if (!modal) {
    return;
  }

  modal.classList.remove("show");
  document.body.style.overflow = "";
  viewMaintenanceModal.currentRow = null;
}
