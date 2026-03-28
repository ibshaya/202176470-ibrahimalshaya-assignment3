# AI Usage Report — Assignment 2



---

## Overview

I used Claude as an AI assistant throughout this assignment, primarily for code generation, debugging suggestions, and documentation drafting. I did not use AI to replace my understanding — every piece of code was reviewed, modified, and tested by me.

---

## Detailed Usage Log

### 1. Project Filter & Search Feature
**What I asked:** How to implement live search and filter tabs for project cards using vanilla JavaScript.  
**What Claude generated:** A `filterProjects()` function that reads `data-tags` and `data-title` attributes from cards, and toggles a `.hidden` class.  
**What I changed:** Added `aria-selected` attributes for accessibility, connected the clear button, and added the empty-state "no results" panel.  
**What I learned:** How to use dataset attributes as a clean way to store metadata on DOM elements for JavaScript filtering.

---

### 2. Public API Integration (Tech Facts)
**What I asked:** How to fetch from a public API and handle errors gracefully with a fallback.  
**What Claude generated:** An `async/await` fetch pattern with try/catch and a local fallback array.  
**What I changed:** Wrote all the local fallback facts myself (tech/CS specific content). Added a `Set` to track used fallbacks so facts don't repeat. Added the loading spinner animation separately in CSS.  
**What I learned:** How to write resilient fetch code that always gives the user something useful, even when the network fails.

---

### 3. Inline Form Validation
**What I asked:** How to show per-field error messages instead of a generic alert.  
**What Claude generated:** A `setFieldError(id, msg)` helper function and the pattern of clearing errors on user input.  
**What I changed:** Added a loading/spinner state on the submit button so users know the form is processing. Added minimum message length validation (10 characters). Adjusted the timing of the success message dismissal.  
**What I learned:** The importance of immediate, field-specific feedback vs. a single form-level error message for UX.

---

### 4. Accordion Component
**What I asked:** How to create an accessible expand/collapse accordion with smooth animation.  
**What Claude generated:** The `max-height` transition CSS pattern and the `aria-expanded` toggle logic.  
**What I changed:** Modified the behavior so only one panel can be open at a time (close-others logic). Wrote all the content inside the accordion panels myself. Tuned the easing curve from linear to `cubic-bezier`.  
**What I learned:** The `max-height: 0` → `max-height: 200px` CSS trick for smooth height transitions, and why `height: auto` doesn't animate.

---

### 5. Documentation
**What I asked:** Claude helped draft an outline for the README structure.  
**What I changed:** Filled in all specific content, feature table, and setup instructions myself based on my actual project.

---

## Reflection

Using AI as a coding assistant is genuinely powerful. it helped me move faster and showed me patterns I hadn't seen before (like using `data-*` attributes for filters). However, I found that the most important step was always *reading the code carefully* before using it. Several times I caught issues (like missing accessibility attributes, or fallback logic that didn't handle edge cases) that I fixed myself. 
---

## Tools Not Used

- GitHub Copilot (not set up in my editor for this project)
- ChatGPT
- Cursor or Replit
