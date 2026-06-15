"use client";

import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type SiteOneToolsAnimationProps = {
  children: ReactNode;
};

export function SiteOneToolsAnimation({ children }: SiteOneToolsAnimationProps) {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const section = root.current;
      if (!section) return;

      const kicker = section.querySelector<HTMLElement>("[data-tools-kicker]");
      const title = section.querySelector<HTMLElement>("[data-tools-title]");
      const cards = gsap.utils.toArray<HTMLElement>("[data-tools-card]", section);
      const elements = [kicker, title, ...cards].filter(Boolean) as HTMLElement[];
      if (!elements.length) return;
      const scanCards = [cards[1], cards[0]].filter(Boolean);

      const media = gsap.matchMedia();
      media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(elements, { autoAlpha: 0, transformOrigin: "50% 72%" });
        gsap.set(cards, { "--s1-card-scan-x": "115%" });
        gsap.set([kicker, title], { y: 34, scale: 0.985 });
        gsap.set(cards[0], { x: -34, y: 44, scale: 0.965, rotation: -1.4 });
        gsap.set(cards[1], { x: 34, y: 44, scale: 0.965, rotation: 1.4 });

        const runCardScan = () => {
          gsap.killTweensOf(cards, "--s1-card-scan-x");
          gsap.fromTo(scanCards, { "--s1-card-scan-x": "115%" }, {
            "--s1-card-scan-x": "-115%",
            duration: 2.8,
            delay: 0.45,
            ease: "power2.out",
            stagger: 1,
          });
        };

        gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 78%",
            end: "top 34%",
            scrub: 0.45,
            invalidateOnRefresh: true,
            onEnter: runCardScan,
            onEnterBack: runCardScan,
          },
        })
          .to(kicker, { autoAlpha: 1, y: 0, scale: 1, duration: 0.28 })
          .to(title, { autoAlpha: 1, y: 0, scale: 1, duration: 0.42 }, "-=0.16")
          .to(cards, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.58,
            stagger: 0.11,
          }, "-=0.18");
      });

      media.add("(max-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.set(elements, { autoAlpha: 0, y: 28, scale: 0.985, rotation: 0, transformOrigin: "50% 70%" });
        gsap.set(cards, { "--s1-card-scan-x": "115%" });

        const runCardScan = () => {
          gsap.killTweensOf(cards, "--s1-card-scan-x");
          gsap.fromTo(scanCards, { "--s1-card-scan-x": "115%" }, {
            "--s1-card-scan-x": "-115%",
            duration: 2.8,
            delay: 0.35,
            ease: "power2.out",
            stagger: 1,
          });
        };

        gsap.timeline({
          defaults: { ease: "power2.out" },
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            end: "top 42%",
            scrub: 0.35,
            invalidateOnRefresh: true,
            onEnter: runCardScan,
            onEnterBack: runCardScan,
          },
        }).to(elements, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
        });
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section className="s1-tools" aria-labelledby="tools-title" ref={root}>
      {children}
    </section>
  );
}
