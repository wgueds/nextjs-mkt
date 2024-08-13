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
// import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import Image from "next/image";
import { useCart } from "@/hooks/useCart";
import { CartItem } from "@/interfaces/Cart";
// import { ScrollArea } from "./ui/scroll-area";
// import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";

const Cart = () => {
  //   const { items } = useCart();
  const itemCount = 1;
  const fee = 1;
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const { state, dispatch } = useCart();

  const removeFromCart = (item: CartItem) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: item });
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  //   const cartTotal = items.reduce(
  //     (total, { product }) => total + product.price,
  //     0
  //   );

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
                  <li key={item.id}>
                    {item.name} - ${item.price} x {item.quantity}
                    <button onClick={() => removeFromCart(item)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <h3>Total: ${state.totalAmount.toFixed(2)}</h3>
                <button onClick={() => dispatch({ type: "CLEAR_CART" })}>
                  Clear Cart
                </button>

                <div className="flex">
                  <span className="flex-1">Entrega</span>
                  <span>Grátis</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Frete</span>
                  <span>{formatPrice(fee)}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(fee)}</span>
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
            <div className="text-xl font-semibold">Seu carrinho esta vazio</div>
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
