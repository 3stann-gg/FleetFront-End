/* ==========================================
   Vehicle Modal
========================================== */

function initVehicleModal() {
  const modal = document.getElementById("vehicleModal");

  if (!modal) return;

  const openBtn = document.getElementById("addVehicleBtn");
  const closeBtn = document.getElementById("closeVehicleModal");
  const cancelBtn = modal.querySelector(".btn-outline");

  function openModal() {
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("show");
    document.body.style.overflow = "";
  }

  if (openBtn) {
    openBtn.addEventListener("click", openModal);
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeModal);
  }

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });
}

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

/* ==========================================
   Vehicle Image Upload
========================================== */

function initVehicleImageUpload() {
  const input = document.getElementById("vehicleImage");
  const preview = document.getElementById("vehiclePreview");

  if (!input || !preview) return;

  input.addEventListener("change", () => {
    const file = input.files[0];

    if (!file) return;

    preview.src = URL.createObjectURL(file);
  });

  const uploadBtn = document.getElementById("uploadVehicleImage");

  if (uploadBtn) {
    uploadBtn.addEventListener("click", () => {
      input.click();
    });
  }
}

/* ==========================================
   Add Vehicle
========================================== */

function initVehicleAdd() {
  const form = document.getElementById("vehicleForm");

  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const tbody = document.getElementById("vehicleTableBody");

    const plate = document.getElementById("vehiclePlate").value;

    const type = document.getElementById("vehicleType").value;

    const driver = document.getElementById("vehicleDriver").value;

    const status = document.getElementById("vehicleStatus").value;

    const row = document.createElement("tr");

    row.innerHTML = `

    <td>

        <input
            type="checkbox"
            class="vehicle-checkbox">

    </td>

    <td>

        <div class="vehicle-info">

            <img
            class="vehicle-photo"
            src="../assets/images/default-vehicle.png">

            <div>

                <div class="vehicle-name">
                    ${type}
                </div>

                <small>${type}</small>

            </div>

        </div>

    </td>

    <td>${plate}</td>

    <td>${type}</td>

    <td>

        <div class="driver-info">

            <div class="driver-avatar">

                ${driver.substring(0, 2).toUpperCase()}

            </div>

            <span>${driver}</span>

        </div>

    </td>

    <td>

        <span class="status-badge available">

            ${status}

        </span>

    </td>

    <td>

        ${new Date().toLocaleDateString()}

    </td>

    <td>

        <div class="action-buttons">

            <button class="action-btn view">

                <i class="ph ph-eye"></i>

            </button>

            <button class="action-btn edit">

                <i class="ph ph-pencil-simple"></i>

            </button>

            <button class="action-btn delete">

                <i class="ph ph-trash"></i>

            </button>

        </div>

    </td>

    `;

    tbody.prepend(row);

    form.reset();

    document.getElementById("vehicleModal").classList.remove("show");

    document.body.style.overflow = "";

    if (typeof initVehiclePagination === "function") {
      initVehiclePagination();
    }

    if (typeof initBulkActions === "function") {
      initBulkActions();
    }

    showToast("Vehicle added successfully.", "success");
  });
}
/* ==========================================
   Vehicle Search & Filters
========================================== */

function initVehicleFilters() {
  const searchInput = document.getElementById("vehicleSearch");
  const typeFilter = document.getElementById("vehicleTypeFilter");
  const statusFilter = document.getElementById("vehicleStatusFilter");
  const refreshBtn = document.getElementById("refreshVehicles");

  if (!searchInput || !typeFilter || !statusFilter) return;

  function filterVehicles() {
    const keyword = searchInput.value.toLowerCase();
    const type = typeFilter.value.toLowerCase();
    const status = statusFilter.value.toLowerCase();

    document.querySelectorAll("#vehicleTableBody tr").forEach((row) => {
      const vehicle =
        row.querySelector(".vehicle-name")?.textContent.toLowerCase() || "";

      const plate = row.children[2]?.textContent.toLowerCase() || "";

      const vehicleType = row.children[3]?.textContent.toLowerCase() || "";

      const driver =
        row.querySelector(".driver-info span")?.textContent.toLowerCase() || "";

      const vehicleStatus =
        row.querySelector(".status-badge")?.textContent.toLowerCase() || "";

      const matchesSearch =
        vehicle.includes(keyword) ||
        plate.includes(keyword) ||
        driver.includes(keyword);

      const matchesType = type === "all" || vehicleType === type;

      const matchesStatus = status === "all" || vehicleStatus.trim() === status;

      row.style.display =
        matchesSearch && matchesType && matchesStatus ? "" : "none";
    });
  }

  searchInput.addEventListener("input", filterVehicles);
  typeFilter.addEventListener("change", filterVehicles);
  statusFilter.addEventListener("change", filterVehicles);

  if (refreshBtn) {
    refreshBtn.addEventListener("click", () => {
      searchInput.value = "";
      typeFilter.value = "all";
      statusFilter.value = "all";
      filterVehicles();
    });
  }
}

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

