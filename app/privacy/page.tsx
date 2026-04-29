import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for NorthPeak Technologies. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24">
      <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-12">
        Last updated: April 29, 2026
      </p>

      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p className="text-muted-foreground leading-relaxed">
            NorthPeak Technologies (&quot;we,&quot; &quot;our,&quot; or
            &quot;us&quot;) is committed to protecting your privacy. This Privacy
            Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            2. Information We Collect
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We may collect the following types of information:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>
              <strong>Personal Information:</strong> Name, email address, phone
              number, and other contact details you provide through our contact
              forms or during consultations.
            </li>
            <li>
              <strong>Usage Data:</strong> Information about how you interact with
              our website, including pages visited, time spent, and referring URLs.
            </li>
            <li>
              <strong>Technical Data:</strong> IP address, browser type, device
              information, and operating system.
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            3. How We Use Your Information
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Respond to your inquiries and provide requested services</li>
            <li>Improve our website and services</li>
            <li>Send relevant communications about our services</li>
            <li>Comply with legal obligations</li>
            <li>Protect against fraudulent or unauthorized activity</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">4. Data Sharing</h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not sell, trade, or rent your personal information to third
            parties. We may share your information with trusted service providers
            who assist us in operating our website and conducting our business,
            provided they agree to keep your information confidential. We may also
            disclose information when required by law or to protect our rights.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement appropriate technical and organizational measures to
            protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. However, no method of
            transmission over the Internet is 100% secure, and we cannot guarantee
            absolute security.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our website may use cookies and similar tracking technologies to
            enhance your browsing experience. You can control cookie preferences
            through your browser settings. Disabling cookies may affect certain
            features of our website.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our website may contain links to third-party websites. We are not
            responsible for the privacy practices or content of those sites. We
            encourage you to review the privacy policies of any third-party
            websites you visit.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Depending on your location, you may have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to or restrict processing of your data</li>
            <li>Request data portability</li>
          </ul>
          <p className="text-muted-foreground leading-relaxed mt-4">
            To exercise any of these rights, please contact us at{" "}
            <a
              href="mailto:info@northpeaktechnologies.com"
              className="text-primary hover:underline"
            >
              info@northpeaktechnologies.com
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">
            9. Changes to This Policy
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will
            be posted on this page with an updated revision date. We encourage you
            to review this policy periodically.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p className="text-muted-foreground leading-relaxed">
            If you have any questions or concerns about this Privacy Policy, please
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
