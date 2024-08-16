"use client";

import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
} from "react";
import { CartState } from "../interfaces/Cart";
import { ProductDetail } from "@/interfaces/Products";
import { useAuth } from "@/contexts/AuthContext"; // Import the authentication context

type CartAction =
  | { type: "ADD_TO_CART"; payload: ProductDetail }
  | { type: "REMOVE_FROM_CART"; payload: ProductDetail }
  | { type: "CLEAR_CART" };

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

// Helper function to get the initial state from localStorage
const getInitialState = (userId: string | null): CartState => {
  if (typeof window !== "undefined" && userId) {
    const storedCart = localStorage.getItem(`cart_${userId}`);
    if (storedCart) {
      return JSON.parse(storedCart);
    }
  }
  return initialState;
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingCartItemIndex = state.items.findIndex(
        (item) => item.product_id === action.payload.product_id
      );
      const existingCartItem = state.items[existingCartItemIndex];

      let updatedItems;
      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        updatedItems = state.items.concat({ ...action.payload, quantity: 1 });
      }

      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.payload.sale_price,
      };

    case "REMOVE_FROM_CART":
      const filteredItems = state.items.filter(
        (item) => item.product_id !== action.payload.product_id
      );

      return {
        items: filteredItems,
        totalAmount: state.totalAmount - action.payload.sale_price,
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
};

interface CartContextProps {
  state: CartState;
  dispatch: Dispatch<CartAction>;
}

export const CartContext = createContext<CartContextProps>({
  state: initialState,
  dispatch: () => null,
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { userData } = useAuth(); // Get the logged-in user data
  const userId = userData ? userData.id : null; // Extract the user ID

  const [state, dispatch] = useReducer(
    cartReducer,
    getInitialState(userId) // Pass the user ID to get the initial state
  );

  // Synchronize the cart state with localStorage
  useEffect(() => {
    if (userId) {
      localStorage.setItem(`cart_${userId}`, JSON.stringify(state));
    }
  }, [state, userId]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
