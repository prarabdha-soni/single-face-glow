import { useEffect, useState } from "react";
import hero1 from "@/assets/hero-1.png";
import hero2 from "@/assets/hero-2.png";

const heroSlides = [
  {
    src: hero1,
    alt: "Complete care, visible results — Nishu skin science",
  },
  {
    src: hero2,
    alt: "Nishu complete skincare collection — healthy glow every day",
  },
];

export function HeroBanner() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % heroSlides.length);
    }, 4500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#ececea]">
      <div className="w-full bg-[#ececea]">
        <img
          src={heroSlides[activeIndex].src}
          alt={heroSlides[activeIndex].alt}
          className="w-full h-auto object-contain"
          loading="eager"
          decoding="async"
        />
      </div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`h-2.5 w-2.5 rounded-full transition ${
              index === activeIndex ? "bg-foreground" : "bg-slate-300"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
