# Design System — CareerPath

**Version:** 1.0  
**Last Updated:** 2026-08-15  
**Status:** Strategy Phase (Pre-Implementation)

---

## 1. Design Vision

CareerPath is a professional career development platform designed to help users track their growth, set goals, and build meaningful contributions. The visual identity reflects this mission through:

- **Warm, approachable professionalism** — inviting without sacrificing credibility
- **Strategic color meaning** — semantic colors guide understanding and decision-making
- **Clear visual hierarchy** — prominent actions and status information surface naturally
- **Intentional restraint** — limited color palette creates focus and calm

---

## 2. Color System

### 2.1 Primary Colors

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Primary Accent** | Warm Golden Yellow | `#F6D374` | Buttons, active states, highlights, call-to-action |
| **Success/Completed** | Emerald Green | `#10B981` | Badges for completed goals/contributions, positive status |
| **In Progress** | Warm Orange | `#F97316` | Progress indicators, active items |
| **Information** | Soft Blue | `#3B82F6` | Info badges, secondary actions, links |
| **High Priority** | Coral Red | `#EF4444` | Priority badges, warnings, urgent states |

### 2.2 Neutral Colors

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| **Foreground (Dark)** | Near Black | `#1F2937` | Primary text, headings |
| **Foreground (Secondary)** | Slate Gray | `#6B7280` | Secondary text, labels |
| **Background** | Off White | `#F9FAFB` | Page backgrounds, card fills |
| **Border/Divider** | Light Gray | `#E5E7EB` | Borders, dividers, subtle separations |
| **Overlay/Backdrop** | Dark with Alpha | `rgba(0, 0, 0, 0.5)` | Modal backdrops, overlays |

### 2.3 Semantic Color Usage

**Status indicators** use distinct colors to communicate state at a glance:
- ✅ Completed → Emerald Green (`#10B981`)
- 🔄 In Progress → Warm Orange (`#F97316`)
- 📅 Planned → Soft Blue (`#3B82F6`)
- ⚠️ High Priority → Coral Red (`#EF4444`)

**Interactive elements** use warm golden yellow (`#F6D374`) to guide user actions while maintaining visual cohesion.

---

## 3. Component-Specific Color Guidance

### 3.1 ProfileHeader
- **Status badge** — Uses semantic color (completed/in-progress/planned)
- **PDI badge** — Soft blue (`#3B82F6`) background with dark text
- **Name accent line** — Warm golden yellow (`#F6D374`)
- **Tech stack tags** — Subtle background tints with colored left borders matching semantic role

### 3.2 GoalsList
- **Goal cards** — Light backgrounds with colored left borders (semantic status)
- **Priority label** — Coral red (`#EF4444`) for high-priority items
- **Progress bar** — Gradient from warm orange (`#F97316`) to emerald green (`#10B981`)
- **Goal status text** — Semantic color matching status value

### 3.3 ContributionsList
- **Contribution cards** — Centered cards with status-driven accent colors
- **Status badge** — Full semantic color palette (completed/in-progress/planned)
- **Contribution type label** — Soft blue (`#3B82F6`) with subtle background

### 3.4 SoftSkillsList
- **Skill cards** — Warm yellow (`#F6D374`) left border accent
- **Skill level indicator** — Gradient representing proficiency (soft blue to emerald green)
- **Skill name** — Dark foreground (`#1F2937`)

### 3.5 RoadmapList
- **Timeline items** — Colored indicators based on quarter/phase status
- **Active milestone** — Warm golden yellow (`#F6D374`) highlight
- **Completed milestone** — Emerald green (`#10B981`)
- **Future milestone** — Soft blue (`#3B82F6`)

### 3.6 Navigation & Footer
- **Active nav link** — Warm golden yellow (`#F6D374`) underline
- **Hover states** — Subtle background tint in primary color
- **Footer divider** — Light gray (`#E5E7EB`)
- **Social/external links** — Soft blue (`#3B82F6`)

---

## 4. Typography

### 4.1 Typeface
- **Font Family:** System stack (SF Pro Display → -apple-system, BlinkMacSystemFont → Segoe UI → Roboto)
- **Weights:** 400 (regular), 500 (medium), 600 (semibold), 700 (bold)

### 4.2 Type Scale

| Role | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| **H1 (Page Title)** | 32px | 700 | 40px | Main page headings |
| **H2 (Section Title)** | 24px | 600 | 32px | Section headers |
| **H3 (Card Title)** | 18px | 600 | 28px | Card/component titles |
| **Body** | 16px | 400 | 24px | Paragraph text |
| **Label/Metadata** | 14px | 500 | 20px | Labels, secondary info |
| **Small Text** | 12px | 400 | 18px | Captions, timestamps |

### 4.3 Text Color Hierarchy

