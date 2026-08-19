"use client";

import { useEffect } from "react";

export default function ScrollAtmosphere() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting));
    }, { threshold: 0.12 });
    document.querySelectorAll("main section, .service-card, .action-grid > a").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <div className="scroll-atmosphere" aria-hidden="true"><div className="atmosphere-flow" /><div className="atmosphere-network" /><div className="atmosphere-glow glow-a" /><div className="atmosphere-glow glow-b" /></div>;
}
