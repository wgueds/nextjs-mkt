"use client";

import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { ProductDetail } from "@/interfaces/Products";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Cart = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { state, dispatch } = useCart();
  const { isLoggedIn, userData } = useAuth();

  const itemCount = state.items.length;
  const fee = 1;

  const removeFromCart = (item: ProductDetail) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  useEffect(() => {
    setIsMounted(true);

    if (isLoggedIn && userData) {
      // Load the data from localStorage using the user ID
      const storedCart = localStorage.getItem(`cart_${userData.id}`);

      if (storedCart) {
        const cartData = JSON.parse(storedCart);

        if (cartData) {
          dispatch({ type: "CLEAR_CART" });
          cartData.items.forEach((item: ProductDetail) => {
            dispatch({ type: "ADD_TO_CART", payload: item });
          });
        }
      }
    }
  }, [dispatch, isLoggedIn, userData]);

  return (
    <Sheet>
      <SheetTrigger className="group -m-2 flex items-center p-2">
        <ShoppingCart
          aria-hidden="true"
          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {isMounted ? itemCount : 0}
        </span>
      </SheetTrigger>

      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Carrinho ({itemCount})</SheetTitle>
        </SheetHeader>

        {itemCount > 0 ? (
          <>
            <div className="flex w-full flex-col pr-6">
              <ul>
                {state.items.map((item) => (
                  <li key={item.product_id} className="flex justify-between">
                    {item.name} - ${item.price} x {item.quantity}
                    <Button
                      variant="link"
                      size="icon"
                      className="h-6 w-8"
                      onClick={() => removeFromCart(item)}
                    >
                      <Trash2Icon className="h-4 w-4 text-red-700" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(state.totalAmount)}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    href="/cart"
                    className={buttonVariants({
                      className: "w-full",
                    })}
                  >
                    Continue com o pagamento
                  </Link>
                </SheetTrigger>
              </SheetFooter>

              <Button
                variant="link"
                size="icon"
                onClick={() => dispatch({ type: "CLEAR_CART" })}
                className="w-full content-center text-gray-600 text-xs"
              >
                Limpar carrinho
              </Button>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <div
              aria-hidden="true"
              className="relative mb-4 h-60 w-60 text-muted-foreground"
            >
              <Image
                src="/hippo-empty-cart.png"
                fill
                alt="empty shopping cart hippo"
              />
            </div>
            <div className="text-xl font-semibold">Seu carrinho está vazio</div>
            <SheetTrigger asChild>
              <Link
                href="/products"
                className={buttonVariants({
                  variant: "link",
                  size: "sm",
                  className: "text-sm text-muted-foreground",
                })}
              >
                Adicione itens para realizar o pagamento
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default Cart;
