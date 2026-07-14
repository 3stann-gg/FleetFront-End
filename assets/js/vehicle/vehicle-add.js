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

    const preview = document.getElementById("vehiclePreview");

    const imageInput = document.getElementById("vehicleImage");

    let imageSrc = preview.src;

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
src="${imageSrc}"
alt="Vehicle">

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
    <div class="fuel-progress">

        <div class="fuel-progress-bar">

            <div
                class="fuel-progress-fill"
                style="width:80%">
            </div>

        </div>

        <span>80%</span>

    </div>
</td>

<td>
    ${new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })}
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

    updateVehicleStats();

    form.reset();

    preview.src = "../assets/images/default-vehicle.png";
    imageInput.value = "";

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
