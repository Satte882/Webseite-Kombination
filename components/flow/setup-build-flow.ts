import gsap from "gsap";
import type { FlowDom } from "@/components/flow/dom";
import { findScene } from "@/components/flow/dom";

export function setupBuildFlow(dom: FlowDom) {
  const { frame, invoice, email, inbox, database, due, reminder, scan, sourceLabel } = dom;
  const invoiceScene = findScene(dom, "invoice");
  const emailScene = findScene(dom, "email");
  const inboxScene = findScene(dom, "inbox");
  if (!invoiceScene || !emailScene || !inboxScene) return;

  const centerInFrame = (target: Element) => {
    const frameRect = frame.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    return {
      x: targetRect.left + targetRect.width / 2 - (frameRect.left + frameRect.width / 2),
      y: targetRect.top + targetRect.height / 2 - (frameRect.top + frameRect.height / 2),
    };
  };
  const panelState = () => ({ x: -frame.clientWidth * 0.255, y: frame.clientHeight * 0.03, scale: 0.66, rotation: -1.5 });
  const attachmentState = () => {
    const target = email.querySelector<HTMLElement>("[data-email-attachment]");
    if (!target) return { x: 0, y: 0, scale: 0.34, rotation: -4 };
    const targetRect = target.getBoundingClientRect();
    const center = centerInFrame(target);
    return {
      x: center.x,
      y: center.y,
      scale: Math.min(0.22, (targetRect.width / Math.max(invoice.offsetWidth, 1)) * 0.46),
      rotation: -4,
    };
  };
  const dropzoneState = () => {
    const target = inbox.querySelector<HTMLElement>(".system-inbox__dropzone");
    if (!target) return panelState();
    const targetRect = target.getBoundingClientRect();
    const center = centerInFrame(target);
    return {
      x: center.x,
      y: center.y,
      scale: Math.min(0.31, (targetRect.width / Math.max(invoice.offsetWidth, 1)) * 0.48),
      rotation: -1.2,
    };
  };

  gsap.set([email, inbox, database, due, reminder, scan], { autoAlpha: 0, pointerEvents: "none" });
  gsap.set(email.querySelector("[data-email-pdf-preview]"), { autoAlpha: 0, scale: 0.8 });
  gsap.set(invoice, { x: 0, y: 0, scale: 1, rotation: 0, transformOrigin: "50% 50%" });
  gsap.set(sourceLabel, { autoAlpha: 1, y: 0 });
  const enter = gsap.utils.toArray<HTMLElement>("[data-invoice-enter]", invoice);
  gsap.set(enter, { autoAlpha: 0 });
  gsap.set(invoice.querySelectorAll('[data-invoice-enter="invoice-number"], [data-invoice-enter="sender"]'), { x: -115 });
  gsap.set(invoice.querySelectorAll('[data-invoice-enter="recipient"], [data-invoice-enter="net"], [data-invoice-enter="vat"], [data-invoice-enter="gross"]'), { x: 115 });
  gsap.set(invoice.querySelectorAll('[data-invoice-enter="invoice-date"], [data-invoice-enter="due-date"], [data-invoice-enter="status"]'), { y: -62 });
  gsap.set(invoice.querySelectorAll('[data-invoice-enter="table"], [data-invoice-enter="line"]'), { y: 76 });
  gsap.set(invoice.querySelectorAll('[data-invoice-enter="label"], [data-invoice-enter="kicker"], [data-invoice-enter="brand"]'), { y: -32, scale: 0.9 });

  gsap.timeline({ defaults: { ease: "power2.out" }, scrollTrigger: { trigger: invoiceScene, start: "top 72%", end: "bottom 32%", scrub: 0.55 } })
    .to(invoice.querySelectorAll('[data-invoice-enter="label"], [data-invoice-enter="brand"]'), { autoAlpha: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.08 })
    .to(invoice.querySelector('[data-invoice-enter="kicker"]'), { autoAlpha: 1, y: 0, scale: 1, duration: 0.3 }, "-=0.25")
    .to(invoice.querySelector('[data-invoice-enter="invoice-number"]'), { autoAlpha: 1, x: 0, duration: 0.65 })
    .to(invoice.querySelectorAll('[data-invoice-enter="sender"], [data-invoice-enter="recipient"]'), { autoAlpha: 1, x: 0, duration: 0.7, stagger: 0.12 }, "-=0.35")
    .to(invoice.querySelectorAll('[data-invoice-enter="invoice-date"], [data-invoice-enter="due-date"]'), { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 }, "-=0.35")
    .to(invoice.querySelector('[data-invoice-enter="table"]'), { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.2")
    .to(invoice.querySelectorAll('[data-invoice-enter="line"]'), { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.12 }, "-=0.28")
    .to(invoice.querySelectorAll('[data-invoice-enter="net"], [data-invoice-enter="vat"], [data-invoice-enter="gross"]'), { autoAlpha: 1, x: 0, duration: 0.5, stagger: 0.1 }, "-=0.2")
    .to(invoice.querySelector('[data-invoice-enter="status"]'), { autoAlpha: 1, y: 0, duration: 0.35 });

  const emailAttachment = email.querySelector("[data-email-attachment]");
  const pdfPreview = email.querySelector("[data-email-pdf-preview]");
  gsap.timeline({ scrollTrigger: { trigger: emailScene, start: "top 70%", end: "bottom 30%", scrub: 0.65, invalidateOnRefresh: true } })
    .fromTo(email, { autoAlpha: 0, x: 150, scale: 0.94 }, { autoAlpha: 1, x: 0, scale: 1, duration: 0.3, pointerEvents: "auto" })
    .to(sourceLabel, { autoAlpha: 0, y: -10, duration: 0.24 }, 0)
    .to(invoice, {
      x: () => attachmentState().x,
      y: () => attachmentState().y,
      scale: () => attachmentState().scale,
      rotation: () => attachmentState().rotation,
      duration: 0.22,
      ease: "power2.inOut",
    }, 0.32)
    .to(invoice, { opacity: 0.16, duration: 0.14, ease: "power1.out" }, 0.54)
    .to(pdfPreview, { autoAlpha: 1, scale: 1, duration: 0.18 }, 0.52)
    .to(emailAttachment, { boxShadow: "0 0 0 4px rgba(185,101,50,.18)", duration: 0.18 }, 0.52);

  const inboxProgress = inbox.querySelector<HTMLElement>(".system-inbox__progress span");
  if (inboxProgress) gsap.set(inboxProgress, { scaleX: 0, transformOrigin: "left" });
  const timeline = gsap.timeline({ scrollTrigger: { trigger: inboxScene, start: "top 70%", end: "bottom 30%", scrub: 0.65, invalidateOnRefresh: true } });
  timeline.fromTo(inbox, { autoAlpha: 0, x: 140, scale: 0.94 }, { autoAlpha: 1, x: 0, scale: 1, duration: 0.26, pointerEvents: "auto" }, 0)
    .to(email, { x: 0, y: 0, scale: 0.94, autoAlpha: 0.78, duration: 0.22, pointerEvents: "none" }, 0)
    .to(email, { autoAlpha: 0, scale: 0.88, duration: 0.18 }, 0.24)
    .to(invoice, { autoAlpha: 1, duration: 0.06 }, 0.30)
    .to(invoice, {
      x: () => dropzoneState().x,
      y: () => dropzoneState().y,
      scale: () => dropzoneState().scale,
      rotation: () => dropzoneState().rotation,
      duration: 0.22,
      ease: "power2.out",
    }, 0.32)
    .fromTo(scan, { autoAlpha: 0, y: -70 }, { autoAlpha: 1, y: 70, duration: 0.22, ease: "none" }, 0.56)
    .to(scan, { autoAlpha: 0, duration: 0.08 }, 0.78)
    .to(invoice, { x: () => panelState().x, y: () => panelState().y, scale: () => panelState().scale, rotation: () => panelState().rotation, duration: 0.24, ease: "power2.inOut" }, 0.82);
  if (inboxProgress) timeline.to(inboxProgress, { scaleX: 1, duration: 0.22, ease: "none" }, 0.56);
}
