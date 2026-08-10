---
name: Monoscope Marketing & Docs
description: Light, precise observability brand — quiet neutral substrate, one Signal Blue accent, tactile feedback.
colors:
  signal-blue: "#0068FF"
  ink-strong: "rgba(0, 6, 38, 0.9)"
  ink-weak: "rgba(0, 8, 51, 0.65)"
  base-bg: "oklch(99.1% 0.002 247)"
  alternate-bg: "oklch(97.7% 0.006 247)"
  inverse-bg: "oklch(16.4% 0.012 263)"
  fill-brand-weak: "rgba(0, 104, 255, 0.05)"
  fill-hover: "rgba(0, 21, 128, 0.04)"
  stroke-weak: "rgba(0, 17, 102, 0.1)"
  stroke-brand-weak: "rgba(0, 104, 255, 0.2)"
  text-success: "oklch(47.8% 0.13 162)"
  text-error: "oklch(51.3% 0.197 21)"
  text-warning: "oklch(54.7% 0.126 69)"
  text-information: "oklch(49.3% 0.088 241)"
  dark-base-bg: "oklch(14% 0.025 263)"
  dark-brand: "#3B82F6"
typography:
  display:
    fontFamily: "InterVariable, Inter, 'Inter Fallback', sans-serif"
    fontSize: "3rem (hero)"
    fontWeight: 400
  headline:
    fontFamily: "InterVariable, Inter, 'Inter Fallback', sans-serif"
    fontSize: "1.5rem / 3rem (md)"
    fontWeight: 700
  title:
    fontFamily: "InterVariable, Inter, 'Inter Fallback', sans-serif"
    fontSize: "1.125rem / 1.25rem (md)"
    fontWeight: 700
  body:
    fontFamily: "InterVariable, Inter, 'Inter Fallback', sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
rounded:
  field: "0.4rem"
  btn: "0.5rem"
  box: "1rem"
spacing:
  container: "min(100vw, 1200px)"
  container-padding: "8px"
components:
  button-primary:
    backgroundColor: "{colors.signal-blue}"
    textColor: "#FFFFFF"
    rounded: "{rounded.btn}"
  button-secondary:
    backgroundColor: "{colors.base-bg}"
    textColor: "{colors.signal-blue}"
    rounded: "{rounded.btn}"
  callout:
    backgroundColor: "{colors.fill-brand-weak}"
    textColor: "{colors.ink-strong}"
    rounded: "{rounded.field}"
---

# Design System: Monoscope Marketing & Docs

## 1. Overview

**Creative North Star: "The Clear Lens"**

Clean. Not noisy. A lens that lets someone see all. Monoscope's surfaces exist so a developer mid-task, an SRE configuring infrastructure, or a manager comparing vendors can see the answer instantly — the design's job is to get out of the light's way. The system is light and airy by default: a near-white cool substrate, ink at 90% opacity, and exactly one voice of color. Warmth comes from precision — consistent spacing, machined feedback, refined type — never from decoration.

What this system explicitly rejects: Datadog's clutter and density, ReadTheDocs' datedness, GitBook's generic personality-free flatness. The positive gravity is Stripe, Linear, Mintlify, Vercel: quiet confidence, code in the spotlight, one clear next step per view.

**Key Characteristics:**
- Signal Blue owns every *interactive* voice (CTAs, links, focus, selection) on a quiet cool-neutral substrate; illustrative icons speak in a friendly multicolor pastel-duotone system.
- Flat at rest; depth appears only as feedback (hover lift, press compression, focus ring).
- Fully token-driven light/dark themes via `data-theme` — semantic roles (`bg` / `fill` / `stroke` / `text` / `icon`), never raw palette values.
- Small, fast motion vocabulary: 150–300ms, exponential ease-out, reduced-motion honored globally.
- 14px body base with a steep size-driven heading scale (normal-weight 3rem display) — density for docs, calm confidence for marketing.

## 2. Colors

A restrained strategy: cool tinted neutrals plus one saturated accent used sparingly, so blue always means something.

### Primary
- **Signal Blue** (`#0068FF` / `rgb(0 104 255)`): the single brand voice. Carries primary buttons, links, focus rings, selected states, and brand strokes. In dark theme it shifts to a lifted **Dark Signal** (`#3B82F6`) so it holds contrast on the deep navy base. At 5% alpha (`fill-brand-weak`) it tints hovers and callouts.

