"use client";

import { lazy, Suspense, useState, useEffect, Component, type ComponentType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface Lazy3DSceneProps {
  scene: "hero" | "cta";
  className?: string;
  fallback?: ReactNode;
}

const HeroScene = lazy(() => import("./HeroScene"));
const CTAScene = lazy(() => import("./CTAScene"));

function DefaultFallback() {
  return <div className="absolute inset-0 gradient-bg opacity-20" />;
}

class ErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default function Lazy3DScene({ scene, className, fallback }: Lazy3DSceneProps) {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    try {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const nav = navigator as Navigator & {
        connection?: { effectiveType?: string };
        deviceMemory?: number;
      };

      if (nav.connection?.effectiveType === "2g") return;
      if (nav.deviceMemory && nav.deviceMemory < 2) return;

      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) return;

      setShouldRender(true);
    } catch {
      // silently fail — no 3D on this device
    }
  }, []);

  const fb = fallback ?? <DefaultFallback />;

  if (!shouldRender) {
    return <div className={cn("absolute inset-0", className)}>{fb}</div>;
  }

  const SceneComponent: ComponentType = scene === "hero" ? HeroScene : CTAScene;

  return (
    <div className={cn("absolute inset-0", className)}>
      <ErrorBoundary fallback={fb}>
        <Suspense fallback={fb}>
          <SceneComponent />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
