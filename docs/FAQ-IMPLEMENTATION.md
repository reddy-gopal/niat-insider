# FAQ Section – Implementation (Mobile & Desktop)

This document describes the full implementation of the FAQ section in the NIAT-AMA app for both mobile and desktop.

---

## 1. Overview

- **Component:** `src/components/FAQ.jsx`
- **Breakpoint:** Mobile = viewport width **&lt; 768px**; Desktop = **≥ 768px**
- **Data:** Six FAQ items defined in a `bubbles` array; each item has question text, color, shape, position (desktop), animation, texture, and rotation.

---

## 2. Data Model: `bubbles`

Each FAQ item is an object with:

| Property        | Type   | Description |
|----------------|--------|-------------|
| `question`     | string | FAQ question text shown in the bubble |
| `color`        | string | Hex color (e.g. `#f18701`, `#7678ed`) |
| `shape`        | string | `wide-oval` \| `round-oval` \| `speech-right` \| `speech-left` (desktop only) |
| `position`     | object | `{ top: string, left: string }` – used only on desktop (e.g. `"12%"`, `"4%"`) |
| `floatDelay`   | string | CSS animation delay (e.g. `"0s"`, `"0.6s"`) – desktop drift |
| `floatDuration`| string | CSS animation duration (e.g. `"4.2s"`) – desktop drift |
| `texture`      | string | `solid` \| `dots` \| `grid` \| `cloudy` – background style |
| `rotation`     | string | CSS rotation (e.g. `"-4deg"`) – desktop only |

**Current questions (6):**

1. What's the difference between a regular college and one that offers the NIAT program?
2. Do we actually get paid internships in the first year?
3. Can I start my own startup while studying?
4. How do I crack the NAT? Any tips from seniors?
5. What's campus life & the peer group really like?
6. Are there real placement & internship opportunities?

---

## 3. Section Layout (Shared)

- **Background:** `#0d4f5c`
- **Padding:** `64px 5% 72px`
- **Min height:** `520px`
- **Overflow:** `hidden` (for floating dots and desktop bubbles)

**Decorative dots:** Five absolutely positioned circles with different sizes (6–14px), positions (%), and `drift-float` animation delays. They are visual only.

**Header (same on both):**

- Label: “NO DOUBT IS SILLY” (uppercase, 11px, letter-spacing 3px)
- Title: “Clear all your doubts *in one session.*” (Playfair Display, clamp 1.9rem–3rem)
- Subtitle: “Ask anything. Get real answers.” (15px, 60% white)

**Bottom badges (same on both):**

- Two pills: “✓ Genuine Answers”, “✓ #Unfiltered”
- Style: `rgba(255,255,255,0.1)` background, white text, 13px, 6px 16px padding, 50px radius
- **Mobile:** `marginTop: 24`  
- **Desktop:** `marginTop: 40`

---

## 4. Desktop Implementation

### 4.1 Container

- **Display:** `block` (no grid)
- **Position:** `relative`
- **Min height:** `380px`
- **Gap / padding:** none

### 4.2 Bubble Cards (Desktop)

- **Position:** `absolute`; each card’s `top` and `left` come from `bubble.position` (e.g. `top: "12%"`, `left: "4%"`).
- **Size (by shape):**
  - `wide-oval`: 280×160px
  - `round-oval`: 200×180px
  - `speech-right`: 240×150px
  - `speech-left`: 300×170px
- **Animation:** `drift-float` infinite, with per-bubble `floatDuration` and `floatDelay`. Uses `--rotation` for slight rotation.
- **Shape:** Circle (`borderRadius: '50%'`) plus a CSS `::after` “tail” whose position depends on `bubble-{shape}` (wide-oval, round-oval, speech-right, speech-left).

### 4.3 Desktop Interactions

- **Hover:** Scale `1.06`, stronger shadow `0 12px 30px rgba(0,0,0,0.2)`.
- **Default:** Scale `1`, shadow `0 6px 16px rgba(0,0,0,0.08)`.
- **Z-index:** Hovered card gets `zIndex: 10` so it appears above others.

### 4.4 Desktop Textures

- **solid:** `linear-gradient(135deg, color, darker)` + `backgroundColor: color`.
- **dots:** Solid `backgroundColor` + overlay with `radial-gradient` dots (8×8px).
- **grid:** Solid color + overlay with white line grid (10×10px).
- **cloudy:** `linear-gradient(160deg, #c9e8f5 → color)`; text color `#1e293b` for contrast.

### 4.5 Desktop Typography

- Font: `'DM Sans', sans-serif`
- Size: `13.5px`
- Weight: `600` default, `700` on hover
- Padding: `20px 22px`
- Line-height: `1.5`
- Text color: usually `rgba(255,255,255,0.95)`; `cloudy` uses `#1e293b`

---

## 5. Mobile Implementation

### 5.1 Breakpoint and State

