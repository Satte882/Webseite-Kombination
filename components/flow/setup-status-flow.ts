import gsap from "gsap";
import type { FlowDom } from "@/components/flow/dom";
import { findScene } from "@/components/flow/dom";

export function setupStatusFlow(dom: FlowDom) {
  const { section, frame, invoice, database, due, reminder, status, dueField } = dom;
  const dueScene = findScene(dom, "due");
  const reminderScene = findScene(dom, "reminder");
  if (!dueScene || !reminderScene) return;

  const setStatus = (label: "Offen" | "Bald fällig" | "Heute fällig" | "Überfällig") => {
    status.textContent = label;
    status.className = `status-chip status-chip--${label.toLowerCase().replace(" ", "-").replace("ä", "a").replace("ü", "u").replace("ö", "o")}`;
    dueField.classList.toggle("is-overdue", label === "Überfällig");
  };
  const progressLine = section.querySelector<HTMLElement>("[data-due-progress]");
  if (progressLine) gsap.set(progressLine, { scaleX: 0, transformOrigin: "left" });
  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: dueScene,
      start: "top 70%",
      end: "bottom 28%",
      scrub: 0.6,
      onUpdate: ({ progress }) => setStatus(progress < 0.28 ? "Offen" : progress < 0.52 ? "Bald fällig" : progress < 0.76 ? "Heute fällig" : "Überfällig"),
    },
  });
  timeline.to(database, { autoAlpha: 0, x: -90, duration: 0.34, pointerEvents: "none" })
    .fromTo(due, { autoAlpha: 0, x: 130, scale: 0.95 }, { autoAlpha: 1, x: 0, scale: 1, duration: 0.5, pointerEvents: "auto" }, 0.1);
  if (progressLine) timeline.to(progressLine, { scaleX: 1, duration: 0.72, ease: "none" }, 0.22);

  const reminderState = () => ({ x: -frame.clientWidth * 0.275, y: frame.clientHeight * 0.025, scale: 0.62, rotation: -4 });
  gsap.timeline({ scrollTrigger: { trigger: reminderScene, start: "top 70%", end: "bottom 28%", scrub: 0.65, invalidateOnRefresh: true } })
    .to(due, { autoAlpha: 0, x: -90, duration: 0.32, pointerEvents: "none" })
    .to(invoice, { x: () => reminderState().x, y: () => reminderState().y, scale: () => reminderState().scale, rotation: () => reminderState().rotation, duration: 0.58, ease: "power2.inOut" }, 0.04)
    .fromTo(reminder, { autoAlpha: 0, x: 150, y: 70, rotation: 4, scale: 0.92 }, { autoAlpha: 1, x: 0, y: 0, rotation: 1.2, scale: 1, duration: 0.62, pointerEvents: "auto", ease: "power2.out" }, 0.16);
}
