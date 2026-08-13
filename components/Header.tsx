"use client";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[50] px-4 md:px-6 lg:px-8 py-3 md:py-4 pointer-events-none">
      <div className="flex items-start justify-between">
        {/* Left: reserved */}
        <div />
        {/* Right: Navigation (hidden for now) */}
      </div>
    </header>
  );
}
