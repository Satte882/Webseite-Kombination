import { BrandLockup } from "@/components/brand-lockup";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <BrandLockup />
        <p>DPPFOR ist die Dachmarke. 0Admin ist das Produkt für einen nachvollziehbaren Rechnungs- und Geldflussprozess.</p>
        <nav aria-label="Footer-Navigation">
          <a href="#so-funktionierts">Ablauf</a><a href="#faq">FAQ</a><a href="#top">Nach oben</a>
        </nav>
        <small>© 2026 DPPFOR · Konzeptseite mit frei erfundenen Beispieldaten</small>
      </div>
    </footer>
  );
}