### Neutral
- **Ink Strong** (`rgba(0 6 38 / 0.9)`): body and heading text. A navy-black at 90% alpha, so it inherits a whisper of any surface beneath it.
- **Ink Weak** (`rgba(0 8 51 / 0.65)`): secondary text and descriptions. Still passes 4.5:1 on the base background.
- **Base** (`oklch(99.1% 0.002 247)`): the default page surface — a barely-cool near-white, chroma 0.002 toward the brand's blue hue.
- **Alternate** (`oklch(97.7% 0.006 247)`): striped/sunken sections and code-adjacent surfaces.
- **Stroke Weak** (`rgba(0 17 102 / 0.1)`): default hairline borders and dividers.
- **Deep Navy Base** (`oklch(14% 0.025 263)`): the dark-theme page surface; raised/overlay layers step up to 20%/24% lightness at the same hue.

### Status (functional only, never decorative)
- **Success** (`oklch(47.8% 0.13 162)`), **Error** (`oklch(51.3% 0.197 21)`), **Warning** (`oklch(54.7% 0.126 69)`), **Information** (`oklch(49.3% 0.088 241)`): each pairs a strong text/stroke tone with a 5%-alpha fill for tinted panels. Dark theme swaps in lifted variants.

### Icon Palette (intentional exception)
Feature and illustrative icons use a **multicolor pastel-duotone system**: a saturated stroke (sky `#0288D1`, green `#7CB342`, amber `#FF9800`, purple `#9C27B0`, red `#FF6B6B`, etc.) over the same hue's pastel fill at ~40% opacity. This is deliberate brand warmth, confirmed by the brand owner — do NOT flatten icons to Signal Blue. Interactive elements never borrow these hues.

### Named Rules
**The One Signal Rule (interaction).** Signal Blue is the only *interactive* voice of color: if something is blue and flat-filled, it acts or navigates. Illustrative icons are exempt (see Icon Palette); status colors remain functional-only.

**The Semantic Token Rule.** Never reference a raw color. Every color use goes through a role token (`text-textStrong`, `bg-fillBrand-weak`, `border-strokeWeak`) so both themes stay correct for free.

## 3. Typography

**Display & Body Font:** InterVariable (with Inter, metric-matched "Inter Fallback" → Arial)

**Character:** One family, worked hard. Inter with ligatures and contextual alternates on. Display sizes stay at normal weight and get their presence from scale and the two-tone color device; section headings use 600–700. Technical without being cold.

### Hierarchy
- **Display / h1** (400, 3rem, tight leading): hero headlines. Deliberately *normal* weight — hierarchy comes from sheer size plus the two-tone device (second clause in `textDisabled`), not from heaviness. Do not "fix" the hero to a heavier weight.
- **Headline / h2** (700, 1.5rem → 3rem): section headings.
- **Sub-headline / h3** (700, 1.5rem → 2.25rem): sub-sections and feature titles.
- **Title / h4** (700, 1.125rem → 1.25rem): card and list-group titles.
- **Body** (400, 14px base, 1.5 line-height): all prose and docs content. Keep measure at `max-w-prose` (~65ch).
- **Label** (500, 0.75–0.875rem): buttons, nav items, badges. Sentence case, never tracked uppercase.

### Named Rules
**The 14px Rule.** The root is 14px, not 16px. All rem values render 12.5% denser than stock Tailwind — deliberate docs density. Never "fix" it to 16px locally.

**The One Family Rule.** No second typeface. If a passage needs distinction, change weight or size; monospace appears only inside actual code blocks.

## 4. Elevation

Flat with response. Surfaces are flat at rest — separation comes from tonal layers (`base` / `alternate` / `raised` / `sunken`) and 1px `stroke-weak` hairlines, not from resting shadows. Shadow appears as a *response to state*: buttons carry a soft 1–3px ambient shadow that deepens on hover as the element lifts 1px, and compresses on press. Depth is feedback, never decoration.

### Shadow Vocabulary
- **Resting button** (`0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06)`): the default tactile affordance.
- **Hover lift** (`0 4px 6px rgba(0,0,0,0.1), 0 2px 4px rgba(0,0,0,0.06)` + `translateY(-1px)`): confirmation that the element is live.
- **Brand glow ring** (`0 1px 4px rgba(0,82,204,0.4), 0 0 0 1px rgba(0,104,255,0.3)`): primary buttons only — shadow tinted with Signal Blue, never gray.
- **Frame ring stack** (`.light-shadow`: four concentric 0-blur rings `#e4e5e9 → #f3f4f7`): frames screenshots and media; the machined "bezel" look. `.dark-shadow` is its dark-theme twin.

