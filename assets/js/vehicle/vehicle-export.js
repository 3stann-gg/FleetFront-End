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

