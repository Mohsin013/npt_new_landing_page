interface StructuredDataProps {
  data: Record<string, unknown>;
}

export function StructuredData({ data }: StructuredDataProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export const faqs = [
  {
    question: "Can you really build a product in 4 weeks?",
    answer:
      "Yes. Our process is optimized for speed without cutting corners. We focus on the core features that validate your idea and get you to market. After launch, we iterate based on real user feedback. Over 50 products have been built and shipped using this exact timeline.",
  },
  {
    question: "What if I'm not technical? How involved do I need to be?",
    answer:
      "You don't need any technical background. We act as your technical co-founder — you bring the vision and domain expertise, we handle the architecture, design, and development. You'll get daily updates and approve every major decision, but you won't need to write or read a single line of code.",
  },
  {
    question: "How much does it cost to build an MVP?",
    answer:
      "It depends on scope, but our 4-week MVP builds are a fraction of what you'd spend hiring even one senior developer for the same period. We'll give you a clear, fixed quote after a free consultation — no surprises, no hourly billing games.",
  },
  {
    question: "What tech stack do you use and will I own the code?",
    answer:
      "We build with React, Next.js, Node.js, and cloud infrastructure like AWS — the same tools behind Stripe, Vercel, and Notion. You own 100% of the code and IP. No lock-in, no proprietary frameworks. You can take it to any team.",
  },
  {
    question: "Can you fix or take over my existing project?",
    answer:
      "Absolutely. About 30% of our work is project rescue — fixing bugs, resolving performance issues, refactoring technical debt, and getting stalled products back on track. We'll audit your codebase and give you an honest assessment before committing.",
  },
  {
    question: "What happens after launch?",
    answer:
      "Launch is step one, not the finish line. We offer ongoing support packages for iteration, feature development, scaling, and maintenance. Most of our clients continue working with us after their initial launch because they trust our team and process.",
  },
];

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NorthPeak Technologies",
  url: "https://northpeaktechnologies.com",
  logo: "https://northpeaktechnologies.com/company_logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-7006009596",
    contactType: "sales",
    email: "info@northpeaktechnologies.com",
  },
  sameAs: [
    "https://www.instagram.com/northpeaktechnologies",
    "https://www.linkedin.com/company/northpeak-technologies",
  ],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "NorthPeak Technologies",
  url: "https://northpeaktechnologies.com",
  logo: "https://northpeaktechnologies.com/company_logo.png",
  image: "https://northpeaktechnologies.com/company_logo.png",
  telephone: "+91-7006009596",
  email: "info@northpeaktechnologies.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Srinagar",
    addressRegion: "Jammu & Kashmir",
    addressCountry: "IN",
  },
  priceRange: "$$",
  description:
    "Software development company specialising in MVP development, AI solutions, web & mobile apps. Ship your product in 4 weeks.",
  sameAs: [
    "https://www.instagram.com/northpeaktechnologies",
    "https://www.linkedin.com/company/northpeak-technologies",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "50",
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "NorthPeak Technologies",
  url: "https://northpeaktechnologies.com",
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        name: "MVP Development",
        description:
          "Go from idea to live product in 4 weeks. We build production-ready MVPs that validate your concept and attract users.",
        provider: { "@type": "Organization", name: "NorthPeak Technologies" },
        url: "https://northpeaktechnologies.com/services",
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        name: "AI & Machine Learning Solutions",
        description:
          "Custom AI integrations, chatbots, recommendation engines, and intelligent automation tailored to your business logic.",
        provider: { "@type": "Organization", name: "NorthPeak Technologies" },
        url: "https://northpeaktechnologies.com/services",
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        name: "Web & Mobile App Development",
        description:
          "Full-stack web applications and cross-platform mobile apps built with React, Next.js, Flutter, and Node.js.",
        provider: { "@type": "Organization", name: "NorthPeak Technologies" },
        url: "https://northpeaktechnologies.com/services",
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        name: "Project Rescue & Code Audit",
        description:
          "We fix failing codebases, resolve performance issues, and refactor technical debt to get stalled products back on track.",
        provider: { "@type": "Organization", name: "NorthPeak Technologies" },
        url: "https://northpeaktechnologies.com/services",
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        name: "Cloud Infrastructure & DevOps",
        description:
          "AWS architecture, CI/CD pipelines, containerization, and infrastructure designed to scale with your growth.",
        provider: { "@type": "Organization", name: "NorthPeak Technologies" },
        url: "https://northpeaktechnologies.com/services",
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Service",
        name: "UI/UX Design",
        description:
          "User-centered design that converts. We create interfaces people love to use, backed by research and real user testing.",
        provider: { "@type": "Organization", name: "NorthPeak Technologies" },
        url: "https://northpeaktechnologies.com/services",
      },
    },
  ],
};
