import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { buildWhatsAppOrderUrl, type OrderDetails } from "@/lib/whatsapp-order";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const emptyDetails: OrderDetails = {
  name: "",
  phone: "",
  email: "",
  addressLine: "",
  city: "",
  state: "",
  pincode: "",
};

export function CartDrawer() {
  const {
    items,
    itemCount,
    subtotal,
    isOpen,
    view,
    closeCart,
    setView,
    setQty,
    removeItem,
    clearCart,
  } = useCart();
  // local animation state for view transitions
  const [animating, setAnimating] = useState(false);
  const [details, setDetails] = useState<OrderDetails>(emptyDetails);

  const updateField = (field: keyof OrderDetails, value: string) => {
    setDetails((d) => ({ ...d, [field]: value }));
  };

  const validateCheckout = (): string | null => {
    if (!details.name.trim()) return "Please enter your name.";
    if (!/^\d{10}$/.test(details.phone.replace(/\D/g, "").slice(-10)))
      return "Please enter a valid 10-digit phone number.";
    if (!details.addressLine.trim()) return "Please enter your street address.";
    if (!details.city.trim()) return "Please enter your city.";
    if (!details.state.trim()) return "Please enter your state.";
    if (!/^\d{6}$/.test(details.pincode.trim())) return "Please enter a valid 6-digit PIN code.";
    return null;
  };

  const placeOrderOnWhatsApp = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }
    const error = validateCheckout();
    if (error) {
      toast.error(error);
      return;
    }

    const phone = details.phone.replace(/\D/g, "").slice(-10);
    const url = buildWhatsAppOrderUrl(items, { ...details, phone });

    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp to confirm your order.");
    clearCart();
    setDetails(emptyDetails);
    closeCart();
  };

  // focus management + simple transition when view changes
  useEffect(() => {
    setAnimating(true);
    const t = setTimeout(() => setAnimating(false), 180);
    if (view === "checkout") {
      setTimeout(() => {
        const el = document.getElementById("checkout-name") as HTMLElement | null;
        el?.focus();
      }, 200);
    }
    return () => clearTimeout(t);
  }, [view]);

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-3">
            {view === "checkout" && (
              <button
                type="button"
                onClick={() => setView("cart")}
                className="inline-flex items-center justify-center w-8 h-8 rounded-md text-muted-foreground hover:bg-muted/50"
                aria-label="Back to cart"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6" />
                </svg>
              </button>
            )}
            <SheetTitle className="font-display text-xl tracking-tight">
              {view === "checkout" ? "Checkout" : "Your cart"}
            </SheetTitle>
          </div>
          <SheetDescription className="text-xs tracking-wide">
            {view === "checkout"
              ? "Enter delivery details — we'll receive your order on WhatsApp."
              : itemCount === 0
                ? "No items yet."
                : `${itemCount} item${itemCount === 1 ? "" : "s"}`}
          </SheetDescription>
        </SheetHeader>

        {view === "cart" ? (
          <>
            <div className={`flex-1 space-y-4 py-4 ${animating ? "opacity-60 translate-y-1" : "opacity-100"}`}>
              {items.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Add products from the shop to get started.
                </p>
              ) : (
                items.map((item) => (
                  <div key={item.slug} className="flex gap-3 border-b border-border pb-4">
                    <div className="h-16 w-16 shrink-0 bg-muted flex items-center justify-center p-2">
                      <img
                        src={item.image}
                        alt=""
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug truncate">{item.name}</p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                        {item.size}
                      </p>
                      <p className="text-sm font-display mt-1">₹ {item.price * item.qty}.00</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => setQty(item.slug, item.qty - 1)}
                          className="h-7 w-7 border border-border text-sm hover:bg-muted"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-xs w-6 text-center">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => setQty(item.slug, item.qty + 1)}
                          className="h-7 w-7 border border-border text-sm hover:bg-muted"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                        <button
                          type="button"
                          onClick={() => removeItem(item.slug)}
                          className="ml-auto text-[10px] uppercase tracking-wider text-muted-foreground hover:text-foreground"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-display">₹ {subtotal}.00</span>
                </div>
                <button
                  type="button"
                  onClick={() => setView("checkout")}
                  className="w-full bg-foreground text-background text-[13px] tracking-[0.15em] uppercase py-4 hover:bg-foreground/90 transition-colors"
                  aria-label="Proceed to checkout"
                >
                  Checkout
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="flex-1 space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="checkout-name" className="text-xs uppercase tracking-wider">
                  Full name *
                </Label>
                <Input
                  id="checkout-name"
                  value={details.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout-phone" className="text-xs uppercase tracking-wider">
                  Phone (WhatsApp) *
                </Label>
                <Input
                  id="checkout-phone"
                  type="tel"
                  inputMode="numeric"
                  placeholder="10-digit mobile"
                  value={details.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  autoComplete="tel"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout-email" className="text-xs uppercase tracking-wider">
                  Email
                </Label>
                <Input
                  id="checkout-email"
                  type="email"
                  value={details.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout-address" className="text-xs uppercase tracking-wider">
                  Street address *
                </Label>
                <Textarea
                  id="checkout-address"
                  rows={3}
                  value={details.addressLine}
                  onChange={(e) => updateField("addressLine", e.target.value)}
                  autoComplete="street-address"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="checkout-city" className="text-xs uppercase tracking-wider">
                    City *
                  </Label>
                  <Input
                    id="checkout-city"
                    value={details.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    autoComplete="address-level2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="checkout-state" className="text-xs uppercase tracking-wider">
                    State *
                  </Label>
                  <Input
                    id="checkout-state"
                    value={details.state}
                    onChange={(e) => updateField("state", e.target.value)}
                    autoComplete="address-level1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="checkout-pincode" className="text-xs uppercase tracking-wider">
                  PIN code *
                </Label>
                <Input
                  id="checkout-pincode"
                  inputMode="numeric"
                  maxLength={6}
                  value={details.pincode}
                  onChange={(e) => updateField("pincode", e.target.value.replace(/\D/g, ""))}
                  autoComplete="postal-code"
                />
              </div>

              <div className="rounded-sm border border-border p-3 text-xs text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Order summary</p>
                {items.map((item) => (
                  <p key={item.slug}>
                    {item.name} × {item.qty} — ₹{item.price * item.qty}
                  </p>
                ))}
                <p className="mt-2 font-display text-foreground">Total: ₹ {subtotal}.00</p>
              </div>
            </div>

            <div className="border-t border-border pt-4 space-y-2">
              <button
                type="button"
                onClick={() => setView("cart")}
                className="w-full border border-border text-[11px] tracking-[0.15em] uppercase py-3 hover:bg-muted transition-colors"
              >
                Back to cart
              </button>
              <button
                type="button"
                onClick={placeOrderOnWhatsApp}
                className="w-full bg-[#25D366] text-white text-[13px] tracking-[0.15em] uppercase py-4 hover:bg-[#20bd5a] transition-colors"
                aria-label="Send order on WhatsApp"
              >
                Send order on WhatsApp
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
