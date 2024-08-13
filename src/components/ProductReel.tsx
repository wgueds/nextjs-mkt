"use client";

import Link from "next/link";
import ProductListing from "@/components/ProductListing";
import { getProducts } from "@/services/ProductsService";
import { ProductList } from "@/interfaces/Products";
import { useEffect, useState } from "react";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  sort?: string;
}

const FALLBACK_LIMIT = 4;

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, sort } = props;
  const [products, setProducts] = useState<ProductList[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts(sort);

        if (response.success) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log(error);
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [sort]);

  return (
    <section className="py-12">
      <div className="md:flex md:items-center md:justify-between mb-4">
        <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
          {title ? (
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              {title}
            </h1>
          ) : null}
          {subtitle ? (
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>

        <Link
          href={`products&sort=${sort}`}
          className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
        >
          Veja mais <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>

      <div className="relative">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="mt-6 flex items-center w-full">
            <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-10 lg:gap-x-8">
              {products.map((product, i) => (
                <ProductListing
                  key={`product-${i}`}
                  product={product}
                  index={i}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductReel;
