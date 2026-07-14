/* ==========================================
   Print
========================================== */

function initVehiclePrint() {
  const btn = document.getElementById("printVehicles");

  if (!btn) return;

  btn.addEventListener("click", () => {
    window.print();

    showToast("Preparing document...", "success");
  });
}
