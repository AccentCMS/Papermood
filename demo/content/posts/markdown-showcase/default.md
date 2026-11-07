---
title: A Markdown Showcase
date: 2026-08-14
lead: Everyday markdown plus the extensions -- footnotes, task lists, admonitions, wiki links, and more.
tags: [markdown, demo]
toc: true
---

This post exists to stress the content styles.

## Typography

Body text sits at 18 px on the system font stack. **Bold**, *italic*,
~~strikethrough~~, and `inline code` all have their place. Links like
[this one](https://accentcms.dev) are underlined with an offset.

### Blockquote

> Perfection is achieved, not when there is nothing more to add, but when
> there is nothing left to take away.

### Lists

1. First things first
2. Then this
   - With a nested point
   - And another
3. Finally this

## Code

```rust
/// Count words the cheap way.
fn word_count(text: &str) -> usize {
    text.split_whitespace().count()
}

fn main() {
    println!("{}", word_count("papermood keeps it simple"));
}
```

## A table

| Metric | Value | Notes |
|--------|-------|-------|
| First paint | fast | no webfonts |
| CSS size | ~14 KB | single file |
| JavaScript | ~4 KB | theme toggle, copy, top-link |

## Horizontal rule

---

That line above is a thematic break.

## Task list

- [x] Port the design
- [x] Write the components
- [ ] Translate every post

## Footnotes

Accent renders reference-style footnotes[^1]. The definitions collect at
the bottom of the page, each with a return link[^2].

[^1]: Like this one.
[^2]: Click the arrow to jump back to the reference.

## Definition list

Accent
: A markdown CMS written in Rust.

Papermood
: This theme. A PaperMod translation for Accent.

## Superscript and subscript

Water is H~2~O, and the area of a circle is πr^2^.

## Smart punctuation

Straight quotes become curly -- "like this" and 'this' -- and dashes and
ellipsis come out typographically... The quote forms follow the page
language, so the German translation gets its own conventions.

## Heading attributes { #custom-anchor }

The heading above declares its own anchor id, `#custom-anchor`, in the
source: `## Heading attributes { #custom-anchor }`.

## Admonitions

GFM-style blockquote alerts. Five types, each with its own color:

> [!NOTE]
> Useful background information the reader should know.

> [!TIP]
> Helpful advice for getting the most out of a feature.

> [!IMPORTANT]
> Key information the reader must not miss.

> [!WARNING]
> Potential issues that could cause problems.

> [!CAUTION]
> Actions that could lead to data loss or security issues.

## Wiki links

Link to a page by its title: [[Getting Started with Papermood]]. Add your
own display text with a pipe: [[Diagrams from Plain Text|the diagrams
tour]]. The linked pages show this post under "Pages linking here".
