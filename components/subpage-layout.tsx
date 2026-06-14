import Link from "next/link";
import Image from "next/image";

type SubpageLayoutProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
};

export function SubpageTopbar({
  label,
  links,
}: {
  label: string;
  links: { href: string; label: string; className?: string }[];
}) {
  return (
    <header className="subpage-topbar">
      <Link className="brand" href="/" aria-label="Zurück zur DPPFOR Startseite">
        <Image className="brand-logo" src="/images/logo.png" width={43} height={43} alt="" aria-hidden="true" />
        <span>
          <strong>DPPFOR</strong>
          <small>{label}</small>
        </span>
      </Link>
      <nav className="topnav" aria-label="Unterseiten-Navigation">
        {links.map((link) => (
          <Link className={link.className} href={link.href} key={`${link.href}-${link.label}`}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function SubpageLayout({ eyebrow, title, description, children, className = "" }: SubpageLayoutProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">Zum Inhalt springen</a>
      <main id="main-content" tabIndex={-1} className={`subpage-shell ${className}`}>
        <section className="subpage-hero compact" aria-labelledby="subpage-title">
          <p className="micro">{eyebrow}</p>
          <h1 id="subpage-title">{title}</h1>
          {description ? <p>{description}</p> : null}
        </section>
        {children}
      </main>
    </>
  );
}

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <SubpageLayout
      eyebrow="Rechtliches"
      title={title}
      className="legal-page"
    >
      <div className="legal-actions">
        <Link className="secondary-cta legal-home-link" href="/">Zur Startseite</Link>
      </div>
      <section className="legal-copy">
        {children}
      </section>
    </SubpageLayout>
  );
}
