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
  const testimonials = [
    {
      quote:
        "The night cream transformed my skin texture in just one week. Lightweight and glowing — I’m hooked.",
      name: "Meera R.",
      title: "Content Creator",
    },
    {
      quote:
        "Finally a sunscreen that doesn’t feel heavy or leave a white cast. My skin looks hydrated and protected all day.",
      name: "Rohan K.",
      title: "Graphic Designer",
    },
    {
      quote:
        "The face wash cleans deeply without drying out my skin. It feels fresh, soft, and more even after every use.",
      name: "Asha P.",
      title: "Marketing Lead",
    },
  ];

  return (
    <SiteLayout>
      <HeroBanner />

      <section id="about" className="bg-[#fcfbfd] py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="rounded-[2rem] border border-[#e9e5ef] bg-white p-6 md:p-10 shadow-sm">
            <div className="mb-6 text-center md:text-left">
              <p className="text-sm uppercase tracking-[0.3em] text-[#9B82D7] mb-3">About Nishu Beauty</p>
              <h2 className="font-display text-3xl md:text-4xl tracking-tight">
                Science-led care for radiant, balanced skin.
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-3xl">
              Nishu Beauty blends gentle actives and modern formulations to support healthy skin day after day. Each product is crafted to visibly soften texture, even tone, and strengthen the skin barrier without heaviness.
            </p>
          </div>
        </div>
      </section>

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
                <div className="bg-muted/60 aspect-square flex items-center justify-center overflow-hidden mb-4 p-2">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-contain object-center group-hover:scale-[1.03] transition-transform duration-300"
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

      <section className="bg-[#f8f5f9] py-12 md:py-16">
        <div className="max-w-[1200px] mx-auto px-5 md:px-8">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-[0.3em] text-[#9B82D7] mb-3">What our customers say</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-tight">
              Real reviews from happy skin.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="rounded-3xl border border-[#e9e5ef] bg-white p-6 shadow-sm">
                <p className="text-sm text-[#4f4b59] leading-relaxed mb-6">“{testimonial.quote}”</p>
                <div>
                  <p className="font-display text-base">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-[#9B82D7] mt-1">{testimonial.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
