let editMaintenanceInitialized = false;

function initEditMaintenanceModal() {
  if (editMaintenanceInitialized) return;

  const modal = document.getElementById("editMaintenanceModal");
  if (!modal) return;

  editMaintenanceInitialized = true;

  document.addEventListener("click", (event) => {
    const editBtn = event.target.closest(".action-btn.edit-maintenance");
    if (!editBtn) return;

    const row = editBtn.closest("tr");
    if (!row) return;

    modal.currentRow = row;
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  });

  const closeHandlers = [
    document.getElementById("closeEditMaintenanceModal"),
    document.getElementById("cancelEditMaintenance"),
    modal,
  ];

  closeHandlers.forEach((element) => {
    if (!element) return;

    element.addEventListener("click", (event) => {
      if (element === modal && event.target !== modal) return;
      if (element === modal && event.target.closest(".custom-modal")) return;

      modal.classList.remove("show");
      document.body.style.overflow = "";
      modal.currentRow = null;
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      modal.classList.remove("show");
      document.body.style.overflow = "";
      modal.currentRow = null;
    }
  });
}
