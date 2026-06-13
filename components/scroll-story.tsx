"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DueDateTimeline } from "@/components/due-date-timeline";
import { EmailEnvelope } from "@/components/email-envelope";
import { ExtractionScene } from "@/components/extraction-scene";
import { InvoiceDocument } from "@/components/invoice-document";
import { ReminderDocument } from "@/components/reminder-document";
import { SystemInbox } from "@/components/system-inbox";

const scenes = [
  { key: "invoice", number: "01", eyebrow: "Ausgangspunkt", title: "Sie verschicken Ihre Rechnung wie gewohnt.", text: "0Admin setzt nicht voraus, dass Sie Ihren bestehenden Rechnungsschritt ersetzen. Der exemplarische Ablauf beginnt dort, wo die Rechnung den Betrieb verlässt." },
  { key: "email", number: "02", eyebrow: "Versand", title: "Die Rechnung geht an den Kunden.", text: "Der Anhang bleibt das bekannte Dokument. Gleichzeitig entsteht eine nachvollziehbare Verbindung zum operativen Vorgang." },
  { key: "inbox", number: "03", eyebrow: "Eingang", title: "0Admin übernimmt ab hier die Übersicht.", text: "Dokumenttyp, Vorgang und Status werden zugeordnet. Verarbeitung bleibt sichtbar statt in einer unsichtbaren Automatisierung zu verschwinden." },
  { key: "extract", number: "04", eyebrow: "Struktur", title: "Aus dem Dokument wird ein sauberer Vorgang.", text: "Rechnungsnummer, Kunde, Datum und Beträge stehen strukturiert bereit. Unsichere Felder werden markiert und nicht still übernommen." },
  { key: "due", number: "05", eyebrow: "Frist", title: "0Admin verliert keine Fälligkeit aus dem Blick.", text: "Der Zustand wechselt verständlich von offen zu überfällig. Text, Symbol und Farbe zeigen gemeinsam, ob Handlungsbedarf besteht." },
  { key: "reminder", number: "06", eyebrow: "Vorbereitung", title: "Überfällig? Der nächste Schritt ist bereits vorbereitet.", text: "Eine freundliche Zahlungserinnerung übernimmt die bekannten Daten. Der Status bleibt jedoch Entwurf – Versand ist noch gesperrt." },
] as const;

export function ScrollStory() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      const layers = gsap.utils.toArray<HTMLElement>("[data-layer]");
      gsap.set(layers, { autoAlpha: 0, y: 28, scale: 0.98, pointerEvents: "none" });
      gsap.set('[data-layer="invoice"]', { autoAlpha: 1, y: 0, scale: 1 });

      const activate = (key: string) => {
        layers.forEach((layer) => {
          const active = layer.dataset.layer === key;
          gsap.to(layer, {
            autoAlpha: active ? 1 : 0,
            y: active ? 0 : 24,
            scale: active ? 1 : 0.985,
            duration: 0.45,
            ease: "power2.out",
            overwrite: true,
            pointerEvents: active ? "auto" : "none",
          });
        });
      };

      const media = gsap.matchMedia();
      media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>("[data-scene]").forEach((scene) => {
          ScrollTrigger.create({
            trigger: scene,
            start: "top 56%",
            end: "bottom 44%",
            onEnter: () => activate(scene.dataset.scene ?? "invoice"),
            onEnterBack: () => activate(scene.dataset.scene ?? "invoice"),
          });
        });

        gsap.to("[data-progress]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top 60%",
            end: "bottom 55%",
            scrub: 0.2,
          },
        });
      });

      return () => media.revert();
    }, root);

    return () => context.revert();
  }, []);

  return (
    <section className="story" id="so-funktionierts" ref={root}>
      <div className="story__progress" aria-hidden="true"><span data-progress /></div>
      <div className="shell story__intro">
        <span className="eyebrow">Vom Dokument zum Geldfluss</span>
        <h2>Die Rechnung bleibt sichtbar. Ihr Zustand verändert sich.</h2>
        <p>Scrollen Sie durch einen exemplarischen Ablauf. Jede Bewegung steht für einen fachlichen Zustandswechsel – nicht für Dekoration.</p>
      </div>
      <div className="shell story__layout">
        <div className="story__stage" aria-label="Animierte Prozessdarstellung">
          <div className="story__stage-frame">
            <div className="stage-layer" data-layer="invoice"><InvoiceDocument /></div>
            <div className="stage-layer" data-layer="email"><div className="stage-composition stage-composition--email"><InvoiceDocument compact /><EmailEnvelope /></div></div>
            <div className="stage-layer" data-layer="inbox"><div className="stage-composition stage-composition--inbox"><InvoiceDocument compact /><SystemInbox /></div></div>
            <div className="stage-layer" data-layer="extract"><ExtractionScene /></div>
            <div className="stage-layer" data-layer="due"><div className="stage-composition stage-composition--due"><InvoiceDocument compact status="Überfällig" /><DueDateTimeline /></div></div>
            <div className="stage-layer" data-layer="reminder"><div className="stage-composition stage-composition--reminder"><InvoiceDocument compact status="Überfällig" /><ReminderDocument /></div></div>
          </div>
          <div className="story__stage-caption"><span>Exemplarischer Ablauf</span><strong>0Admin von DPPFOR</strong></div>
        </div>
        <div className="story__scenes">
          {scenes.map((scene) => (
            <article className="story-scene" data-scene={scene.key} key={scene.key}>
              <span className="story-scene__number">{scene.number}</span>
              <div><span className="eyebrow">{scene.eyebrow}</span><h3>{scene.title}</h3><p>{scene.text}</p></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
