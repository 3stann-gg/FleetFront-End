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

    const reader = new FileReader();

    reader.onload = function (e) {
      preview.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
}

