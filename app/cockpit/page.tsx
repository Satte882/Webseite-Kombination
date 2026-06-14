import type { Metadata } from "next";
import { CockpitDemo } from "@/components/cockpit-demo";
import { SubpageLayout, SubpageTopbar } from "@/components/subpage-layout";

export const metadata: Metadata = {
  title: "0Admin Beispiel-Cockpit - DPPFOR",
  description: "Ein offener Zahlungsfall auf einen Blick: Rechnung 4821 zeigt offene Posten, nächste Aktion, Erinnerung und Klärung.",
};

export default function CockpitPage() {
  return (
    <>
      <SubpageTopbar
        label="0Admin Beispiel-Cockpit"
        links={[
          { href: "/", label: "Start" },
          { href: "/rechner/", label: "Rechner" },
        ]}
      />
      <SubpageLayout
        eyebrow="0Admin Beispiel-Cockpit"
        title={
          <>
            <span className="hero-line hero-line--desktop-nowrap">Ein offener Zahlungsfall</span>{" "}
            <span className="hero-line hero-line--desktop-nowrap">auf einen Blick.</span>
          </>
        }
        description="Sehen Sie am Beispiel „Rechnung 4821“, wie 0Admin offene Posten, nächste Aktion, Erinnerung und Klärung in einem geführten Fall sichtbar macht."
        className="cockpit-page"
      >
        <CockpitDemo />
      </SubpageLayout>
    </>
  );
}
