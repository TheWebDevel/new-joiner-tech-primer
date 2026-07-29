# BA New Joiner Training App

## Purpose
An interactive web app used live by a trainer during a 4-hour onboarding session (split across 2 days, 2 hours each) for new joiners on the BA team. Audience has **no technical background** but needs working vocabulary for terms they'll see in requirement docs and tickets (API, agent, prompt, pipeline, etc). Not a self-serve course — the trainer drives it during the session and narrates over it.

## Format
A home page plus one independent slide deck per hour, originally scoped at 39 slides total but the count is a floor, not a cap — hours can run longer if the content earns it (e.g. Hour 1 grew to include a terminology recap and a scored quiz). The home page (`src/pages/HomePage.jsx`) lists all 4 hours; clicking an available hour opens that hour's deck in a new tab (`target="_blank"`), starting at slide 1. Each hour's slides are numbered independently (1 to N for that hour, not continuously across hours) and live in `src/App.jsx` as their own array (`hour1Slides`, `hour2Slides`, ...), rendered by the shared `HourDeck` component. Navigation within a deck is next/back via arrow keys and on-screen buttons, plus a "Home" link back to the home page. Hours not yet built show as a muted, non-clickable "Soon" badge on the home page rather than a dead link.

Two slide types, mixed throughout:
- **Content slide** — a concept, a diagram, or a recap. Static, but should look designed (varied layouts, diagrams, before/after comparisons), not like a bullet-point dump.
- **Interactive slide** — the same teaching moment, but shown as something happening live inside the app instead of a screenshot or an external tool. Roughly a third to half of all slides are interactive.

## Teaching principle
Show the behavior first, name the term second. Every concept lands as something the audience watches happen, then gets its label attached afterward. Cap terminology per hour to what's in that hour's recap slide, don't introduce extra jargon along the way.

## Shared example
A toy "task tracker" app is the running example reused across interactive slides in Hours 1, 2, and the Coding Agents section of Hour 4, so the audience builds on one mental model instead of resetting context each hour. The AI/LLMs section of Hour 4 (prompts, tokens, context windows, hallucination, embeddings, RAG) is separate scope and does not reference the task tracker.

## Explicitly out of scope
- No real external tool integrations — no real GitHub, no real CI dashboard, no real LLM API required. Everything, including the Hour 3 deployment demos, is simulated inside the one app for consistency.
- No user accounts, no persistence beyond the session (in-memory state only).
- No login/auth flow to build — auth is explained verbally, not demonstrated.
- No em dashes in any UI copy.

## Tech expectations
- Single-page React app with slide/step navigation, components split sensibly per slide or per hour.
- Self-contained, no build complexity beyond a standard React setup.
- Prioritize clarity of animation/interaction over visual polish — this is a teaching tool, not a product.
- Layouts should make full, intelligent use of available width. Don't center fixed-size content inside wide CSS Grid columns (equal-width tracks stretch on large screens and leave dead space either side) — use flexbox with `justify-center` so grouped content sizes to itself, or size elements to genuinely fill the space.
- When a slide demonstrates responsive design, show real layout adaptation at the breakpoint (stacked vs inline, full-width vs auto-width controls, truncated vs wrapped text, larger touch targets), not the same desktop layout just scaled down.

### Stack
- Vite + React — fast setup, no SSR needed
- react-router-dom (`HashRouter`) — only for the home page → per-hour deck navigation (each hour opening in its own tab); no routing within a deck, that's still index-based next/back/jump state in `HourDeck`. `HashRouter` specifically, so opening an hour's URL directly (a new tab) works from a static build with no server-side rewrite rules.
- Tailwind CSS — consistent styling across all slides without hand-rolled CSS
- Framer Motion — handles state-change, request/response, and agent-loop animations
- lucide-react — icons for request/response arrows, pass/fail pipeline steps, etc.
- No backend, no database, no real API calls — everything is simulated in-memory so the session doesn't depend on network access working live

