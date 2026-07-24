import { createFileRoute, Link } from "@tanstack/react-router";
import { HeroBanner } from "@/components/HeroBanner";
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
      <HeroBanner />

      <section>
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 md:py-16">
          <div className="mb-10 md:mb-12 text-center md:text-left">
            <h1 className="font-display text-2xl md:text-3xl tracking-tight mb-2">
              Shop essentials
            </h1>
            <p className="text-[13px] text-muted-foreground max-w-md mx-auto md:mx-0">
              Three considered formulas — cleanse, protect, and nourish.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-10 md:gap-x-8 md:gap-y-14">
            {products.map((p) => (
              <Link
                key={p.slug}
                to="/product/$slug"
                params={{ slug: p.slug }}
                className="group flex flex-col text-center md:text-left"
              >
                <div className="bg-muted/60 aspect-square flex items-center justify-center overflow-hidden mb-4 p-6 md:p-8">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="max-h-[120px] md:max-h-[148px] w-auto max-w-full object-contain group-hover:scale-[1.03] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                  {p.category} · {p.size}
                </p>
                <h3 className="font-display text-lg md:text-xl leading-snug mb-1.5">
                  {p.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2 hidden sm:block flex-1">
                  {p.tagline}
                </p>
                <div className="flex items-center justify-center md:justify-start gap-2 flex-wrap">
                  <span className="text-sm font-display">₹ {p.price}.00</span>
                  <span className="text-[11px] text-muted-foreground line-through">
                    ₹ {p.compareAt}.00
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="border-t border-border">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-12 md:py-16 grid md:grid-cols-3 gap-8 md:gap-12">
          {[
            ["Clinical", "Formulations rooted in dermatological research."],
            ["Honest", "Fair pricing. No inflated marketing claims."],
            ["Considered", "Recyclable packaging and thoughtful sourcing."],
          ].map(([t, d]) => (
            <div key={t} className="text-center md:text-left">
              <h3 className="font-display text-lg md:text-xl mb-2">{t}</h3>
              <p className="text-xs md:text-[13px] text-muted-foreground leading-relaxed max-w-xs mx-auto md:mx-0">
                {d}
              </p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
