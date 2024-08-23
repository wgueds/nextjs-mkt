export interface Sale {
  identifier: string;
  payment_method: string;
  coin: string;
  total: string;
  status: string;
  created_at: string;
  payment: {
    qr_code: string | null;
    url_payment: string | null;
  };
  items: Array<{
    id: number;
    sale_id: number;
    users_has_product_id: number;
    unity_price: string;
    discount: string;
    quantity: string;
    created_at: string;
    updated_at: string;
  }>;
}
