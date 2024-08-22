"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
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
import { sendPayment } from "@/services/SaleServices";
import PaymentMethods from "@/components/PaymentMethods";
import { getPaymentMethods } from "@/services/PaymentMethodsService";
import QRCodeGenerate from "@/components/QRCodeGenerate";

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
  paymentMethod: z.enum(["pix", "credit-card", "cryptocurrency"]),
});

const Page = ({ params }: PageProps) => {
  const { isLoggedIn, userToken } = useAuth();
  const { state, dispatch } = useCart();
  const router = useRouter();
  const years = generateYears();
  const [paymentMethods, setPaymentMethods] = useState<Record<string, any>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [qrcode, setQrcode] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("USDT");
  const [selectedMethod, setSelectedMethod] = useState<string>("pix");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      paymentMethod: "pix",
    },
  });

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/sign-in");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await getPaymentMethods();

        if (response.success) {
          setPaymentMethods(response.data);
        }
      } catch (error) {
        console.log(error);
        // console.error("Failed to fetch products:", error);
        // toast.error("Failed to fetch products:);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, []);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSending(true);
    const { paymentMethod } = values;

    let _paymentMethod = paymentMethods[selectedMethod]?.[0];
    let _hash = null;
    let _coin = null;

    if (_paymentMethod) {
      _hash = _paymentMethod.hash;
      _coin = _paymentMethod.coin;

      if (_paymentMethod.slug === "cryptocurrency") {
        _hash = selectedCrypto.hash;
        _coin = selectedCrypto.coin;
      }
    }

    let paymentDetails = {};

    // prepare payment data
    switch (paymentMethod) {
      case "credit-card":
        const cardData = {
          name: (document.getElementById("cc_name") as HTMLInputElement).value,
          number: (document.getElementById("cc_number") as HTMLInputElement)
            .value,
          year: years[0],
          month: months[0].value,
          cvc: (document.getElementById("cc_cvc") as HTMLInputElement).value,
        };
        paymentDetails = {
          method: "credit_card",
          method_hash: _hash,
          method_coin: _coin,
          details: cardData,
        };
        break;

      case "cryptocurrency":
        paymentDetails = {
          method: "cryptocurrency",
          method_hash: _hash,
          method_coin: _coin,
          details: selectedCrypto,
        };
        break;

      default:
        paymentDetails = {
          method: "pix",
          method_hash: _hash,
          method_coin: _coin,
        };
        break;
    }

    const payload = {
      items: state.items.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
      })),
      totalAmount: state.totalAmount,
      payment: paymentDetails,
    };

    try {
      const response = await sendPayment(payload, userToken);

      if (!response.success) {
        toast.error(response.message);
        return;
      }

      //   console.log(response);

      if (response.data.qrcode_string) {
        const query = new URLSearchParams({
          qrcode: response.data.qrcode_string,
        }).toString();
        router.push(`/checkout/result?${query}`);
      } else {
        router.push(`/checkout/result`);
      }

      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Erro ao finalizar a compra", error);
    } finally {
      setIsSending(false);
    }
  };

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
                          <>
                            {isLoading ? (
                              <div>Buscando formas de pagamento...</div>
                            ) : (
                              <Tabs
                                defaultValue={Object.keys(
                                  paymentMethods
                                )[0].toLowerCase()}
                                value={selectedMethod}
                                onValueChange={setSelectedMethod}
                                className="w-full"
                              >
                                <TabsList>
                                  {Object.keys(paymentMethods).map((method) => (
                                    <TabsTrigger key={method} value={method}>
                                      {paymentMethods[method][0].name}
                                    </TabsTrigger>
                                  ))}
                                </TabsList>

                                {Object.entries(paymentMethods).map(
                                  ([method, details]) => (
                                    <TabsContent
                                      key={method}
                                      value={method}
                                      className="mt-4"
                                    >
                                      {method === "credit-card" && (
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
                                            <Label htmlFor="email">
                                              Número
                                            </Label>
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
                                      )}

                                      {method === "pix" && (
                                        <>
                                          {qrcode ? (
                                            <QRCodeGenerate value={qrcode} />
                                          ) : (
                                            <p className="text-xs text-muted-foreground italic">
                                              * Um QR code será criado com o
                                              código do pagamento.
                                            </p>
                                          )}
                                        </>
                                      )}

                                      {method === "cryptocurrency" && (
                                        <>
                                          {qrcode ? (
                                            <QRCodeGenerate value={qrcode} />
                                          ) : (
                                            <>
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
                                                {details.map((crypto: any) => (
                                                  <div
                                                    key={crypto.hash}
                                                    className="flex items-center space-x-2"
                                                  >
                                                    <RadioGroupItem
                                                      value={crypto}
                                                      id={`payment-method-crypto-${crypto.coin.toLowerCase()}`}
                                                    />
                                                    <Label
                                                      htmlFor={`payment-method-crypto-${crypto.coin.toLowerCase()}`}
                                                    >
                                                      {crypto.coin}
                                                    </Label>
                                                  </div>
                                                ))}
                                              </RadioGroup>
                                            </>
                                          )}
                                        </>
                                      )}
                                    </TabsContent>
                                  )
                                )}
                              </Tabs>
                            )}
                          </>
                        )}
                      />

                      <div className="space-y-4 pr-6">
                        <div className="space-y-1.5 text-sm">
                          <div className="flex">
                            <span className="flex-1">Total</span>
                            <span>{formatPrice(state.totalAmount)}</span>
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className={buttonVariants()}
                        disabled={isSending}
                      >
                        {isSending && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
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
