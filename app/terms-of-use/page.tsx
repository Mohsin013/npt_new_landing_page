import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Terms and Conditions for NorthPeak Technologies. Read our terms of service governing the use of our website and services.",
  alternates: {
    canonical: "https://northpeaktechnologies.com/terms-of-use",
  },
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight mb-8">
        Terms and Conditions
      </h1>
      <p className="text-sm text-muted-foreground mb-12">
        Last updated: April 29, 2026
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing and using the NorthPeak Technologies website and
            services, you agree to be bound by these Terms and Conditions. If you
            do not agree with any part of these terms, please do not use our
            services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">2. Services</h2>
          <p className="text-muted-foreground leading-relaxed">
            NorthPeak Technologies provides software development services
            including but not limited to MVP development, AI solutions, web and
            mobile application development, and project rescue services. The
            specific scope, deliverables, and timeline for any engagement will be
            defined in a separate agreement between NorthPeak Technologies and the
            client.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            3. Intellectual Property
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            All content on this website, including text, graphics, logos, and
            images, is the property of NorthPeak Technologies and is protected by
            applicable intellectual property laws. You may not reproduce,
            distribute, or create derivative works from any content without our
            prior written consent.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">4. User Obligations</h2>
          <p className="text-muted-foreground leading-relaxed">
            You agree to use our website and services only for lawful purposes. You
            shall not attempt to gain unauthorized access to any part of our
            systems, interfere with the proper functioning of the website, or
            engage in any activity that could harm NorthPeak Technologies or its
            users.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            5. Limitation of Liability
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            To the fullest extent permitted by law, NorthPeak Technologies shall
            not be liable for any indirect, incidental, special, consequential, or
            punitive damages arising from your use of our website or services. Our
            total liability shall not exceed the amount paid by you for the
            specific service giving rise to the claim.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">6. Termination</h2>
          <p className="text-muted-foreground leading-relaxed">
            We reserve the right to terminate or suspend access to our services at
            our sole discretion, without prior notice, for conduct that we believe
            violates these Terms and Conditions or is harmful to other users,
            NorthPeak Technologies, or third parties.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
          <p className="text-muted-foreground leading-relaxed">
            These Terms and Conditions shall be governed by and construed in
            accordance with the laws of India. Any disputes arising under these
            terms shall be subject to the exclusive jurisdiction of the courts in
            India.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            8. Changes to These Terms
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            NorthPeak Technologies reserves the right to modify these Terms and
            Conditions at any time. Changes will be effective immediately upon
            posting on this page. Your continued use of our services after any
            changes constitutes acceptance of the updated terms.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">9. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions about these Terms and Conditions, please
            contact us at{" "}
            <a
              href="mailto:info@northpeaktechnologies.com"
              className="text-primary hover:underline"
            >
              info@northpeaktechnologies.com
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
