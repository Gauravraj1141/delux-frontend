import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blogData";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Stories about 90s Bollywood music, Indian salon culture, highway playlists, and the sounds that define Deluxe Salon Songs.",
  alternates: {
    canonical: "https://deluxesalonsongs.com/blog",
  },
};

const glass = {
  background: "rgba(255, 255, 255, 0.04)",
  border: "1px solid rgba(255, 255, 255, 0.08)",
  boxShadow: "inset 0 1px 0 rgba(255, 255, 255, 0.05)",
} as const;

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(139,69,19,0.12) 0%, transparent 70%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 max-w-[1040px] mx-auto px-5 md:px-8 pt-24 md:pt-32 pb-20">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12px] text-white/40 hover:text-white/70 transition-colors duration-200 mb-10"
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
          Back to radio
        </Link>

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h1 className="text-[24px] md:text-[32px] font-bold text-white/90 mb-2">
            Blog
          </h1>
          <p className="text-[14px] md:text-[15px] text-white/40 leading-relaxed max-w-[520px]">
            Stories about the music, the culture, and the people behind the
            songs that never stop playing.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${blogPosts[0].slug}`}
          className="group block rounded-2xl overflow-hidden mb-6 md:mb-8 transition-colors duration-200"
          style={glass}
        >
          <div className="md:flex">
            <div className="md:w-[45%] aspect-[16/9] md:aspect-auto md:min-h-[280px] overflow-hidden">
              <img
                src={blogPosts[0].image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="eager"
              />
            </div>
            <div className="p-5 md:p-8 md:w-[55%] flex flex-col justify-center">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-medium">
                  {blogPosts[0].tag}
                </span>
                <span className="w-1 h-1 rounded-full bg-white/15" />
                <span className="text-[11px] text-white/25">
                  {blogPosts[0].date}
                </span>
              </div>
              <h2 className="text-[18px] md:text-[22px] font-bold text-white/85 leading-snug mb-3 group-hover:text-white/95 transition-colors duration-200">
                {blogPosts[0].title}
              </h2>
              <p className="text-[13px] md:text-[14px] text-white/40 leading-relaxed line-clamp-3">
                {blogPosts[0].excerpt}
              </p>
              <span className="mt-4 text-[12px] text-white/30 group-hover:text-white/60 transition-colors duration-200">
                {blogPosts[0].readTime}
              </span>
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl overflow-hidden transition-colors duration-200 flex flex-col"
              style={glass}
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={post.image}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-4 md:p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2.5">
                  <span className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-medium">
                    {post.tag}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-white/15" />
                  <span className="text-[11px] text-white/25">{post.date}</span>
                </div>
                <h3 className="text-[15px] md:text-[16px] font-semibold text-white/80 leading-snug mb-2 group-hover:text-white/95 transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-[12px] md:text-[13px] text-white/35 leading-relaxed line-clamp-2 flex-1">
                  {post.excerpt}
                </p>
                <span className="mt-3 text-[11px] text-white/25 group-hover:text-white/50 transition-colors duration-200">
                  {post.readTime}
                </span>
              </div>
            </Link>
          ))}
        </div>

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
