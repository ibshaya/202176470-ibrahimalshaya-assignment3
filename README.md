# Ibrahim Alshaya — Portfolio Website (Assignment 2)

A personal portfolio website built with HTML, CSS, and vanilla JavaScript, enhanced with interactive features, API integration, and modern UX for Assignment 2.

## Live Demo

> Deploy to GitHub Pages, Netlify, or Vercel — see Setup below.

---

## Project Structure

```
assignment-2/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
└── docs/
    ├── ai-usage-report.md
    └── technical-documentation.md
```

---

## Features Added in Assignment 2

| Feature | Category | Description |
|---|---|---|
| Project filter tabs | Dynamic Content | Filter projects by technology (All / Python / Java / AI) |
| Live project search | Dynamic Content | Real-time search that filters cards as you type |
| Accordion (expand/collapse) | Dynamic Content | About section expandable bio panels |
| Tech Facts API | Data Handling | Fetches random facts from a public API with offline fallback |
| localStorage theme | Data Handling | Dark/light mode preference persisted across sessions |
| Inline form validation | Data Handling | Per-field error messages with loading state on submit |
| Scroll-reveal animations | Animations | Sections and cards fade up as they enter the viewport |
| Card tilt on hover | Animations | 3D perspective tilt on project cards |
| Typing cursor effect | Animations | Hero tagline typed character by character |
| Friendly error states | User Feedback | No-results panel, API fallback, form field errors |

---

## Setup — Run Locally

1. **Clone or download** the repository:
   ```bash
   git clone https://github.com/YOUR_ID-YOUR_NAME-assignment2.git
   cd assignment-2
   ```

2. **Open in browser** — no build step needed:
   ```bash
   # Option A — just double-click index.html
   open index.html

   # Option B — use VS Code Live Server extension
   # Right-click index.html → "Open with Live Server"

   # Option C — Python simple server
   python3 -m http.server 8080
   # Then visit http://localhost:8080
   ```

3. **File paths**: CSS is at `css/styles.css` and JS at `js/script.js` — make sure these folders exist relative to `index.html`.

---

## AI Usage Summary

Claude (claude.ai) was used to assist with:
- Generating the initial enhanced code structure as a starting point
- Suggesting the public API integration pattern (uselessfacts API + local fallback)
- Reviewing accessibility attributes (aria-expanded, role="tab", aria-selected)

All AI-generated code was reviewed, understood, and customized. See **`docs/ai-usage-report.md`** for full details.

---

## Deploy to GitHub Pages

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Set source to **main branch / root**.
4. Your site will be live at `https://YOUR-USERNAME.github.io/REPO-NAME/`.
