# NorthPeak Technologies - Landing Page

Production-ready website for NorthPeak Technologies, a startup studio providing MVP development, AI solutions, and cloud infrastructure for non-technical founders.

## Tech Stack

- **Framework:** Next.js 16.2 (App Router) + React 19 + TypeScript 5
- **Styling:** Tailwind CSS 4 with custom design system (dark mode, HSL tokens)
- **3D/Animation:** Three.js + React Three Fiber (hero & CTA scenes), Framer Motion (UI transitions)
- **UI Components:** Radix UI primitives, class-variance-authority, shadcn/ui pattern
- **Icons:** Lucide React
- **Notifications:** Sonner

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended)

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
pnpm build
pnpm start
```

### Linting

```bash
pnpm lint
```

## Project Structure

```
app/
  layout.tsx            # Root layout (Inter font, metadata, providers, nav, footer)
  page.tsx              # Home page (12 sections)
  globals.css           # Design system (colors, gradients, glass, animations)
  about/                # About page
  services/             # Services page
  contact/              # Contact page with form
  blog/                 # Blog listing
  blog/[slug]/          # Dynamic blog post
  api/contact/          # Contact form API endpoint

components/
  ui/                   # Reusable UI primitives (Button, Card, Badge, Input, etc.)
  three/                # Three.js scenes (HeroScene, CTAScene, Lazy3DScene)
  Hero.tsx              # Hero with typewriter + 3D background
  TechMarquee.tsx       # Infinite scroll tech stack
  AIProminence.tsx      # AI features grid
  ProblemSolution.tsx   # Challenge cards
  SolutionSection.tsx   # 5-step process timeline
  TimelineSection.tsx   # 4-week MVP breakdown
  Services.tsx          # 10-service grid
  WhyChooseUs.tsx       # Differentiators
  Portfolio.tsx         # Project showcase
  Testimonials.tsx      # Client testimonials
  FAQSection.tsx        # Collapsible FAQ
  CTASection.tsx        # Dual-panel CTA with 3D
  Navbar.tsx            # Fixed navigation with mobile menu
  Footer.tsx            # Site footer
  StructuredData.tsx    # JSON-LD schema markup

hooks/
  useDeviceDetection.ts # Device capability detection
  useScrollReveal.ts    # Scroll-triggered animations

lib/
  utils.ts              # cn() class merge utility
  blog-data.ts          # Blog post content
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home (Hero, Tech Stack, AI, Problem/Solution, Process, Timeline, Services, Why Us, Portfolio, Testimonials, FAQ, CTA) |
| `/about` | Company info and founder profiles |
| `/services` | Detailed service offerings |
| `/contact` | Contact form + direct contact info |
| `/blog` | Blog listing with tag filters |
| `/blog/[slug]` | Individual blog posts |

## Performance Features

- 3D scenes lazy-loaded with device capability gating (skipped on low-end/2G/reduced motion)
- Image optimization via AVIF/WebP with Next.js Image
- Code splitting (Three.js, UI libs, app code in separate chunks)
- Inter font with `display: swap` and preloading
- Security headers (HSTS, X-Frame-Options, X-Content-Type-Options)

## Deployment

### Vercel (Recommended)

```bash
vercel
```

Or connect the repository to Vercel for automatic deployments.

### Environment Variables

No environment variables are required for the base deployment. For production email handling in the contact form, integrate your preferred email service in `app/api/contact/route.ts`.

## License

All rights reserved. NorthPeak Technologies.
