import { FAQSection } from "@/components/faq-section";
import { HumanApprovalPanel } from "@/components/human-approval-panel";
import { ReducedMotionFallback } from "@/components/reduced-motion-fallback";
import { ScrollFlowStory } from "@/components/scroll-flow-story";
import {
  SiteOneClosingFooter,
  SiteOneHeader,
  SiteOneHeroProblem,
  SiteOneTools,
} from "@/components/site-one-sections";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Zum Inhalt springen</a>
      <SiteOneHeader />
      <main id="main">
        <SiteOneHeroProblem />
        <ScrollFlowStory />
        <ReducedMotionFallback />
        <section className="section approval-section" aria-labelledby="approval-title">
          <div className="shell">
            <div className="section-heading section-heading--wide">
              <span className="eyebrow">Kontrolle vor dem nächsten Schritt</span>
              <h2 id="approval-title">0Admin bereitet vor. Sie entscheiden bei Ausnahmen.</h2>
              <p>Prüfbedürftige Daten, Änderungen und Freigaben bleiben sichtbar. Der nächste Schritt erfolgt erst, wenn der Vorgang eindeutig ist.</p>
            </div>
            <HumanApprovalPanel />
          </div>
        </section>
        <SiteOneTools />
        <FAQSection />
        <SiteOneClosingFooter />
      </main>
    </>
  );
}