- `isMobile = window.innerWidth < 768`
- Updated on `resize` via `useEffect` and `handleResize`.

### 5.2 Container

- **Display:** `grid`
- **Columns:** `1fr 1fr` (two equal columns)
- **Gap:** `10px`
- **Padding:** `0 4px`
- **Min height:** `auto`
- Bubbles are in normal flow (no absolute positioning).

### 5.3 Bubble Cards (Mobile)

- **Position:** `relative`
- **Size:** Width `100%` (one half of the grid minus gap); height fixed at **92px** for all.
- **Shape:** Rounded rectangle – `borderRadius: 16` (no circle, no tail).
- **Tail:** `.bubble-mobile::after { display: none }` so speech tails are hidden on mobile.
- **Animation:** No drift. Each bubble uses **entrance animation** `faq-bubble-in`:
  - Duration: `0.4s`, easing: `ease`
  - Delay: `index * 0.05s` (staggered)
  - Keyframes: `from { opacity: 0; transform: scale(0.92) translateY(8px); }` → `to { opacity: 1; transform: scale(1) translateY(0); }`

### 5.4 Mobile Interactions

- **Touch press:** `onTouchStart` sets `pressed = true` → scale `0.96`, shadow `0 2px 8px rgba(0,0,0,0.15)`.
- **Release:** `onTouchEnd` sets `pressed = false` → back to scale `1` and default shadow.
- **Hover:** No scale-up on mobile (only `hovered && !isMobile` scales to 1.06).
- **Z-index:** Pressed or hovered card gets `zIndex: 10`.

### 5.5 Mobile Typography

- Font: `'DM Sans', sans-serif`
- Size: `11.5px`
- Weight: `600` default, `700` when pressed/hovered
- Padding: `10px 12px`
- Line-height: `1.4`
- Text color: same as desktop (white by default; `cloudy` uses dark text).

### 5.6 Mobile Layout Result

- **6 bubbles** in a **2×3 grid**: two per row, three rows.
- Small, uniform cards with staggered entrance and tap feedback.

---

## 6. Shared Bubble Logic (BubbleCard)

- **State:** `hovered`, `pressed` (pressed used for touch feedback).
- **Scale:** `pressed ? 0.96 : (hovered && !isMobile ? 1.06 : 1)`.
- **Shadow:** Depends on `pressed` and `hovered && !isMobile` as above.
- **Events:** `onMouseEnter` / `onMouseLeave`; `onTouchStart` / `onTouchEnd` (mobile).
- **Texture overlay:** A div with `position: absolute`, `inset: 0`, and texture styles (`texStyles`) for dots/grid; `borderRadius: 'inherit'`.

---

## 7. CSS Keyframes (In Component)

**drift-float (desktop):**

```css
0%   { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
33%  { transform: translateY(-14px) rotate(calc(var(--rotation, 0deg) + 1deg)); }
66%  { transform: translateY(-6px) rotate(calc(var(--rotation, 0deg) - 0.5deg)); }
100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
```

**faq-bubble-in (mobile entrance):**

```css
from { opacity: 0; transform: scale(0.92) translateY(8px); }
to   { opacity: 1; transform: scale(1) translateY(0); }
```

**Speech tails (desktop only):** `.bubble-wide-oval::after`, `.bubble-round-oval::after`, `.bubble-speech-right::after`, `.bubble-speech-left::after` define triangular “tails” with `var(--bubble-color)`. `.bubble-mobile::after` is set to `display: none` on mobile.

---

## 8. Props and Usage

- **FAQ** receives: `{ faqRef }` (React ref for the section, e.g. for scroll/visibility).
- **BubbleCard** receives: `bubble` (one item from `bubbles`), `isMobile` (boolean), `index` (number, for stagger delay on mobile).

---

## 9. File and Dependencies

- **File:** `niat-ama/src/components/FAQ.jsx`
- **Imports:** `useState`, `useEffect` from React only; no external UI libs.
- **Export:** Named export `FAQ`.

---

## 10. Summary Table

| Aspect            | Desktop                          | Mobile                              |
|------------------|-----------------------------------|-------------------------------------|
| Layout           | Absolute-positioned bubbles       | 2-column grid (1fr 1fr), 10px gap   |
| Bubble size      | By shape (e.g. 200×180, 280×160)  | Fixed 92px height, full column width |
| Shape            | Circle + speech tail              | Rounded rect (16px), no tail        |
| Animation        | Infinite drift-float + rotation    | One-time staggered faq-bubble-in    |
| Hover            | Scale 1.06, stronger shadow        | No scale-up                         |
| Touch            | N/A                               | Scale 0.96 + softer shadow on press |
| Font size        | 13.5px                            | 11.5px                              |
| Padding          | 20px 22px                         | 10px 12px                           |
| Badge margin-top | 40px                              | 24px                                |

This is the full implementation of the FAQ section on both mobile and desktop.
