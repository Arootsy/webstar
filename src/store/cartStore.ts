import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  id: number;
  name: string;
  price: number;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  totalPrice: string;
  setTotalPrice: (price: string) => void;
}

// Corrected Zustand store
export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addItem: (item: CartItem) => {
        const updatedCart = [...get().cartItems, item];
        const total = updatedCart.reduce((sum, i) => sum + i.price, 0).toFixed(2);
        set({ cartItems: updatedCart, totalPrice: total });
      },
      removeItem: (id: number) => {
        const updatedCart = get().cartItems.filter((item) => item.id !== id);
        const total = updatedCart.reduce((sum, i) => sum + i.price, 0).toFixed(2);
        set({ cartItems: updatedCart, totalPrice: total });
      },
      totalPrice: '0.00',
      setTotalPrice: (price: string) => {
        set({ totalPrice: price });
      },
    }),
    {
      name: 'cart-storage', // name of the item in storage
      getStorage: () => localStorage, // explicitly use localStorage
    }
  )
);
