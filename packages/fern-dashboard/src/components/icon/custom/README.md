# Custom Icons

This directory contains custom icons. Each file should be named `IconName.tsx` and should export a named React component that returns an SVG element. The component in `../Icon.tsx` will import these custom icons and render them.

The `Icon` component expects each custom icon to accept `CustomIconProps` (defined in `types.ts`). Each custom icon is responsible for passing these props to the underlying SVG markup.

## How to Generate an Icon

1. Create a new file in this directory with the name of the icon you want to generate e.g. `HeadingDropdown.tsx`.
2. Export a named React component corresponding to the name of the icon e.g. `HeadingDropdown`, which takes `CustomIconProps` as props.
3. Copy the SVG markup (e.g. `<svg>...</svg>`) from a source SVG, usually a `.svg` file exported from Figma.
4. Paste the SVG markup as the return value of the component.
5. Pass the `CustomIconProps` to the SVG markup.

### Instructions for AI

To instruct an AI agent to generate an icon, point it at this `README.md` file. Make sure to provide the following additional context:

- The name of the icon you want to generate.
- The source SVG markup.
