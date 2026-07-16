/* ==========================================
   View Vehicle Modal
========================================== */

function getViewVehicleRowText(row, columnIndex, selector) {
  const selectedElement = selector ? row.querySelector(selector) : null;
  const cell = row.children?.[columnIndex];
  const value = selectedElement ? selectedElement.textContent : cell?.textContent;

  return value && value.trim() ? value.trim() : "Not provided";
}

function getViewVehicleData(row, key, fallback) {
  const value = row.dataset?.[key];

  return value && value.trim() ? value.trim() : fallback;
}

function setViewVehicleText(modal, id, value) {
  const element = modal.querySelector(`#${id}`);

  if (element) {
    element.textContent = value || "Not provided";
  }
}

function openVehicleDetailsModal(modal) {
  if (!modal.classList.contains("show")) {
    modal.dataset.previousBodyOverflow = document.body.style.overflow;
  }

  modal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeVehicleDetailsModal(modal) {
  if (!modal.classList.contains("show")) return;

  modal.classList.remove("show");
  document.body.style.overflow = modal.dataset.previousBodyOverflow || "";
  delete modal.dataset.previousBodyOverflow;
  modal.currentRow = null;
}

function populateViewVehicleModal(modal, row) {
  const name = getViewVehicleRowText(row, 1, ".vehicle-name");
  const subtitle = getViewVehicleRowText(row, 1, ".vehicle-info small");
  const plate = getViewVehicleRowText(row, 2);
  const type = getViewVehicleRowText(row, 3);
  const driver = getViewVehicleRowText(row, 4, ".driver-info span");
  const status = getViewVehicleRowText(row, 5, ".status-badge");
  const fuelLevel = getViewVehicleRowText(row, 6, ".fuel-progress span");
  const rowImage = row.querySelector(".vehicle-photo");
  const image = modal.querySelector("#viewVehicleImage");
  const statusBadge = modal.querySelector("#viewVehicleStatus");

  if (image) {
    const placeholderSource =
      typeof getVehiclePlaceholderSource === "function"
        ? getVehiclePlaceholderSource(image)
        : "";
    const imageSource = rowImage?.src || placeholderSource;

    if (imageSource) {
      image.src = imageSource;
    }

    image.alt = `Photo of ${name}`;
  }

  setViewVehicleText(modal, "viewVehicleName", name);
  setViewVehicleText(
    modal,
    "viewVehicleSubtitle",
    subtitle === "Not provided" ? type : subtitle,
  );
  setViewVehicleText(modal, "viewPlateNumber", plate);
  setViewVehicleText(modal, "viewVehicleType", type);
  setViewVehicleText(modal, "viewDriver", driver);
  setViewVehicleText(
    modal,
    "viewFuelType",
    getViewVehicleData(row, "fuelType", "Diesel"),
  );
  setViewVehicleText(modal, "viewFuelLevel", fuelLevel);
  setViewVehicleText(
    modal,
    "viewMileage",
    getViewVehicleData(row, "mileage", "58,240 km"),
  );
  setViewVehicleText(
    modal,
    "viewPurchaseDate",
    getViewVehicleData(row, "purchaseDate", "July 12, 2025"),
  );
  setViewVehicleText(
    modal,
    "viewInsuranceExpiry",
    getViewVehicleData(row, "insuranceExpiry", "July 12, 2027"),
  );

  if (statusBadge) {
    const statusClass =
      typeof getVehicleStatusClass === "function"
        ? getVehicleStatusClass(status)
        : "out";

    statusBadge.className = `status-badge ${statusClass}`;
    statusBadge.textContent = status;

    const summaryStatus = modal.querySelector("#viewVehicleStatusSummary");
    if (summaryStatus) {
      summaryStatus.className = `status-badge ${statusClass}`;
      summaryStatus.textContent = status;
    }
  }
}

function initViewVehicleModal() {
  const modal = document.getElementById("viewVehicleModal");
  const closeButton = document.getElementById("closeViewVehicleModal");
  const footerCloseButton = document.getElementById("closeViewBtn");
  const editFromViewButton = document.getElementById("editVehicleBtn");

  if (!modal || modal.dataset.viewVehicleModalInitialized === "true") return;

  modal.dataset.viewVehicleModalInitialized = "true";

  document.addEventListener("click", (event) => {
    if (!event.target || typeof event.target.closest !== "function") return;

    const viewButton = event.target.closest(".action-btn.view");

    if (!viewButton) return;

    const row = viewButton.closest("tr");

    if (!row) return;

    modal.currentRow = row;
    populateViewVehicleModal(modal, row);
    openVehicleDetailsModal(modal);
  });

  closeButton?.addEventListener("click", () => closeVehicleDetailsModal(modal));
  footerCloseButton?.addEventListener("click", () =>
    closeVehicleDetailsModal(modal),
  );
  editFromViewButton?.addEventListener("click", () => {
    const row = modal.currentRow;
    const editModal = document.getElementById("editVehicleModal");

    if (
      !row ||
      !editModal ||
      typeof populateEditVehicleModal !== "function" ||
      typeof openEditVehicleModal !== "function"
    ) {
      return;
    }

    closeVehicleDetailsModal(modal);
    populateEditVehicleModal(editModal, row);
    openEditVehicleModal(editModal);
  });

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeVehicleDetailsModal(modal);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeVehicleDetailsModal(modal);
    }
  });
}
