'use client'

import ProductPage from '@/components/component/productpage';
import { CartProvider } from '@/components/component/shopping-cart-context';

interface Params {
  id: string;
}

export default function Home({ params }: { params: Params }) {
  return (
    <CartProvider>
      <ProductPage params={params} />
    </CartProvider>
  );
}