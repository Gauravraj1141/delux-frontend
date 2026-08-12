import {
  SITE_DESCRIPTION,
} from "@/lib/constants";

export default function BrandInfo() {
  return (
    <section className="w-full px-5 md:px-8 lg:px-12 py-12 md:py-16 bg-background">
      <div className="max-w-[700px] mx-auto">
        <p className="text-[14px] md:text-[15px] leading-relaxed text-white/50">
          {SITE_DESCRIPTION}
        </p>
      </div>
    </section>
  );
}
