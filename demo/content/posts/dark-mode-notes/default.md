---
title: Notes on Dark Mode
date: 2025-11-30
lead: Why the toggle follows your system first, and your choice after.
tags: [design, theme]
cover: cover.png
cover_alt: A dark slate rectangle, the dark scheme surface color
---

Papermood ships three scheme settings: `auto`, `light`, and `dark`.

In `auto`, the first visit follows your operating system. The moment you use
the toggle in the header, your choice is stored in `localStorage` and wins on
every later visit. Without JavaScript the site still honors your system
preference -- the toggle simply hides.

The palette is deliberately low-contrast in the dark scheme: near-black
surfaces, soft gray text, and cards one step lighter than the page.
