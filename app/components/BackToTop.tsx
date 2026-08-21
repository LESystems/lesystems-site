"use client";

import ArrowIcon from "./ArrowIcon";

export default function BackToTop() {
  function returnToTop() {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  }

  return <button className="inline-action footer-back-to-top" type="button" onClick={returnToTop}>Voltar ao início <ArrowIcon direction="up" /></button>;
}
