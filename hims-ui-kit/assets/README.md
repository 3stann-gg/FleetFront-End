# HIMS UI Kit — Assets

This kit **does not duplicate** the HIMS/Fleet design system CSS or JavaScript.

## Use the shared design system

From the repository root:

| Resource | Path |
| -------- | ---- |
| Main stylesheet | `assets/css/style.css` |
| Theme boot | `assets/js/core/theme-boot.js` |
| Shell / toast scripts | `assets/js/core/include.js`, `main.js`, `toast.js` |
| Brand images | `assets/images/brand/` |

## Example links (from `hims-ui-kit/examples/patient/`)

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
  rel="stylesheet"
/>
<script src="https://unpkg.com/@phosphor-icons/web"></script>
<script src="../../../assets/js/core/theme-boot.js"></script>
<link rel="stylesheet" href="../../../assets/css/style.css" />
```

## Do not

- Copy `variables.css` or component CSS into this folder as a second skin  
- Add module-specific global overrides that break other HIMS modules  
