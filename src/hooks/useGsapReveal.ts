import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "./useReducedMotion";
gsap.registerPlugin(ScrollTrigger);
export function useGsapReveal(root: RefObject<HTMLElement | null>) {
  const reduced = useReducedMotion();
  useLayoutEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .forEach((el) =>
          gsap.from(el, {
            y: 35,
            opacity: 0,
            duration: 0.85,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }),
        );
      gsap.utils
        .toArray<HTMLElement>("[data-heading]")
        .forEach((el) =>
          gsap.from(el.querySelectorAll(".heading-line > span"), {
            yPercent: 105,
            opacity: 0,
            stagger: 0.08,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }),
        );
      gsap.utils.toArray<HTMLElement>("[data-image]").forEach((el) => {
        gsap.from(el, {
          clipPath: "inset(0 0 100% 0)",
          duration: 1.15,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
        gsap.fromTo(
          el.querySelector("img"),
          { scale: 1.05 },
          {
            scale: 1,
            y: -8,
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      });
      gsap.utils
        .toArray<HTMLElement>("[data-stagger]")
        .forEach((el) =>
          gsap.from(el.children, {
            y: 24,
            opacity: 0,
            stagger: 0.09,
            duration: 0.7,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }),
        );
      gsap.utils.toArray<SVGPathElement>(".energy-draw").forEach((el) => {
        const len = el.getTotalLength();
        gsap.fromTo(
          el,
          { strokeDasharray: len, strokeDashoffset: len },
          {
            strokeDashoffset: 0,
            scrollTrigger: {
              trigger: "#energy",
              start: "top 75%",
              end: "bottom 65%",
              scrub: 1,
            },
          },
        );
      });
      gsap.utils
        .toArray<HTMLElement>(".flow-node")
        .forEach((el, i) =>
          gsap.fromTo(
            el,
            { opacity: 0.35 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: "#energy",
                start: `top ${75 - i * 9}%`,
                end: `top ${65 - i * 9}%`,
                scrub: true,
              },
            },
          ),
        );
      gsap.from(".process-progress", {
        scaleX: 0,
        transformOrigin: "left",
        scrollTrigger: {
          trigger: "#services",
          start: "top 70%",
          end: "bottom 70%",
          scrub: 1,
        },
      });
      gsap.utils
        .toArray<HTMLElement>(".process-item")
        .forEach((el, i) =>
          gsap.fromTo(
            el,
            { opacity: 0.35 },
            {
              opacity: 1,
              scrollTrigger: {
                trigger: "#services",
                start: `top ${78 - i * 7}%`,
                end: `top ${65 - i * 7}%`,
                scrub: true,
              },
            },
          ),
        );
      gsap.to(".hero-copy", {
        y: -55,
        opacity: 0.2,
        scrollTrigger: {
          trigger: "#home",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.utils.toArray<HTMLElement>("[data-counter]").forEach((el) => {
        const state = { n: 0 };
        gsap.to(state, {
          n: Number(el.dataset.counter),
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(state.n));
          },
          scrollTrigger: { trigger: el, once: true, start: "top 90%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, [root, reduced]);
}
