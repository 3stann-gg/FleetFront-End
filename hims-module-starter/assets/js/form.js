/** Form UX placeholder — client-only, no submit API */
(function () {
  function initForms() {
    document.querySelectorAll("form.fleet-form").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        // Intentionally no network call in the starter
      });
    });
  }
  document.addEventListener("DOMContentLoaded", initForms);
})();
