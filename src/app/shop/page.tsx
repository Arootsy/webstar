"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  const [cartCount, setCartCount] = useState(0); // Voorbeeld cart count uit Zustand/localStorage
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    // Haal de cart count op uit localStorage of Zustand
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartCount(storedCart.length);

    // Haal producten op uit de API
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        const data = await response.json();
        const fetchedProducts = data.sub[0].data;
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      return (
        product.price >= filters.priceRange.min &&
        product.price <= filters.priceRange.max &&
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
              {["S", "M", "L", "XL"].map((size) => (
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

          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-background rounded-md overflow-hidden shadow-md">
                  <img
                    src={product.imageUrl}
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
          )}
        </div>
      </div>
    </div>
  );
}
