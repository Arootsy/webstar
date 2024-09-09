"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { StarsIcon } from "lucide-react";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "@/components/ui/navigation-menu";
import { ShoppingBasket } from "@/components/ui/shopping-cart";

export default function ShopPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: { min: 0, max: 1000 },
    size: [],
    color: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0); // Example cart count from Zustand/localStorage

  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Stylish T-Shirt",
      price: 29.99,
      image: "/placeholder.svg",
      size: ["S", "M", "L", "XL"],
      color: ["black", "white", "blue"],
    },
    {
      id: 2,
      name: "Comfy Jeans",
      price: 59.99,
      image: "/placeholder.svg",
      size: ["28", "30", "32", "34"],
      color: ["blue", "black", "gray"],
    },
    {
      id: 3,
      name: "Casual Hoodie",
      price: 49.99,
      image: "/placeholder.svg",
      size: ["S", "M", "L", "XL"],
      color: ["gray", "navy", "olive"],
    },
    {
      id: 4,
      name: "Elegant Dress",
      price: 79.99,
      image: "/placeholder.svg",
      size: ["XS", "S", "M", "L"],
      color: ["black", "red", "green"],
    },
    {
      id: 5,
      name: "Sporty Sneakers",
      price: 89.99,
      image: "/placeholder.svg",
      size: ["7", "8", "9", "10"],
      color: ["white", "gray", "blue"],
    },
    {
      id: 6,
      name: "Cozy Sweatpants",
      price: 39.99,
      image: "/placeholder.svg",
      size: ["S", "M", "L", "XL"],
      color: ["black", "gray", "navy"],
    },
  ]);

  useEffect(() => {
    // This will only run on the client
    setIsMounted(true);

    // Example for getting cart count from Zustand or localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max &&
        (filters.size.length === 0 || filters.size.some((size) => product.size.includes(size))) &&
        (filters.color.length === 0 || filters.color.some((color) => product.color.includes(color))) &&
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [filters, searchTerm, products]);

  const handlePriceRangeChange = (min, max) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: { min, max },
    }));
  };

  const handleSizeChange = (size) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      size: prevFilters.size.includes(size)
        ? prevFilters.size.filter((s) => s !== size)
        : [...prevFilters.size, size],
    }));
  };

  const handleColorChange = (color) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      color: prevFilters.color.includes(color)
        ? prevFilters.color.filter((c) => c !== color)
        : [...prevFilters.color, color],
    }));
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex items-center justify-between px-4 lg:px-6 h-14 lg:h-20 border-b bg-background">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <StarsIcon className="h-6 w-6" />
          <span className="font-semibold text-lg">Pulse Star</span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="mr-4">
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
          {/* Only render cart icon after component has mounted */}
          {isMounted && <ShoppingBasket count={cartCount} className="px-6" />}
        </NavigationMenu>
      </header>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-8 py-8">
        <div className="space-y-6">
          <div className="bg-muted px-4 py-3 rounded-md font-medium">
            <div className="flex justify-between items-center mb-4">
              <span>Price Range</span>
              <div className="text-sm text-muted-foreground">
                ${filters.priceRange.min} - ${filters.priceRange.max}
              </div>
            </div>
            <div />
          </div>

          <div className="bg-muted px-4 py-3 rounded-md font-medium">
            <div className="flex justify-between items-center mb-4">
              <span>Size</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["S", "M", "L", "XL", "28", "30", "32", "34", "7", "8", "9", "10"].map((size) => (
                <Label key={size} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={filters.size.includes(size)} onCheckedChange={() => handleSizeChange(size)} />
                  {size}
                </Label>
              ))}
            </div>
          </div>

          <div className="bg-muted px-4 py-3 rounded-md font-medium">
            <div className="flex justify-between items-center mb-4">
              <span>Color</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["black", "white", "blue", "red", "green", "gray", "navy", "olive"].map((color) => (
                <Label key={color} className="flex items-center gap-2 cursor-pointer">
                  <Checkbox checked={filters.color.includes(color)} onCheckedChange={() => handleColorChange(color)} />
                  <div
                    className={`w-5 h-5 rounded-full ${color === "white" ? "border" : ""}`}
                    style={{ backgroundColor: color }}
                  />
                </Label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-6">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-3 rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-background rounded-md overflow-hidden shadow-md">
                <img
                  src="/placeholder.svg"
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-64 object-cover"
                  style={{ aspectRatio: "400/400", objectFit: "cover" }}
                />
                <div className="p-4">
                  <h3 className="text-lg font-medium mb-2">{product.name}</h3>
                  <p className="text-primary font-medium mb-4">${product.price.toFixed(2)}</p>
                  <Button className="w-full">Add to Cart</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
