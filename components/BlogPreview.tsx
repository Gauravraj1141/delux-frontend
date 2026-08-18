import Link from "next/link";
import { blogPosts } from "@/lib/blogData";

export default function BlogPreview() {
  const posts = blogPosts.slice(0, 3);

  return (
    <section className="w-full px-5 md:px-8 lg:px-12 py-8 md:py-10 bg-background">
      <div className="max-w-[700px] mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[12px] uppercase tracking-[0.2em] text-white/30 font-medium">
            From the Blog
          </h2>
          <Link
            href="/blog"
            className="text-[11px] text-white/30 hover:text-white/60 transition-colors duration-200"
          >
            View all
          </Link>
        </div>
        <div className="flex flex-col gap-2.5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex items-start gap-3 rounded-xl px-3.5 py-3 transition-colors duration-150 hover:bg-white/4"
            >
              <div className="min-w-0 flex-1">
                <p className="text-[13px] md:text-[14px] font-medium text-white/60 group-hover:text-white/85 transition-colors duration-150 truncate">
                  {post.title}
                </p>
                <p className="text-[11px] text-white/30 mt-0.5">
                  {post.tag} · {post.readTime}
                </p>
              </div>
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white/20 group-hover:text-white/50 transition-colors duration-150 mt-1 flex-shrink-0"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
