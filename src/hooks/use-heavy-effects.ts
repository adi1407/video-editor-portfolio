"use client";

import { useEffect, useState } from "react";
import { useMediaQuery, useMounted } from "@/hooks";

export function useHeavyEffects() {
  const mounted = useMounted();
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const enableHeavyEffects = mounted && !isMobile && !reducedMotion;

  return { mounted, isMobile, reducedMotion, enableHeavyEffects };
}
