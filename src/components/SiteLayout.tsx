import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <header className="border-b border-border sticky top-0 bg-background z-30">
        <div className="max-w-[1600px] mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="font-display text-2xl tracking-tight">
            Nishu Beauty<span className="align-super text-xs">.</span>
          </Link>
          <nav className="hidden md:flex gap-8 text-[12px] tracking-[0.15em] uppercase">
            <Link to="/" activeOptions={{ exact: true }} className="hover:opacity-60" activeProps={{ className: "border-b border-foreground" }}>
              Shop
            </Link>
            <a href="#about" className="hover:opacity-60">About</a>
          </nav>
          <button aria-label="Cart" className="text-[13px] hover:opacity-60 tracking-wider uppercase">
            Cart (0)
          </button>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="bg-foreground text-background mt-20">
        <div className="max-w-[1600px] mx-auto px-6 py-14 grid md:grid-cols-4 gap-10 text-sm">
          <div>
            <p className="font-display text-2xl mb-3">Nishu Beauty.</p>
            <p className="opacity-70 text-xs leading-relaxed">
              Clinical formulations with integrity.
            </p>
          </div>
          {[
            ["Help", ["Contact", "Shipping", "Returns"]],
            ["Company", ["About", "Careers", "Press"]],
            ["Legal", ["Privacy", "Terms", "Accessibility"]],
          ].map(([h, items]) => (
            <div key={h as string}>
              <p className="text-[11px] tracking-[0.2em] uppercase mb-4 opacity-70">{h}</p>
              <ul className="space-y-2">
                {(items as string[]).map((i) => (
                  <li key={i}><a href="#" className="hover:opacity-70">{i}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-background/15">
          <div className="max-w-[1600px] mx-auto px-6 py-5 text-[11px] opacity-60 flex justify-between">
            <span>© {new Date().getFullYear()} Nishu Beauty.</span>
            <span>Made with care.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
