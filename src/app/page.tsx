'use client'

import LandingPage from '../components/component/landingpage'
import { CartProvider } from '@/components/component/shopping-cart-context';

export default function Home() {
  return (
    <CartProvider>
      <LandingPage></LandingPage>
    </CartProvider>
  );
}
