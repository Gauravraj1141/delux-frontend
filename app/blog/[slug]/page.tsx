import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogBySlug } from "@/lib/blogData";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `https://deluxesalonsongs.com/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: `${post.title} | Deluxe Salon Songs Blog`,
      description: post.excerpt,
      url: `https://deluxesalonsongs.com/blog/${post.slug}`,
      images: [{ url: post.image, alt: `${post.title} — Deluxe Salon Songs` }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

const glass = {
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
} as const;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) notFound();

  // Get related posts (same tag, excluding current)
  const related = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "Deluxe Salon Songs",
      url: "https://deluxesalonsongs.com",
    },
    publisher: {
      "@type": "Organization",
      name: "Deluxe Salon Songs",
      url: "https://deluxesalonsongs.com",
    },
    mainEntityOfPage: `https://deluxesalonsongs.com/blog/${post.slug}`,
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,69,19,0.12) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[720px] mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors duration-200 mb-8"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5" />
            <path d="m12 19-7-7 7-7" />
          </svg>
          All posts
        </Link>

        {/* Meta */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-medium">
            {post.tag}
          </span>
          <span className="w-1 h-1 rounded-full bg-white/15" />
          <span className="text-[11px] text-white/25">{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-white/15" />
          <span className="text-[11px] text-white/25">{post.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="text-[24px] md:text-[34px] font-bold text-white/90 leading-snug mb-6 md:mb-8">
          {post.title}
        </h1>

        {/* Hero image */}
        <div className="rounded-2xl overflow-hidden mb-8 md:mb-10 aspect-[16/9]">
          <img
            src={post.image}
            alt={`${post.title} — Deluxe Salon Songs Blog`}
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>

        {/* Article body */}
        <article className="flex flex-col gap-5 md:gap-6 mb-16">
          {post.content.map((paragraph, i) => (
            <p
              key={i}
              className="text-[14px] md:text-[15px] leading-[1.8] text-white/55"
            >
              {paragraph}
            </p>
          ))}
        </article>

        {/* CTA */}
        <div className="rounded-2xl p-5 md:p-6 mb-12" style={glass}>
          <p className="text-[13px] md:text-[14px] text-white/55 leading-relaxed">
            Want to hear these songs? Deluxe Salon Songs plays 90s Bollywood music 24/7 — completely free.
          </p>
          <div className="flex items-center gap-4 mt-3">
            <Link
              href="/"
              className="text-[12px] text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors duration-200"
            >
              Listen now
            </Link>
            <Link
              href="/playlist"
              className="text-[12px] text-white/50 hover:text-white/80 underline underline-offset-2 transition-colors duration-200"
            >
              Browse playlists
            </Link>
          </div>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div className="border-t border-white/5 pt-10">
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-5">
              More stories
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((relPost) => (
                <Link
                  key={relPost.slug}
                  href={`/blog/${relPost.slug}`}
                  className="group rounded-2xl overflow-hidden transition-colors duration-200 flex flex-col"
                  style={glass}
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={relPost.image}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-medium">
                        {relPost.tag}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-white/15" />
                      <span className="text-[11px] text-white/25">
                        {relPost.date}
                      </span>
                    </div>
                    <h3 className="text-[14px] font-semibold text-white/75 leading-snug group-hover:text-white/95 transition-colors duration-200">
                      {relPost.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-white/5">
          <p className="text-[11px] text-white/20">
            &copy; 2026 deluxesalonsongs.com
          </p>
        </div>
      </div>
    </main>
  );
}
