import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCarousel from "@/components/ProductCarousel";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  params: {
    token: string;
  };
}

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

const Page = ({ params }: PageProps) => {
  return (
    <>
      <MaxWidthWrapper>
        {/* <ProductCarousel images={products} /> */}
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Lorem ipsum dolor sit amet{" "}
            <span className="text-blue-600">adipiscing elit</span>.
          </h1>
          <p className="mt-6 text-lg max-w-prose text-muted-foreground">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link href="/products" className={buttonVariants()}>
              Excepteur sint
            </Link>
            <Button variant="ghost">Duis aute irure dolor &rarr;</Button>
          </div>
        </div>

        <ProductReel href="/products?sort=recent" title="Mais vendidos" />
        <ProductReel href="/products?sort=recent" title="Promoções" />
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
