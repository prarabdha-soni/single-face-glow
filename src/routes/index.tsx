import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { products } from "@/lib/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shop — Nishu Beauty" },
      {
        name: "description",
        content:
          "Shop Nishu Beauty: Glass Skin Face Cream, Daily Sunscreen SPF 50 and Brightening Face Wash. Clinical formulations, honestly priced.",
      },
      { property: "og:title", content: "Shop — Nishu Beauty" },
      {
        property: "og:description",
        content:
          "Clinical skincare from Nishu Beauty: cream, sunscreen and face wash.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-[1600px] mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-end">
          <h1 className="font-display text-4xl md:text-6xl leading-[1.02] tracking-tight">
            Clinical skincare,<br />honestly priced.
          </h1>
          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-md md:justify-self-end">
            Three essentials. Considered ingredients. Formulated to work
            together — or on their own.
          </p>
        </div>
      </section>

      {/* Product grid */}
      <section>
        <div className="max-w-[1600px] mx-auto px-6 py-14">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground">
              All Products · {products.length}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {products.map((p) => (
              <Link
                key={p.slug}
                to="/product/$slug"
                params={{ slug: p.slug }}
                className="group bg-background p-6 flex flex-col hover:bg-muted transition-colors"
              >
                <div className="bg-muted aspect-[4/5] flex items-center justify-center overflow-hidden mb-5">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-contain group-hover:scale-[1.02] transition-transform"
                    loading="lazy"
                  />
                </div>
                <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                  {p.category} · {p.size}
                </p>
                <h3 className="font-display text-2xl leading-tight mb-2">
                  {p.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {p.tagline}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-base font-display">₹ {p.price}.00</span>
                  <span className="text-xs text-muted-foreground line-through">
                    ₹ {p.compareAt}.00
                  </span>
                  <span className="text-[10px] tracking-wider uppercase bg-foreground text-background px-2 py-0.5">
                    {Math.round((1 - p.price / p.compareAt) * 100)}% Off
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section id="about" className="border-t border-border">
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
    </SiteLayout>
  );
}
