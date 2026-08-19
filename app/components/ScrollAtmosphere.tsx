"use client";

import { useEffect } from "react";

export default function ScrollAtmosphere() {
  useEffect(() => {
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    let frame = 0;
    const update = () => {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      root.style.setProperty("--page-scroll", `${window.scrollY}px`);
      root.style.setProperty("--page-progress", `${Math.min(window.scrollY / max, 1)}`);
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting));
    }, { threshold: 0.12 });
    document.querySelectorAll("main section, .service-card, .action-grid > a").forEach((element) => observer.observe(element));
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return <div className="scroll-atmosphere" aria-hidden="true"><div className="atmosphere-flow" /><div className="atmosphere-network" /><div className="atmosphere-glow glow-a" /><div className="atmosphere-glow glow-b" /></div>;
}
