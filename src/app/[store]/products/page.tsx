import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCarousel from "@/components/ProductCarousel";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import Products from "@/data/products";
import ImageSlider from "@/components/ImageSlider";
import NavCategories from "@/components/NavCategories";

interface PageProps {
  params: {
    token: string;
  };
}

// const validUrls = Products.flatMap((product) =>
//   product.images.map((image) => image.url)
// );

const Page = ({ params }: PageProps) => {
  return (
    <>
      <MaxWidthWrapper>
        {/* <ProductCarousel images={products} /> */}
        <section className="flex flex-col md:flex-row gap-12 mt-8">
          <div className="w-full md:w-2/5">
            <NavCategories />
          </div>
          <div className="grow -mt-10">
            <ProductReel href="/products?sort=recent" title="Mais vendidos" />

            <div className="flex flex-row gap-4">
              {Products.map((product) => (
                <div
                  className="w-40 h-40 relative overflow-hidden rounded-xl"
                  key={product.id}
                >
                  <Image
                    fill
                    loading="eager"
                    className="transition-transform duration-300 ease-in-out transform hover:scale-110 object-cover object-center"
                    src={product.image_url}
                    alt={product.name}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
