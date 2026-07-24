import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart } from "@/lib/cart";
import { getProduct, products } from "@/lib/products";
import Lightbox from "@/components/Lightbox";

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
      links: [
        { rel: "preload", href: product.images[0], as: "image" },
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
  const { addItem, openCart } = useCart();
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "how" | "ingredients">("desc");
  const [activeImg, setActiveImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const discount = Math.round((1 - product.price / product.compareAt) * 100);

  const related = products.filter((p) => p.slug !== product.slug);

  const cartPayload = {
    slug: product.slug,
    name: product.name,
    price: product.price,
    size: product.size,
    image: product.images[0],
  };

  const handleAddToCart = () => {
    addItem(cartPayload, qty);
    toast.success(`Added ${qty} to cart`);
  };

  const handleBuyNow = () => {
    addItem(cartPayload, qty);
    openCart("checkout");
  };

  return (
    <>
      <SiteLayout>
      {/* Breadcrumb */}
      <div className="max-w-[1600px] mx-auto px-6 pt-6 text-[11px] tracking-[0.15em] uppercase text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Shop
        </Link>
        <span className="mx-2">/</span>
        <span>{product.category}</span>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 py-8 md:py-12 grid md:grid-cols-2 gap-12 md:gap-20">
        {/* Image */}
        <div>
          <div className="bg-muted aspect-square flex items-center justify-center overflow-hidden p-0">
            <img
              src={product.images[activeImg]}
              alt={product.name}
              onClick={() => setLightboxOpen(true)}
              role="button"
              aria-label="Open image gallery"
              className="w-full h-full object-contain cursor-zoom-in"
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
          <h1 className="font-display text-4xl md:text-5xl leading-[1.05] mb-4">{product.name}</h1>
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
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-foreground text-background text-[14px] tracking-[0.15em] uppercase py-3 hover:bg-foreground/90 transition-colors"
            >
              Add to Cart
            </button>
          </div>

          <button
            type="button"
            onClick={handleBuyNow}
            className="w-full border border-foreground text-[13px] tracking-[0.15em] uppercase py-3 mb-10 hover:bg-muted transition-colors"
          >
            Buy Now
          </button>

          <div className="grid grid-cols-3 gap-px bg-border border border-border mb-10 text-center text-[11px] tracking-wider uppercase">
            {["Vegan", "Cruelty-Free", "Dermatologically Tested"].map((v) => (
              <div key={v} className="bg-background py-4 px-2">
                {v}
              </div>
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
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  to="/product/$slug"
                  params={{ slug: p.slug }}
                  className="group flex flex-col"
                >
                  <div className="bg-muted/60 aspect-square flex items-center justify-center overflow-hidden mb-4 p-2">
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform"
                    />
                  </div>
                  <p className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-1.5">
                    {p.category} · {p.size}
                  </p>
                  <h3 className="font-display text-lg leading-snug mb-2">{p.name}</h3>
                  <div className="flex items-center gap-2">
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
      )}
    </SiteLayout>
      {/* Mobile sticky CTA: prominent Add to Cart + Buy Now on small screens */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border p-3">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <div className="text-xs text-muted-foreground">Price</div>
            <div className="font-display">₹ {product.price}.00</div>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-foreground text-background px-4 py-3 rounded-md text-sm font-medium"
            aria-label="Add to cart"
          >
            Add
          </button>
          <button
            onClick={handleBuyNow}
            className="border border-foreground px-4 py-3 rounded-md text-sm"
            aria-label="Buy now"
          >
            Buy
          </button>
        </div>
      </div>

      <Lightbox
        images={product.images}
        activeIndex={activeImg}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setActiveImg((i) => (i - 1 + product.images.length) % product.images.length)}
        onNext={() => setActiveImg((i) => (i + 1) % product.images.length)}
      />
    </>
  );
}
