import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />

      <div className="relative z-10 mx-auto max-w-2xl px-6 text-center space-y-8">
        <p className="text-8xl sm:text-9xl font-bold gradient-text">404</p>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Page Not Found
        </h1>

        <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button asChild size="lg" className="text-base">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="text-base">
            <Link href="/contact">
              Get in Touch
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="pt-4 text-sm text-muted-foreground">
          <p>
            Looking for something specific? Check out our{" "}
            <Link href="/services" className="underline underline-offset-4 hover:text-foreground transition-colors">
              Services
            </Link>
            ,{" "}
            <Link href="/blog" className="underline underline-offset-4 hover:text-foreground transition-colors">
              Blog
            </Link>
            , or{" "}
            <Link href="/about" className="underline underline-offset-4 hover:text-foreground transition-colors">
              About
            </Link>{" "}
            page.
          </p>
        </div>
      </div>
    </section>
  );
}
