import React, { useEffect } from 'react';
import { useCartStore } from "@/store/cartStore";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { cartItems, totalPrice, setTotalPrice } = useCartStore((state) => ({
    cartItems: state.cartItems,
    totalPrice: state.totalPrice,
    setTotalPrice: state.setTotalPrice,
  }));

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2);
      setTotalPrice(total);
    }
  }, [cartItems, setTotalPrice]);

  return <>{children}</>;
}
