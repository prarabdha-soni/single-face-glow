import hero1 from "@/assets/hero-1.png";

export function HeroBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-[#ececea] py-10 sm:py-14 md:py-16">
      <div className="w-full bg-[#ececea] px-4 md:px-6">
        <img
          src={hero1}
          alt="Complete care, visible results — Nishu skin science"
          className="w-full h-auto object-contain"
          loading="eager"
          decoding="async"
        />
      </div>
    </section>
  );
}
