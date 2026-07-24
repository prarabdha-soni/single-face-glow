import type { CartLine } from "@/lib/cart";

export const WHATSAPP_ORDER_NUMBER = "919266106798";

export type OrderDetails = {
  name: string;
  phone: string;
  email: string;
  addressLine: string;
  city: string;
  state: string;
  pincode: string;
};

export function formatOrderMessage(items: CartLine[], details: OrderDetails): string {
  const lines = items.map(
    (item, i) => `${i + 1}. ${item.name} (${item.size}) × ${item.qty} — ₹${item.price * item.qty}`,
  );
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const parts = [
    "*New order — Nishu Beauty*",
    "",
    "*Contact*",
    `Name: ${details.name}`,
    `Phone: ${details.phone}`,
    details.email ? `Email: ${details.email}` : null,
    "",
    "*Delivery address*",
    details.addressLine,
    `${details.city}, ${details.state} — ${details.pincode}`,
    "",
    "*Items*",
    ...lines,
    "",
    `*Order total: ₹${subtotal}*`,
  ];

  return parts.filter((p) => p !== null).join("\n");
}

export function buildWhatsAppOrderUrl(items: CartLine[], details: OrderDetails): string {
  const text = formatOrderMessage(items, details);
  return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(text)}`;
}
