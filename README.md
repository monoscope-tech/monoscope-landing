<div align="center">

![Monoscope's Logo](https://github.com/monoscope-tech/.github/blob/main/images/logo-white.svg?raw=true#gh-dark-mode-only)
![Monoscope's Logo](https://github.com/monoscope-tech/.github/blob/main/images/logo-black.svg?raw=true#gh-light-mode-only)

## Marketing Website and Developer Documentation

[![QuickStatic](https://img.shields.io/badge/QuickStatic-Generator-f1541c?logo=rust)](https://github.com/topics/apitoolkit-sdk) [![Monoscope SDK](https://img.shields.io/badge/Monoscope-SDK-0068ff?logo=github)](https://github.com/topics/apitoolkit-sdk) [![Join Discord Server](https://img.shields.io/badge/Chat-Discord-7289da)](https://discord.gg/BSFCaUHxt4) [![Monoscope Docs](https://img.shields.io/badge/Read-Docs-0068ff)](https://monoscope.tech/docs?utm_source=github-sdks)

[Monoscope](https://app.monoscope.tech) is an end-to-end API and web services management toolkit for engineers and customer support teams. This repository houses our [marketing website](https://monoscope.tech) and [developer documentation](https://monoscope.tech/docs) built using our in-house [QuickStatic](https://github.com/tonyalaribe/quickstatic) static site generator.

</div>

---

## Table of Contents

- [Getting Started](#getting-started)
- [Setup and Installation](#setup-and-installation)
- [Directories Overview](#directories-overview)
- [Docs Style Guide](#docs-style-guide)
- [Contributing and Help](#contributing-and-help)
- [License](#license)

---

## Getting Started

The content for every page is written in the [Djot](https://djot.net/) markup syntax (Same as Markdown but with some stricter rules) and each page is built using the [Shopify liquid templating language](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers) and a mix of HTML, CSS, and JavaScript. Everything in the root directory gets copied into the output directory in the exact order it appears, while markdown files are compiled into HTML files.

## Setup and Installation

Kindly follow the steps below to run this project locally:

1. Install QuickStatic using [Rust Cargo](https://doc.rust-lang.org/cargo/getting-started/installation.html) like so:

```sh
cargo install quickstatic
```

2. After installling QuickStatic, you might need to add the `quickstatic` binary to your system's PATH. This will enable the `npm run serve` command to work since it requires the `quickstatic` binary to be available in your system's PATH.

```sh
# For Linux
export PATH="$PATH:$HOME/.cargo/bin"
# For Windows
set PATH=%PATH%;%USERPROFILE%\.cargo\bin
```

3. Run the command below to install the styling dependencies:

```sh
npm install
```

4. Run the command below to build the site:

```sh
npm run serve
```

5. Run the command below to build Tailwind CSS:

```sh
npm run build

# Or

npm run build:watch
```

## Directories Overview

Kindly click the toggle below to explore the list of important files and directories.

<details>
<summary>📂 Open Directories Overview</summary>

| Path                   | Description                                                   |
| ---------------------- | ------------------------------------------------------------- |
| `_quickstatic/themes`  | QuickStatic themes and components (default and docs).         |
| `_quickstatic/public`  | QuickStatic public build.                                     |
| `index`                | The home page.                                                |
| `about`                | The `/about` page.                                            |
| `assets`               | All image/video assets, fonts, CSS files, JS files, etc.      |
| `blog`                 | The `/blog` pages.                                            |
| `compare`              | The `/compare` page.                                          |
| `contact`              | The `/contact` page.                                          |
| `docs`                 | The `/docs` pages and content.                                |
| `events`               | The `/events` pages.                                          |
| `faq`                  | The `/faq` page.                                              |
| `features`             | The `/features` pages.                                        |
| `pricing`              | The `/pricing` page.                                          |
| `privacy-policy`       | The `/privacy-policy` page.                                   |
| `refund-policy`        | The `/refund-policy` page.                                    |
| `static`               | Some images and manifest files.                               |
| `terms-and-conditions` | The `/terms-and-conditions` page.                             |
| `thanks`               | The `/thanks` page.                                           |
| `tools`                | The `/tools` pages.                                           |
| `build.sh`             | Script to fetch abd update the latest version of QuickStatic. |
| `Makefile`             | Manage tasks related to Tailwind CSS processing.              |
| `quickstatic.yaml`     | QuickStatic configuration options.                            |
| `tailwind.config.js`   | Tailwind CSS configuration options.                           |

</details>

## Docs Style Guide

Our documentation is a blooming garden and we will continue to prune and maintain it. Feel free to share your feedback, let us know if something is broken or not working as it ought, and contribute too as we improve things. This style guide document is a WIP and we'll continue to update it. We have some internal guidelines on how things work (we hope to document all of them eventually), however, the sections in the clickable toggle below cover a few important things to note.

<details>
<summary>📒 Open Docs Style Guide</summary>

### Style Guide

Everything is written in Markdown/Djot and we have a few custom interactive components (some of which we will improve as time goes on). We're currently adapting the [Google Developer Documentation Style Guide](https://developers.google.com/style) and [Diátaxis Documentation System](https://diataxis.fr/), using some principles from both to structure and write our documentation. A few quick writing tips:

- Create a new pull request for any docs changes (including team members and external contributors), so the docs maintainer can review to ensure everything aligns with existing principles and no inconsistency sneaks in.
- Follow existing patterns for structure, writing flow, code snippets comments, interactive components, etc. based on the category of docs in context (we currently have the [onboarding](https://monoscope.tech/docs/onboarding/), [SDK guides](https://monoscope.tech/docs/sdks/), [dashboard guides](https://monoscope.tech/docs/dashboard/), and [features](https://monoscope.tech/docs/features/) pages —with more coming soon) to ensure consistency and sustainable docs.
- Run your writing through grammar checkers (like Grammarly) to catch typos and other minor issues.
- Use title case for headings.
- DO NOT use tabs for code snippets but instead use two spaces.
- The `<` and `>` characters will be omitted by the markdown parser if used in a code snippet, so ensure to replace that with the HTML entity code equivalence (`&lt;` and `&gt;`).
- Indicate omitted code in click-to-copy snippets by using a comment and not an ellipsis points (use comments as much as possible).
- Always include alt tags in markdown images.
- Always include the `rel="noopener noreferrer"` attribute in links that should open in a new tab (e.g., `[link text](https://link.com){target="_blank" rel="noopener noreferrer"}`).
- Don't remove or adjust something (styling, configuration, element, image, etc.) if you don't know what it currently does; ask someone first instead (create an issue or ask in Discord).
- If you make any additions or adjustments to anything, explain it in detail in your pull request.
- For helpful resources and other general stuff we use, see this [awesome technical writing list](https://github.com/BolajiAyodeji/awesome-technical-writing).

### Frontmatter

Here's an example of the `frontmatter` for the docs pages with the common options used differently in different docs page contexts:

```markdown
---
title: Home
ogTitle: Sample Home Guide
faLogo: folder-tree
date: 2022-03-23
updatedDate: 2024-05-04
linkTitle: "Documentation"
menuWeight: 20
hideFileTree: true
hideToc: true
pageFullWidth: true
---
```

### Callout Icon Keys

We use [Font Awesome](https://fontawesome.com) icons for our callout component. In the Dashboard Guides, we use only the icon; in the SDK Guides, we use the icon and an accompanying text (e.g., `Tip`, `Warning`, etc.).

**Format**:

```markdown
<div class="callout">
  <i class="fa-solid fa-forward"></i>
  <p>Content here....</p>
</div>
```

```markdown
<div class="callout">
  <p><i class="fa-regular fa-lightbulb"></i> <b>Tip</b></p>
  <p>Content here...</p>
</div>
```

**Icon keys**:

| Icon Key                           | Description                                                                     |
| ---------------------------------- | ------------------------------------------------------------------------------- |
| `fa-regular fa-lightbulb`          | Optional information to help a user be more successful.                         |
| `fa-regular fa-circle-info`        | Highlights information that users should take into account, even when skimming. |
| `fa-solid fa-book`                 | Definition of a term.                                                           |
| `fa-solid fa-forward`              | Suggested next action (CTA).                                                    |
| `fa-solid fa-triangle-exclamation` | Important warning.                                                              |

### Tab Toggle Component

You can have more than one tab in the tab group toggle component but keep things max at three to ensure a good visual display on most screens. If you want to have multiple tab groups, ensure to increment the `data-tab-group` value (i.e., group1, group2, etc.) to avoid conflicts. Also, ensure to start all block of code inside a tab content at the beginning of the line instead of nesting it under the `<div>` element in use; this will avoid extra whitespaces when it is rendered on the site.

```markdown
<section class="tab-group" data-tab-group="group1">
  <button class="tab-button" data-tab="tab1">Tab A</button>
  <button class="tab-button" data-tab="tab2">Tab B</button>
  <div id="tab1" class="tab-content">Content A</div>
  <div id="tab2" class="tab-content">Content B</div>
</section>
```

</details>

## Contributing and Help

To contribute to the development of this project or request help from the community and our team, kindly do any of the following:

- Read our [Contributors Guide](https://github.com/monoscope-tech/.github/blob/main/CONTRIBUTING.md).
- Join our community [Discord Server](https://discord.gg/BSFCaUHxt4).
- Create a [new issue](https://github.com/monoscope-tech/monoscope-landing/issues/new/choose) in this repository.

## License

This repository is published under the [MIT](LICENSE) license.

---

<div align="center">

<a href="https://monoscope.tech?utm_source=github-sdks" target="_blank" rel="noopener noreferrer"><img src="https://github.com/monoscope-tech/.github/blob/main/images/icon.png?raw=true" width="40" /></a>

</div>
