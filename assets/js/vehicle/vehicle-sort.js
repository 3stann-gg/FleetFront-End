/* ==========================================
   Sorting
========================================== */

function initVehicleSorting() {
  const tbody = document.getElementById("vehicleTableBody");

  if (!tbody) return;

  let current = -1;
  let asc = true;

  document.querySelectorAll(".sortable").forEach((header) => {
    header.addEventListener("click", () => {
      const column = Number(header.dataset.column);

      asc = current === column ? !asc : true;

      current = column;

      const rows = [...tbody.querySelectorAll("tr")];

      rows.sort((a, b) => {
        const first = a.children[column].innerText.trim();

        const second = b.children[column].innerText.trim();

        return asc ? first.localeCompare(second) : second.localeCompare(first);
      });

      tbody.innerHTML = "";

      rows.forEach((row) => tbody.appendChild(row));
    });
  });
}
