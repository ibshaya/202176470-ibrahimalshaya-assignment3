# Technical Documentation - Assignment 3

**Project:** Ibrahim Alshaya Personal Portfolio
**Version:** 3.0 (Assignment 3)
**Stack:** HTML5, CSS3, Vanilla JavaScript (ES6+)
**Build System:** None (static site)

---

## Overview

This is a progressive web portfolio that demonstrates advanced JavaScript patterns, API integration, state management, and responsive design. Built from scratch with no frameworks or build tools required.

---

## Architecture

```
Static Site Structure:
├── index.html           Main document with semantic sections
├── css/styles.css       Design system using CSS variables
├── js/script.js         All functionality (no external libraries)
└── assets/              Images and media
```

No build step required. Open `index.html` directly in a browser or serve locally.

---

## Design System

### CSS Variables
Global variables defined in `:root`:
- **Colors:** `--bg-*`, `--text-*`, `--accent-*`
- **Spacing:** `--spacing-xs` through `--spacing-xl` (0.5rem to 6rem)
- **Typography:** `--font-primary` (Sora), `--font-mono` (Space Mono)
- **Effects:** `--shadow`, `--transition-base`

Dark mode overrides via `[data-theme="dark"]` selector.

### Typography
- **Sora** (Google Fonts) - Main UI and body text
- **Space Mono** - Monospace for code/labels

---

## JavaScript Architecture (script.js)

### Module Organization
Script is organized into 18 numbered sections for clarity:

1. **Theme Toggle** - Dark/light mode with localStorage
2. **Greeting** - Time-based welcome message
3. **Typing Effect** - Animated hero tagline
4. **Mobile Menu** - Hamburger navigation toggle
5. **Smooth Scrolling** - Hash link navigation
6. **Active Nav Highlight** - Section scroll detection
7. **Navbar Shadow** - Scroll-triggered navbar styling
8. **Scroll Reveal** - IntersectionObserver animations
9. **Card Tilt** - 3D perspective hover effect
10. **Scroll to Top** - Back-to-top button
11. **Accordion** - Expand/collapse for bio sections
12. **Project Filter** - Search and category filtering
13. **Tech Facts API** - External API with fallback
14. **Form Validation** - Email, required fields, message length
15. **Console Easter Egg** - Developer console message
16. **Section Toggles** - Show/hide sections with localStorage
17. **GitHub API** - Fetch and display repositories
18. **Visitor Counter** - Session-based visit tracking

---

## NEW: Assignment 3 Features

### 16. Section Toggle (Show/Hide)
**Feature:** Users can show/hide Skills and Experience sections with persistent state.

**HTML Structure:**
```html
<div class="section-header">
  <h2 class="section-title">Technical Skills</h2>
  <button class="section-toggle" id="skills-toggle">Hide</button>
</div>
<div class="skills-grid section-content" id="skills-content">
  <!-- content -->
</div>
```

**JavaScript Implementation:**
- Load saved state from `localStorage.getItem('skills-visible')`
- Toggle display property: `'none'` or `'grid'`
- Update button text: "Show" or "Hide"
- Save state to localStorage: `localStorage.setItem('skills-visible', boolean)`

**CSS:**
```css
.section-content {
  transition: opacity 0.3s ease, visibility 0.3s ease;
}
```

**Features:**
- Persists across page reloads
- Smooth transitions
- Accessible button labels
- Default visible on first visit

---

### 17. GitHub API Integration
**Feature:** Dynamically fetch and display public repositories.

**API Endpoint:**
```
https://api.github.com/users/{username}/repos?sort=updated&per_page=100
```

**Data Fetched:**
- Repository name
- Description
- Primary language
- Stars count
- Last updated date
- Fork indicator
- Repository URL

**Filtering:**
- By Programming Language - populated dynamically from repo data
- Default: "All Languages"

**Sorting Options:**
1. **Recently Updated** (default) - Most recent first
2. **Most Stars** - Highest starred first
3. **Name (A-Z)** - Alphabetical order

**Implementation:**
```javascript
const response = await fetch(
  `https://api.github.com/users/ibshaya/repos?sort=updated&per_page=100`,
  { headers: { 'Accept': 'application/vnd.github.v3+json' } }
);
```

**Error Handling:**
- Try-catch wraps API call
- Error message displayed to user
- Retry button available
- No partial rendering on failure

**Performance:**
- Fetches up to 100 repos max (GitHub API default)
- Client-side filtering/sorting (no additional API calls)
- Renders on page load (not on interaction)

---

### 18. Visitor Counter
**Feature:** Tracks visit count using localStorage.

**Implementation:**
```javascript
const visitCount = parseInt(localStorage.getItem('visitCount') || 0) + 1;
localStorage.setItem('visitCount', visitCount);
```

**Behavior:**
- Increments on each page load
- Persists across sessions
- Logs to console: "Visits to this portfolio: X"
- Useful for personal analytics

---

## Components & Sections

### GitHub Repositories Section
**HTML Structure:**
```html
<section id="github" class="section github">
  <div class="repos-filters">
    <!-- Sort and filter dropdowns -->
  </div>
  <div class="repos-grid" id="repos-grid">
    <!-- Repo cards rendered here -->
  </div>
  <div class="repos-error"><!-- Error state --></div>
  <div class="repos-empty"><!-- Empty state --></div>
