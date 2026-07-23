import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import heroCream from "@/assets/hero-cream.jpg";
import productCream from "@/assets/product-cream.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Natural Moisturizing Face Cream — Nishu Beauty" },
      {
        name: "description",
        content:
          "A lightweight daily moisturizer with clinical formulations. 50ml. Fragrance-free, vegan, cruelty-free.",
      },
      { property: "og:title", content: "Natural Moisturizing Face Cream" },
      {
        property: "og:description",
        content: "Clinical formulations with integrity. 50ml daily face cream.",
      },
      { property: "og:type", content: "product" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "how" | "ingredients">("desc");

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Announcement bar */}
      <div className="bg-foreground text-background text-[11px] tracking-wider uppercase text-center py-2.5 px-4">
        Complimentary shipping on all orders over ₹1,499
      </div>

      {/* Brand tabs */}
      <div className="border-b border-border">
        <div className="max-w-[1600px] mx-auto flex items-stretch text-[11px] tracking-[0.15em] uppercase">
          <div className="bg-foreground text-background px-6 py-3 flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-background inline-flex items-center justify-center text-[9px]">N.</span>
            Nishu Beauty
          </div>
          <div className="hidden md:flex items-center gap-2 px-6 py-3 text-muted-foreground">
            <span className="w-4 h-4 rounded-full border border-border inline-flex items-center justify-center text-[9px]">N</span>
            NIOD
          </div>
          <div className="hidden md:flex items-center gap-2 px-6 py-3 text-muted-foreground">
            <span className="w-4 h-4 rounded-full border border-border inline-flex items-center justify-center text-[9px]">D</span>
            DECIEM
          </div>
        </div>
      </div>

      {/* Nav */}
      <header className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 py-5 flex items-center justify-between">
          <a href="/" className="font-display text-2xl tracking-tight">
            Nishu Beauty<span className="align-super text-xs">.</span>
          </a>
          <button aria-label="Cart" className="text-[13px] hover:opacity-60 tracking-wider uppercase">
            Cart ({qty})
          </button>
        </div>
      </header>

      {/* Product */}
      <main className="max-w-[1600px] mx-auto px-6 py-10 md:py-16 grid md:grid-cols-2 gap-12 md:gap-20">
        {/* Image */}
        <div className="bg-muted">
          <img
            src={heroCream}
            alt="Natural Moisturizing Face Cream"
            width={1600}
            height={1200}
            className="w-full h-auto object-cover"
          />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {[heroCream, productCream, heroCream, productCream].map((src, i) => (
              <div key={i} className="aspect-square bg-background border border-border">
                <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="md:pt-4">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
            Moisturizers · 50ml
          </p>
          <h1 className="font-display text-4xl md:text-5xl leading-[1.05] mb-4">
            Natural Moisturizing<br />Face Cream
          </h1>
          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-md mb-6">
            A lightweight, non-greasy daily cream formulated with 11 skin-identical
            lipids to soften, smooth and support the skin barrier.
          </p>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-2xl font-display">₹ 950.00</span>
            <span className="text-xs text-muted-foreground line-through">₹ 1,200.00</span>
          </div>

          {/* Qty + CTA */}
          <div className="flex items-stretch gap-3 mb-6">
            <div className="flex items-center border border-foreground">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="px-4 py-3 hover:bg-foreground hover:text-background transition-colors"
                aria-label="Decrease"
              >
                −
              </button>
              <span className="px-4 min-w-[2.5rem] text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="px-4 py-3 hover:bg-foreground hover:text-background transition-colors"
                aria-label="Increase"
              >
                +
              </button>
            </div>
            <button className="flex-1 border border-foreground text-[13px] tracking-[0.15em] uppercase py-3 hover:bg-foreground hover:text-background transition-colors">
              Add to Cart
            </button>
          </div>

          <button className="w-full bg-foreground text-background text-[13px] tracking-[0.15em] uppercase py-3 mb-10 hover:bg-foreground/85 transition-colors">
            Buy Now
          </button>

          {/* Attribute pills */}
          <div className="grid grid-cols-3 gap-px bg-border border border-border mb-10 text-center text-[11px] tracking-wider uppercase">
            {["Vegan", "Cruelty-Free", "Fragrance-Free"].map((v) => (
              <div key={v} className="bg-background py-4 px-2">{v}</div>
            ))}
          </div>

          {/* Tabs */}
          <div className="border-t border-border">
            <div className="flex gap-8 text-[12px] tracking-[0.15em] uppercase">
              {(
                [
                  ["desc", "Description"],
                  ["how", "How to Use"],
                  ["ingredients", "Ingredients"],
                ] as const
              ).map(([k, label]) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`py-5 border-t-2 -mt-px transition-colors ${
                    tab === k ? "border-foreground" : "border-transparent text-muted-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="py-2 text-[14px] leading-relaxed text-muted-foreground min-h-[140px]">
              {tab === "desc" && (
                <p>
                  This moisturizer combines a blend of nine skin-identical amino acids,
                  dermal lipids, hyaluronic acid and multiple ceramides. Together they
                  offer lightweight, all-day surface hydration for a soft and smooth
                  finish. Suitable for all skin types.
                </p>
              )}
              {tab === "how" && (
                <p>
                  Apply a small amount to face in the AM and PM, after water-based
                  serums but before heavier oils. Avoid the eye contour.
                </p>
              )}
              {tab === "ingredients" && (
                <p>
                  Aqua, Caprylic/Capric Triglyceride, Glycerin, Cetyl Alcohol, Squalane,
                  Sodium Hyaluronate, Ceramide NP, Ceramide AP, Phytosphingosine,
                  Cholesterol, Tocopherol.
                </p>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Trust strip */}
      <section className="border-t border-border">
        <div className="max-w-[1600px] mx-auto px-6 py-14 grid md:grid-cols-3 gap-10 text-center">
          {[
            ["Clinical", "Formulations rooted in dermatological research."],
            ["Honest", "Fair pricing. No inflated marketing claims."],
            ["Considered", "Recyclable packaging and thoughtful sourcing."],
          ].map(([t, d]) => (
            <div key={t}>
              <h3 className="font-display text-2xl mb-3">{t}</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background">
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
            <span>© {new Date().getFullYear()} Clone for demo purposes.</span>
            <span>Made with care.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
