---
title: "Week of January 20, 2025"
date: 2025-01-20
weekEnd: 2025-01-26
summary: "Onboarding flow improvements, graduated pricing, and integration guides for multiple languages"
categories:
  - feature
  - improvement
  - fix
---

This week focused on enhancing the onboarding experience and expanding SDK integration documentation.

## New Features

### Graduated Pricing

Implemented graduated pricing tiers that scale with usage, making it more cost-effective for teams of all sizes.

### Multi-Language Integration Guides

Added comprehensive onboarding documentation for additional languages:

- **Go** - Native Go SDK integration guide
- **C#/.NET** - Full .NET integration support
- **PHP** - Laravel and vanilla PHP guides
- **Python** - Django, FastAPI, and Flask integration docs

## Improvements

### Onboarding Flow

- Streamlined project creation with automatic routing to onboarding
- Added integration status checks to track SDK setup progress
- Store completed onboarding steps for better progress tracking
- Improved pricing plans display with cleaner, more compact layout

### Pricing Page

- New FAQ section for common billing questions
- Removed test URLs from production

## Bug Fixes

### Data Isolation

- Fixed leaking project spans between accounts
- Resolved SQL errors in project queries
- Fixed project ID validation when project-key is absent

### Message Processing

- Fixed message processing pipeline issues
- Preserved APItoolkit custom spans during filtering

### Feature Toggles

- Hidden incomplete feature toggles from UI

---

Questions or feedback? Reach out on [Discord](https://discord.gg/BSFCaUHxt4) or [contact us](/contact/).
