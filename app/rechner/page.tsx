import type { Metadata } from "next";
import { RoiCalculator } from "@/components/roi-calculator";
import { SubpageLayout, SubpageTopbar } from "@/components/subpage-layout";

export const metadata: Metadata = {
  title: "0Admin ROI-Rechner - DPPFOR",
  description: "Schätzen Sie Optimierungspotenzial für Liquidität, Zeitaufwand und Nachverfolgung offener Posten.",
};

export default function RechnerPage() {
  return (
    <>
      <SubpageTopbar
        label="0Admin ROI-Rechner"
        links={[
          { href: "/", label: "Start" },
          { href: "/cockpit/", label: "Cockpit" },
        ]}
      />
      <SubpageLayout
        eyebrow="0Admin ROI-Rechner"
        title={
          <>
            <span className="hero-line hero-line--desktop-nowrap">Was kosten offene</span>{" "}
            <span className="hero-line hero-line--desktop-nowrap">Posten wirklich?</span>
          </>
        }
        description={
          <span className="hero-copy hero-copy--desktop-nowrap">
            Schätzen Sie, wie viel Liquidität, Arbeitszeit und Planungssicherheit durch schnelleren Zahlungseingang und strukturierte Nachverfolgung frei werden können.
          </span>
        }
        className="calculator-page"
      >
        <RoiCalculator />
      </SubpageLayout>
    </>
  );
}
