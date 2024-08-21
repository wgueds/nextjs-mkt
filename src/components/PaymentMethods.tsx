import { useEffect, useState } from "react";
import { getPaymentMethods } from "@/services/PaymentMethodsService";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Label,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState<Record<string, any>>({});
  const [selectedCrypto, setSelectedCrypto] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const years = generateYears();

  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await getPaymentMethods();

        console.log(response);

        if (response.success) {
          setPaymentMethods(response.data);
        }
      } catch (error) {
        console.log(error);
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPaymentMethods();
  }, [paymentMethods]);

  return (
    <>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Tabs className="w-[400px]">
          <TabsList>
            {Object.keys(paymentMethods).map((method) => (
              <TabsTrigger key={method} value={method}>
                {paymentMethods[method][0].name}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(paymentMethods).map(([method, details]) => (
            <TabsContent key={method} value={method} className="mt-4">
              {method === "credit-card" && (
                <div className="w-full flex flex-col gap-4">
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Nome</Label>
                    <Input type="text" id="cc_name" placeholder="Nome" />
                  </div>
                  <div className="grid w-full max-w-sm items-center gap-1.5">
                    <Label htmlFor="email">Número</Label>
                    <Input type="text" id="cc_number" placeholder="Número" />
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
                            <SelectItem key={year} value={year.toString()}>
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
                            <SelectItem key={month.value} value={month.value}>
                              {month.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                      <Label htmlFor="email">CVC</Label>
                      <Input type="text" id="cc_cvc" placeholder="CVC" />
                    </div>
                  </div>
                </div>
              )}

              {method === "pix" && (
                <p className="text-xs text-muted-foreground italic">
                  * Um QR code será criado com o código do pagamento.
                </p>
              )}

              {method === "cryptocurrency" && (
                <>
                  <p className="text-xs text-muted-foreground italic pb-5">
                    * Selecione uma criptomoeda
                  </p>
                  <RadioGroup
                    name="payment-method-crypto"
                    value={selectedCrypto}
                    onValueChange={(value) => setSelectedCrypto(value)}
                  >
                    {details.map((crypto: any) => (
                      <div
                        key={crypto.hash}
                        className="flex items-center space-x-2"
                      >
                        <RadioGroupItem
                          value={crypto.coin}
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
            </TabsContent>
          ))}
        </Tabs>
      )}
    </>
  );
};

export default PaymentMethods;
