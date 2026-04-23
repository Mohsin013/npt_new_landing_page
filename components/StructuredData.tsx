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
    "https://www.linkedin.com/company/northpeaktechnologies",
  ],
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
  mainEntity: [
    {
      "@type": "Question",
      name: "Can you really build a product in 4 weeks?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. Our process is optimized for speed without cutting corners. We focus on the core features that validate your idea and get you to market. Over 50 products have been built and shipped using this exact timeline.",
      },
    },
    {
      "@type": "Question",
      name: "What if I'm not technical? How involved do I need to be?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You don't need any technical background. We act as your technical co-founder — you bring the vision and domain expertise, we handle the architecture, design, and development. You'll get daily updates and approve every major decision.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost to build an MVP?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "It depends on scope, but our 4-week MVP builds are a fraction of what you'd spend hiring even one senior developer for the same period. We provide a clear, fixed quote after a free consultation.",
      },
    },
    {
      "@type": "Question",
      name: "What tech stack do you use and will I own the code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "We build with React, Next.js, Node.js, and cloud infrastructure like AWS. You own 100% of the code and IP. No lock-in, no proprietary frameworks.",
      },
    },
    {
      "@type": "Question",
      name: "Can you fix or take over my existing project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Absolutely. About 30% of our work is project rescue — fixing bugs, resolving performance issues, refactoring technical debt, and getting stalled products back on track.",
      },
    },
    {
      "@type": "Question",
      name: "What happens after launch?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Launch is step one, not the finish line. We offer ongoing support packages for iteration, feature development, scaling, and maintenance. Most of our clients continue working with us after their initial launch.",
      },
    },
  ],
};
