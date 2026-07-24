import heroBanner from "@/assets/hero-banner.jpg";

const HERO_WIDTH = 1024;
const HERO_HEIGHT = 512;

export function HeroBanner() {
  return (
    <section className="w-full border-b border-border bg-[#ececea] flex justify-center overflow-hidden">
      <img
        src={heroBanner}
        alt="Nishu Skin Science — Complete care, visible results"
        width={HERO_WIDTH}
        height={HERO_HEIGHT}
        sizes="100vw"
        className="block h-auto w-auto max-h-[min(50vh,512px)] max-w-full object-contain object-center"
        fetchPriority="high"
        decoding="async"
      />
    </section>
  );
}
