---
title: Getting Started with Papermood
date: 2026-10-21
lead: Install the theme, point your config at it, and publish your first post in five minutes.
tags: [accent, theme, guide]
cover: cover.svg
cover_alt: Papermood wordmark on a dark card
cover_caption: The theme in one image
---

Papermood is a blog theme for Accent CMS. It gives you card-style post
listings, a dark mode toggle, archives, tag pages, and client-side search --
without a single webfont or framework.

## Install

Point your `config.yaml` at the theme:

```yaml
theme:
  name: Papermood
  directory: ./themes
```

## Write a post

Every post is a directory with a `default.md`:

```markdown
---
title: Hello World
date: 2026-10-21
tags: [first]
lead: A one-line summary shown on cards and in search.
---

Your text here.
```

## Options

All theme options live under `site.extra.papermood`:

| Option | Default | What it does |
|--------|---------|--------------|
| `default_theme` | `auto` | `auto`, `light`, or `dark` |
| `show_reading_time` | `true` | Reading time in the post meta |
| `show_toc` | `false` | Table of contents on posts |
| `show_breadcrumbs` | `false` | Breadcrumb trail on posts |
| `posts_prefix` | -- | Scope home feed and archives to one section |

That is all there is to it.
