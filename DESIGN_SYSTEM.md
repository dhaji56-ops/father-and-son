# Swiss International Design System

> **CRITICAL**: Read this document before implementing any UI components.

## Design Philosophy

**The International Typographic Style (Swiss Style)** is a philosophy of objective communication born in 1950s Switzerland. It rejects personal expression and subjectivity in favor of universal clarity, mathematical precision, and logical structure.

**Core Tenets:**

1. **Objectivity over Subjectivity**: The design must recede to let the content speak. Every visual decision must be justifiable by the content's needs.

2. **The Grid as Law**: The grid is the absolute authority. We generally avoid static center-alignment in favor of **asymmetrical organization** to create dynamic visual rhythm and tension.

3. **Typography is the Interface**: Type is the primary structural and graphical element. We use grotesque sans-serif typefaces (Inter) because they are neutral vessels for meaning.

4. **Active Negative Space**: White space is not "empty"; it is an active structural element that defines boundaries and creates breathing room.

5. **Layered Texture & Depth**: While maintaining flatness (no shadows or 3D effects), we achieve visual depth through **subtle pattern overlays**: grid lines, dot matrices, diagonal stripes, and noise textures.

6. **Universal Intelligibility**: The design should be understood instantly—clean, legible, and undeniably modern.

---

## Design Tokens

### Colors (Strict Palette)
| Token | Value | Usage |
|-------|-------|-------|
| `swiss-bg` | `#FFFFFF` | Pure white background |
| `swiss-fg` | `#000000` | Pure black text |
| `swiss-muted` | `#F2F2F2` | Secondary backgrounds |
| `swiss-accent` | `#FF3000` | Swiss red - CTAs only |
| `swiss-border` | `#000000` | Visible structure |

### Typography
- **Font Family**: `Inter` (weights 400, 500, 700, 900)
- **Headings**: UPPERCASE, tight tracking (`-0.04em`)
- **Scale**: `display-sm` (3rem) → `display-3xl` (10rem)

### Borders & Radius
- **Radius**: `0` - Strictly rectangular, no curves
- **Borders**: Thick, visible (`border-2`, `border-4`)

### Effects
- **Shadows**: NONE - Depth via patterns only
- **Transitions**: `duration-200 ease-out` - Snappy, mechanical

---

## CSS Patterns

Use these utility classes for visual depth:

| Class | Description |
|-------|-------------|
| `.pattern-grid` | 24px architectural grid, 3% opacity |
| `.pattern-grid-large` | 48px grid for hero areas |
| `.pattern-grid-dark` | Grid for dark backgrounds |
| `.pattern-dots` | 16px halftone dots, 8% opacity |
| `.pattern-diagonal` | 45° lines, 3% opacity |
| `.pattern-noise` | SVG fractal noise overlay |

---

## Component Guidelines

### Buttons
- Shape: `rounded-none` (rectangular)
- Primary: Black bg → Red on hover
- Secondary: Red bg
- Outline: White bg with black border
- Typography: UPPERCASE, bold, `tracking-wide`

### Cards
- Border: `border-4 border-black`
- Background: White or `swiss-muted`
- Hover: Full color inversion (black bg, white text)
- Padding: Generous (`p-8`, `p-12`)

### Inputs
- Border: `border-2 border-black`
- Focus: Border changes to `swiss-accent` (no ring)
- Placeholder: UPPERCASE, tracking-wide

### Section Labels
- Format: "01. SECTION NAME"
- Number: `swiss-accent` color
- Text: UPPERCASE, `tracking-widest`, `text-xs`

---

## Layout Strategy

- **Grid**: Visible through borders
- **Asymmetry**: Dynamic balance (8:4, 7:5, 5:7 ratios)
- **Alignment**: Strict left alignment for text
- **Separators**: Horizontal/vertical lines to divide sections

---

## Animation Guidelines

- **Feel**: Instant, mechanical, snappy, precise
- **Duration**: `200ms ease-out` or `150ms ease-linear`
- **Hover States**: Color inversions, scale (1.05), rotation
- **Never**: Elastic/spring animations, subtle fades

---

## Responsive Breakpoints

| Breakpoint | Typography | Layout |
|------------|------------|--------|
| Mobile (<768px) | `text-display-sm` | Single column |
| Tablet (768-1024px) | `text-display-md` | Two columns |
| Desktop (1024px+) | `text-display-xl` | Full asymmetric |

**Key Principles:**
- Never reduce border thickness
- Maintain UPPERCASE typography
- Patterns visible at all breakpoints
- Spacing: min `p-8` on mobile, `p-12`+ on desktop

---

## Accessibility

- **Contrast**: 21:1 (black/white)
- **Focus**: 4px red outline
- **Touch targets**: 44×44px minimum
- **Motion**: Respect `prefers-reduced-motion`
