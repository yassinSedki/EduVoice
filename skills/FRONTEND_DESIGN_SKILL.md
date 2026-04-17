# Frontend Design Skill — Anti-AI-Slop Edition

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI-generated" aesthetics. Every output should feel like it was crafted by a senior designer with a strong point of view — not assembled from a template.

---

## 1. Design Thinking (Before Writing a Single Line of Code)

Understand the context deeply before committing to anything visual.

### 1.1 Ask Four Questions First
- **Purpose**: What problem does this solve? Who is the actual user?
- **Tone**: What emotional register fits? (Playful? Authoritative? Subversive? Refined?)
- **Constraints**: Framework, performance, accessibility, target device.
- **Differentiation**: What is the ONE thing a user will remember? Commit to it.

### 1.2 Pick a Bold Aesthetic Direction
Choose a *flavor* and push it to its logical extreme. Do not hedge. Examples:

| Flavor | Hallmarks |
|---|---|
| **Brutalist/Raw** | Monospace everywhere, stark borders, high contrast, zero decoration |
| **Retro-futuristic** | CRT glow, scan lines, phosphor green, terminal aesthetics |
| **Luxury/Refined** | Generous whitespace, thin serifs, muted palette, surgical precision |
| **Editorial/Magazine** | Expressive typography, mixed scales, grid-breaking headlines |
| **Organic/Natural** | Irregular shapes, earthy tones, handwritten accents, flowing curves |
| **Maximalist Chaos** | Dense grids, overlapping layers, clashing type, intentional noise |
| **Toy-like/Playful** | Thick strokes, rounded everything, vivid primaries, bouncy animation |
| **Art Deco/Geometric** | Symmetry, gold accents, precise angles, ornamental borders |
| **Industrial/Utilitarian** | Grid systems, exposed structure, utility typography, muted grays |
| **Soft/Pastel** | Low saturation, generous curves, layered translucency, gentle motion |
| **Cyberpunk/Neon** | Dark backgrounds, bright accent lines, glitch effects, clipped text |
| **Academic/Scholarly** | Dense typographic hierarchy, footnotes, ruled lines, book aesthetics |

These are starting points. Combine and mutate them. A "luxury brutalist" or "playful editorial" direction is more interesting than either alone.

**CRITICAL RULE:** Pick ONE direction. Commit fully. Hedging produces exactly the generic output you are trying to avoid.

---

## 2. Typography — The Highest-Leverage Decision

Typography sets tone before the user reads a word. Make it count.

### 2.1 Never Use These Fonts (Too Common, Too AI)
- Inter, Roboto, Lato, Open Sans, Nunito, Poppins, DM Sans, Plus Jakarta Sans, Outfit, Space Grotesk, Raleway, Montserrat (when used generically)
- System fonts as a stylistic choice (fine for performance, bad for character)

### 2.2 Font Pairing Strategy
Always pair a **display font** with a **body font**. They should have tension — not match.

```css
/* Example pairings that feel designed, not generated */

/* Editorial: Expressive display + restrained body */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Source+Serif+4:ital,wght@0,300;0,400;1,300&display=swap');

/* Brutalist: Mechanical display + monospace body */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Mono:wght@300;400&display=swap');

/* Retro/Elegant: High contrast serif + geometric sans */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;1,300;1,600&family=Jost:wght@200;400&display=swap');

/* Playful: Round display + humanist body */
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@1,9..144,300&family=Atkinson+Hyperlegible:wght@400;700&display=swap');

/* Dark/Technical: Extended grotesque + mono */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@300;600&family=Fira+Code:wght@300;400&display=swap');

/* Luxury: Thin serif + wide-tracked caps */
@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,300;1,6..96,300&family=Cinzel:wght@400&display=swap');
```

### 2.3 Typographic Scale — Be Dramatic
Avoid uniform type scales. Use at least 3:1 ratio between display and body size. Contrast creates hierarchy.

```css
:root {
  --text-display: clamp(3rem, 8vw, 7rem);   /* Hero headlines */
  --text-title:   clamp(1.5rem, 3vw, 2.5rem);
  --text-body:    1rem;
  --text-label:   0.75rem;
  --text-micro:   0.625rem;
  
  /* Letter spacing for caps and small labels */
  --tracking-wide: 0.15em;
  --tracking-tight: -0.02em; /* For large display type */
}
```

