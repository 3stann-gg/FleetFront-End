/* ==========================================
   Pagination
========================================== */

function initVehiclePagination() {
  const tbody = document.getElementById("vehicleTableBody");
  const pagination = document.getElementById("pagination");
  const info = document.getElementById("paginationInfo");

  if (!tbody || !pagination) return;

  const rowsPerPage = 5;

  let currentPage = 1;

  function rows() {
    return [...tbody.querySelectorAll("tr")];
  }

  function render(page) {
    currentPage = page;

    const allRows = rows();

    const start = (page - 1) * rowsPerPage;

    const end = start + rowsPerPage;

    allRows.forEach((row, index) => {
      row.style.display = index >= start && index < end ? "" : "none";
    });

    renderButtons();

    if (info) {
      info.innerHTML = `Showing <strong>${start + 1}</strong> - <strong>${Math.min(end, allRows.length)}</strong> of <strong>${allRows.length}</strong>`;
    }
  }

  function renderButtons() {
    pagination.innerHTML = "";

    const totalPages = Math.ceil(rows().length / rowsPerPage);

    const prev = document.createElement("button");

    prev.innerHTML = `<i class="ph ph-caret-left"></i>`;

    prev.disabled = currentPage === 1;

    prev.onclick = () => render(currentPage - 1);

    pagination.appendChild(prev);

    for (let i = 1; i <= totalPages; i++) {
      const btn = document.createElement("button");

      btn.textContent = i;

      if (i === currentPage) {
        btn.classList.add("active");
      }

      btn.onclick = () => render(i);

      pagination.appendChild(btn);
    }

    const next = document.createElement("button");

    next.innerHTML = `<i class="ph ph-caret-right"></i>`;

    next.disabled = currentPage === totalPages;

    next.onclick = () => render(currentPage + 1);

    pagination.appendChild(next);
  }

  render(1);
}

