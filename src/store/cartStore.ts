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

const isBrowser = typeof window !== 'undefined';

const loadCartFromLocalStorage = (): CartItem[] => {
  if (!isBrowser) return [];
  const savedCart = localStorage.getItem('cartItems');
  return savedCart ? JSON.parse(savedCart) : [];
};

const loadTotalPriceFromLocalStorage = (): string => {
  if (!isBrowser) return '0.00';
  return localStorage.getItem('totalPrice') || '0.00';
};

export const useCartStore = create<CartStore>(
  persist(
    (set) => ({
      cartItems: loadCartFromLocalStorage(),
      addItem: (item: CartItem) => set((state) => {
        const updatedCart = [...state.cartItems, item];
        if (isBrowser) localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        return { cartItems: updatedCart };
      }),
      removeItem: (id: number) => set((state) => {
        const updatedCart = state.cartItems.filter(item => item.id !== id);
        if (isBrowser) localStorage.setItem('cartItems', JSON.stringify(updatedCart));
        return { cartItems: updatedCart };
      }),
      totalPrice: loadTotalPriceFromLocalStorage(),
      setTotalPrice: (price: string) => set(() => {
        if (isBrowser) localStorage.setItem('totalPrice', price);
        return { totalPrice: price };
      }),
    }),
    {
      name: 'cart-storage',
    }
  )
);
