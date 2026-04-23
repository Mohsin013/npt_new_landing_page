"use client";

import { useState, useEffect } from "react";

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowEndDevice: boolean;
  prefersReducedMotion: boolean;
}

export function useDeviceDetection(): DeviceInfo {
  const [device, setDevice] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowEndDevice: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      const cores = navigator.hardwareConcurrency ?? 4;
      const motion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      setDevice({
        isMobile: w < 768,
        isTablet: w >= 768 && w < 1024,
        isDesktop: w >= 1024,
        isLowEndDevice: cores <= 2,
        prefersReducedMotion: motion,
      });
    }

    update();
    window.addEventListener("resize", update);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", update);

    return () => {
      window.removeEventListener("resize", update);
      mq.removeEventListener("change", update);
    };
  }, []);

  return device;
}
