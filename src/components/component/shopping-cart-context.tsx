import React, { useEffect } from 'react';
import { useCartStore } from "@/store/cartStore"; // Direct import

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { cartItems, totalPrice, setTotalPrice } = useCartStore((state) => ({
    cartItems: state.cartItems,
    totalPrice: state.totalPrice,
    setTotalPrice: state.setTotalPrice,
  }));

  useEffect(() => {
    if (Array.isArray(cartItems)) {
      const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2);
      setTotalPrice(total); // Now correctly calls the function from Zustand store
    }
  }, [cartItems, setTotalPrice]); // Trigger effect when cartItems or setTotalPrice changes

  return <>{children}</>;
}
