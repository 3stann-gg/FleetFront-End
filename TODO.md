# TODO - Layout CSS migration

- [x] Create assets/css/layout/ folder structure and add sidebar.css/navbar.css/page.css/footer.css
- [x] Move sidebar.css -> assets/css/layout/sidebar.css
- [x] Move navbar.css -> assets/css/layout/navbar.css
- [x] Extract global layout wrapper/container rules -> assets/css/layout/page.css
- [x] Limit assets/css/base/layout.css to base layout only (removed wrapper/container rules)
- [x] Update assets/css/style.css import order (base -> layout -> components -> pages)
- [x] Remove old assets/css/components/sidebar.css and assets/css/components/navbar.css after verification

- [x] Verify no duplicate selectors / broken imports
- [x] Validate UI visually