/* ==========================================
   Bulk Actions
========================================== */

function initBulkActions() {
  const selectAll = document.getElementById("selectAllVehicles");

  const toolbar = document.getElementById("bulkToolbar");

  const selectedCount = document.getElementById("selectedCount");

  const clearBtn = document.getElementById("clearSelection");

  if (!selectAll || !toolbar) return;

  function update() {
    const checkboxes = document.querySelectorAll(".vehicle-checkbox");

    const checked = document.querySelectorAll(".vehicle-checkbox:checked");

    selectedCount.textContent = `${checked.length} vehicle${checked.length === 1 ? "" : "s"} selected`;

    toolbar.classList.toggle("show", checked.length > 0);

    selectAll.checked =
      checked.length === checkboxes.length && checkboxes.length > 0;
  }

  selectAll.addEventListener("change", () => {
    document
      .querySelectorAll(".vehicle-checkbox")
      .forEach((cb) => (cb.checked = selectAll.checked));

    update();
  });

  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("vehicle-checkbox")) {
      update();
    }
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      selectAll.checked = false;

      document
        .querySelectorAll(".vehicle-checkbox")
        .forEach((cb) => (cb.checked = false));

      update();
    });
  }

  update();
}

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
/* ==========================================
   Export Excel
========================================== */

function initVehicleExport() {
  const exportBtn = document.getElementById("exportVehicles");

  if (!exportBtn) return;

  exportBtn.addEventListener("click", () => {
    const data = [
      ["Vehicle", "Plate", "Type", "Driver", "Status", "Last Service"],
    ];

    document.querySelectorAll("#vehicleTableBody tr").forEach((row) => {
      if (row.style.display === "none") return;

      data.push([
        row.querySelector(".vehicle-name")?.textContent.trim() || "",
        row.children[2]?.textContent.trim() || "",
        row.children[3]?.textContent.trim() || "",
        row.querySelector(".driver-info span")?.textContent.trim() || "",
        row.querySelector(".status-badge")?.textContent.trim() || "",
        row.children[7]?.textContent.trim() || "",
      ]);
    });

    const workbook = XLSX.utils.book_new();

    const worksheet = XLSX.utils.aoa_to_sheet(data);

    XLSX.utils.book_append_sheet(workbook, worksheet, "Fleet Vehicles");

    XLSX.writeFile(workbook, "Fleet_Vehicles.xlsx");

    showToast("Excel exported successfully.", "success");
  });
}

/* ==========================================
   Export PDF
========================================== */

function initVehiclePDFExport() {
  const btn = document.getElementById("exportPDF");

  if (!btn) return;

  btn.addEventListener("click", () => {
    const { jsPDF } = window.jspdf;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Fleet Vehicle Report", 14, 18);

    const rows = [];

    document.querySelectorAll("#vehicleTableBody tr").forEach((row) => {
      if (row.style.display === "none") return;

      rows.push([
        row.querySelector(".vehicle-name")?.textContent.trim(),

        row.children[2].textContent.trim(),

        row.children[3].textContent.trim(),

        row.querySelector(".driver-info span")?.textContent.trim(),

        row.querySelector(".status-badge")?.textContent.trim(),
      ]);
    });

    doc.autoTable({
      head: [["Vehicle", "Plate", "Type", "Driver", "Status"]],

      body: rows,

      startY: 30,
    });

    doc.save("Fleet_Vehicle_Report.pdf");

    showToast("PDF exported successfully.", "success");
  });
}

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
