# NIAT Brand Color Palette — Section Mapping

This document defines **which colors from the NIAT brand palette** are used in each section of the NIAT-AMA app. All tokens are then applied in CSS variables and component styles.

---

## 1. Brand token reference

### Primary (maroon / red)
| Token | Hex | Usage |
|-------|-----|--------|
| Primary | `#991b1b` | Main brand, buttons, links, borders |
| Primary light | `#b91c1c` | Hover states |
| Primary dark | `#7f1d1d` | Darker variant (e.g. FAQ/Footer bg) |
| Primary foreground | `#ffffff` | Text on primary (e.g. white on buttons) |

### Secondary (purple)
| Token | Hex | Usage |
|-------|-----|--------|
| Secondary | `#7678ed` | Purple accent (Campus Life, tags) |
| Secondary light | `#9496f0` | Lighter purple |
| Secondary dark | `#5a5cb8` | Darker purple |
| Secondary foreground | `#ffffff` | Text on secondary |

### Accent (warm)
| Token | Hex | Usage |
|-------|-----|--------|
| Accent 1 (yellow/amber) | `#f7b801` | Highlights, tags |
| Accent 2 (orange) | `#f18701` | Experiences, accents |
| Accent 3 (red-orange) | `#f35b04` | Strong accent |

### UI / semantic
| Token | Hex / value | Usage |
|-------|-------------|--------|
| Navbar background | `#fff8eb` | Navbar, light cream |
| Section background | `#fbf2f3` | Page/section background (light pink) |
| Text | `#1e293b` | Body text |
| Text muted | `rgba(30, 41, 59, 0.7)` | Muted text |
| Border | `rgba(30, 41, 59, 0.1)` | Borders, dividers |
| Caption/muted gray | `#9ca3af` | Captions |
| Shadow soft | `rgba(30, 41, 59, 0.06)` | Soft shadow |
| Shadow card | `rgba(30, 41, 59, 0.08)` | Card shadow |

### Hero gradient
| Token | Hex | Usage |
|-------|-----|--------|
| Hero from | `#220000` | Start of hero gradient |
| Hero to | `#974039` | End of hero gradient |
| Gradient | `linear-gradient(135deg, #220000 0%, #974039 100%)` | Hero section background |

---

## 2. Section-by-section color usage

### Navbar
| Element | Token | Notes |
|---------|--------|--------|
| Background (default) | Transparent / Navbar background on scroll | `#fff8eb` when scrolled |
| Logo “NIAT” | Primary | `#991b1b` |
| “Senior Connect” | Text muted | `rgba(30,41,59,0.7)` or Text |
| Border (scrolled) | Border | `rgba(30,41,59,0.1)` |
| “Book Your Slot” button | Primary bg, Primary foreground | `#991b1b`, white text |
| Button hover | Primary light | `#b91c1c` |

### Hero
| Element | Token | Notes |
|---------|--------|--------|
| Background | Hero gradient | `linear-gradient(135deg, #220000 0%, #974039 100%)` |
| Top separator line | Border (light on dark) | `rgba(255,255,255,0.2)` |
| Badge “Exclusively for 12th…” | Accent 1 or white | `#f7b801` or `#ffffff` |
| Title & subheading | Primary foreground | `#ffffff` |
| Description | Primary foreground, slight mute | `rgba(255,255,255,0.9)` |
| “Book Your Slot” button | White border, Primary foreground; hover: Primary light bg | White outline, white text |
| Diagonal divider (below) | Section background | `#fbf2f3` |

### How It Works
| Element | Token | Notes |
|---------|--------|--------|
| Section background | Section background | `#fbf2f3` |
| Section label | Primary | `#991b1b` |
| Heading emphasis | Primary | Italic phrase |
| Card 1 left border | Secondary | `#7678ed` |
| Card 2 left border | Accent 2 | `#f18701` |
| Card 3 left border | Accent 3 | `#f35b04` |
| Card text | Text, Text muted | `#1e293b`, muted for body |
| Video placeholder overlay | Primary + dark | Gradient with primary |
| Section divider (below) | Navbar background | `#fff8eb` |

