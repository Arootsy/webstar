import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
  cartItemId: number;
  id: number;
  name: string;
  price: number;
}

interface CartStore {
  cartItems: CartItem[];
  addItem: (item: Omit<CartItem, 'cartItemId'>) => void;
  removeItem: (cartItemId: number) => void;
  totalPrice: string;
  setTotalPrice: (price: string) => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addItem: (item: Omit<CartItem, 'cartItemId'>) => {
        const newItem = { ...item, cartItemId: Date.now() };
        const updatedCart = [...get().cartItems, newItem];
        const total = updatedCart.reduce((sum, i) => sum + i.price, 0).toFixed(2);
        set({ cartItems: updatedCart, totalPrice: total });
      },
      removeItem: (cartItemId: number) => {
        const updatedCart = get().cartItems.filter((item) => item.cartItemId !== cartItemId);
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
