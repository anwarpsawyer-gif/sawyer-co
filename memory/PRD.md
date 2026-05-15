# Sawyer & Co. — Sovereign Institutional Website & Ecosystem

## Original Problem Statement
A cinematic, architecturally-structured institutional web experience functioning as the sovereign entry point, ecosystem orchestrator, and intelligence navigation layer for Sawyer & Co.'s full operational infrastructure. Single-page scroll experience structured as 7 connected environments — not sections. Mental model: moving through a sovereign Atlantic building, not clicking through pages.

## Architecture
- **Frontend**: React 19 + Tailwind + GSAP + Lenis (smooth scroll) + Framer Motion + Canvas2D (Nexus particles)
- **Backend**: FastAPI + MongoDB + Resend (inquiry email)
- **Design tokens**: `/app/frontend/src/styles/sawyer-theme.css` + `sawyer-tokens.json` — intended for future ZephyrTrustAI alignment, not currently imported into the external platform.

## User Personas
- Institutional investors, sovereign wealth funds, family offices
- Ultra-high-net-worth individuals seeking discrete advisory
- Global cross-border advisory clients
- Partnership / Media inquirers

## Core Requirements (static)
- 7 spatial environments traversed via single-page scroll (no traditional routing)
- Cinematic pacing, atmospheric dissolves, no bounces/springs
- Typography: Cormorant Garamond (Chronicle Display fallback), Inter, JetBrains Mono
- Palette: Ivory, Harbor Navy, Charcoal, Atlantic Sand, Brushed Silver, Deep Atlantic Blue
- Subtle Harbour Island rooster silhouette (one solid colour + visible lines) across lower foreground
- ACCESS PORTAL deep-links to https://zephyrtrustai.com (not rebuilt — separate platform)
- INQUIRE PRIVATELY form with categorisation: Advisory / Capital / Partnership / Media

## What's Been Implemented (2026-02)
- [x] **ENV 01 Main Hall** — Ken Burns atrium hero, editorial headline, ENTER THE INSTITUTION CTA
- [x] **ENV 02 Advisory Chamber** — split layout, 3 sequential pillar reveals, JetBrains intelligence overlays
- [x] **ENV 03 Nexus Reveal** — Canvas2D particle constellation drift + 3 ambient nodes that scroll-glide to subsystems
- [x] **ENV 04 Capital Suite** — placeholder XX metrics, ZephyrTrustAI gateway CTA
- [x] **ENV 05 Digital Core** — metallic dark, 3 infrastructure nodes (Treasury / Liquidity / Infrastructure)
- [x] **ENV 06 Founder Chamber** — both Anwar & Sarah Sawyer with portraits, pull quote, pedigree stats
- [x] **ENV 07 Exit Horizon** — atlantic horizon, INQUIRE PRIVATELY form with 4 categories
- [x] Fixed institutional nav (transparent → frosted on scroll) + ACCESS PORTAL button
- [x] Mobile off-canvas drawer nav
- [x] Harbour Island rooster silhouette walking on scroll (Framer Motion)
- [x] Lenis smooth scroll + GSAP ScrollTrigger registered
- [x] Backend `/api/inquiry` (POST/GET) with category validation, MongoDB persistence, Resend email
- [x] Design token system: `sawyer-theme.css` + `sawyer-tokens.json` for future ZephyrTrustAI sync

## Resolved Issues
- React 19 / @react-three/fiber incompatibility → replaced with lightweight Canvas2D particle field (more appropriate for "restrained institutional" brief)
- Hero image too bright → strengthened gradient overlay and reduced image brightness

## Backlog (P1)
- Replace Anwar / Sarah Sawyer portraits with client-supplied imagery (currently placeholder Unsplash editorial portraits)
- Verify domain in Resend so inquiry emails deliver from a Sawyer & Co. branded address
- Confirm static metric values (currently `$XX.X B+`, `XX`, `XXX+` placeholders)

## Backlog (P2)
- Optional live AUM/fund count fetched from ZephyrTrustAI API into Capital Suite
- Privacy-first analytics integration
- Future routes: `/advisory`, `/capital`, `/digital`, `/access` (architecture is structured to allow these without rebuild)
- Gradual ZephyrTrustAI design token import (navy, limestone, silver, typography, buttons, cards)

## Next Tasks
1. Client review of cinematic pacing and atmosphere
2. Supply real portraits and finalised institutional metrics
3. Domain verification in Resend for branded inquiry delivery
