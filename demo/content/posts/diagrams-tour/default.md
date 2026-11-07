---
title: Diagrams from Plain Text
date: 2026-11-07
lead: Mermaid and Svgbob sources become inline SVG on the server. The page ships no diagram JavaScript.
tags: [diagrams, mermaid, svgbob]
toc: true
---

Accent renders text-based diagrams on the server. You write the source in
a fenced code block, and the page gets inline SVG. Search engines and
reader modes see the picture, and the browser loads no diagram library.
This demo runs with `diagrams.render_mode: server`, so the development
server shows the same SVG as a production build.

## Mermaid flowchart

Tag a fenced block with `mermaid`:

```mermaid
flowchart LR
  A[Markdown] --> B{Diagram block?}
  B -->|mermaid| C[Mermaid renderer]
  B -->|svgbob| D[Svgbob renderer]
  B -->|no| E[Syntax highlighter]
  C --> F[Inline SVG]
  D --> F
```

## Mermaid sequence diagram

The first line of the block selects the dialect. The renderer covers all
23 Mermaid dialects, from `sequenceDiagram` to `gantt` and `pie`:

```mermaid
sequenceDiagram
  participant B as Browser
  participant A as Accent
  B->>A: GET /posts/diagrams-tour
  A->>A: Render markdown and diagrams
  A-->>B: HTML with inline SVG
  Note over B: No diagram JS to fetch
```

## With a caption

The `{% diagram %}` tag adds a caption and alt text. It renders through
the same pipeline and the same cache as a fenced block:

{% diagram type="mermaid" caption="Where the page weight goes" alt="Pie chart: HTML 62 percent, CSS 26 percent, JavaScript 12 percent" %}
pie title Page weight
  "HTML" : 62
  "CSS" : 26
  "JS" : 12
{% /diagram %}

## Svgbob

Svgbob turns ASCII art into clean SVG. Tag a fenced block with `svgbob`
or the shorter `bob` alias:

```svgbob
 +--------+      +--------+      +--------+
 |  .md   |----->| Accent |----->|  SVG   |
 +--------+      +--------+      +--------+
                     |
                     v
                 .-------.
                (  cache  )
                 '-------'
```

The renderer is pure Rust, so it works everywhere Accent does.

## Caching

Each rendered SVG is cached by a hash of its source and its render
options. A repeat build reuses the cache, and an edit to one diagram
re-renders only that diagram.
