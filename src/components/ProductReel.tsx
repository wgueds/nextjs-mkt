"use client";

import Link from "next/link";
import ProductListing from "@/components/ProductListing";

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
}

const FALLBACK_LIMIT = 4;

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href } = props;

  //   const {
  //     data: queryResults,
  //     isLoading,
  //   } = trpc.getInfiniteProducts.useInfiniteQuery(
  //     {
  //       limit: query.limit ?? FALLBACK_LIMIT,
  //       query,
  //     },
  //     {
  //       getNextPageParam: (lastPage) => lastPage.nextPage,
  //     }
  //   );

  //   const products = queryResults?.pages.flatMap((page) => page.items);

  const isLoading = false;
  const products = [
    {
      id: 1,
      category: "Templates",
      name: "Product 001",
      subtitle: "Loren ipsun",
      href: "/loren",
      price: 99,
      images: [
        {
          url:
            "http://192.168.1.101:5500/storage/products/01J21Y1H1KDT48E9JWEYQ7SGGH.jpg",
        },
        {
          url:
            "http://192.168.1.101:5500/storage/products/01J29TE228F3Z4JND9MXNEF7PF.png",
        },
      ],
    },
    {
      id: 2,
      category: "Templates",
      name: "Product 002",
      subtitle: "Loren ipsun",
      href: "/loren",
      price: 99,
      images: [
        {
          url:
            "http://192.168.1.101:5500/storage/products/01J21Y1H1KDT48E9JWEYQ7SGGH.jpg",
        },
        {
          url:
            "http://192.168.1.101:5500/storage/products/01J21ZDFS7M80PDSQHRS6E5TVR.png",
        },
      ],
    },
    {
      id: 3,
      category: "Templates",
      name: "Product 003",
      subtitle: "Loren ipsun",
      href: "/loren",
      price: 99,
      images: [
        {
          url:
            "http://192.168.1.101:5500/storage/products/01J21Y1H1KDT48E9JWEYQ7SGGH.jpg",
        },
        {
          url:
            "http://192.168.1.101:5500/storage/products/01J29TE228F3Z4JND9MXNEF7PF.png",
        },
      ],
    },
    {
      id: 4,
      category: "Templates",
      name: "Product 004",
      subtitle: "Loren ipsun",
      href: "/loren",
      price: 99,
      images: [
        {
          url:
            "http://192.168.1.101:5500/storage/products/01J29TE228F3Z4JND9MXNEF7PF.png",
        },
        {
          url:
            "http://192.168.1.101:5500/storage/products/01J21Y1H1KDT48E9JWEYQ7SGGH.jpg",
        },
      ],
    },
  ];

  //   let map: (Product | null)[] = [];

  //   if (products && products.length) {
  //     map = products;
  //   } else if (isLoading) {
  //     map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  //   }

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

        {href ? (
          <Link
            href={href}
            className="hidden text-sm font-medium text-blue-600 hover:text-blue-500 md:block"
          >
            Shop the collection <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : null}
      </div>

      <div className="relative">
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
      </div>
    </section>
  );
};

export default ProductReel;
