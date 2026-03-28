# Technical Documentation — Assignment 2

**Project:** Ibrahim Alshaya Personal Portfolio  
**Version:** 2.0 (Assignment 2)  
**Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+)

---

## Architecture

The project is a static single-page website. No build tools, bundlers, or backend are required.

```
index.html          → page structure and content
css/styles.css      → all visual styling, CSS variables, responsive rules
js/script.js        → all interactive behaviour (no external JS libraries)
```

All features use standard Web APIs available in all modern browsers.

---

## CSS Design System

Styling is built on **CSS custom properties (variables)** defined in `:root`, with a `[data-theme="dark"]` override block for dark mode. This means the entire color scheme can be changed from a single place.

Key variable categories:
- `--bg-*` — background layers (primary, secondary, tertiary)
- `--text-*` — text colors
- `--accent-*` — interactive/brand colors
- `--border-color`, `--shadow`, `--shadow-lg` — decoration
- `--spacing-*` — consistent spacing scale
- `--radius-*` — border radius scale
- `--transition-base` — shared animation timing

Fonts loaded from Google Fonts:
- **Sora** — body and UI text (weights 300–800)
- **Space Mono** — monospace: nav brand, skill labels, timestamps

---

## JavaScript Features (script.js)

### Theme Toggle (Section 1)
Uses `localStorage.getItem/setItem('theme')` to persist the user's dark/light preference across page loads. Sets `data-theme` attribute on `<html>`, which triggers the CSS variable override.

### Time-Based Greeting (Section 2)
Reads `new Date().getHours()` and sets a contextual greeting string in `#greeting`. Updates on every page load (no caching).

### Typing Effect (Section 3)
Progressively appends characters to `.hero-tagline` using `setTimeout` recursion at 38ms intervals. A `<span class="cursor">` element is kept at the end using `insertAdjacentText('beforebegin', ...)`, then animated with a CSS blink keyframe.

### Mobile Menu (Section 4)
Hamburger button toggles `.active` class on `.nav-menu` (slides in from `left: -100%`) and on `.hamburger` (CSS transforms the three spans into an ✕). A document-level click listener closes the menu when clicking outside.

### Smooth Scrolling (Section 5)
Intercepts all `<a href="#...">` click events and uses `window.scrollTo({ behavior: 'smooth' })` with an offset for the sticky navbar height.

### Scroll-Reveal (Section 8)
`IntersectionObserver` watches `.section`, `.skill-category`, `.project-card`, and `.timeline-item` elements. When 12% of an element enters the viewport, the `.visible` class is added, triggering a CSS `opacity` + `transform` transition. `unobserve()` is called after to free memory.

### Project Filter & Search (Section 12)
Each `.project-card` has `data-tags` and `data-title` HTML attributes. The `filterProjects()` function runs on every input event and tab click, comparing against both. Cards that don't match get a `.hidden` class (`display: none`). An empty-state panel is shown when `visible === 0`.

**Filter categories and their tag values:**
| Tab label | `data-filter` value | Matches cards with `data-tags` containing |
|---|---|---|
| All | `all` | every card |
| Python | `python` | `python` |
| Java | `java` | `java` |
| AI/ML | `ai` | `ai` |

### API Integration (Section 13)
Fetches from `https://uselessfacts.jsph.pl/api/v2/facts/random?language=en` (free, no API key).

**Flow:**
1. Show spinner (`#fact-loader`)
2. `await fetch(...)` with try/catch
3. Success → parse JSON, display `data.text` and source
4. Failure → pick a random fact from the local `LOCAL_FACTS` array (6 curated tech facts), tracking shown indices in a `Set` to avoid repeats

### Form Validation (Section 14)
- Validation runs on submit (not on blur) to avoid annoying early errors
- `setFieldError(id, msg)` adds `.invalid` class + populates a `<span class="field-error">` below each field
- Input event listeners clear field errors as the user types (live feedback)
- Submit button enters a loading state (text swapped, disabled) for 1.2 seconds to simulate a network request
- Success message auto-dismisses after 6 seconds

---

## Responsive Breakpoints

| Breakpoint | Layout changes |
|---|---|
| `< 968px` | Nav collapses to hamburger; about/contact grids go single-column; project controls stack |
| `< 640px` | Hero/section padding reduced; CTA buttons go full-width; all grids single-column |

---

## Browser Compatibility

Tested and functional in:
- Chrome 120+
- Firefox 121+
- Safari 17+
- Edge 120+

Features used: CSS custom properties, CSS Grid, Flexbox, IntersectionObserver, async/await, localStorage, fetch API — all widely supported.

---

## Performance Notes

- No JavaScript libraries or frameworks (zero bundle overhead)
- Google Fonts loaded with `preconnect` hints to reduce latency
- `IntersectionObserver` used instead of scroll event for animation (avoids layout thrashing)
- `{ passive: true }` flag on scroll event listeners for better scroll performance
- Images use `object-fit: cover` to prevent layout shifts
