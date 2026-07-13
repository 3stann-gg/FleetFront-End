function initVehicleModal() {
  const modal = document.getElementById("vehicleModal");
  const openBtn = document.getElementById("addVehicleBtn");
  const closeBtn = document.getElementById("closeVehicleModal");

  if (!modal || !openBtn || !closeBtn) return;

  openBtn.addEventListener("click", () => {
    modal.classList.add("show");
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
    }
  });
}