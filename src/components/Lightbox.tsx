import React, { useEffect } from "react";

type LightboxProps = {
  images: string[];
  activeIndex: number;
  open: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function Lightbox({ images, activeIndex, open, onClose, onPrev, onNext }: LightboxProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, onPrev, onNext]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75"
      onClick={onClose}
    >
      <button
        aria-label="Close gallery"
        className="absolute top-4 right-4 text-white text-2xl"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
      >
        ×
      </button>

      <div className="relative max-w-[95%] max-h-[95%] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <button
          aria-label="Previous"
          onClick={onPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 text-white text-3xl p-2"
        >
          ‹
        </button>

        <img
          src={images[activeIndex]}
          alt="Product image"
          className="max-h-[85vh] max-w-full object-contain"
        />

        <button
          aria-label="Next"
          onClick={onNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-white text-3xl p-2"
        >
          ›
        </button>
      </div>
    </div>
  );
}
