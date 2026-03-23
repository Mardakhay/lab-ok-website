# LAB-OK Website

Multi-page service website for **LAB-OK**, a laboratory equipment service company based in Baku, Azerbaijan.

---

## Project Structure

```
lab-ok-website/
├── index.html          ← Home page
├── services.html       ← Services catalog
├── contact.html        ← Contact & service request
├── css/
│   └── style.css       ← Shared stylesheet (the only CSS file)
└── js/
    └── main.js         ← Shared JavaScript (the only JS file)
```

Tailwind CSS loads via CDN and handles utility classes. All custom styles live in `css/style.css`.

---

## What Each File Does

**`index.html`** — Home page with hero, service overview, trust blocks, and CTAs.

**`services.html`** — Full service catalog. Desktop shows a bento grid; mobile shows a stacked list.

**`contact.html`** — Contact channels (phone, WhatsApp, Telegram, email) and a service request form.

**`css/style.css`** — All custom styles, organized in 5 sections: base → layout → components → pages → js-hooks.

**`js/main.js`** — Fade-in on scroll, mobile menu, active nav state, smooth scrolling, form UX feedback.

---

## How to Edit Content

### Text on any page

Open the HTML file and edit text directly inside the elements. Text is never in CSS or JS.

- **Headline** → `<h1>` or `<h2>` in the relevant section
- **Description** → `<p>` below the headline
- **Small uppercase labels** → `<span>` or `<label>` with `font-label text-[10px] uppercase tracking-widest`
- **Button text** → inside `<a>` or `<button>` tags

### Contact details

Update these in `contact.html` and wherever they appear in `index.html`:

| Field | Attribute |
|-------|-----------|
| Phone | `href="tel:+994..."` and display text |
| WhatsApp | `href="https://wa.me/994..."` |
| Telegram | `href="https://t.me/..."` and display text |
| Email | `href="mailto:..."` and display text |
| Address | Inside the "Operations HQ" block |

Always update both the `href` attribute and the visible label text together.

### Services

Each service has the same structure:

```html
<div class="group">
  <span class="...">Service 01 • SRV-INST</span>  ← label
  <h2 class="...">Installation</h2>               ← title
  <p class="...">When you need this text.</p>      ← trigger condition
  <div class="bg-surface-container-low ...">
    <p class="...">What you get text.</p>          ← outcome
  </div>
</div>
```

Both desktop (bento grid) and mobile (stacked list) versions exist in `services.html`. Update them together to stay in sync.

---

## Content Rules

The design is "Rational Brutalism" — precise, authoritative, no filler.

**Do:**
- Keep headlines short and declarative: "Certified Calibration", "Emergency Repair"
- Use one idea per sentence
- Use specific technical terms: "IQ/OQ/PQ", "ISO 17025", "NIST-traceable"
- Name sectors explicitly: medical, industrial, manufacturing
- Reference Baku and Azerbaijan where relevant

**Don't:**
- Use vague marketing phrases: "we are passionate about", "best-in-class"
- Write paragraphs longer than 2–3 sentences
- Add exclamation marks
- Use generic verbs: "leverage", "empower", "optimize"

---

## CSS Organization

`css/style.css` follows a strict 5-section structure:

```
/* 1. BASE       — reset, typography, font defaults, ::selection */
/* 2. LAYOUT     — scroll offset, max-width wrapper             */
/* 3. COMPONENTS — nav, buttons, footer, bento-grid, blueprint  */
/* 4. PAGES      — scoped overrides: .home, .services, .contact */
/* 5. JS-HOOKS   — .fade-in, .fade-in-stagger, .service-card    */
```

**Color values** are defined in the Tailwind config inside each HTML file:
- Primary: `#003f87`
- Primary container: `#0056b3`
- Surface: `#f8f9fa`
- On-surface: `#191c1d`
- On-surface-variant: `#424752`
- Outline-variant: `#c2c6d4`

**Responsive nav switching** is handled by explicit CSS breakpoints, not Tailwind classes, to avoid conflicts:

```css
@media (max-width: 767px)  { .nav-top: none; .mobile-header: flex; .nav-bottom: flex; }
@media (min-width: 768px)  { .nav-top: flex; .mobile-header: none; .nav-bottom: none; }
```

**Page-scoped styles** use the body class to avoid conflicts between pages:
```html
<body class="home">      ← index.html
<body class="services">  ← services.html
<body class="contact">   ← contact.html
```

---

## How to Add New Content

### New section on an existing page

1. Copy an existing `<section>` block that has a similar structure
2. Edit text only — do not change class names
3. Use these spacing classes: `py-16 md:py-24`, `px-6 md:px-8`
4. Add `fade-in` to the `<section>` so it animates on scroll
5. Test at both mobile and desktop widths

```html
<section class="py-16 md:py-24 bg-surface fade-in">
    <div class="container mx-auto px-6 md:px-8">
        <label class="block text-[10px] font-bold uppercase tracking-[0.3em] text-on-surface-variant mb-4">
            Section Label
        </label>
        <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-on-surface mb-8">
            Section Title.
        </h2>
        <!-- content -->
    </div>
</section>
```

### New page

1. Copy `index.html` as a template
2. Change `<body class="home">` to `<body class="your-page">`
3. Update `<title>` and `<meta name="description">`
4. Set the correct `active` class on the nav links (top nav + bottom nav)
5. Add the new page link to the nav in **all** existing HTML files
6. Add `fade-in` or `fade-in-stagger` to major sections

### New contact channel

Add it in `contact.html` inside the urgent support block. Mirror it in the hero quick-contact area in `index.html`.

---

## Do's and Don'ts

### CSS

✅ Add new styles in `css/style.css` under the correct section  
✅ Scope page overrides using `.home`, `.services`, `.contact` body classes  
✅ Use Tailwind utilities for spacing, colors, and typography  
✅ Add `transition-colors` or `transition-all` to interactive elements  

❌ Add `<style>` blocks inside HTML files  
❌ Duplicate styles that already exist in `style.css`  
❌ Change the Tailwind color names — they map to the design system  
❌ Add `border-radius` — the design intentionally uses 0px everywhere  

### HTML

✅ Use semantic elements: `<nav>`, `<header>`, `<main>`, `<section>`, `<footer>`  
✅ Keep desktop and mobile content in sync when both versions exist  
✅ Add `alt` text to any images you add  

❌ Remove the body class (`home`, `services`, `contact`) — it powers CSS scoping  
❌ Remove `fade-in` / `fade-in-stagger` classes — they power scroll animations  
❌ Add inline `style="..."` attributes — use Tailwind classes or `style.css` instead  
❌ Edit nav or footer in only one file — they must be consistent across all pages  

### JavaScript

✅ Add new functions at the bottom of `js/main.js`  
✅ Call them from the `DOMContentLoaded` block  
✅ Keep interactions subtle: fade, color shift — not pop or flash  

❌ Use `localStorage` or `sessionStorage`  
❌ Import external libraries without checking performance impact  

---

## Deployment

This is a static website — no build step required.

Upload the entire folder to any static host: Netlify, Vercel, GitHub Pages, Hostinger.

The folder structure must be preserved: `css/` and `js/` must be at the same level as the HTML files.

Tailwind loads from `cdn.tailwindcss.com` — the browser needs internet access to render correctly.

> **For production:** replace the Tailwind CDN script with a compiled CSS file (via Tailwind CLI or Vite) to eliminate the CDN dependency and improve load time.
