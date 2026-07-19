/** Small helpers — no API, no business rules */
export function qs(selector, root = document) {
  return root.querySelector(selector);
}

export function qsa(selector, root = document) {
  return Array.from(root.querySelectorAll(selector));
}

// Non-module environments without bundlers: attach to window
if (typeof window !== "undefined") {
  window.himsStarterUtils = { qs, qsa };
}
