import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";
import { SubpageTopbar } from "@/components/subpage-layout";

export const metadata: Metadata = {
  title: "DPPFOR Blog - Wissen für Handwerksbetriebe",
  description: "Praxistipps zu Geldfluss, offenen Posten, Büroorganisation und 0Admin für deutsche Handwerksbetriebe.",
};

export default function BlogPage() {
  const [featured, ...posts] = blogPosts;

  return (
    <>
      <SubpageTopbar
        label="Blog"
        links={[
          { href: "/", label: "Start" },
          { href: "/rechner/", label: "Geldfluss prüfen", className: "nav-check" },
          { href: "/cockpit/", label: "Cockpit" },
          { href: "/#kontakt", label: "Gespräch anfragen", className: "nav-contact" },
        ]}
      />
      <main id="main-content" tabIndex={-1} className="subpage-shell blog-page">
        <section className="subpage-hero compact blog-hero" aria-labelledby="blog-title">
          <p className="micro">Magazin</p>
          <h1 id="blog-title">
            <span className="hero-line hero-line--desktop-break">Wissen für Chefs,</span>
            <span className="hero-line hero-line--desktop-break">die aus Arbeit</span>
            <span className="hero-line hero-line--desktop-break">schneller Zahlung machen.</span>
          </h1>
          <p>
            <span className="blog-hero__lead-nowrap">
              Konkrete Beiträge zu offenen Rechnungen, Mahnwesen, Büroentlastung und sauberem Geldfluss. Ohne Software-Blabla, mit klaren Abläufen, die im Betrieb wirklich helfen.
            </span>
          </p>
        </section>

        <section className="blog-feature" aria-label="Empfohlener Artikel">
          <Link className="blog-feature-card" href={`/blog/${featured.slug}/`}>
            <span>{featured.category}</span>
            <h2>{featured.title}</h2>
            <p>{featured.description}</p>
            <small>{featured.readTime} Lesezeit</small>
            <em>Artikel lesen</em>
          </Link>
        </section>

        <section className="blog-grid" aria-label="Weitere Artikel">
          {posts.map((post) => (
            <article className="blog-card" key={post.slug}>
              <Link href={`/blog/${post.slug}/`}>
                <span>{post.category}</span>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <small>{post.readTime} Lesezeit</small>
              </Link>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
