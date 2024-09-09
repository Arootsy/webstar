import React, { useEffect } from 'react';
import dynamic from "next/dynamic";

const useCartStore = dynamic(() => import("../../store/cartStore").then(mod => mod.useCartStore), { ssr: false });

export function CartProvider({ children }: { children: React.ReactNode }) {
  const useStore = useCartStore();

  useEffect(() => {
    console.log('useStore', useStore);
    if (useStore) {
      const { cartItems = [], totalPrice, setTotalPrice } = useStore((state) => ({
        cartItems: state.cartItems,
        totalPrice: state.totalPrice,
        setTotalPrice: state.setTotalPrice,
      }));

      if (Array.isArray(cartItems)) {
        const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0).toFixed(2);
        setTotalPrice(total);
      }
    }
  }, [useStore]);

  return <>{children}</>;
}
