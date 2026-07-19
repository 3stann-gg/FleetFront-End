/**
 * HIMS Component Library — catalog demos only
 * No Fleet business logic, no API, no auth.
 */
(function himsComponentLibrary() {
  "use strict";

  function qs(sel, root) {
    return (root || document).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.from((root || document).querySelectorAll(sel));
  }

  function openOverlay(el) {
    if (!el) return;
    el.classList.add("show");
    el.setAttribute("aria-hidden", "false");
  }

  function closeOverlay(el) {
    if (!el) return;
    el.classList.remove("show");
    el.setAttribute("aria-hidden", "true");
  }

  function initModals() {
    qsa("[data-cl-open-modal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-cl-open-modal");
        openOverlay(document.getElementById(id));
      });
    });

    qsa("[data-cl-close-modal]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const overlay = btn.closest(".modal-overlay");
        closeOverlay(overlay);
      });
    });

    qsa(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) closeOverlay(overlay);
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      qsa(".modal-overlay.show").forEach((overlay) => closeOverlay(overlay));
    });
  }

  function initDropdowns() {
    qsa(".cl-preview .export-dropdown, #clDropdownDemo .export-dropdown").forEach(
      (dropdown) => {
        const toggle = qs(".export-menu-toggle", dropdown);
        const menu = qs(".export-menu", dropdown);
        if (!toggle || !menu) return;

        toggle.addEventListener("click", (event) => {
          event.stopPropagation();
          const isOpen = dropdown.classList.contains("is-open");
          qsa(".export-dropdown.is-open").forEach((d) => {
            d.classList.remove("is-open");
            const t = qs(".export-menu-toggle", d);
            const m = qs(".export-menu", d);
            if (t) t.setAttribute("aria-expanded", "false");
            if (m) m.hidden = true;
          });
          if (!isOpen) {
            dropdown.classList.add("is-open");
            toggle.setAttribute("aria-expanded", "true");
            menu.hidden = false;
          }
        });
      },
    );

    document.addEventListener("click", () => {
      qsa(".export-dropdown.is-open").forEach((d) => {
        d.classList.remove("is-open");
        const t = qs(".export-menu-toggle", d);
        const m = qs(".export-menu", d);
        if (t) t.setAttribute("aria-expanded", "false");
        if (m) m.hidden = true;
      });
    });
  }

  function initThemeButtons() {
    qsa("[data-cl-theme]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const value = btn.getAttribute("data-cl-theme");
        if (typeof applyTheme === "function") {
          applyTheme(value);
        } else {
          const resolved =
            value === "dark"
              ? "dark"
              : value === "system"
                ? window.matchMedia &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches
                  ? "dark"
                  : "light"
                : "light";
          document.documentElement.setAttribute("data-theme", resolved);
          try {
            localStorage.setItem("himsFleetTheme", value);
          } catch {
            /* ignore */
          }
        }
        const label = qs("#clCurrentThemeLabel");
        if (label) {
          label.textContent =
            value === "dark" ? "Dark" : value === "system" ? "System" : "Light";
        }
      });
    });

    const label = qs("#clCurrentThemeLabel");
    if (label) {
      try {
        const pref = localStorage.getItem("himsFleetTheme") || "light";
        label.textContent =
          pref === "dark" ? "Dark" : pref === "system" ? "System" : "Light";
      } catch {
        label.textContent = "Light";
      }
    }
  }

  function initDemoToasts() {
    const host = qs("#clToastStage");
    if (!host) return;

    function pushToast(type, message) {
      const el = document.createElement("div");
      el.className = "toast-message show " + type;
      el.innerHTML =
        '<i class="ph-fill ph-' +
        (type === "success"
          ? "check-circle"
          : type === "error"
            ? "warning-circle"
            : type === "warning"
              ? "warning"
              : "info") +
        '" aria-hidden="true"></i><span></span>';
      el.querySelector("span").textContent = message;
      host.prepend(el);
      window.setTimeout(() => {
        el.remove();
      }, 3500);
    }

    qsa("[data-cl-toast]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const type = btn.getAttribute("data-cl-toast") || "info";
        const msg =
          btn.getAttribute("data-cl-toast-msg") || "Sample toast message";
        pushToast(type, msg);
      });
    });
  }

  function initLoadingButton() {
    const btn = qs("#clLoadingBtnDemo");
    if (!btn) return;
    btn.addEventListener("click", () => {
      btn.classList.add("is-loading");
      btn.disabled = true;
      btn.textContent = "Saving…";
      window.setTimeout(() => {
        btn.classList.remove("is-loading");
        btn.disabled = false;
        btn.textContent = "Save changes";
      }, 1600);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initModals();
    initDropdowns();
    initThemeButtons();
    initDemoToasts();
    initLoadingButton();
  });
})();