### 2.4 Typography Tricks That Elevate
- **Italic as accent**: mix upright and italic in a headline for editorial feel
- **Weight contrast within a line**: `<span class="light">designed</span> FOR HUMANS`
- **Oversized single characters**: a huge letter used as a decorative element
- **Tracked caps for labels**: `letter-spacing: 0.12em; text-transform: uppercase; font-size: 0.7rem`
- **Variable fonts**: use `font-variation-settings` for subtle weight animation on hover
- **Optical sizing**: `font-optical-sizing: auto` for fonts that support it (Cormorant, Fraunces)

---

## 3. Color — Commit, Don't Hedge

### 3.1 The Anti-AI Color Rules
- **NEVER** use purple gradient on white/light background (most common AI output)
- **NEVER** use teal/coral/purple trinity (the AI palette)
- **AVOID** equal weight of 3+ colors — pick a dominant, one accent, one neutral
- **AVOID** pastel everything — if soft, have ONE sharp edge somewhere

### 3.2 Build the Palette as a System

```css
:root {
  /* Establish a dominant, not a balanced set */
  --color-bg:      #0a0a08;    /* Near-black with warmth */
  --color-surface: #141410;    /* Slightly lighter surface */
  --color-border:  #2a2a24;    /* Barely visible structure */
  
  --color-text:    #e8e6df;    /* Off-white, never pure white */
  --color-muted:   #6b6960;    /* Secondary text */
  
  --color-accent:  #c4a35a;    /* ONE sharp accent — gold */
  --color-accent-dim: rgba(196, 163, 90, 0.12); /* Tinted backgrounds */
  
  /* Semantic only if needed */
  --color-danger:  #c0392b;
  --color-success: #27ae60;
}
```

### 3.3 Color Philosophies by Aesthetic

| Aesthetic | Palette Approach |
|---|---|
| Brutalist | Black + white + ONE violent accent (red, yellow, electric blue) |
| Editorial | Off-white + ink-black + ONE warm neutral (tan, ochre, dusty rose) |
| Luxury | Cream/ivory + charcoal + gold or antique brass |
| Retro-futuristic | Deep black + phosphor green OR amber OR cyan (pick one) |
| Organic | Warm earth tones (terracotta, sage, sand) — no pure colors |
| Cyberpunk | Black + ONE neon (hot pink, acid green, electric blue) |
| Soft/Pastel | ONE muted base color + its 50% lighter version + charcoal text |

### 3.4 Using Color for Depth (Not Just Identity)

```css
/* Layered surfaces instead of flat backgrounds */
.card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  box-shadow:
    0 1px 2px rgba(0,0,0,0.3),
    0 8px 24px rgba(0,0,0,0.15),
    inset 0 1px 0 rgba(255,255,255,0.04); /* Subtle top highlight */
}

/* Color as texture, not just fill */
.hero {
  background: var(--color-bg);
  background-image: 
    radial-gradient(ellipse 80% 40% at 50% -10%, var(--color-accent-dim), transparent);
}
```

---

## 4. Backgrounds & Atmosphere

Avoid flat solid backgrounds. Create atmosphere.

### 4.1 Texture Techniques

```css
/* Noise grain overlay */
.grain::after {
  content: '';
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: 0.35;
  mix-blend-mode: overlay;
}

/* Grid lines (editorial/brutalist) */
.grid-bg {
  background-image: 
    linear-gradient(var(--color-border) 1px, transparent 1px),
    linear-gradient(90deg, var(--color-border) 1px, transparent 1px);
  background-size: 40px 40px;
}

/* Dot matrix */
.dot-bg {
  background-image: radial-gradient(circle, var(--color-border) 1px, transparent 1px);
  background-size: 24px 24px;
}

/* Diagonal stripes (subtle) */
.stripe-bg {
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 10px,
    var(--color-accent-dim) 10px,
    var(--color-accent-dim) 11px
  );
}

/* Mesh gradient (do NOT use purple) */
.mesh-bg {
  background:
    radial-gradient(ellipse 60% 50% at 20% 80%, rgba(196,163,90,0.15), transparent),
    radial-gradient(ellipse 40% 60% at 80% 20%, rgba(80,120,100,0.12), transparent),
    var(--color-bg);
}
```

### 4.2 Decorative Borders & Frames

```css
/* Corner marks (editorial) */
.framed {
  position: relative;
  padding: 2rem;
}
.framed::before, .framed::after {
  content: '';
  position: absolute;
  width: 24px;
  height: 24px;
  border-color: var(--color-accent);
  border-style: solid;
}
.framed::before { top: 0; left: 0; border-width: 2px 0 0 2px; }
.framed::after  { bottom: 0; right: 0; border-width: 0 2px 2px 0; }

/* Rule lines (academic) */
.ruled {
  background-image: repeating-linear-gradient(
    transparent, transparent 1.4rem, var(--color-border) 1.4rem, var(--color-border) calc(1.4rem + 1px)
  );
  line-height: 1.4rem;
}
```

