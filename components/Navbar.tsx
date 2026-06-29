"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/#work", label: "Work" },
  { href: "/#faqs", label: "FAQs" },
  { href: "/about", label: "About" },
];

function NavLink({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={cn(
        "relative px-4 py-2 text-sm font-medium rounded-lg transition-colors",
        isActive
          ? "text-primary"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      {isActive && (
        <motion.div
          layoutId="nav-underline"
          className="absolute bottom-0 left-2 right-2 h-0.5 gradient-bg rounded-full"
          transition={{ type: "spring", stiffness: 500, damping: 35 }}
        />
      )}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-lg" : "bg-transparent"
      )}
    >
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] gradient-bg origin-left"
        style={{ scaleX, opacity: scrolled ? 1 : 0 }}
        transition={{ opacity: { duration: 0.3 } }}
      />

      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/assets/company_logo.png"
            alt="NorthPeak Technologies"
            width={32}
            height={32}
            className="rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
          />
          <span className="text-lg font-bold tracking-tight">
            NorthPeak <span className="text-muted-foreground font-normal">Technologies</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.href}
              href={link.href}
              label={link.label}
              isActive={pathname === link.href}
            />
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden glass border-t border-border overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className={cn(
                      "block px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                      pathname === link.href
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 border-t border-border mt-2">
                <Button asChild className="w-full" size="sm">
                  <Link href="/contact">Get Started</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
