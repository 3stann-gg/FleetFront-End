/* ==========================================
   Toast Notification
========================================== */

function initToast() {
  window.showToast = function (message, type = "success") {
    const container = document.getElementById("toastContainer");

    if (!container) return;

    const toast = document.createElement("div");

    toast.className = `toast-message ${type}`;

    let icon = "ph-check-circle";

    if (type === "error") icon = "ph-x-circle";

    if (type === "warning") icon = "ph-warning-circle";

    toast.innerHTML = `
        <i class="ph-fill ${icon}"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("show");
    }, 100);

    setTimeout(() => {
      toast.classList.remove("show");

      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 3000);
  };
}
