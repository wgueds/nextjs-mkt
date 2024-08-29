"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import NavUser from "@/components/NavUser";
import { getOrder } from "@/services/SaleServices";
import { Sale } from "@/interfaces/Sale";
import Link from "next/link";
import { Loader2, LucideImage, Send } from "lucide-react";
import RequireAuth from "@/components/RequireAuth";
import QRCodeGenerate from "@/components/QRCodeGenerate";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Page = () => {
  const { identifier } = useParams();
  const router = useRouter();
  // const { identifier } = router.query;

  const [order, setOrder] = useState<Sale | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const BREADCRUMBS = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: "Pedidos", href: "/orders" },
    { id: 3, name: identifier, href: `/orders/${identifier}` },
  ];

  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!identifier) return;

      const response = await getOrder(identifier as string);

      console.log(response);

      if (response.success === false) {
        setErrorMessage(response.message);
        setIsLoading(false);
        return;
      }

      setOrder(response.data);
      setIsLoading(false);
    };

    fetchOrderDetails();
  }, [identifier]);

  if (isLoading) {
    return (
      <MaxWidthWrapper className="bg-white">
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
            <Loader2 className="animate-spin h-8 w-8 text-zinc-300" />
          </div>
        </div>
      </MaxWidthWrapper>
    );
  }

  // if (errorMessage) {
  //   return (
  //     <MaxWidthWrapper className="bg-white">
  //       <div className="bg-white">
  //         <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
  //           <p>{errorMessage}</p>
  //         </div>
  //       </div>
  //     </MaxWidthWrapper>
  //   );
  // }

  // if (!order) {
  //   return (
  //     <MaxWidthWrapper className="bg-white">
  //       <div className="bg-white">
  //         <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
  //           <p>Pedido não encontrado</p>
  //         </div>
  //       </div>
  //     </MaxWidthWrapper>
  //   );
  // }

  const formattedDate = format(
    new Date(order.created_at),
    "d 'de' MMMM 'de' yyyy",
    { locale: ptBR }
  );

  return (
    <>
      <RequireAuth>
        <MaxWidthWrapper>
          <section className="flex flex-col lg:flex-row gap-12 mt-8">
            <div className="w-full lg:w-60">
              <NavUser />
            </div>

            <div className="grow">
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

              {errorMessage ? (
                <>
                  <div className="container relative flex flex-col items-center justify-center lg:px-0">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                      <div className="flex h-full flex-col items-center justify-center space-y-1">
                        <h3 className="font-semibold text-2xl py-8">
                          {errorMessage}
                        </h3>
                        <div className="relative mb-4 h-60 w-60 text-muted-foreground">
                          <Image
                            src="/hippo-sad.png"
                            fill
                            alt="hippo email sent image"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="py-4">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                      Detalhes do pedido
                    </h1>
                    <p className="text-xs italic text-gray-400">
                      Pedido realizado em {formattedDate}
                    </p>
                  </div>

                  <section className="py-4">
                    <Card className="w-full">
                      <CardHeader>
                        <CardTitle>Informações</CardTitle>
                        <CardDescription>
                          Todas as informações do seu pedido esta abaixo
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm">
                          <Table>
                            <TableBody>
                              <TableRow>
                                <TableCell className="font-medium">
                                  Identificador
                                </TableCell>
                                <TableCell>{order.identifier}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  Status do pagamento
                                </TableCell>
                                <TableCell>{order.status}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  Método de pagamento
                                </TableCell>
                                <TableCell>{order.payment_method}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className="font-medium">
                                  Data da criação
                                </TableCell>
                                <TableCell>{order.created_at_string}</TableCell>
                              </TableRow>
                            </TableBody>
                            <TableFooter>
                              <TableRow>
                                <TableCell>Total</TableCell>
                                <TableCell className="text-right">
                                  {order.coin} {order.total}
                                </TableCell>
                              </TableRow>
                            </TableFooter>
                          </Table>
                        </div>
                      </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                      <Card className="">
                        <CardHeader>
                          <CardTitle>Dados do pagamento</CardTitle>
                          <CardDescription>
                            Escaneie o QRCode para completar o pagamento
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="">
                            {order.payment.qr_code &&
                            order.status_slug === "PENDDING" ? (
                              <>
                                <QRCodeGenerate value={order.payment.qr_code} />
                              </>
                            ) : (
                              <>
                                <h3 className="text-gray-600 font-bold">
                                  {order.status_slug === "DONE" ? (
                                    <>Pedido já finalizado</>
                                  ) : (
                                    <>Existe algum problema no seu pedido</>
                                  )}
                                </h3>
                              </>
                            )}
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="">
                        <CardHeader>
                          <CardTitle>Itens do pedido</CardTitle>
                          <CardDescription>
                            Deploy your new project in one-click.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead></TableHead>
                                <TableHead className="w-[100px]">
                                  Produto
                                </TableHead>
                                <TableHead>Quantidade</TableHead>
                                <TableHead className="text-right">
                                  Preço
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {order.items.map((item, index) => (
                                <TableRow key={index}>
                                  <TableCell>
                                    {order.status_slug === "DONE" ? (
                                      <Button variant="ghost">
                                        <Send className="text-blue-600 w-5 h-5" />
                                      </Button>
                                    ) : (
                                      <Avatar>
                                        <AvatarImage src={item.url_image} />
                                        <AvatarFallback>
                                          <LucideImage className="text-gray-400 w-5 h-5" />
                                        </AvatarFallback>
                                      </Avatar>
                                    )}
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {item.name}
                                  </TableCell>
                                  <TableCell>{item.quantity}</TableCell>
                                  <TableCell className="text-right">
                                    {item.sale_price}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </div>
                  </section>
                </>
              )}
            </div>
          </section>
        </MaxWidthWrapper>
      </RequireAuth>
    </>
  );
};

export default Page;
