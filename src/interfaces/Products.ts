export interface ProductDetail {
  product_id: number;
  name: string;
  resume: string;
  description: string;
  price: string;
  sale_price: string;
  discount: string;
  quantity: string;
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
  price: string;
  sale_price: string;
  discount: string;
  quantity: string;
  images: { highlight: number; url_image: string }[];
  categories: string[];
}
