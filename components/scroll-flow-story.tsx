"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DueDateTimeline } from "@/components/due-date-timeline";
import { EmailEnvelope } from "@/components/email-envelope";
import { FlowDatabase } from "@/components/flow/flow-database";
import { FlowInvoiceDocument } from "@/components/flow-invoice-document";
import { flowScenes } from "@/components/flow/scenes";
import { flyingFields } from "@/components/flow/flying-fields";
import { getFlowDom } from "@/components/flow/dom";
import { setupBuildFlow } from "@/components/flow/setup-build-flow";
import { setupExtractionFlow } from "@/components/flow/setup-extraction-flow";
import { setupStatusFlow } from "@/components/flow/setup-status-flow";
import { ReminderDocument } from "@/components/reminder-document";
import { SystemInbox } from "@/components/system-inbox";

export function ScrollFlowStory() {
  const root = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const section = root.current;
      if (!section) return;
      const dom = getFlowDom(section);
      if (!dom) return;
      const media = gsap.matchMedia();
      media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        setupBuildFlow(dom);
        const clearFlights = setupExtractionFlow(dom);
        setupStatusFlow(dom);
        gsap.utils.toArray<HTMLElement>("[data-scene]", section).forEach((article) => {
          gsap.fromTo(article.querySelectorAll(".eyebrow, h3, p"), { autoAlpha: 0.38, y: 34 }, {
            autoAlpha: 1,
            y: 0,
            stagger: 0.07,
            scrollTrigger: { trigger: article, start: "top 72%", end: "top 44%", scrub: 0.35 },
          });
        });
        gsap.to(section.querySelector("[data-progress]"), {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: section, start: "top 60%", end: "bottom 55%", scrub: 0.2 },
        });
        return clearFlights;
      });
      return () => media.revert();
    }, root);
    return () => context.revert();
  }, []);

  return (
    <section className="story story--flow" id="so-funktionierts" ref={root}>
      <div className="story__progress" aria-hidden="true"><span data-progress /></div>
      <div className="shell story__intro">
        <span className="eyebrow">Vom Dokument zum Geldfluss</span>
        <h2>
          Eine Rechnung. <span className="story__intro-nowrap">Ein durchgehender Flow.</span>
        </h2>
        <p>Das Blatt kommt aus Ihrer bestehenden Rechnungssoftware, gelangt zu 0Admin und gibt seine relevanten Daten sichtbar an das System weiter.</p>
      </div>
      <div className="shell story__layout">
        <div className="story__stage" aria-label="Animierte Prozessdarstellung">
          <div className="story__stage-frame story-flow" data-flow-frame>
            <div className="story-flow__ambient" aria-hidden="true"><span /><span /><span /></div>
            <span className="story-flow__source-label" data-source-label>Bestehende Rechnungssoftware</span>
            <div className="story-flow__invoice" data-flow-invoice>
              <FlowInvoiceDocument />
              <span className="story-flow__scan" data-scan-line aria-hidden="true" />
            </div>
            <div className="story-flow__panel story-flow__panel--email" data-email-panel><EmailEnvelope /></div>
            <div className="story-flow__panel story-flow__panel--inbox" data-inbox-panel><SystemInbox /></div>
            <div className="story-flow__panel story-flow__panel--database" data-database-panel><FlowDatabase /></div>
            <div className="story-flow__panel story-flow__panel--due" data-due-panel><DueDateTimeline /><span className="due-flow-progress" data-due-progress aria-hidden="true" /></div>
            <div className="story-flow__panel story-flow__panel--reminder" data-reminder-panel><ReminderDocument /></div>
            <svg className="story-flow__lines" aria-hidden="true">
              {flyingFields.map(({ key }) => <path key={key} data-flow-line={key} pathLength="1" />)}
            </svg>
            <div className="story-flow__flyers" aria-hidden="true">
              {flyingFields.map(({ key, value }) => <span key={key} data-fly-field={key}>{value}</span>)}
            </div>
          </div>
          <div className="story__stage-caption"><span>Exemplarischer Ablauf</span><strong>0Admin von DPPFOR</strong></div>
        </div>
        <div className="story__scenes">
          {flowScenes.map(([key, number, eyebrow, title, text]) => (
            <article className="story-scene" data-scene={key} key={key}>
              <span className="story-scene__number">{number}</span>
              <div><span className="eyebrow">{eyebrow}</span><h3>{title}</h3><p>{text}</p></div>
            </article>
          ))}
        </div>
      </div>
      <span className="sr-only">Neun strukturierte Felder werden im exemplarischen Ablauf verarbeitet.</span>
    </section>
  );
}
