import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "nishu-beauty-cart";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  size: string;
  image: string;
  qty: number;
};

type CartView = "cart" | "checkout";

type CartContextValue = {
  items: CartLine[];
  itemCount: number;
  subtotal: number;
  hydrated: boolean;
  isOpen: boolean;
  view: CartView;
  addItem: (item: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  openCart: (view?: CartView) => void;
  closeCart: () => void;
  setView: (view: CartView) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartLine[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (line) =>
        line && typeof line.slug === "string" && typeof line.qty === "number" && line.qty > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<CartView>("cart");

  useEffect(() => {
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((item: Omit<CartLine, "qty">, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.slug === item.slug);
      if (existing) {
        return prev.map((p) => (p.slug === item.slug ? { ...p, qty: p.qty + qty } : p));
      }
      return [...prev, { ...item, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    if (qty < 1) {
      setItems((prev) => prev.filter((p) => p.slug !== slug));
      return;
    }
    setItems((prev) => prev.map((p) => (p.slug === slug ? { ...p, qty } : p)));
  }, []);

  const removeItem = useCallback((slug: string) => {
    setItems((prev) => prev.filter((p) => p.slug !== slug));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback((nextView: CartView = "cart") => {
    setView(nextView);
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
    setView("cart");
  }, []);

  const itemCount = useMemo(() => items.reduce((sum, line) => sum + line.qty, 0), [items]);

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.price * line.qty, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      itemCount,
      subtotal,
      hydrated,
      isOpen,
      view,
      addItem,
      setQty,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      setView,
    }),
    [
      items,
      itemCount,
      subtotal,
      hydrated,
      isOpen,
      view,
      addItem,
      setQty,
      removeItem,
      clearCart,
      openCart,
      closeCart,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
