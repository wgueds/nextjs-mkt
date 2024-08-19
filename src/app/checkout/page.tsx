"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Form, FormField } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/hooks/useCart";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils";

interface PageProps {
  params: {
    token: string;
  };
}

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Products", href: "/products" },
  { id: 3, name: "Checkout", href: "/checkout" },
];

const generateYears = () => {
  const currentYear = new Date().getFullYear();
  return Array.from({ length: 8 }, (_, index) => currentYear + index);
};

const months = [
  { value: "01", label: "Janeiro" },
  { value: "02", label: "Fevereiro" },
  { value: "03", label: "Março" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Maio" },
  { value: "06", label: "Junho" },
  { value: "07", label: "Julho" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Setembro" },
  { value: "10", label: "Outubro" },
  { value: "11", label: "Novembro" },
  { value: "12", label: "Dezembro" },
];

const formSchema = z.object({
  paymentMethod: z.enum(["pix", "cc", "cripto"]),
});

const Page = ({ params }: PageProps) => {
  const { isLoggedIn } = useAuth();
  const { state, dispatch } = useCart();
  const router = useRouter();
  const [selectedCrypto, setSelectedCrypto] = useState<string>("option-one");
  const years = generateYears();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/sign-in");
    }
  }, [isLoggedIn, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "pix",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <>
      <MaxWidthWrapper>
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
                  Checkout
                </h1>
              </div>

              <section className="py-4">
                <div className="mt-4 space-y-6">
                  <Table>
                    <TableCaption>Listagem de produtos.</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Imagem</TableHead>
                        <TableHead className="w-[200px]">Produto</TableHead>
                        <TableHead>Quantidade</TableHead>
                        <TableHead className="text-right">
                          Preço Unitário
                        </TableHead>
                        <TableHead className="text-right">Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {state.items.map((item) => (
                        <TableRow key={item.product_id}>
                          <TableCell>
                            {/* Exibe a primeira imagem do produto */}
                            {item.images.length > 0 && (
                              <img
                                src={item.images[0].url_image}
                                alt={item.name}
                                className="w-16 h-16 object-cover"
                              />
                            )}
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.name}
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell className="text-right">
                            R$ {item.price.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="space-y-4 pr-6">
                  <div className="space-y-1.5 text-sm">
                    <div className="flex">
                      <span className="flex-1">Total</span>
                      <span>{formatPrice(state.totalAmount)}</span>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
              <Card>
                <CardHeader>
                  <CardTitle>Método de pagamento</CardTitle>
                  <CardDescription>
                    Selecione o método de pagamento para finalizar o pedido
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="paymentMethod"
                        render={({ field }) => (
                          <Tabs
                            value={field.value} // Garante que o valor do campo é controlado pelo Tabs
                            onValueChange={(value) => field.onChange(value)}
                            className="w-[400px]"
                          >
                            <TabsList>
                              <TabsTrigger value="pix">PIX</TabsTrigger>
                              <TabsTrigger value="cc">
                                Cartão de crédito
                              </TabsTrigger>
                              <TabsTrigger value="cripto">
                                Criptomoedas
                              </TabsTrigger>
                            </TabsList>

                            <TabsContent value="pix" className="mt-4">
                              <p className="text-xs text-muted-foreground italic">
                                * Um QR code será criado com o código do
                                pagamento
                              </p>
                            </TabsContent>
                            <TabsContent value="cc" className="mt-4">
                              <div className="w-full flex flex-col gap-4">
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                  <Label htmlFor="email">Nome</Label>
                                  <Input
                                    type="text"
                                    id="cc_name"
                                    placeholder="Nome"
                                  />
                                </div>
                                <div className="grid w-full max-w-sm items-center gap-1.5">
                                  <Label htmlFor="email">Número</Label>
                                  <Input
                                    type="text"
                                    id="cc_number"
                                    placeholder="Número"
                                  />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 py-2">
                                  <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="email">Ano</Label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Ano" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {years.map((year) => (
                                          <SelectItem
                                            key={year}
                                            value={year.toString()}
                                          >
                                            {year}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="email">Mês</Label>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder="Mês" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {months.map((month) => (
                                          <SelectItem
                                            key={month.value}
                                            value={month.value}
                                          >
                                            {month.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="grid w-full max-w-sm items-center gap-1.5">
                                    <Label htmlFor="email">CVC</Label>
                                    <Input
                                      type="text"
                                      id="cc_cvc"
                                      placeholder="CVC"
                                    />
                                  </div>
                                </div>
                              </div>
                            </TabsContent>
                            <TabsContent value="cripto" className="mt-4">
                              <p className="text-xs text-muted-foreground italic pb-5">
                                * Selecione uma criptomoeda
                              </p>
                              <RadioGroup
                                name="payment-method-crypto"
                                value={selectedCrypto}
                                onValueChange={(value) =>
                                  setSelectedCrypto(value)
                                }
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="USDT"
                                    id="payment-method-crypto-usdt"
                                  />
                                  <Label htmlFor="payment-method-crypto-usdt">
                                    USDT
                                  </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem
                                    value="BNB"
                                    id="payment-method-crypto-bnb"
                                  />
                                  <Label htmlFor="payment-method-crypto-bnb">
                                    BNB
                                  </Label>
                                </div>
                              </RadioGroup>
                            </TabsContent>
                          </Tabs>
                        )}
                      />
                      <Button type="submit" className={buttonVariants()}>
                        Finalizar pedido
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
