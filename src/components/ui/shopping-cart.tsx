import { useCartStore } from '@/store/cartStore';
import { ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ShoppingBasketProps {
  className?: string;
}

export function ShoppingBasket({ className }: ShoppingBasketProps) {
  const { cartItems, removeItem, totalPrice } = useCartStore(state => ({
    cartItems: state.cartItems,
    removeItem: state.removeItem,
    totalPrice: state.totalPrice,
  }));

  return (
    <div className={className}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCart className="h-4 w-4" />
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-lg p-0 flex items-center justify-center">
              {cartItems.length}
            </Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-64">
          <DropdownMenuLabel>Shopping Cart</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {cartItems.map(item => (
            <DropdownMenuItem key={item.cartItemId} className="flex justify-between">
              <span>{item.name}</span>
              <span>€{item.price.toFixed(2)}</span>
              <Button variant="ghost" size="sm" onClick={() => removeItem(item.cartItemId)}>
                Remove
              </Button>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <strong>Total: €{totalPrice}</strong>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button className="w-full">Checkout</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
