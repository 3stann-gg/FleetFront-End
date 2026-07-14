async function loadComponent(id, file) {
  const response = await fetch(file);

  if (!response.ok) {
    console.error(`Cannot load ${file}`);
    return;
  }

  document.getElementById(id).innerHTML = await response.text();
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("sidebar", "../components/shared/sidebar.html");
  await loadComponent("navbar", "../components/shared/navbar.html");

  if (document.getElementById("vehicle-modal")) {
    await loadComponent("vehicle-modal", "../components/vehicle/add-vehicle-modal.html");
  }

  if (document.getElementById("view-vehicle-modal")) {
    await loadComponent(
      "view-vehicle-modal",
      "../components/vehicle/view-vehicle-modal.html",
    );
  }

  if (document.getElementById("edit-vehicle-modal")) {
    await loadComponent(
      "edit-vehicle-modal",
      "../components/vehicle/edit-vehicle-modal.html",
    );
  }

  if (document.getElementById("delete-vehicle-modal")) {
    await loadComponent(
      "delete-vehicle-modal",
      "../components/vehicle/delete-vehicle-modal.html",
    );
  }

  /* Toast Component */
  if (document.getElementById("toast")) {
    await loadComponent("toast", "../components/shared/toast.html");
  }

  /* Initialize Modules */

  if (typeof initVehicleModal === "function") {
    initVehicleModal();
  }
  if (typeof initVehicleForm === "function") {
    initVehicleForm();
  }
  if (typeof initViewVehicleModal === "function") {
    initViewVehicleModal();
  }

  if (typeof initEditVehicleModal === "function") {
    initEditVehicleModal();
  }

  if (typeof initDeleteVehicleModal === "function") {
    initDeleteVehicleModal();
  }

  if (typeof initVehicleFilters === "function") {
    initVehicleFilters();
  }

  if (typeof initVehiclePagination === "function") {
    initVehiclePagination();
  }
  if (typeof initVehicleImagePreview === "function") {
    initVehicleImagePreview();
  }

  /* Initialize Toast */

  if (typeof initToast === "function") {
    initToast();
  }
  if (typeof initBulkActions === "function") {
    initBulkActions();
  }
  if (typeof initVehicleExport === "function") {
    initVehicleExport();
  }
  if (typeof initVehiclePrint === "function") {
    initVehiclePrint();
  }
  if (typeof initVehicleSorting === "function") {
    initVehicleSorting();
  }
  if (typeof initVehiclePDFExport === "function") {
    initVehiclePDFExport();
  }
  if (typeof initVehicleImageUpload === "function") {
    initVehicleImageUpload();
  }
  if (typeof initVehicleAdd === "function") {
    initVehicleAdd();
  }
  if (typeof updateVehicleStats === "function") {
    updateVehicleStats();
  }
});
