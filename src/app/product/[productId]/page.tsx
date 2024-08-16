"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import ImageSlider from "@/components/ImageSlider";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Button, buttonVariants } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import { formatPrice } from "@/lib/utils";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";
import { getProduct } from "@/services/ProductsService";
import { ProductDetail } from "@/interfaces/Products";
import { Skeleton } from "@/components/ui/skeleton";
import ProductNotFound from "@/components/ProductNotFound";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface PageProps {
  params: {
    productId: string;
    item: ProductDetail;
  };
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
];

const Page = ({ params }: PageProps) => {
  const { productId, item } = params;
  const { dispatch } = useCart();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(parseInt(productId));

        setProduct(response?.data || null);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <MaxWidthWrapper className="bg-white">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <div className="lg:max-w-lg lg:self-end">
              <Skeleton className="h-8 w-3/4 mb-4" />

              <section className="mt-4">
                <Skeleton className="h-6 w-1/4 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-5/6" />
              </section>
            </div>

            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <Skeleton className="aspect-square rounded-lg" />
            </div>

            <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    );

  if (!product) return <ProductNotFound />;

  const label = PRODUCT_CATEGORIES.find(
    ({ value }) => value === product.categories[0] // Assuming categories array is used for label lookup
  )?.label;

  const validUrls = product.images.map((image) => image.url_image);

  const addToCart = (product: ProductDetail) => {
    if (!isLoggedIn) {
      router.push("/sign-in");
      return;
    }

    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <MaxWidthWrapper className="bg-white">
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:max-w-lg lg:self-end">
            <ol className="flex items-center space-x-2">
              {BREADCRUMBS.map((breadcrumb, i) => (
                <li key={breadcrumb.href}>
                  <div className="flex items-center text-sm">
                    <Link
                      href={breadcrumb.href}
                      className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </Link>
                    {i !== BREADCRUMBS.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>

            <div className="py-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                {product.name}
              </h1>
            </div>

            <section className="py-4">
              <div className="flex items-center">
                <p className="font-medium text-gray-900">
                  {formatPrice(product.price)}
                </p>

                <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                  {label}
                </div>
              </div>

              <div className="mt-4 space-y-6">
                <p className="text-base text-muted-foreground">
                  {product.description}
                </p>
              </div>
            </section>

            <section className="py-4">
              <h1 className="text-xl font-bold text-gray-900 sm:text-xl">
                Caracteristicas
              </h1>

              {product.features && product.features.length > 0 ? (
                <Table>
                  <TableCaption>Caracteristicas do produto.</TableCaption>
                  <TableBody>
                    {product.features.map((feature, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {feature.key}
                        </TableCell>
                        <TableCell>{feature.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-xs text-muted-foreground italic">
                  Este produto não possui características adicionais.
                </p>
              )}
            </section>
          </div>

          <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
            <div className="aspect-square rounded-lg">
              <ImageSlider urls={validUrls} />
            </div>
          </div>

          <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
            <div>
              <div className="mt-10">
                <Button
                  onClick={() => addToCart(product)}
                  className={buttonVariants()}
                >
                  Adicionar ao carrinho &rarr;
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Page;