### Meet Seniors
| Element | Token | Notes |
|---------|--------|--------|
| Section background | Navbar background | `#fff8eb` |
| Section label | Primary | `#991b1b` |
| Heading emphasis | Primary | Italic “Real advice.” |
| Senior 1 (Karthik) | Accent 2 | Orange `#f18701` |
| Senior 2 (Ramya) | Secondary | Purple `#7678ed` |
| Senior 3 (Abdul) | Accent 3 | Red-orange `#f35b04` |
| Card borders, buttons, badges | Per-senior accent | Same as above |
| Body text | Text, Text muted | `#1e293b`, muted where needed |

### Discover Life (Life at NIAT)
| Element | Token | Notes |
|---------|--------|--------|
| Section background | Section background | `#fbf2f3` |
| Section label | Primary | `#991b1b` |
| Subtitle | Text muted | `rgba(30,41,59,0.7)` |
| Story card 1 | Secondary | `#7678ed` |
| Story card 2 | Accent 2 | `#f18701` |
| Story card 3 | Accent 3 or Primary | `#f35b04` or `#991b1b` |
| “More stories…” | Text muted | Caption gray `#9ca3af` |
| Section divider (below) | Navbar background | `#fff8eb` |

### FAQ
| Element | Token | Notes |
|---------|--------|--------|
| Section background | Primary dark | `#7f1d1d` |
| Section label, heading | Primary foreground | `#ffffff` |
| Subtitle | Primary foreground muted | `rgba(255,255,255,0.6)` |
| Bubbles | Primary, Secondary, Accent 1, Accent 2, Accent 3, Secondary dark | Mix for variety |
| Badge pills | Primary foreground on transparent | White text |
| Decorative dots | Primary foreground, low opacity | `rgba(255,255,255,0.1–0.25)` |

### CTA (“Book Your Slot” block)
| Element | Token | Notes |
|---------|--------|--------|
| Section background | Primary | `#991b1b` |
| Heading, text | Primary foreground | `#ffffff` |
| “Book Your Slot Now” button | White bg, Primary text | Hover: slight lift, same colors |
| Footer line | Primary foreground muted | `rgba(255,255,255,0.5)` |
| Decorative stars | Primary foreground, low opacity | `rgba(255,255,255,0.15)` |

### Footer
| Element | Token | Notes |
|---------|--------|--------|
| Background | Primary dark | `#7f1d1d` |
| “NIAT” | Primary foreground | `#ffffff` |
| “Senior Connect” | Accent 1 or Primary light | `#f7b801` or `#b91c1c` for accent |
| Copyright | Primary foreground muted | `rgba(255,255,255,0.7)` |

---

## 3. Summary

- **Primary** (`#991b1b`): Navbar logo, section labels, CTA block, primary buttons, links.
- **Primary dark** (`#7f1d1d`): FAQ and Footer backgrounds.
- **Primary light** (`#b91c1c`): Button/link hover.
- **Secondary** (`#7678ed`): Campus Life / story cards, one How It Works card, one senior card, FAQ bubbles.
- **Accent 1** (`#f7b801`): Hero badge (optional), Footer “Senior Connect”, tags.
- **Accent 2** (`#f18701`): How It Works card, senior card, story card, FAQ bubbles.
- **Accent 3** (`#f35b04`): How It Works card, senior card, story card, FAQ bubbles.
- **Navbar bg** (`#fff8eb`): Navbar when scrolled, alternating section backgrounds.
- **Section bg** (`#fbf2f3`): How It Works, Discover Life, alternating sections.
- **Text** (`#1e293b`): All body and headings on light backgrounds.
- **Hero**: Dark gradient `#220000` → `#974039` with white text and white-outline CTA.

All application styles (global CSS and components) should reference these tokens so the app stays on-brand and easy to update.
