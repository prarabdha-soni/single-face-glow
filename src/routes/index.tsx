import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import jarAsset from "@/assets/nishu-jar.png.asset.json";
import boxAsset from "@/assets/nishu-box.png.asset.json";

const heroCream = jarAsset.url;
const productCream = boxAsset.url;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Glass Skin Face Cream — Nishu Beauty" },
      {
        name: "description",
        content:
          "Glass Skin Face Cream with Kojic Dipalmitate, Niacinamide, Arbutin & Octinoxate. 30g. Dermatologically tested.",
      },
      { property: "og:title", content: "Glass Skin Face Cream — Nishu Beauty" },
      {
        property: "og:description",
        content: "Glass Skin Face Cream with Kojic Dipalmitate, Niacinamide, Arbutin & Octinoxate. 30g. Dermatologically tested.",
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
            alt="Glass Skin Face Cream"
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
            Cream · 30g
          </p>
          <h1 className="font-display text-4xl md:text-5xl leading-[1.05] mb-4">
            Glass Skin<br />Face Cream
          </h1>
          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-md mb-6">
            A lightweight, non-greasy daily cream formulated with 11 skin-identical
            lipids to soften, smooth and support the skin barrier.
          </p>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-display">₹ 300.00</span>
            <span className="text-xs text-muted-foreground line-through">₹ 600.00</span>
            <span className="text-[11px] tracking-wider uppercase bg-foreground text-background px-2 py-1">
              50% Off
            </span>
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
                  NISHU Glass Skin Face Cream is a lightweight daily face cream
                  formulated with Kojic Dipalmitate, Arbutin, Niacinamide and
                  Octinoxate. The formulation helps improve the appearance of
                  uneven skin tone, dark spots and dull-looking skin while
                  supporting a smoother, more radiant complexion.
                </p>
              )}
              {tab === "how" && (
                <p>
                  Apply a small amount to clean, dry skin and gently massage over
                  the face and neck until fully absorbed. Use once or twice daily.
                  When used during the day, follow with a broad-spectrum sunscreen.
                </p>
              )}
              {tab === "ingredients" && (
                <p>
                  Kojic Dipalmitate, Niacinamide, Arbutin and Octinoxate, blended
                  into a moisturizing cream base.
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
