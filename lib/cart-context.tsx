"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  getProductById,
  getGiftSetById,
  type Product,
  type GiftSet,
} from "@/data/products";

const CART_STORAGE_KEY = "essen-cart";

export interface CartItem {
  id: string;
  type: "product" | "giftset";
  quantity: number;
  selectedPrice: number;
}

interface CartContextType {
  items: CartItem[];
  isHydrated: boolean;
  addItem: (
    id: string,
    type: "product" | "giftset",
    price: number,
    quantity?: number
  ) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => number;
  getItemDetails: (item: CartItem) => Product | GiftSet | undefined;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved) as CartItem[]);
    } catch {
      /* ignore corrupt cart */
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items, isHydrated]);

  const addItem = useCallback(
    (
      id: string,
      type: "product" | "giftset",
      price: number,
      quantity = 1
    ) => {
      setItems((prev) => {
        const existing = prev.find((item) => item.id === id);
        if (existing) {
          return prev.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: item.quantity + quantity,
                  selectedPrice: price,
                }
              : item
          );
        }
        return [...prev, { id, type, quantity, selectedPrice: price }];
      });
      setIsOpen(true);
    },
    []
  );

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getItemCount = useCallback(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );

  const getTotal = useCallback(
    () =>
      items.reduce(
        (total, item) => total + item.selectedPrice * item.quantity,
        0
      ),
    [items]
  );

  const getItemDetails = useCallback((item: CartItem) => {
    if (item.type === "product") return getProductById(item.id);
    return getGiftSetById(item.id);
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        isHydrated,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemCount,
        getTotal,
        getItemDetails,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
