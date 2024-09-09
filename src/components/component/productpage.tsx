'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Label } from "@/components/ui/label";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { StarsIcon, CircleCheckBig } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { ShoppingBasket } from "@/components/ui/shopping-cart";
import dynamic from "next/dynamic";
import Image from 'next/image';
import { useStore } from 'zustand/react'



// import { useCartStore } from '@/store/cartStore';

import { useCartStore } from '@/store/cartStore';

interface ProductPageParams {
  params: {
    id: string;
  };
}

export default function ProductPage({ params }: ProductPageParams) {
  const { id } = params;
  const { addItem } = useCartStore();

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [isAdding, setIsAdding] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`http://localhost:4000/api/products/${id}`);

        if (!response.ok) {
          throw new Error(`Error fetching product: ${response.statusText}`);
        }

        const data = await response.json();
        setProduct(data);

      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) return;

    setIsAdding(true);

    await new Promise((resolve) => setTimeout(resolve, 1000)); 

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    setIsAdding(false);
    setShowAlert(true);
    setSelectedSize('');
    setSelectedColor('');
    
    setTimeout(() => setShowAlert(false), 3000);
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return null;
  }

  return (
    <main className="flex flex-col h-full">
      <header className="flex items-center justify-between px-4 lg:px-6 h-14 lg:h-20 border-b bg-background">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <StarsIcon className="h-6 w-6" />
          <span className="font-semibold text-lg">Pulse Star</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className='mr-4'>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/shop">Shop</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">About</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Contact</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <ShoppingBasket className="px-6"/>
        </NavigationMenu>
      </header>
      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-md z-50">
          <Alert>
            <CircleCheckBig className="h-6 w-6 text-success" />
            <AlertTitle>Product Added</AlertTitle>
            <AlertDescription>The product has been successfully added to your cart.</AlertDescription>
          </Alert>
        </div>
      )}
      <div className="flex-grow grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
        <div className="grid gap-4">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={900}
            className="aspect-[2/3] object-cover border w-full rounded-lg overflow-hidden"
          />
        </div>
        <div className="grid gap-6 md:gap-10">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h1>
            <div>
              <p>{product.description.charAt(0).toUpperCase() + product.description.slice(1)}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">€{product.price}</div>
            </div>
          </div>
          <form className="grid gap-6" onSubmit={(e) => { e.preventDefault(); handleAddToCart(); }}>
            <div className="grid gap-2">
              <Label htmlFor="size" className="text-base">Size</Label>
              <RadioGroup
                id="size"
                value={selectedSize}
                onValueChange={(value) => setSelectedSize(value)}
                className="flex items-center gap-2"
              >
                <Label htmlFor="size-s" className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                  <RadioGroupItem id="size-s" value="s" />
                  S
                </Label>
                <Label htmlFor="size-m" className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                  <RadioGroupItem id="size-m" value="m" />
                  M
                </Label>
                <Label htmlFor="size-l" className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                  <RadioGroupItem id="size-l" value="l" />
                  L
                </Label>
                <Label htmlFor="size-xl" className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                  <RadioGroupItem id="size-xl" value="xl" />
                  XL
                </Label>
              </RadioGroup>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="color" className="text-base">Color</Label>
              <RadioGroup
                id="color"
                value={selectedColor}
                onValueChange={(value) => setSelectedColor(value)}
                className="flex items-center gap-2"
              >
                <Label htmlFor="color-white" className="border border-gray-400 cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                  <RadioGroupItem id="color-white" value="white" />
                  <div className="w-6 h-6 rounded-full bg-[#FFFFFF] border border-gray-400" />
                </Label>
                <Label htmlFor="color-black" className="border border-gray-400 cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                  <RadioGroupItem id="color-black" value="black" />
                  <div className="w-6 h-6 rounded-full bg-[#0a0a0a] border border-gray-400" />
                </Label>
                <Label htmlFor="color-brown" className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                  <RadioGroupItem id="color-brown" value="brown" />
                  <div className="w-6 h-6 rounded-full bg-[#8B4513]" />
                </Label>
                <Label htmlFor="color-burgundy" className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-muted">
                  <RadioGroupItem id="color-burgundy" value="burgundy" />
                  <div className="w-6 h-6 rounded-full bg-[#800020]" />
                </Label>
              </RadioGroup>
            </div>
            <Button
              size="lg"
              type="submit"
              disabled={!selectedSize || !selectedColor || isAdding}
              className={isAdding || !selectedSize || !selectedColor ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isAdding ? (
                <div className="flex items-center gap-2">
                  <span>Adding...</span>
                </div>
              ) : (
                "Add to Cart"
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}