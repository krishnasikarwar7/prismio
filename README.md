# Prismio — Frontend (Phase 1)

Beautiful, customizable code screenshots. Frontend-only prototype built with React, Vite, and Tailwind CSS.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## What's included

- Fixed navbar with logo, tagline, theme toggle, GitHub button, and a disabled Export button
- Collapsible sidebar cards: Language, Theme, Background, Window Frame, Appearance
- Monaco Editor with dynamic language + theme switching, adjustable font size, word wrap, no minimap
- Live preview card that mirrors every control in real time (window frame, background, filename, language badge, styled code)
- Three-column desktop layout (sidebar / editor / preview) that stacks on tablet and mobile
- Five editor themes (VS Code Dark, Dracula, GitHub Dark, One Dark, Nord), six background presets, and four window frame styles (macOS, Windows, Browser, None)
- Plain `useState` for all app state — no Redux/Zustand/Context

## Not included (by design, per Phase 1 scope)

Backend, auth, database, real API calls, image export, file uploads, AI features.

## Notes for Phase 2

- Wire the Export button to actual image generation (e.g. `html-to-image` or `dom-to-image`) once ready
- The "None" window frame renders a plain filename header above the code — remove that header if a fully bare card is preferred
- The theme toggle currently swaps the app chrome between dark/light via CSS variables; the code editor/preview themes are independent of this and always follow the selected Editor Theme
