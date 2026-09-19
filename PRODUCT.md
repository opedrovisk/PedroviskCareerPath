# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are professionals, recruiters, and peers who want to understand a software developer's profile, career trajectory, and current development goals. The product supports a single-person professional profile with structured visibility into current role, skills, delivery history, and ongoing personal growth.

Inferred from repository evidence: this is a personal developer portfolio and career-planning dashboard rather than a product for a broader business workflow.

## Product Purpose

This project presents an individual developer's identity, technical stack, goals, roadmap, contributions, and soft skills in one place. It exists to showcase professional growth, communicate current priorities, and maintain a visible record of progress over time.

Success means a visitor can quickly understand who the person is, what they do, where they are in their development plan, what they have delivered, and what they are working toward.

## Positioning

This project is a personal professional portfolio and development tracker with a structured career-plan narrative. It is not a generic résumé template or a standard portfolio site; its differentiator is the combination of personal profile data, objective tracking, roadmap visibility, and measurable progress indicators.

## Operating Context

The app is used as a web-based personal dashboard and portfolio. It is organized around career development sections: overview, goals, roadmap, contributions, and soft skills. It relies on a backend API for profile and record data and is designed for browser-based viewing on desktop and smaller screens.

## Capabilities and Constraints

- Displays a professional profile with name, title, company, stack, bio, and social links.
- Shows a development plan timeline with progress tracking across start and end dates.
- Manages goal records with priority, status, deadlines, and progress percentages.
- Exposes a roadmap of technologies or milestones.
- Lists contributions and personal skill areas with visible levels.
- Uses a React + TypeScript + Vite client app and a .NET API backend.
- Product data is structured and persisted through the API layer rather than static content only.
- No binding brand, legal, or asset commitments were provided by the user; future visual work must not assume external branding requirements.
- Open decision: the exact audience split, official name usage, and broader product scope remain intentionally flexible unless the user later confirms them.

## Brand Commitments

No formal brand system, logo, approved color palette, typography standard, or visual identity was provided for this project. No binding brand commitments are currently in force.

## Evidence on Hand

- Client app structure and routes in the React project: [client/src/App.tsx](client/src/App.tsx)
- Profile and personal data model: [client/src/types/index.ts](client/src/types/index.ts)
- Profile UI and personal development metrics: [client/src/components/ProfileHeader.tsx](client/src/components/ProfileHeader.tsx)
- Career goals section and progress filtering: [client/src/components/GoalsList.tsx](client/src/components/GoalsList.tsx)
- Navigation and presentation shell: [client/src/components/Navbar.tsx](client/src/components/Navbar.tsx)
- API profile model: [PedroviskCareerPath.API/Models/Profile.cs](PedroviskCareerPath.API/Models/Profile.cs)
- Project stack and app entry: [client/package.json](client/package.json)

No explicit external brand assets, company identity system, or testimonial library were found in the repository. Future work must not invent them.

## Product Principles

1. Make the developer's professional story easy to understand at a glance.
2. Keep career progress visible, measurable, and honest.
3. Treat personal growth and work history as structured evidence, not decoration.
4. Prioritize clarity, trust, and browsing flow over marketing-heavy storytelling.
5. Maintain a coherent single-person portfolio experience across multiple sections.

## Accessibility & Inclusion

No product-specific accessibility requirements were confirmed beyond normal web accessibility expectations. Future design and implementation work should maintain readable contrast, keyboard access, and responsive usability for standard desktop and mobile browsing.
