"use client";

import Image from "next/image";
import { Button, buttonVariants } from "@/components/ui/button";
import { useRef, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { resendCodeValidate, sendCodeValidate } from "@/services/userService";
import { useRouter } from "next/navigation";

interface PageProps {
  params: {
    token: string;
  };
}

const Page = ({ params }: PageProps) => {
  const { token } = params;

  const [digits, setDigits] = useState(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const codeSchema = z
    .string()
    .regex(/^\d{6}$/, "O código deve conter exatamente 6 dígitos numéricos.");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const code = digits.join("");

    try {
      codeSchema.parse(code);

      sendCodeValidate({ code, hash: token }).then((response) => {
        setIsLoading(false);

        if (response.success) {
          toast.success("Código validado com sucesso!");

          router.push("/sign-in");
          return;
        }

        if (response.message) toast.error(response.message);
      });
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu algum erro ao enviar o formulário.");
    }
  };

  const handleResend = () => {
    setIsLoading(true);

    try {
      resendCodeValidate({ hash: token }).then((response) => {
        setIsLoading(false);

        if (response.success) {
          toast.info("Código reenviado para o e-mail.");

          return;
        }

        if (response.message) toast.error(response.message);
      });
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu algum erro ao enviar o formulário.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      // Ensure only digits are entered
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      // Automatically focus the next input if a digit was entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData("text");
    if (/^\d{6}$/.test(paste)) {
      const newDigits = paste.split("");
      setDigits(newDigits);
      inputRefs.current[5]?.focus();
    }
    e.preventDefault();
  };

  return (
    <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex h-full flex-col items-center justify-center space-y-1">
          <div className="relative mb-4 h-60 w-60 text-muted-foreground">
            <Image
              src="/hippo-email-sent.png"
              fill
              alt="hippo email sent image"
            />
          </div>

          <h3 className="font-semibold text-2xl">Validação de segurança</h3>
          <p className="text-muted-foreground text-center">
            Copiar e colar o código que foi enviado para seu e-mail.
          </p>

          <div className="flex flex-col gap-5 w-full">
            <form
              className="flex flex-col items-center space-y-4 p-4"
              onSubmit={handleSubmit}
            >
              <div className="flex space-x-2">
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    className="w-10 h-10 rounded-md border border-gray-300 text-center text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onPaste={handlePaste}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                ))}
              </div>

              <Button disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Por favor aguarde.
                  </>
                ) : (
                  "Validar"
                )}
              </Button>
            </form>
          </div>

          <button
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
            onClick={handleResend}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Por favor aguarde.
              </>
            ) : (
              <>
                Reenviar código
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
