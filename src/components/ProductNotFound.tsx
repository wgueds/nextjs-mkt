import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const ProductNotFound = () => {
  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <div className="relative mb-4 h-60 w-60 text-muted-foreground">
            <Image src="/hippo-sad.png" fill alt="hippo email sent image" />
          </div>

          <h3 className="font-semibold text-2xl py-8">
            Produto não encontrado
          </h3>

          <Link href="/" className={buttonVariants()}>
            Buscar outros produtos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductNotFound;
