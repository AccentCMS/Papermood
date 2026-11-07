---
title: Writing Fast Sites
date: 2025-06-18
author: John Smith
lead: The fastest request is the one that carries almost nothing.
tags: [performance, accent]
canonical_url: https://example.com/writing-fast-sites
show_canonical_link: true
---

A page on this demo ships one stylesheet, one small script, and your words.

> Speed is a feature, and absence is its cheapest implementation.

No webfonts means no layout shift and no third-party requests. The system
font stack looks native everywhere because it *is* native everywhere.

```bash
accent build --config config.yaml --output ./public
```

A static build of this demo is a handful of files you can host anywhere.
