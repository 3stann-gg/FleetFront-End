async function loadComponent(id, file) {
  const response = await fetch(file);

  if (!response.ok) {
    console.error(`Cannot load ${file}`);
    return;
  }

  document.getElementById(id).innerHTML = await response.text();
}
document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent("sidebar", "../components/sidebar.html");

  await loadComponent("navbar", "../components/navbar.html");

  if (document.getElementById("vehicle-modal")) {
    await loadComponent("vehicle-modal", "../components/vehicle-modal.html");
  }

  if (typeof initVehicleModal === "function") {
    initVehicleModal();
  }
});