| Level | Color | Hex | Usage |
|-------|-------|-----|-------|
| **Primary** | Dark Foreground | `#1F2937` | Headings, primary copy |
| **Secondary** | Slate Gray | `#6B7280` | Secondary info, metadata |
| **Tertiary** | Light Gray | `#9CA3AF` | Disabled text, fine print |
| **Accent (on dark bg)** | Off White | `#F9FAFB` | Text on colored backgrounds |

---

## 5. Spacing & Layout

### 5.1 Spacing Scale
Consistent spacing maintains rhythm and visual harmony:
- **xs:** 4px
- **sm:** 8px
- **md:** 16px
- **lg:** 24px
- **xl:** 32px
- **2xl:** 48px

### 5.2 Component Padding
- **Card padding:** 24px (lg)
- **Button padding:** 12px horizontal (md), 8px vertical (sm)
- **Input padding:** 12px (md)
- **List item padding:** 16px vertical (md), 24px horizontal (lg)

### 5.3 Gap & Margins
- **List gaps:** 16px between items (md)
- **Section margins:** 32px top/bottom (xl)
- **Component spacing:** 16-24px between major sections

---

## 6. Interactive States

### 6.1 Button States
- **Default:** Warm golden yellow (`#F6D374`) background, dark text
- **Hover:** Darken by 10-15%, slight shadow elevation
- **Active/Pressed:** Darken by 20%, inset shadow
- **Disabled:** Gray background (`#D1D5DB`), disabled text color (`#9CA3AF`)
- **Focus:** Outline with primary color (2px, offset 2px)

### 6.2 Input States
- **Default:** Light gray border (`#E5E7EB`), white background
- **Focus:** Blue border (`#3B82F6`), subtle shadow
- **Error:** Red border (`#EF4444`)
- **Disabled:** Gray background (`#F3F4F6`), disabled text

### 6.3 Card/Surface Hover
- **Slight shadow elevation:** 0 4px 12px rgba(0, 0, 0, 0.1)
- **Subtle background tint:** +1-2% opacity increase
- **Border color:** Slight brightening (if bordered)

---

## 7. Responsive Behavior

### 7.1 Breakpoints
- **Mobile:** < 640px (single column, full-width cards)
- **Tablet:** 640px–1024px (two-column grid for lists)
- **Desktop:** ≥ 1024px (three-column grid, enhanced spacing)

### 7.2 Component Adaptation
- **Cards:** Stack vertically on mobile; grid layout on tablet+
- **Navigation:** Hamburger menu on mobile; full navbar on desktop
- **Typography:** Slightly reduced on mobile (H1: 28px → 32px on desktop)
- **Padding/Spacing:** Reduced by ~25% on mobile

---

## 8. Dark Mode (Future Phase)

*Placeholder for future dark mode implementation.*

Dark mode will invert the neutral color palette while maintaining semantic meaning:
- Background → Near black (`#111827`)
- Foreground → Off white (`#F3F4F6`)
- Semantic colors → Adjusted for contrast and visual comfort

---

## 9. Accessibility

### 9.1 Color Contrast
- **Text on backgrounds:** Minimum WCAG AA (4.5:1 for normal text, 3:1 for large text)
- **Interactive elements:** Clearly distinguishable by color + additional visual indicator (border, icon, text label)

### 9.2 Focus & Navigation
- **Keyboard focus:** Visible focus ring (2px outline, primary color)
- **Tab order:** Logical, top-to-bottom / left-to-right
- **Skip links:** (Optional) Skip to main content on mobile

### 9.3 Semantic HTML
- Proper heading hierarchy (H1 → H2 → H3)
- Form labels associated with inputs (`<label for>`)
- ARIA roles where necessary (badges, status indicators)

---

## 10. Implementation Checklist

- [ ] Apply primary accent color (`#F6D374`) to buttons and CTAs
- [ ] Implement semantic status colors across goal/contribution/roadmap components
- [ ] Update badge styling with appropriate background and text colors
- [ ] Enhance profile header with accent line and PDI badge color
- [ ] Apply tech stack tag styling with colored borders
- [ ] Test color contrast for WCAG AA compliance
- [ ] Validate on mobile, tablet, and desktop viewports
- [ ] Document component variants in component library (future)

---

## 11. Design Assets & References

- **Color palette reference:** Tailwind CSS extended palette
- **Typography reference:** System fonts (SF Pro Display, Segoe UI, Roboto)
- **Component inspiration:** Modern SaaS applications (GitHub, Linear, Vercel)
- **Accessibility standard:** WCAG 2.1 Level AA

---

## 12. Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-08-15 | Initial design system documentation (strategy phase) |

---

**Design Direction:** Warm, professional, semantic. Ready for implementation review.
