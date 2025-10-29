Design tokens and usage

This document describes the SCSS design tokens available under `src/app/styles/_colors.scss`.

Overview
- Centralized color maps: `$colors` contains `brand`, `neutral`, `semantic`, and `primary` shades.
- Gradients, shadows and z-index scales are also defined in `$gradients`, `$shadows`, and `$z-index`.
- CSS custom properties (variables) are exported via the `:root` block so runtime code and plain CSS can use them.

API / helpers
- SCSS function: `color($category, $shade)`
  - Examples:
    - `color('brand', 'primary')` returns the brand primary color (string key)
    - `color('primary', 500)` returns the primary 500 shade (numeric shade)
  - Prefer numeric shades when reading "material-like" palettes (50,100,...500..900).

- SCSS function: `gradient($name)`
  - Examples: `gradient('primary')` returns the primary gradient definition.

- SCSS function: `shadow($size)`
  - Examples: `shadow('md')` returns the medium shadow value.

- SCSS function: `z($layer)`
  - Examples: `z('modal')` returns the z-index for modals (1450 by default).

CSS custom properties (runtime)
- Use in plain CSS or templates:
  - `var(--primary-green)`, `var(--text-primary)`, `var(--border-color)`, `var(--gradient)`, `var(--error-color)`

Recommended usage patterns
- Component SCSS (preferred):
  ```scss
  @use 'src/app/styles/_colors.scss' as tokens;

  .my-component {
    background: tokens.color('primary', 100);
    box-shadow: tokens.shadow('md');
  }
  ```

- Template or global CSS: use CSS variables
  ```html
  <div style="background: var(--background-secondary); color: var(--text-primary)">...</div>
  ```

Notes & conventions
- Prefer using semantic names (e.g. `semantic.success`) in components where appropriate.
- When adding new colors, update both the `$colors` map and the `:root` CSS variables for runtime availability.
- Keep Material theme customizations inside `src/app/styles/material-theme.scss` where possible to avoid needing `::ng-deep`.

If you want, I can:
- Run a repository-wide replacement to swap literal hex values for tokens.
- Add a small `mixins.scss` with commonly used mixins (focus-outline, elevated-card, etc.).
