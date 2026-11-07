---
title: A Tour of the Components
date: 2026-05-02
lead: Callouts, tabs, accordions, cards, and buttons -- the canonical Accent components, dressed in Papermood.
tags: [components, demo]
---

Accent CMS content can use canonical components, and a theme dresses them.

## Callouts

{% callout type="info" title="Good to know" %}
Callouts come in `info`, `success`, `warning`, and `danger`.
{% /callout %}

{% callout type="warning" %}
This one has no title, so the type names it.
{% /callout %}

## Accordion

{% accordion summary="Click to expand" %}
Hidden until you ask for it. Markdown works in here: `code`, **bold**, and
[links](https://accentcms.dev).
{% /accordion %}

## Tabs

{% tabs group="os" %}
{% tab label="macOS" %}
Install with `brew install accent`.
{% /tab %}
{% tab label="Linux" %}
Run the install script from the docs.
{% /tab %}
{% /tabs %}

## Audio and video

Self-hosted media gets native players:

{% audio src="chime.mp3" caption="A sine chime, generated for this demo" /%}

{% video src="clip.mp4" captions="none" muted=true /%}

## Card and button

{% card title="Papermood" href="/about" %}
A theme card with a linked title and a markdown body.
{% /card %}

{% button href="/posts" %}Browse all posts{% /button %}
