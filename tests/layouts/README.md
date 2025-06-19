# Layouts Test Guide

## Table of Contents

1. [Overview & Purpose](#overview--purpose)
2. [Test Site Structure](#test-site-structure)
3. [How to Use](#how-to-use)
4. [Recent Improvements](#recent-improvements)

## Overview & Purpose

These tests help identify layout shifts that may occur with different configurations or components after any Fern docs product update

- **What’s tested:**
  - Frontmatter layout configurations in `.mdx` files
  - Global layout configurations in `docs.yml`
  - Components affected by layout shifts (e.g., asides, card groups)

## Test Site Structure

- Each test is a separate docs site, named `<XX>-<name>` (e.g., `01-defaults`).
- All test sites use the same set of pages from the `00-pages` directory for easy comparison.
- Each test directory contains a unique global layout configuration (e.g., `disable-header: true`).

## How to Use

1.  Open any of the following test docs sites:

- [Default](https://fern-test-layouts-defaults.docs.buildwithfern.com)
  - Default global layout configuration
- [No Header](https://fern-test-layouts-no-header.docs.buildwithfern.com/)
  - No header configuration
- [Search Sidebar](https://fern-test-layouts-search-sidebar.docs.buildwithfern.com/)
  - Search located in sidebar configuration
- [Tabs Sidebar](https://fern-test-layouts-tabs-sidebar.docs.buildwithfern.com)
  - Tabs located in sidebar configuration
- [Min Dimensions](https://fern-test-layouts-min-dimensions.docs.buildwithfern.com/)
  - All possible size configurations set to `0.5x` of default values
- [Max Dimensions](https://fern-test-layouts-max-dimensions.docs.buildwithfern.com/)
  - All possible size configurations set to `1.5x` of default values
- [Left Align](https://fern-test-layouts-left-align.docs.buildwithfern.com/)
  - Content aligned left configuration

2. Navigate between different layouts using the header navigation links
3. Compare how the same content renders under different global layout configurations

## Recent Improvements

- Added workflow to publish each test docs site and link them in the header for easy switching between configurations
