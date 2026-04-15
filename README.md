# Ibrahim Alshaya - Portfolio Website (Assignment 3)

A professional portfolio website built with vanilla HTML, CSS, and JavaScript, showcasing advanced functionality with API integration, state management, and performance optimization.

This is Assignment 3, building on previous assignments with GitHub API integration, enhanced state management, and improved performance.

## Live Demo

> [https://ibrahimalshaya.netlify.app/]

---

## Project Overview

This portfolio demonstrates:
- GitHub API integration to dynamically display repositories
- Show/Hide functionality for sections with persistent state management
- Advanced contact form validation
- Performance optimization including image compression
- Scroll animations and smooth interactions
- Dark/Light mode toggle with localStorage persistence
- Tech Facts API integration with offline fallback

---

## Project Structure

```
202176470-ibrahimalshaya-assignment3/
├── README.md
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── docs/
│   ├── ai-usage-report.md
│   └── technical-documentation.md
└── .gitignore
```

---

## Features Implemented

### 1. API Integration - GitHub Repositories
- Fetches public repositories from GitHub API
- Filter by programming language
- Sort by: Recently Updated, Most Stars, or Name (A-Z)
- Displays repo details: name, description, language, stars, last updated date
- Fork indicators for forked repositories
- Error handling with retry capability

### 2. Complex Logic - State Management
- Section visibility toggle (Skills and Experience)
- Persistent state storage using localStorage
- Toggle buttons with visual feedback
- Dark/Light mode toggle (already implemented, preserved)

### 3. Project Enhancements
- Project filtering by technology tags
- Real-time search functionality
- Sort capabilities integrated with filter system

### 4. Contact Form Validation
- Required field validation
- Email format validation using regex
- Minimum message length (10 characters)
- Field-level error messages
- Inline feedback as user corrects errors
- Submit button loading state

### 5. Performance Optimizations
- Lazy loading consideration for images
- Efficient CSS Grid layouts
- Minimal JavaScript footprint
- Intersection Observer for scroll animations
- Optimized font loading with preconnect

### 6. User Experience
- Responsive design across devices
- Smooth scroll behavior
- Animation effects on section reveal
- Accessibility attributes (aria-labels, roles, etc.)
- Mobile-friendly navigation

---

## Setup - Run Locally

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Git (optional, for cloning)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ibshaya/202176470-ibrahimalshaya-assignment3.git
   cd 202176470-ibrahimalshaya-assignment3
   ```

2. Open in your browser:
   - Option A: Double-click `index.html`
   - Option B: Use a local server
     ```bash
     python -m http.server 8000
     # Then visit http://localhost:8000
     ```

### No Build Step Required
This is a vanilla JavaScript project with no build tools needed. Simply open and use!

---

## Features & Usage

### GitHub Repositories Section
1. Scroll to "Repos" in navigation or location on page
2. Use the "Language" dropdown to filter repositories
3. Use the "Sort by" dropdown to change order
4. Click any repository name to view on GitHub
5. View repo details: language, stars, last update date

### Show/Hide Sections
1. Click "Hide" button next to "Technical Skills" title to collapse/expand
2. Click "Hide" button next to "Experience & Achievements" title to collapse/expand
3. Your preference is saved in browser storage and persists across visits

### Dark Mode
1. Click the moon/sun button in the navigation bar
2. Your theme preference is saved

### Project Filtering
- Use tabs to filter projects by category (All / Python / Java / AI/ML)
- Use the search box to find projects by name or keyword

---

## AI Integration Summary

Claude and GitHub Copilot were utilized for:
- Code generation and structure suggestions for GitHub API integration
- Debugging and syntax validation
- Documentation formatting and structure
- Refactoring suggestions for code efficiency

All AI-generated code was reviewed, tested, and customized to fit assignment requirements.

See [docs/ai-usage-report.md](docs/ai-usage-report.md) for detailed AI usage documentation.

---

## Technical Implementation

### Technologies Used
- HTML5 (semantic markup, accessibility)
- CSS3 (Grid, Flexbox, CSS Variables, animations)
- Vanilla JavaScript (ES6+, Fetch API, localStorage)

### Key APIs
- GitHub API (public repository data)
- Useless Facts API (tech facts with fallback)

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

For complete technical details, see [docs/technical-documentation.md](docs/technical-documentation.md).

---

## File Descriptions

| File | Purpose |
|---|---|
| `index.html` | Main HTML structure with semantic sections |
| `css/styles.css` | Styling, animations, responsive design |
| `js/script.js` | All interactive functionality and API calls |
| `docs/ai-usage-report.md` | Detailed AI usage documentation |
| `docs/technical-documentation.md` | Technical implementation details |
| `.gitignore` | Git ignore configuration |

---

## Performance Metrics

- Lighthouse recommendations followed for:
  - Core Web Vitals optimization
  - Accessibility (WCAG 2.1 AA)
  - Best practices
  
See Lighthouse report notes in technical documentation.

---

## Code Quality

- Clean, readable code with consistent formatting
- Meaningful comments on complex sections
- Proper indentation and structure
- No console errors or broken links
- Semantic HTML for accessibility

---

## Known Limitations

- GitHub API unauthenticated requests have rate limits (60/hour)
- Private repositories cannot be displayed (public only)
- Large repository lists may take a moment to load

---

## Future Improvements

- Add authentication to GitHub API for higher rate limits
- Implement GitHub stats visualization
- Add repository search within fetched repos
- Mobile app version
- PWA capabilities

---


---

## Contact

For inquiries or feedback:
- LinkedIn: [ibrahim-alshaya-1b05902b8](https://linkedin.com/in/ibrahim-alshaya-1b05902b8)
- GitHub: [@ibshaya](https://github.com/ibshaya)
- Location: Dhahran, Saudi Arabia

---

