import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { clamp, flyingFields, mix } from "@/components/flow/flying-fields";
import type { FlowDom } from "@/components/flow/dom";
import { findScene } from "@/components/flow/dom";

export function setupExtractionFlow(dom: FlowDom) {
  const { section, frame, inbox, database } = dom;
  const scene = findScene(dom, "extract");
  if (!scene) return () => undefined;
  const find = <T extends HTMLElement>(selector: string) => section.querySelector<T>(selector);
  const counter = find<HTMLElement>("[data-database-counter]");
  const counterText = (completed: number) => completed >= flyingFields.length
    ? "8 automatisch erkannt · 1 Prüfung erforderlich"
    : `${completed} automatisch erkannt`;

  const clear = () => {
    flyingFields.forEach(({ key }) => {
      const source = find<HTMLElement>(`[data-invoice-field="${key}"]`);
      const target = find<HTMLElement>(`[data-db-field="${key}"]`);
      const flyer = find<HTMLElement>(`[data-fly-field="${key}"]`);
      const path = section.querySelector<SVGPathElement>(`[data-flow-line="${key}"]`);
      source?.classList.remove("is-extracting");
      target?.classList.remove("is-receiving", "is-populated");
      const value = target?.querySelector<HTMLElement>("[data-db-value]");
      const state = target?.querySelector<HTMLElement>("[data-db-state]");
      if (value) value.style.opacity = "0";
      if (state) state.textContent = "Bereit für Erkennung";
      if (flyer) {
        flyer.style.opacity = "0";
        flyer.style.visibility = "hidden";
        flyer.style.transform = "translate3d(-999px, -999px, 0) translate(-50%, -50%) scale(0.9)";
      }
      if (path) {
        path.style.opacity = "0";
        path.style.visibility = "hidden";
        path.style.strokeDashoffset = "1";
        path.setAttribute("d", "M -1 -1 Q -1 -1 -1 -1");
      }
    });
    if (counter) counter.textContent = counterText(0);
  };
  clear();

  ScrollTrigger.create({
    trigger: scene,
    start: "top 70%",
    end: "bottom 28%",
    scrub: true,
    onUpdate: ({ progress }) => {
      const panelProgress = clamp(progress / 0.2);
      gsap.set(inbox, { autoAlpha: 1 - panelProgress, x: mix(0, -90, panelProgress), pointerEvents: panelProgress < 0.5 ? "auto" : "none" });
      gsap.set(database, { autoAlpha: panelProgress, x: mix(110, 0, panelProgress), scale: mix(0.96, 1, panelProgress), pointerEvents: panelProgress > 0.5 ? "auto" : "none" });
      const frameRect = frame.getBoundingClientRect();
      let completed = 0;

      flyingFields.forEach(({ key }, index) => {
        const source = find<HTMLElement>(`[data-invoice-field="${key}"]`);
        const target = find<HTMLElement>(`[data-db-field="${key}"]`);
        const flyer = find<HTMLElement>(`[data-fly-field="${key}"]`);
        const path = section.querySelector<SVGPathElement>(`[data-flow-line="${key}"]`);
        if (!source || !target || !flyer || !path) return;
        const sourceRect = source.getBoundingClientRect();
        const targetRect = target.getBoundingClientRect();
        const local = clamp((progress - (0.22 + index * 0.07)) / 0.17);
        const startX = sourceRect.left + sourceRect.width / 2 - frameRect.left;
        const startY = sourceRect.top + sourceRect.height / 2 - frameRect.top;
        const endX = targetRect.left + targetRect.width / 2 - frameRect.left;
        const endY = targetRect.top + targetRect.height / 2 - frameRect.top;
        const controlX = (startX + endX) / 2;
        const controlY = Math.min(startY, endY) - 54 - index * 2;
        const inverse = 1 - local;
        const x = inverse * inverse * startX + 2 * inverse * local * controlX + local * local * endX;
        const y = inverse * inverse * startY + 2 * inverse * local * controlY + local * local * endY;
        path.setAttribute("d", `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`);
        const active = local > 0.02 && local < 0.94;
        path.style.opacity = active ? "1" : "0";
        path.style.visibility = active ? "visible" : "hidden";
        path.style.strokeDashoffset = String(1 - local);
        flyer.style.opacity = active ? String(Math.min(1, local * 5, (1 - local) * 8)) : "0";
        flyer.style.visibility = active ? "visible" : "hidden";
        flyer.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${mix(0.94, 0.76, local)})`;
        source.classList.toggle("is-extracting", local > 0.02 && local < 0.86);
        target.classList.toggle("is-receiving", local > 0.08 && local < 0.82);
        target.classList.toggle("is-populated", local >= 0.82);
        const value = target.querySelector<HTMLElement>("[data-db-value]");
        const state = target.querySelector<HTMLElement>("[data-db-state]");
        if (value) value.style.opacity = local >= 0.82 ? "1" : "0";
        if (state) state.textContent = local >= 0.82 ? "Erkannt" : local > 0.08 ? "Wird übernommen" : "Bereit für Erkennung";
        if (local >= 0.82) completed += 1;
      });
      if (counter) counter.textContent = counterText(completed);
    },
  });
  return clear;
}
