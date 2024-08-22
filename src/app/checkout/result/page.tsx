// src/pages/checkout/result/page.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import QRCodeGenerate from "@/components/QRCodeGenerate";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qrcode = searchParams.get("qrcode");

  const handleBackToHome = () => {
    router.push("/");
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center items-center space-y-6 sm:w-1/2">
        <h1 className="font-semibold text-2xl">Obrigado pela compra</h1>

        {qrcode ? (
          <>
            <h3 className="text-gray-600">
              Escaneie o QRCode para completar o pagamento
            </h3>
            <QRCodeGenerate value={qrcode} />
          </>
        ) : (
          <>
            <h3 className="text-gray-600">Pedido finalizado com sucesso</h3>

            <div className="relative mb-4 h-60 w-60 text-muted-foreground">
              <Image
                src="/hippo-email-sent.png"
                fill
                alt="hippo email sent image"
              />
            </div>
          </>
        )}

        <Button onClick={handleBackToHome} className="mt-8">
          Continuar comprando
        </Button>
      </div>
    </div>

    // <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-white">
    //   {qrcode ? (
    //     <>
    //       <h1 className="text-2xl font-bold mb-4">
    //         Escaneie o QRCode para completar o pagamento
    //       </h1>
    //       <QRCodeGenerate value={qrcode} />
    //     </>
    //   ) : (
    //     <>
    //       <h1 className="text-2xl font-bold mb-4">{successMessage}</h1>
    //     </>
    //   )}

    // </div>
  );
};

export default Page;