### Named Rules
**The Flat-By-Default Rule.** No shadow on anything at rest except buttons and framed media. Cards and sections separate with background tone and hairlines.

## 5. Components

Tactile precision: physical, pressable, machined — feedback is felt but never showy.

### Buttons
- **Shape:** gently rounded (0.5rem), with a subtle top-light gradient sheen (`before:` white 10% → transparent) that makes them read as physical.
- **Primary:** Signal Blue fill, white text, blue-tinted glow ring shadow.
- **Secondary:** base background, Signal Blue text, `stroke-brand-weak` border; hover tints with `fill-brand-weak`.
- **Hover / Press:** hover lifts `translateY(-1px)` with deepened shadow (hover-capable devices only); press compresses `scale(0.98) translateY(1px)`. All transitions 150ms `--ease-smooth` (`cubic-bezier(0.16, 1, 0.3, 1)`).
- **Focus:** 2px Signal Blue outline, offset 3px on interactive elements.

### Cards / Containers
- **Corner Style:** 1rem (`--radius-box`) for boxes and panels; 0.4rem for fields.
- **Background:** `base` or `alternate` tone; separation by tone + 1px `stroke-weak` border, no resting shadow.
- **Internal Padding:** Tailwind steps (p-3 → p-6); content-first density.
- **Media framing:** screenshots and video get the `.light-shadow` ring stack with rounded corners.

### Callouts (docs)
- **Style:** 5%-alpha tinted panel (`fill-brand-weak` or a status weak-fill) with a leading Font Awesome icon, 0.4rem radius, full border in the matching weak stroke. Never a colored side-stripe.

### Inputs / Fields
- **Style:** 0.4rem radius, `stroke-weak` border, base background (DaisyUI field defaults).
- **Focus:** global focus-visible ring — 2px `stroke-focus` (Signal Blue), 2–3px offset, animated offset transition.

### Navigation
- **Style:** quiet text links in `ink-weak`, brightening to `ink-strong` on hover; current-page state in Signal Blue. Mobile collapses to a DaisyUI drawer/menu. Docs add a left file tree and right ToC, both suppressible per page via frontmatter.

### Signature: Live Signal Accents
The brand's motion identity: the `.section-line` vertical divider carries a slow traveling blue pulse (6s loop); heroes may run a quiet gradient mesh or particle field. These are ambient signals — sub-perceptual color at 5–8% opacity, moving slowly, never competing with content.

## 6. Do's and Don'ts

### Do:
- **Do** route every color through a semantic token (`textStrong`, `fillBrand-weak`, `strokeWeak`) and verify both `data-theme="light"` and `"dark"`.
- **Do** keep Signal Blue scarce: primary action, links, focus, selection — nothing else.
- **Do** make code blocks the most prominent object on any docs page: language label, copy button, generous surrounding whitespace.
- **Do** use the 150/200/300ms duration tokens with `--ease-smooth`; every animation must already respect the global `prefers-reduced-motion` kill-switch.
- **Do** frame screenshots and video with the `.light-shadow` / `.dark-shadow` ring stack.
- **Do** keep prose at `max-w-prose` and pages inside the 1200px `width-control` container.

### Don't:
- **Don't** look like Datadog — no dense multi-widget clutter, no competing accents, no dashboard-chrome aesthetics on marketing or docs surfaces.
- **Don't** look like ReadTheDocs' dated default or GitBook's generic free tier — no personality-free gray boxes, no default-theme feel.
- **Don't** use colored side-stripe borders (`border-left` > 1px) on callouts or cards; use full weak-stroke borders with tinted fills.
- **Don't** use gradient text, glassmorphism panels, or gray drop shadows on brand elements — brand shadows are blue-tinted rings.
- **Don't** introduce a second font family or tracked-uppercase eyebrow labels above sections.
- **Don't** put resting shadows on cards or sections; tone and hairlines separate surfaces (The Flat-By-Default Rule).
- **Don't** use raw hex/rgb values in markup; if a needed role token doesn't exist, add the token first.
