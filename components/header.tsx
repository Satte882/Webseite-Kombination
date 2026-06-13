import { BrandLockup } from "@/components/brand-lockup";

const navItems = [
  ["So funktioniert’s", "#so-funktionierts"],
  ["Vorteile", "#vorteile"],
  ["Kontrolle", "#kontrolle"],
  ["FAQ", "#faq"],
] as const;

export function Header() {
  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <BrandLockup />
        <nav aria-label="Hauptnavigation" className="site-nav">
          {navItems.map(([label, href]) => (
            <a href={href} key={href}>{label}</a>
          ))}
        </nav>
        <a className="button button--small" href="#demo">Demo ansehen</a>
      </div>
    </header>
  );
}
