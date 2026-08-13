import { CONTACT_EMAIL } from "@/lib/constants";

const SECONDARY_EMAIL = "indreshchaudhary963@gmail.com";

export default function Footer() {
  return (
    <footer className="w-full px-5 md:px-8 lg:px-12 pt-4 pb-28 md:pb-32 bg-background">
      <div className="max-w-[700px] mx-auto">
        <p className="text-[11px] md:text-[12px] text-white/50">
          &copy; 2026 deluxsalongsongs.com
        </p>
        <p className="text-[10px] md:text-[11px] text-white/50 mt-1.5">
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white/30 transition-colors duration-200">
            {CONTACT_EMAIL}
          </a>
          ,{" "}
          <a href={`mailto:${SECONDARY_EMAIL}`} className="hover:text-white/30 transition-colors duration-200">
            {SECONDARY_EMAIL}
          </a>
        </p>
      </div>
    </footer>
  );
}
