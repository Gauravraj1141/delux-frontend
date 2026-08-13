export default function Footer() {
  return (
    <footer className="w-full px-5 md:px-8 lg:px-12 pt-4 pb-28 md:pb-32 bg-background">
      <div className="max-w-[700px] mx-auto">
        <p className="text-[10px] md:text-[11px] text-white/50">
          ❤️ DESIGNED AND DEVELOPED BY:
        </p>
        <p className="text-[10px] md:text-[11px] text-white/50 mt-1">
          <a href="mailto:gauravrajputsde@gmail.com" className="underline hover:text-white/30 transition-colors duration-200">
            gauravrajputsde@gmail.com
          </a>
          ,{" "}
          <a href="mailto:indreshchaudhary963@gmail.com" className="underline hover:text-white/30 transition-colors duration-200">
            indreshchaudhary963@gmail.com
          </a>
          ,{" "}
          <a href="mailto:shivamsrajput78@gmail.com" className="underline hover:text-white/30 transition-colors duration-200">
            shivamsrajput78@gmail.com
          </a>
        </p>
        <p className="text-[11px] md:text-[12px] text-white/25 mt-6">
          &copy; 2026 deluxesalonsongs.com
        </p>
      </div>
    </footer>
  );
}
