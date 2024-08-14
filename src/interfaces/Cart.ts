// export interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

import { ProductDetail } from "@/interfaces/Products";

export interface CartState {
  items: ProductDetail[];
  totalAmount: number;
}
