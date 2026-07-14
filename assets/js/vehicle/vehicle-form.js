/* ==========================================
   Vehicle Form Dropdowns
========================================== */

function initVehicleForm() {
  const vehicleType = document.getElementById("vehicleType");
  const vehicleDriver = document.getElementById("vehicleDriver");
  const vehicleFuel = document.getElementById("vehicleFuel");
  const vehicleStatus = document.getElementById("vehicleStatus");

  if (vehicleType) {
    vehicleType.innerHTML = `
      <option value="">Select Vehicle Type</option>
      <option>Ambulance</option>
      <option>Patient Van</option>
      <option>Service Vehicle</option>
      <option>SUV</option>
      <option>Motorcycle</option>
    `;
  }

  if (vehicleDriver) {
    vehicleDriver.innerHTML = `
      <option value="">Select Driver</option>
      <option>Juan Dela Cruz</option>
      <option>Pedro Santos</option>
      <option>Maria Reyes</option>
      <option>Carlos Mendoza</option>
    `;
  }

  if (vehicleFuel) {
    vehicleFuel.innerHTML = `
      <option value="">Select Fuel Type</option>
      <option>Diesel</option>
      <option>Gasoline</option>
      <option>Electric</option>
      <option>Hybrid</option>
    `;
  }

  if (vehicleStatus) {
    vehicleStatus.innerHTML = `
      <option value="">Select Status</option>
      <option>Available</option>
      <option>On Trip</option>
      <option>Maintenance</option>
      <option>Out of Service</option>
    `;
  }
}

