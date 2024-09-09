"use client";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { StarsIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ShoppingBasket } from "@/components/ui/shopping-cart";
import Image from 'next/image'

interface Product {
  id: string; // or number, depending on your actual data type
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

interface Sections {
  id: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  data: Product[]; // Change here
}

export default function LandingPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('http://localhost:4000/api/products');
        if (response.ok) {
          const data = await response.json();
          setProducts(data.sub);
        } else {
          console.error('Failed to fetch products');
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }

    fetchProducts();
  }, []);

  return (
    <div className="flex flex-col min-h-dvh">
      <header className="flex items-center justify-between px-4 lg:px-6 h-14 lg:h-20 border-b bg-background">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <StarsIcon className="h-6 w-6" />
          <span className="font-semibold text-lg">Pulse Star</span>
        </Link>
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 h-9 lg:h-10 rounded-md bg-muted focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <NavigationMenu>
          <NavigationMenuList className='mr-4'>
            <NavigationMenuItem>
              <NavigationMenuLink href="/">Home</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Shop</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">About</NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#">Contact</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
          <ShoppingBasket/>
        </NavigationMenu>
      </header>
      <main className="flex-2">
        <section className="w-full pt-12 md:pt-24 lg:pt-32">
          <div className="flex justify-center items-center">
            <div className="container px-4 md:px-6 grid gap-8 lg:grid-cols-2 lg:gap-16">
              <Image
                src="/placeholder.svg"
                width={800}
                height={800}
                alt="Product Image"
                className="mx-auto aspect-square overflow-hidden rounded-xl object-cover"
              />
              <div className="flex flex-col items-start justify-center space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Acme Prism Tee</h1>
                <p className="text-muted-foreground md:text-xl">
                  A perfect blend of style and comfort for the modern individual.
                </p>
                <Link
                  href="#"
                  className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                  prefetch={false}
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>
        </section>
        {products && products.map((section, index) => (
          <Section key={index} section={section} />
        ))}
      </main>
      <footer className="flex justify-center items-center bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <FooterLinks/>
        </div>
      </footer>
    </div>
  );
}

function Section({ section }: { section: Sections }) {
  return (
    <section className="flex justify-center items-center w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">{section.title}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                {section.description}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {section.data.map((product) => (
            <div
              key={product.id}
              className="relative overflow-hidden transition-transform duration-300 ease-in-out rounded-lg shadow-lg group hover:shadow-xl hover:-translate-y-2"
            >
              <Link
                href={`/product/${product.id}`}
                className="absolute inset-0 z-10"
                prefetch={false}
              >
                <span className="sr-only">View {product.name}</span>
              </Link>
              <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={400}
                className="object-cover w-full h-64"
                style={{ aspectRatio: "500/400", objectFit: "cover" }}
              />
              <div className="p-4 bg-background">
                <h3 className="text-xl font-bold">{product.name.charAt(0).toUpperCase() + product.name.slice(1)}</h3>
                <p className="text-sm text-muted-foreground">{product.description.charAt(0).toUpperCase() + product.description.slice(1)}</p>
                <h4 className="text-lg font-semibold md:text-xl">€{product.price}</h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterLinks() {
  const footerLinks = [
    {
      title: "Company",
      links: ["About Us", "Our Team", "Careers", "News"],
    },
    {
      title: "Products",
      links: ["Men", "Women", "Kids", "Accessories"],
    },
    {
      title: "Resources",
      links: ["Blog", "Community", "Support", "FAQs"],
    },
    {
      title: "Legal",
      links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    },
    {
      title: "Contact",
      links: ["Support", "Sales", "Press", "Partnerships"],
    },
  ];

  return (
    <>
      {footerLinks.map((section, index) => (
        <div key={index} className="grid gap-1">
          <h3 className="font-semibold">{section.title}</h3>
          {section.links.map((link, i) => (
            <Link key={i} href="#" prefetch={false}>
              {link}
            </Link>
          ))}
        </div>
      ))}
    </>
  );
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}