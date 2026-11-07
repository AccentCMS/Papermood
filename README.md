# Papermood

Papermood is a blog theme for [Accent CMS](https://accentcms.dev). It
follows the design of
[hugo-PaperMod](https://github.com/adityatelange/hugo-PaperMod). The theme
gives you post cards, a dark-mode toggle, archive pages, tag pages, and
client-side search. It implements the full set of canonical components. The
theme uses no webfonts and no frameworks. It loads one stylesheet and one
small script.

## Demo

The `demo/` directory contains the demo site. The GitHub Pages preview
shows this site. To start it locally:

```bash
cd demo
accent serve --no-tls
# http://127.0.0.1:4477
```

The file `demo/config.yaml` finds the theme two directory levels up. The
demo operates from a plain clone. You do not need more configuration.

The workflow `.github/workflows/gh-pages.yml` builds the demo on each push.
It publishes the output to GitHub Pages. Do this once: select **Settings >
Pages > Source: GitHub Actions**. The workflow supplies the Pages URL as
`--base-url`. Accent then adds the `/repo` prefix to each internal URL. If
one URL has no prefix, the build fails.

To do the same build locally, use the commands below. Put the output
directory outside the theme directory.

```bash
cd demo
accent build --clean --output /tmp/papermood-demo \
  --base-url https://username.github.io/Papermood
accent serve-static --dir /tmp/papermood-demo --base-path /Papermood --no-tls
# http://127.0.0.1:4403/Papermood
```

## Install

Install the theme with the Accent CLI:

```bash
accent theme list             # show the available themes
accent theme install Papermood
```

As an alternative, copy this directory into the `themes/` folder of your
site. In both cases, set the theme in `config.yaml`:

```yaml
theme:
  name: Papermood
  directory: ./themes
```

## Templates

Set the template of a page with the `template:` key in its frontmatter.

| Template | Use for |
|----------|---------|
| `default` | One post or page: title, meta line, cover, table of contents, tags, previous and next links, share buttons |
| `home` | The home page: a post feed with an optional intro card, or profile mode |
| `list` | A section list. A `content:` collection in the page's frontmatter supplies the items and the pagination |
| `archives` | All posts with dates, in groups by year and month, with counts |
| `search` | Client-side search, from the built-in search index |
| `tags` | The tag cloud (served at `/tags` automatically) |
| `tag` | The posts of one tag (served at `/tags/{tag}` automatically) |
| `error` | The 404 page |

This is an example of a posts section:

```markdown
---
title: Posts
template: list
content:
  items: "@self.children"
  order: { by: date, dir: desc }
  limit: 10
---
```

## Theme options

All options are below `site.extra.papermood` in `config.yaml`. Each option
has a default value. You can omit all of them.

```yaml
site:
  extra:
    papermood:
      default_theme: auto        # auto | light | dark
      label: My Blog             # header wordmark; defaults to site.name
      label_icon: /logo.png      # small image before the wordmark
      label_icon_height: 30      # image icon height in px
      label_icon_svg: '<svg ...>...</svg>'  # inline SVG instead of an image;
                                 # must start with "<svg", size it yourself
      copyright: "(c) 2026 Me"   # footer line; defaults to year + site name
      show_theme_toggle: true
      show_scroll_to_top: true
      show_code_copy: true       # copy buttons on code blocks
      show_reading_time: true
      show_word_count: false
      show_author: true
      show_breadcrumbs: false
      show_toc: false            # table of contents on posts
      toc_open: false
      show_post_nav_links: true  # previous and next post links
      show_share_buttons: false
      share_networks: [x, linkedin, reddit, facebook, whatsapp, telegram, ycombinator]
      show_rss_in_list: true     # RSS icon next to list titles
      hide_summary: false        # hide leads on cards
      hide_list_covers: false    # hide cover images on cards
      cover_responsive: true     # srcset for raster covers on cards
      edit_post:                 # "Suggest Changes" link in the post meta
        url: https://github.com/you/site/edit/main/content
        text: Suggest Changes    # optional
        append_file_path: true   # append "<page url>/default.md"
      show_backlinks: false      # "Pages linking here" from [[wiki links]]
      show_canonical_link: false # "Originally published at" for canonical_url pages
      canonical_link_text: Originally published at
      date_format: long          # a date() preset or chrono pattern
      posts_prefix: /posts       # limit home feed and archives to one section
      home_limit: 10             # posts on the home page
      all_posts_url: /posts      # target of the "All posts" link
      disable_special_first_post: false
      show_all_pages_in_archive: false
      menu:                      # header menu; defaults to top-level pages
        - { name: Posts, url: /posts }
        - { name: Search, url: /search }  # the /search item gets the Alt+/ accesskey
        - { name: GitHub, url: https://github.com/you }  # external links get an icon
      social:                    # icons: github, x, linkedin, mastodon, rss, email
        - { name: github, url: https://github.com/you }
      home_info:                 # intro card above the home feed
        title: "Hi there"
        content: Welcome to my blog.  # plain text; a markdown body in the
                                 # home page replaces it inside the card
      profile_mode:              # replaces the home feed
        enabled: false
        title: Jane Doe
        subtitle: What I do.
        image: /profile.jpg
        buttons:
          - { name: Posts, url: /posts }
```

## Post frontmatter

The block below shows the full vocabulary, not a typical post. Every key
except `title` is optional, and most of them override one site option from
`site.extra.papermood` on a single page. A typical post carries five lines:
title, date, lead, tags, and cover. To give many posts a shared value
without repetition, see [Frontmatter defaults](#frontmatter-defaults).

```markdown
---
title: My Post
date: 2026-10-21
author: Jane Doe
lead: Shown on cards, in search results, and as the meta description.
tags: [example]
cover: cover.jpg          # page-local or /shared media path
cover_alt: Alt text
cover_caption: A caption below the cover
cover_hidden: true        # hide the cover on all pages
cover_hidden_in_list: true    # hide it on cards only
cover_hidden_in_single: true  # hide it on the post only
hidden_in_home_list: true # keep the post out of the home feed
edit_url: https://...     # per-page edit link, used as written
edit_post_disabled: true  # no edit link on this post
canonical_url: https://example.com/original   # with show_canonical_link,
show_canonical_link: true # shows "Originally published at <host>"
toc: true                 # per-page table of contents
toc_open: true
breadcrumbs: true         # per-page breadcrumbs
hide_meta: true           # hide the date and read-time line
disable_share: true       # hide share buttons on this post
summary: Replaces the lead on cards.
---
```

A draft page (`status: draft`) shows a pencil symbol next to its title in
dev mode.

## Document models

The theme ships document models in `models/`. One model exists for each
template: `default`, `home`, `list`, `archives`, and `search`. All of them
extend the `base` model. The post vocabulary lives in one more model,
`post`; the `default` model extends it and adds nothing. The models declare
the full frontmatter vocabulary of the theme. Accent validates each page
against its model at load time. A typo such as `cover_hiden` or a
non-boolean `toc` value causes a warning.

The models are not strict. A page with only a title validates. Unknown keys
pass through. A project model in your site's `models/` directory replaces a
theme model with the same name.

```bash
accent model list        # show the loaded models
accent model show default
accent validate          # report model violations
```

## Frontmatter defaults

An Accent model can carry a `defaults:` map. Each value applies when a
page omits the field; a page that writes the field keeps its own value.
This gives posts inherited frontmatter without a line of repetition.

The `post`/`default` split of the theme models exists for this. Create
`models/default.yaml` in your site. It replaces the theme model of the same
name. Extend the theme's `post` model, so the vocabulary and the validation
stay, and add your defaults:

```yaml
# models/default.yaml
extends: post
defaults:
  author: Jane Doe
  toc: true
```

The demo uses this file: `demo/models/default.yaml` sets the author once,
and the posts carry no `author:` line. One post,
`/posts/writing-fast-sites`, writes `author: John Smith` and so overrides
the default.

A model also binds to a whole section through a directory file --
`content/posts/_model.yaml` with `model: <name>` -- but a template-name
match wins over the directory binding. Papermood posts match the `default`
model by template name, so the project override above is the way to set
defaults for them.

## Components

The theme implements the canonical Accent components: `callout`,
`accordion`, `button`, `card`, `tag`, `image`, `breadcrumb`, `tabs`, and
`tab`. It also supplies styles for the built-in table. The command
`accent validate --templates` examines them.

The theme adds one component: `audio`. The component shows a native audio
player. Its parameters are `src`, `caption`, `loop`, and `muted`. The `src`
value can be a page-local file, a shared-library path, or a remote URL.

```markdown
{% audio src="episode.mp3" caption="Episode 12" /%}
```

For video, use the built-in `{% video %}` tag of Accent. Its parameters are
`src`, `captions` (or `captions="none"`), `poster`, `autoplay`, `loop`, and
`muted`. The tag resolves page-local files and makes captions a part of the
contract. The theme only supplies the styles.

## Markdown extensions

The theme styles the markdown extensions of Accent: admonitions
(`> [!NOTE]` through `> [!CAUTION]`, each with its own color in both
color schemes), footnotes (the theme script adds a return arrow to each
definition), task lists, definition lists, superscript and subscript,
and wiki links. A broken `[[wiki link]]` gets a red wavy
underline. The demo post `/posts/markdown-showcase` shows each extension.

Wiki links also feed a "Pages linking here" block on posts. Set
`show_backlinks: true` to show it.

Math (`$...$`) is the one extension without theme support. The KaTeX
integration needs a CDN script, and the theme loads no external
JavaScript on purpose.

## Diagrams

Accent renders fenced `mermaid`, `svgbob`, and `bob` blocks, and the
`{% diagram %}` tag, to inline SVG on the server. The theme styles the
output: the wrapper, the caption, and the error box. The demo page
`/posts/diagrams-tour` shows all of it.

The theme has no client-side diagram loader. This keeps the pages free of
external JavaScript. Set the render mode to `server` in `config.yaml`, so
the development server also renders inline SVG:

```yaml
diagrams:
  render_mode: server   # the default `hybrid` needs a JS loader in dev
```

On the dark theme, the stylesheet puts each diagram on a light panel. The
SVG palette stays readable without a re-render.

## Extension hooks

Four optional partials add markup without changes to the theme files. The
idea is the same as the `extend_*` partials of PaperMod. Create one of the
files and the theme renders it. If the file is absent, the theme renders
nothing there. The theme does not ship these files. Therefore
`accent theme update` has no conflict with them.

| Create this file under `templates/` | Rendered |
|-------------------------------------|----------|
| `partials/extend-head.html.jinja` | Last in `<head>`, on each page |
| `partials/extend-footer.html.jinja` | End of `<body>`, before the theme scripts |
| `partials/extend-post-content.html.jinja` | After the body of a post, before its footer |
| `partials/comments.html.jinja` | After the footer of a post -- the mount for giscus, utterances, isso |

Two rules apply to scripts in a hook:

- Write `nonce="{{ nonce }}"` on each inline `<script>`. Without it, the
  strict script policy blocks the script.
- If a third-party embed loads more scripts from its own origin, add that
  origin to `http_headers.security.script_policy.sources`.

This is an example `comments.html.jinja`:

```jinja
{% if page.custom.comments is not defined or page.custom.comments %}
<script nonce="{{ nonce }}" src="https://giscus.app/client.js"
    data-repo="you/site" data-repo-id="..." data-mapping="pathname"
    crossorigin="anonymous" async></script>
{% endif %}
```

## Languages

The interface speaks English, German, and French. The strings follow the
language of the page. An unknown language gets the English strings.
Translated pages get a language switcher in the header: every available
language of the page, in the order of `site.languages`, with the active
one marked.

To translate a page, put a `default.<lang>.md` file next to the original
and list the languages in `config.yaml` (`site.languages: [en, de, fr]`).
The demo translates the home page and one post: the **DE / FR** links in
the header of the demo homepage switch the language, and
`/posts/first-post` has German and French versions.

The home-info card is translatable through the same mechanism: the
markdown body of the home page fills the card, so `default.de.md` under
`content/home/` carries the German card text. The plain
`home_info.content` string from the config is the fallback for a home page
without a body.

All strings are in one file: `templates/_macros/i18n.jinja`. To add a
language, add one dictionary to that file. The shared strings agree with
the i18n files of hugo-PaperMod.

## Analytics and site verification

```yaml
site:
  extra:
    papermood:
      verification:              # <meta> verification tags, all optional
        google: token
        yandex: token
        bing: token
        naver: token
      analytics:
        google: G-XXXXXXX        # gtag.js measurement ID
```

Verification tags render in each mode. The Google tag renders only in
production: `accent serve --production`, and static builds. The theme does
not count dev traffic.

The script gtag.js loads more scripts from the Google origins. Permit them
in `config.yaml`:

```yaml
http_headers:
  security:
    script_policy:
      sources:
        - https://www.googletagmanager.com
        - https://www.google-analytics.com
```

## Credits

The design comes from
[hugo-PaperMod](https://github.com/adityatelange/hugo-PaperMod) by
adityatelange and contributors (MIT). See the LICENSE file.
