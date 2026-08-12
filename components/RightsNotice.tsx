import { RIGHTS_TEXT } from "@/lib/constants";

const RIGHTS_EMAIL = "indreshchaudhary963@gmail.com";

export default function RightsNotice() {
  return (
    <section className="w-full px-5 md:px-8 lg:px-12 py-8 md:py-10 bg-background">
      <div className="max-w-[700px] mx-auto">
        <p className="text-[11px] md:text-[12px] leading-relaxed text-white/25">
          {RIGHTS_TEXT}
          {" "}If you hold rights to anything here and want it taken off, email{" "}
          <a
            href={`mailto:${RIGHTS_EMAIL}`}
            className="underline hover:text-white/50 transition-colors duration-200"
          >
            {RIGHTS_EMAIL}
          </a>{" "}
          or{" "}
          <a
            href="mailto:hanudasgaurav@gmail.com"
            className="underline hover:text-white/50 transition-colors duration-200"
          >
            hanudasgaurav@gmail.com
          </a>{" "}
          and it comes down.
        </p>
      </div>
    </section>
  );
}
