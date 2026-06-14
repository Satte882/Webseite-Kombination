import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/data/blog";
import { SubpageTopbar } from "@/components/subpage-layout";

export const dynamicParams = false;

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} - DPPFOR Blog`,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <>
      <SubpageTopbar
        label="Blog"
        links={[
          { href: "/blog/", label: "Blog" },
          { href: "/rechner/", label: "Geldfluss prüfen", className: "nav-check" },
          { href: "/#kontakt", label: "Gespräch anfragen", className: "nav-contact" },
        ]}
      />
      <main id="main-content" tabIndex={-1} className="subpage-shell blog-page blog-article-page">
        <article className="blog-article">
          <Link className="back-link" href="/blog/">← Zurück zum Blog</Link>
          <p className="micro">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="article-lead">{post.description}</p>
          <div className="article-meta">
            <span>{post.author}</span>
            <span>{post.readTime} Lesezeit</span>
          </div>
          <div className="article-tags">
            {post.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
          <div className="article-body" dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>

        <section className="article-cta" aria-labelledby="article-cta-title">
          <p className="micro">Nächster Schritt</p>
          <h2 id="article-cta-title">Prüfen, wo in Ihrem Betrieb Geld hängen bleibt.</h2>
          <div>
            <Link className="primary-cta" href="/rechner/">Geldfluss prüfen</Link>
            <Link className="secondary-cta" href="/#kontakt">Gespräch anfragen</Link>
          </div>
        </section>
      </main>
    </>
  );
}
