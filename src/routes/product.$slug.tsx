import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { getProduct, products } from "@/lib/products";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product not found — Nishu Beauty" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} — Nishu Beauty`;
    return {
      meta: [
        { title },
        { name: "description", content: product.tagline },
        { property: "og:title", content: title },
        { property: "og:description", content: product.tagline },
        { property: "og:type", content: "product" },
        { property: "og:image", content: product.images[0] },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: product.images[0] },
      ],
    };
  },
  component: ProductDetail,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="max-w-[1600px] mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-4xl mb-4">Product not found</h1>
        <Link to="/" className="underline text-sm tracking-wider uppercase">
          Back to shop
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="max-w-[1600px] mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-2xl">Something went wrong.</h1>
      </div>
    </SiteLayout>
  ),
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "how" | "ingredients">("desc");
  const [activeImg, setActiveImg] = useState(0);
  const discount = Math.round((1 - product.price / product.compareAt) * 100);

  const related = products.filter((p) => p.slug !== product.slug);

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <div className="max-w-[1600px] mx-auto px-6 pt-6 text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
        <Link to="/" className="hover:text-foreground">Shop</Link>
        <span className="mx-2">/</span>
        <span>{product.category}</span>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 py-8 md:py-12 grid md:grid-cols-2 gap-12 md:gap-20">
        {/* Image */}
        <div>
          <div className="bg-muted aspect-square flex items-center justify-center overflow-hidden">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2 mt-2">
              {product.images.map((src: string, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`aspect-square bg-muted border ${
                    activeImg === i ? "border-foreground" : "border-border"
                  }`}
                >
                  <img src={src} alt="" loading="lazy" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:pt-4">
          <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-4">
            {product.category} · {product.size}
          </p>
          <h1 className="font-display text-4xl md:text-5xl leading-[1.05] mb-4">
            {product.name}
          </h1>
          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-md mb-6">
            {product.tagline}
          </p>

          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl font-display">₹ {product.price}.00</span>
            <span className="text-xs text-muted-foreground line-through">
              ₹ {product.compareAt}.00
            </span>
            <span className="text-[11px] tracking-wider uppercase bg-foreground text-background px-2 py-1">
              {discount}% Off
            </span>
          </div>

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

          <div className="grid grid-cols-3 gap-px bg-border border border-border mb-10 text-center text-[11px] tracking-wider uppercase">
            {["Vegan", "Cruelty-Free", "Dermatologically Tested"].map((v) => (
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
              {tab === "desc" && <p>{product.description}</p>}
              {tab === "how" && <p>{product.howToUse}</p>}
              {tab === "ingredients" && <p>{product.ingredients}</p>}
            </div>
          </div>
        </div>
      </main>

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="max-w-[1600px] mx-auto px-6 py-14">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-8">
              You may also like
            </h2>
            <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="group bg-background p-6 flex flex-col hover:bg-muted transition-colors"
                >
                  <div className="bg-muted aspect-[4/5] flex items-center justify-center overflow-hidden mb-5">
                    <img src={p.images[0]} alt={p.name} loading="lazy" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-[11px] tracking-[0.2em] uppercase text-muted-foreground mb-2">
                    {p.category} · {p.size}
                  </p>
                  <h3 className="font-display text-2xl leading-tight mb-2">{p.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-display">₹ {p.price}.00</span>
                    <span className="text-xs text-muted-foreground line-through">₹ {p.compareAt}.00</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
