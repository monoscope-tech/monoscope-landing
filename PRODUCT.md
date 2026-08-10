# Product

## Register

brand

*(This repo holds both the marketing site and the developer docs. Marketing surfaces — landing, pricing, features, compare — are the primary register. Docs pages lean product; override per task when working under `/docs`.)*

## Users

- **Backend/fullstack developers** integrating Monoscope's API monitoring SDKs mid-task while coding — need fast, scannable docs with copy-paste code.
- **DevOps/SRE engineers** setting up observability infrastructure — need architecture guides, deployment options, configuration reference.
- **Engineering managers** evaluating Monoscope vs competitors — need clear feature overviews, pricing clarity, trust signals.

## Product Purpose

Monoscope (formerly APItoolkit) is an end-to-end API and web-services observability platform. This site is its marketing website and developer documentation: it must convert evaluators into sign-ups and get integrating developers to a working SDK setup as fast as possible. Success = clear positioning vs competitors on marketing pages, and speed-to-answer in docs.

## Brand Personality

**Friendly, approachable, modern** — like Vercel or Linear. Three words: **Clear. Modern. Capable.**

Warmth comes through precision (consistent spacing, refined typography), not decoration. Confident and technical without being cold.

## Anti-references

- **Datadog** — cluttered, dense, overwhelming.
- **ReadTheDocs default theme** — dated.
- **GitBook free tier** — generic, personality-free.
- Positive references for the target feel: Mintlify, Stripe, Linear, Tailwind, Browserbase, Coinbase CDP docs.

## Design Principles

1. **Speed to answer** — clear hierarchy, scannable structure, prominent code blocks.
2. **Guide, don't dump** — progressive disclosure, numbered steps, contextual navigation.
3. **Code is king** — copy buttons, language labels, visual prominence for code blocks.
4. **Warmth through precision** — premium feel from consistent spacing, not decoration.
5. **One clear next step** — sequential navigation, contextual CTAs, clear onboarding flow.

## Accessibility & Inclusion

- Target **WCAG 2.1 AA**: ≥4.5:1 body-text contrast, ≥3:1 for large text and UI affordances.
- Full keyboard navigability; visible focus states.
- Every animation gets a `prefers-reduced-motion: reduce` alternative.
- Light and dark themes both supported (DaisyUI `light`/`dark` via `data-theme`); contrast holds in both.
