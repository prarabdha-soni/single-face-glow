import jarAsset from "@/assets/nishu-jar.png.asset.json";
import boxAsset from "@/assets/nishu-box.png.asset.json";
import sunscreenAsset from "@/assets/nishu-sunscreen.png.asset.json";
import facewashAsset from "@/assets/nishu-facewash.png.asset.json";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  size: string;
  price: number;
  compareAt: number;
  images: string[];
  description: string;
  howToUse: string;
  ingredients: string;
};

export const products: Product[] = [
  {
    slug: "glass-skin-face-cream",
    name: "Glass Skin Face Cream",
    tagline:
      "A lightweight daily cream for uneven tone, dark spots and dull-looking skin.",
    category: "Cream",
    size: "30g",
    price: 300,
    compareAt: 600,
    images: [jarAsset.url, boxAsset.url],
    description:
      "NISHU Glass Skin Face Cream is a lightweight daily face cream formulated with Kojic Dipalmitate, Arbutin, Niacinamide and Octinoxate. The formulation helps improve the appearance of uneven skin tone, dark spots and dull-looking skin while supporting a smoother, more radiant complexion.",
    howToUse:
      "Apply a small amount to clean, dry skin and gently massage over the face and neck until fully absorbed. Use once or twice daily. When used during the day, follow with a broad-spectrum sunscreen.",
    ingredients:
      "Kojic Dipalmitate, Niacinamide, Arbutin and Octinoxate, blended into a moisturizing cream base.",
  },
  {
    slug: "daily-sunscreen-spf-50",
    name: "Daily Sunscreen SPF 50",
    tagline:
      "Broad spectrum UVA/UVB PA+++ protection with Zinc Oxide and Niacinamide.",
    category: "Sunscreen",
    size: "50g",
    price: 450,
    compareAt: 900,
    images: [sunscreenAsset.url],
    description:
      "NISHU Daily Sunscreen SPF 50 is a broad-spectrum sunscreen with Zinc Oxide and Niacinamide. It protects against UVA and UVB rays (PA+++), soothes the skin and helps even out skin tone. Lightweight, non-greasy and suitable for all skin types.",
    howToUse:
      "Apply generously to face and neck as the last step of your morning skincare routine, at least 15 minutes before sun exposure. Reapply every 2 hours when outdoors.",
    ingredients:
      "Zinc Oxide, Niacinamide, and a lightweight moisturizing base. Broad Spectrum UVA / UVB / PA+++.",
  },
  {
    slug: "brightening-face-wash",
    name: "Brightening Face Wash",
    tagline:
      "A gentle daily cleanser with Kojic Acid and Niacinamide to brighten and even tone.",
    category: "Face Wash",
    size: "100ml",
    price: 250,
    compareAt: 500,
    images: [facewashAsset.url],
    description:
      "NISHU Brightening Face Wash is a gentle daily cleanser formulated with Kojic Acid and Niacinamide. It cleanses, brightens and helps even skin tone without stripping the skin, leaving it soft, fresh and radiant.",
    howToUse:
      "Wet face with lukewarm water. Massage a small amount over damp skin in circular motions. Rinse thoroughly. Use morning and evening.",
    ingredients:
      "Kojic Acid, Niacinamide, and a mild surfactant base. Suitable for all skin types.",
  },
];

export const getProduct = (slug: string) =>
  products.find((p) => p.slug === slug);
