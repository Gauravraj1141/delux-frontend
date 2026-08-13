import { RIGHTS_TEXT } from "@/lib/constants";

export default function RightsNotice() {
  return (
    <section className="w-full px-5 md:px-8 lg:px-12 py-8 md:py-10 bg-background">
      <div className="max-w-[700px] mx-auto">
        <p className="text-[11px] md:text-[12px] leading-relaxed text-white/50">
          {RIGHTS_TEXT}
          {" "}If you hold rights to anything here and want it taken off, email{" "}
          <a
            href="mailto:shivamsrajput78@gmail.com"
            className="underline hover:text-white/50 transition-colors duration-200"
          >
            shivamsrajput78@gmail.com
          </a>
          {" "}and it comes down.
        </p>
      </div>
    </section>
  );
}
