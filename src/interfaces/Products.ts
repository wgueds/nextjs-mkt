export interface ProductDetail {
  product_id: number;
  name: string;
  resume: string;
  description: string;
  price: number;
  sale_price: number;
  discount: number;
  quantity: number;
  type: string;
  features: { [key: string]: string };
  images: { highlight: number; url_image: string }[];
  categories: string[];
  saller: {
    name: string;
    email: string;
  };
}

export interface ProductList {
  product_id: number;
  name: string;
  resume: string;
  price: number;
  sale_price: number;
  discount: number;
  quantity: number;
  images: { highlight: number; url_image: string }[];
  categories: string[];
}