---

## 5. Layout — Break the Grid (Intentionally)

### 5.1 Layout Rules That Create Character

**Use asymmetry with purpose:**
```css
/* Offset column layout */
.asymmetric {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: clamp(2rem, 5vw, 6rem);
  align-items: start;
}

/* Bleeding elements past container */
.bleed-right {
  margin-right: -4rem;
  padding-right: 4rem;
}

/* Overlapping layers */
.overlap-container {
  display: grid;
  grid-template-areas: "stack";
}
.overlap-container > * { grid-area: stack; }
.overlap-back  { transform: translate(-1rem, -1rem); }
.overlap-front { transform: translate( 1rem,  1rem); }
```

**Diagonal and angled sections:**
```css
.angled-section {
  clip-path: polygon(0 5%, 100% 0, 100% 95%, 0 100%);
  padding: 8rem 2rem;
  margin: -3rem 0;
}

.diagonal-divider {
  height: 80px;
  background: var(--color-surface);
  clip-path: polygon(0 0, 100% 60%, 100% 100%, 0 100%);
}
```

**Oversized decorative numbers or letters:**
```css
.section-number {
  font-size: clamp(6rem, 15vw, 14rem);
  font-weight: 900;
  line-height: 0.85;
  color: var(--color-accent-dim);
  user-select: none;
  position: absolute;
  top: -0.2em;
  left: -0.1em;
  z-index: 0;
}
```

### 5.2 Negative Space (The Most Underused Tool)
- More whitespace = more confidence = higher perceived quality
- `padding: clamp(4rem, 10vw, 10rem)` for hero sections
- Let elements breathe — don't fill every gap

### 5.3 Sticky & Scroll-Based Layouts

```css
/* Sticky sidebar that doesn't scroll with content */
.sticky-sidebar {
  position: sticky;
  top: 2rem;
  height: fit-content;
}

/* Horizontal scrolling section */
.scroll-x {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  gap: 1.5rem;
  padding: 1rem 2rem;
}
.scroll-x > * {
  scroll-snap-align: start;
  flex-shrink: 0;
  width: min(80vw, 380px);
}
```

---

## 6. Motion & Animation

### 6.1 The Hierarchy of Animation Impact
1. **Page load / entry** — single orchestrated reveal beats scattered animations
2. **Scroll-triggered** — elements arriving as user discovers them
3. **Hover states** — magnetic, smooth, surprising
4. **Micro-interactions** — button presses, toggles, state changes
5. **Ambient / idle** — subtle life when nothing else is happening

### 6.2 Entry Animations — The Staggered Reveal

```css
/* Base state */
.reveal {
  opacity: 0;
  transform: translateY(28px);
  animation: reveal 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes reveal {
  to { opacity: 1; transform: translateY(0); }
}

/* Stagger children */
.reveal-group > *:nth-child(1) { animation-delay: 0.1s; }
.reveal-group > *:nth-child(2) { animation-delay: 0.2s; }
.reveal-group > *:nth-child(3) { animation-delay: 0.3s; }
.reveal-group > *:nth-child(4) { animation-delay: 0.4s; }

/* Alternative: dramatic text reveal */
@keyframes text-reveal {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0 0% 0 0); }
}
.text-reveal {
  animation: text-reveal 0.8s cubic-bezier(0.77, 0, 0.18, 1) forwards;
}
```

### 6.3 Hover States That Feel Alive

```css
/* Magnetic button effect (JS-assisted) */
.magnetic-btn {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Underline draw */
.link-draw {
  background: linear-gradient(currentColor, currentColor) no-repeat 100% 100%;
  background-size: 0% 1px;
  transition: background-size 0.4s cubic-bezier(0.77, 0, 0.18, 1);
  background-position: 0% 100%;
}
.link-draw:hover {
  background-size: 100% 1px;
  background-position: 0% 100%;
}

/* Card lift with shadow evolution */
.card {
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1),
              box-shadow 0.35s ease;
}
.card:hover {
  transform: translateY(-6px) rotate(-0.3deg);
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
}

/* Image zoom inside container */
.img-zoom img {
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.img-zoom:hover img { transform: scale(1.06); }

/* Text color sweep */
.color-sweep {
  background: linear-gradient(90deg, var(--color-accent) 50%, var(--color-text) 50%);
  background-size: 200% 100%;
  background-position: 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: background-position 0.4s ease;
}
.color-sweep:hover { background-position: 0%; }
```

