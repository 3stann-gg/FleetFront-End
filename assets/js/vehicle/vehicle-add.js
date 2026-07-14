/* ==========================================
   Add Vehicle
========================================== */

function setVehicleFieldValidationMessage(field) {
  if (!field) return;

  field.setCustomValidity("Please complete this required field.");

  const clearValidationMessage = () => field.setCustomValidity("");

  field.addEventListener("input", clearValidationMessage, { once: true });
  field.addEventListener("change", clearValidationMessage, { once: true });
  field.reportValidity();
  field.focus();
}

function createVehicleActionButton(action, label, iconClass) {
  const button = document.createElement("button");
  const icon = document.createElement("i");

  button.type = "button";
  button.className = `action-btn ${action}`;
  button.setAttribute("aria-label", label);
  icon.className = iconClass;
  button.appendChild(icon);

  return button;
}

function createVehicleTableRow(vehicle) {
  const row = document.createElement("tr");
  const checkboxCell = document.createElement("td");
  const checkbox = document.createElement("input");
  const vehicleCell = document.createElement("td");
  const vehicleInfo = document.createElement("div");
  const photo = document.createElement("img");
  const vehicleDetails = document.createElement("div");
  const vehicleName = document.createElement("div");
  const vehicleTypeLabel = document.createElement("small");
  const plateCell = document.createElement("td");
  const typeCell = document.createElement("td");
  const driverCell = document.createElement("td");
  const driverInfo = document.createElement("div");
  const driverAvatar = document.createElement("div");
  const driverName = document.createElement("span");
  const statusCell = document.createElement("td");
  const statusBadge = document.createElement("span");
  const fuelCell = document.createElement("td");
  const fuelProgress = document.createElement("div");
  const fuelProgressBar = document.createElement("div");
  const fuelProgressFill = document.createElement("div");
  const fuelLevel = document.createElement("span");
  const serviceCell = document.createElement("td");
  const actionsCell = document.createElement("td");
  const actions = document.createElement("div");
  const statusClass =
    typeof getVehicleStatusClass === "function"
      ? getVehicleStatusClass(vehicle.status)
      : "available";

  row.dataset.fuelType = vehicle.fuelType || "";
  row.dataset.capacity = vehicle.capacity || "";
  row.dataset.mileage = vehicle.mileage || "";
  row.dataset.purchaseDate = vehicle.purchaseDate || "";
  row.dataset.insuranceExpiry = vehicle.insuranceExpiry || "";
  row.dataset.notes = vehicle.notes || "";

  checkbox.type = "checkbox";
  checkbox.className = "vehicle-checkbox";
  checkbox.setAttribute("aria-label", `Select ${vehicle.name}`);
  checkboxCell.appendChild(checkbox);

  vehicleInfo.className = "vehicle-info";
  photo.className = "vehicle-photo";
  photo.src = vehicle.photoSource;
  photo.alt = `Photo of ${vehicle.name}`;
  vehicleName.className = "vehicle-name";
  vehicleName.textContent = vehicle.name;
  vehicleTypeLabel.textContent = vehicle.type;
  vehicleDetails.append(vehicleName, vehicleTypeLabel);
  vehicleInfo.append(photo, vehicleDetails);
  vehicleCell.appendChild(vehicleInfo);

  plateCell.textContent = vehicle.plate;
  typeCell.textContent = vehicle.type;

  driverInfo.className = "driver-info";
  driverAvatar.className = "driver-avatar";
  driverAvatar.textContent = vehicle.driver.substring(0, 2).toUpperCase();
  driverName.textContent = vehicle.driver;
  driverInfo.append(driverAvatar, driverName);
  driverCell.appendChild(driverInfo);

  statusBadge.className = `status-badge ${statusClass}`;
  statusBadge.textContent = vehicle.status;
  statusCell.appendChild(statusBadge);

  fuelProgress.className = "fuel-progress";
  fuelProgressBar.className = "fuel-progress-bar";
  fuelProgressFill.className = "fuel-progress-fill";
  fuelProgressFill.style.width = "80%";
  fuelLevel.textContent = "80%";
  fuelProgressBar.appendChild(fuelProgressFill);
  fuelProgress.append(fuelProgressBar, fuelLevel);
  fuelCell.appendChild(fuelProgress);

  serviceCell.textContent = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  actions.className = "action-buttons";
  actions.append(
    createVehicleActionButton("view", `View ${vehicle.name}`, "ph ph-eye"),
    createVehicleActionButton("edit", `Edit ${vehicle.name}`, "ph ph-pencil-simple"),
    createVehicleActionButton("delete", `Delete ${vehicle.name}`, "ph ph-trash"),
  );
  actionsCell.appendChild(actions);

  row.append(
    checkboxCell,
    vehicleCell,
    plateCell,
    typeCell,
    driverCell,
    statusCell,
    fuelCell,
    serviceCell,
    actionsCell,
  );

  return row;
}

function initVehicleAdd() {
  const form = document.getElementById("vehicleForm");

  if (!form || form.dataset.vehicleAddInitialized === "true") return;

  const requiredFields = ["vehiclePlate", "vehicleType", "vehicleStatus"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  requiredFields.forEach((field) => {
    field.required = true;
  });

  form.dataset.vehicleAddInitialized = "true";

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const emptyField = requiredFields.find((field) => !field.value.trim());

    if (emptyField) {
      setVehicleFieldValidationMessage(emptyField);
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const tableBody = document.getElementById("vehicleTableBody");
    const preview = document.getElementById("vehiclePreview");

    if (!tableBody || !preview) return;

    const valueFor = (id) => document.getElementById(id)?.value.trim() || "";
    const type = valueFor("vehicleType");
    const placeholderSource =
      typeof getVehiclePlaceholderSource === "function"
        ? getVehiclePlaceholderSource(preview)
        : "";
    const vehicle = {
      name: type,
      plate: valueFor("vehiclePlate"),
      type,
      driver: valueFor("vehicleDriver"),
      status: valueFor("vehicleStatus"),
      fuelType: valueFor("vehicleFuel"),
      capacity: valueFor("vehicleCapacity"),
      mileage: valueFor("vehicleMileage"),
      purchaseDate: valueFor("vehiclePurchaseDate"),
      insuranceExpiry: valueFor("vehicleInsuranceExpiry"),
      notes: valueFor("vehicleNotes"),
      photoSource: preview.src || placeholderSource,
    };

    tableBody.prepend(createVehicleTableRow(vehicle));

    if (typeof updateVehicleStats === "function") {
      updateVehicleStats();
    }

    form.reset();

    if (typeof resetVehicleImagePreview === "function") {
      resetVehicleImagePreview();
    }

    const modal = document.getElementById("vehicleModal");

    if (typeof closeVehicleModal === "function") {
      closeVehicleModal(modal);
    } else {
      modal?.classList.remove("show");
      document.body.style.overflow = "";
    }

    if (typeof applyVehicleFilters === "function") {
      applyVehicleFilters({ resetPage: true });
    } else if (typeof refreshVehiclePagination === "function") {
      refreshVehiclePagination({ reset: true });
    }

    if (typeof refreshVehicleBulkState === "function") {
      refreshVehicleBulkState();
    }

    if (typeof window.showToast === "function") {
      window.showToast("Vehicle added successfully.", "success");
    }
  });
}