</section>
```

**Repo Card Template:**
```html
<div class="repo-card">
  <div class="repo-header">
    <h3 class="repo-name">
      <a href="${url}">${name}</a>
    </h3>
    ${fork ? '<span class="repo-fork">Fork</span>' : ''}
  </div>
  <p class="repo-description">${description}</p>
  <div class="repo-meta">
    ${language ? `<span class="repo-language">${language}</span>` : ''}
    ${stars ? `<span class="repo-stars">★ ${stars}</span>` : ''}
    <span class="repo-date">${lastUpdate}</span>
  </div>
</div>
```

**CSS Grid:**
```css
.repos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: var(--spacing-md);
}
```

---

## State Management

### localStorage Usage
State persisted to browser storage:
- `theme` - 'light' or 'dark'
- `skills-visible` - boolean
- `experience-visible` - boolean
- `visitCount` - integer

**Load on Page Load:**
```javascript
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
```

---

## Form Validation

**Contact Form Validation Rules:**
1. **Name:** Required, non-empty
2. **Email:** Required, valid email format
   - Regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
3. **Message:** Required, minimum 10 characters

**Implementation:**
- `setFieldError(id, msg)` - Sets error state
- Field errors cleared on user input
- Submit prevented if validation fails
- UI feedback for all states (empty, invalid, valid)

---

## API Integration Patterns

### GitHub API
- **Rate Limit:** 60 requests/hour (unauthenticated)
- **Authentication:** None required (public data only)
- **Headers:** Accept GitHub v3 JSON format
- **Response Size:** Paginated, fetch first 100

### Useless Facts API (Existing)
- **Endpoint:** `uselessfacts.jsph.pl/api/v2/facts/random`
- **Rate Limit:** None documented
- **Fallback:** 6 local facts loaded if API fails

**Pattern (Both APIs):**
```javascript
try {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
  // Handle success
} catch (err) {
  console.warn('API failed:', err);
  // Use fallback
}
```

---

## Performance Optimizations

### Image Optimization
- Proper sizing prevents rendering overhead
- Lazy loading attributes on images (built-in browser feature)
- Responsive images with srcset patterns

### CSS Efficiency
- Single stylesheet (no imports overhead)
- CSS Grid and Flexbox for layout
- CSS variables prevent code duplication
- Hardware-accelerated transforms (Will change: transform3d)

### JavaScript Optimization
- Event delegation where possible
- IntersectionObserver for visibility detection
- No global scope pollution
- Minimal DOM queries (cached where repeated)

### Network
- No external JavaScript dependencies
- No build tools or transpilation
- Small bundle size
- Leverages browser caching

---

## Responsive Design

### Breakpoints
| Screen Size | Changes |
|---|---|
| 968px and down | Hamburger menu; single-column layouts |
| 640px and down | Further reduced spacing; full-width buttons |

### Mobile-First Approach
CSS written for mobile first, enhanced for larger screens.

---

## Browser Compatibility

**Tested & Supported:**
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Features Required:**
- ES6 JavaScript (const, arrow functions, async/await)
- CSS Grid & Flexbox
- Fetch API
- localStorage
- IntersectionObserver
- CSS custom properties

---

## Accessibility Features

**WCAG 2.1 AA Compliance:**
- Semantic HTML (main, nav, section, h1-h6)
- ARIA labels and roles
  - `aria-expanded` on accordions
  - `aria-selected` on tabs
  - `aria-label` on buttons
- Keyboard navigation support
- Color contrast ratios met
- Form labels properly associated
- Skip-to-content links

**Tested With:**
- Keyboard navigation (Tab, Enter, Escape)
- Screen reader compatibility (partial testing)
- Lighthouse accessibility audit

---

## Development Workflow

### Local Development
```bash
# Option 1: Direct open
open index.html

# Option 2: Local server (Python)
python -m http.server 8000
# Visit http://localhost:8000

# Option 3: Local server (Node)
npx http-server
```

### Testing Checklist
- All sections load without errors
- GitHub repos display with correct data
- Show/hide toggles persist state
- Form validation works on all fields
- API errors handled gracefully
- Dark mode toggle works
- Mobile menu functions
- Smooth scrolling to anchors
- No console errors

### Debugging
- Console logs for API calls
- Browser DevTools Network tab for API inspection
- localStorage inspection in DevTools
- Lighthouse audit for performance/accessibility

---

## Code Quality

- **Comments:** Numbered sections with clear descriptions
- **Naming:** Descriptive variable/function names
- **Consistency:** Consistent style throughout
- **Structure:** Logical organization by feature
- **Maintainability:** Easy to locate and modify features

---

## Known Limitations

- GitHub API limited to 60 requests/hour without authentication
- Cannot display private repositories
- Requires network connection for GitHub repos
- API response sorts by updated date server-side (can't change on client)
- No search within fetched repos (only language filter)

---

## Future Enhancement Possibilities

- Add GitHub authentication for higher rate limits
- Implement GitHub stats/contribution graph
- Add repository search functionality
- Cache API responses to reduce requests
- Add filter for repo language vs. best language combo
- PWA capabilities (Service Worker)
- Mobile app version
- Database backend for form submissions

---

## Maintenance Notes

- Update visit count reset period (optional)
- Monitor GitHub API rate limits
- Test new repos added to account
- Verify all external links regularly
- Keep CSS variables organized as site grows
- Monitor browser compatibility as standards evolve

---

## References

- [GitHub API v3 Documentation](https://docs.github.com/en/rest)
- [MDN Web Docs](https://developer.mozilla.org/)
- [WCAG 2.1 Guidelines](https://www.w3c.org/WAI/WCAG21/quickref/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

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
