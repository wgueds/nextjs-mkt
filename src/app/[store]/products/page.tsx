import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import ProductCarousel from "@/components/ProductCarousel";
import ProductReel from "@/components/ProductReel";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Products from "@/data/products";
import ImageSlider from "@/components/ImageSlider";

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
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                  Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Is it styled?</AccordionTrigger>
                <AccordionContent>
                  Yes. It comes with default styles that matches the other
                  components&apos; aesthetic.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is it animated?</AccordionTrigger>
                <AccordionContent>
                  Yes. It's animated by default, but you can disable it if you
                  prefer.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="grow -mt-10">
            <ProductReel href="/products?sort=recent" title="Mais vendidos" />

            <div className="flex flex-row gap-4">
              {Products.map((product, i) => (
                <div className="w-40 h-40 relative" key={product.id}>
                  <Image
                    fill
                    loading="eager"
                    className="-z-10 w-40 h-40 object-cover object-center rounded-xl"
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