### 6.4 Scroll-Triggered Effects (Intersection Observer)

```javascript
// Lightweight scroll reveal — no library needed
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target); // Only trigger once
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

```css
[data-reveal] { opacity: 0; transform: translateY(40px); transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.16, 1, 0.3, 1); }
[data-reveal].in-view { opacity: 1; transform: none; }
[data-reveal="left"]  { transform: translateX(-40px); }
[data-reveal="right"] { transform: translateX(40px); }
[data-reveal="scale"] { transform: scale(0.92); }
```

### 6.5 Ambient Motion (Subtle Life)

```css
/* Slow pulse on accent elements */
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 0 0 var(--color-accent-dim); }
  50%       { box-shadow: 0 0 0 8px transparent; }
}

/* Floating animation */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}
.float { animation: float 5s ease-in-out infinite; }

/* Cursor tracking (JS) — makes elements follow the cursor */
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth  - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const depth = parseFloat(el.dataset.parallax) || 1;
    el.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
  });
});
```

### 6.6 Always Include Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 7. Components — Designed, Not Default

### 7.1 Buttons

```css
/* Avoid generic border-radius: 8px rounded buttons. Pick a personality. */

/* Sharp / Brutalist */
.btn-brutal {
  border: 2px solid currentColor;
  border-radius: 0;
  padding: 0.75rem 2rem;
  font-family: var(--font-mono);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.75rem;
  transition: background 0.15s, color 0.15s;
}
.btn-brutal:hover { background: var(--color-text); color: var(--color-bg); }

/* Pill / Soft */
.btn-pill {
  border-radius: 100px;
  padding: 0.6rem 1.8rem;
  background: var(--color-accent);
  color: var(--color-bg);
  font-weight: 500;
  box-shadow: 0 2px 12px var(--color-accent-dim);
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s;
}
.btn-pill:hover { transform: scale(1.04); box-shadow: 0 4px 24px var(--color-accent-dim); }

/* Ghost / Outlined with fill-on-hover */
.btn-ghost {
  border: 1px solid var(--color-border);
  background: transparent;
  padding: 0.7rem 1.8rem;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  isolation: isolate;
}
.btn-ghost::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-surface);
  transform: translateY(100%);
  transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: -1;
}
.btn-ghost:hover::before { transform: translateY(0); }
```

### 7.2 Cards

```css
/* Cards should NOT all look the same */

/* Bordered card (Editorial) */
.card-editorial {
  border: 1px solid var(--color-border);
  padding: 2rem;
  position: relative;
}
.card-editorial::before {
  content: '';
  position: absolute;
  top: 0; left: 2rem;
  width: 2rem; height: 3px;
  background: var(--color-accent);
}

/* Elevated card (Soft) */
.card-elevated {
  background: var(--color-surface);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.04), 0 12px 32px rgba(0,0,0,0.08);
  border: 1px solid rgba(255,255,255,0.08);
}

/* Inset card (Dark/Brutalist) */
.card-inset {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  box-shadow: inset 0 2px 8px rgba(0,0,0,0.4);
  padding: 1.5rem;
}
```

### 7.3 Custom Cursor

```css
/* Custom cursor — immediately distinctive */
*, *::before, *::after { cursor: none; }

.cursor {
  position: fixed;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference; /* Inverts over content — always visible */
}
.cursor-dot {
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: transform 0.15s ease;
}
.cursor-ring {
  width: 36px;
  height: 36px;
  border: 1px solid white;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, transform 0.1s ease;
}
/* On hover of interactive elements */
a:hover ~ .cursor .cursor-ring,
button:hover ~ .cursor .cursor-ring {
  width: 60px; height: 60px;
}
```

```javascript
// Custom cursor tracking
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');

document.addEventListener('mousemove', (e) => {
  dot.style.left  = e.clientX + 'px';
  dot.style.top   = e.clientY + 'px';
  // Ring follows with slight lag
  requestAnimationFrame(() => {
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });
});
```

### 7.4 Form Inputs That Feel Custom

```css
/* Never use default browser input styles */
.input {
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--color-border);
  border-radius: 0;
  padding: 0.75rem 0;
  width: 100%;
  font-family: inherit;
  font-size: 1rem;
  color: var(--color-text);
  transition: border-color 0.2s;
  outline: none;
}
.input:focus { border-color: var(--color-accent); }

