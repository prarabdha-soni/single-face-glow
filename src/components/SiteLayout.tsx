import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { ShoppingBag } from "lucide-react";
import { CartDrawer } from "@/components/CartDrawer";
import { useCart } from "@/lib/cart";

export function SiteLayout({ children }: { children: ReactNode }) {
  const { itemCount, openCart } = useCart();

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col overflow-x-hidden">
      <header className="border-b border-border/80 sticky top-0 bg-background/95 backdrop-blur-sm z-30">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-3.5 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-3 font-display text-xl md:text-[1.35rem] tracking-tight">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9B82D7] text-[0.8rem] font-semibold text-white shadow-sm">
              NB
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-sm uppercase tracking-[0.25em] text-[#8A72CE] font-semibold">Nishu</span>
              <span className="text-lg font-semibold text-foreground">Beauty</span>
            </span>
          </Link>
          <nav className="hidden md:flex gap-7 text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            <Link
              to="/"
              activeOptions={{ exact: true }}
              className="hover:opacity-60"
              activeProps={{ className: "border-b border-foreground" }}
            >
              Shop
            </Link>
          </nav>
          <button
            type="button"
            onClick={() => openCart()}
            aria-label="Open cart"
            className="inline-flex items-center gap-2 text-[11px] text-muted-foreground hover:text-foreground tracking-[0.15em] uppercase transition-colors"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>Cart ({itemCount})</span>
          </button>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <CartDrawer />

      <footer className="bg-foreground text-background mt-16">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="sm:col-span-2 md:col-span-1">
            <p className="font-display text-2xl mb-3">
              <span className="text-[#9B82D7]">Nishu</span> Beauty.
            </p>
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
                  <li key={i}>
                    <a href="#" className="hover:opacity-70">
                      {i}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-background/15">
          <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-5 text-[11px] opacity-60 flex flex-col gap-2 md:flex-row md:justify-between">
            <span>© {new Date().getFullYear()} Nishu Beauty.</span>
            <span>Made with care.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