/* Floating label */
.field {
  position: relative;
  padding-top: 1.5rem;
}
.field label {
  position: absolute;
  top: 1.75rem;
  font-size: 0.875rem;
  color: var(--color-muted);
  transition: top 0.2s, font-size 0.2s, color 0.2s;
  pointer-events: none;
}
.field input:focus ~ label,
.field input:not(:placeholder-shown) ~ label {
  top: 0;
  font-size: 0.7rem;
  color: var(--color-accent);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}
```

---

## 8. Visual Details That Separate Good from Memorable

### 8.1 The Checklist of Distinguishing Details
- [ ] Custom selection color: `::selection { background: var(--color-accent); color: var(--color-bg); }`
- [ ] Custom scrollbar (where appropriate)
- [ ] Smooth scroll: `html { scroll-behavior: smooth; }`
- [ ] Focus styles that match the aesthetic (not just browser default outline)
- [ ] Loading states that feel designed
- [ ] Empty states with personality
- [ ] Error states with character (not generic red text)
- [ ] Print styles if relevant
- [ ] Favicon matches the brand

### 8.2 Custom Scrollbar

```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-bg); }
::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 100px;
}
::-webkit-scrollbar-thumb:hover { background: var(--color-accent); }
/* Firefox */
html { scrollbar-width: thin; scrollbar-color: var(--color-border) var(--color-bg); }
```

### 8.3 Focus Styles

```css
/* Matches the accent, not the browser default */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 4px;
  border-radius: 3px;
}
```

### 8.4 Selection Color

```css
::selection {
  background-color: var(--color-accent);
  color: var(--color-bg);
}
```

---

## 9. The Anti-Pattern Checklist (Before You Ship)

Run through this before finalizing any output.

### ❌ Instant Disqualifiers
- [ ] Purple gradient on light background anywhere
- [ ] Inter or Roboto as primary typeface
- [ ] All buttons are the same style
- [ ] Cards all identical size and shape
- [ ] Centered layout for everything
- [ ] Blue as the only accent color
- [ ] Generic hero: big headline, subtext, two buttons, abstract blob
- [ ] Font-awesome icons for decorative elements
- [ ] Box shadows all `0 4px 6px rgba(0,0,0,0.1)` (the Tailwind default)
- [ ] `border-radius: 8px` uniformly applied to everything
- [ ] No motion whatsoever on a marketing/showcase page
- [ ] Predictable 3-column feature grid with icons + title + 2 sentences

### ✅ Signs of Genuine Design Intent
- [ ] The font choice feels like a deliberate personality statement
- [ ] There's at least one "surprising" layout decision (not just top-down flow)
- [ ] The accent color is used with restraint and precision
- [ ] There is visible hierarchy — not everything is the same weight/size
- [ ] At least one interaction feels genuinely delightful
- [ ] The page has atmosphere — not just a white (or dark) rectangle
- [ ] Negative space is used intentionally
- [ ] Someone could name the aesthetic direction just by looking at it

---

## 10. Accessibility — Non-Negotiable

Visual distinctiveness must never come at the cost of accessibility.

```
Color contrast: minimum 4.5:1 for body text, 3:1 for large text
All interactive elements keyboard-navigable
Custom cursors need fallback for pointer: none preference
Animations wrapped in @media (prefers-reduced-motion)
Decorative elements have aria-hidden="true"
Images have alt text
Form inputs have associated labels
Focus indicators always visible
```

```css
/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

---

## 11. React-Specific Patterns

When building React components:

```jsx
// Use framer-motion for production-grade animation (available as 'motion' library)
import { motion, useScroll, useTransform } from 'motion/react';

// Staggered children pattern
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

// Parallax scroll
function ParallaxSection() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  return <motion.div style={{ y }}>{/* content */}</motion.div>;
}
```

---

## 12. The Production Mindset

Every output should answer "yes" to:

1. **Would a senior designer at a top studio be proud of this?**
2. **Is there a clear, singular aesthetic identity?**
3. **Would someone screenshot this to share as an example of good design?**
4. **Does every small detail serve the whole?**

If the answer to any of these is "maybe" or "no" — push further. 

Bold maximalism and refined minimalism both work. The key is **intentionality, not intensity**. A single perfectly-spaced typeface on a white background with one gold rule can be more distinctive than a maximalist design executed without conviction.

**Claude is capable of extraordinary creative work. Don't hold back.**
