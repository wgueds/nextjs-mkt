"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AuthCredentialsValidator,
  TAuthCredentialsValidator,
} from "@/lib/validators/account-credentials-validator";
import { useRouter } from "next/navigation";
import { createUser } from "@/services/userService";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "sonner";
import { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAuthCredentialsValidator>({
    resolver: zodResolver(AuthCredentialsValidator),
  });

  const onSubmit = async (data: TAuthCredentialsValidator) => {
    setIsLoading(true);

    try {
      const response = createUser(data).then((response) => {
        setIsLoading(false);

        if (response.success) {
          toast.success("Registro realizado com sucesso!");
          toast.success(`Verification email sent to ${data.email}.`);
          router.push("/verify-email?to=" + data.email);
          return;
        }

        throw new Error(response.message);
      });
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu algum erro ao enviar o formulário.");
    }
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-bold">
              Criar uma conta {isLoading ? "true" : "false"}
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
              })}
              href="/sign-in"
            >
              Já tenho uma conta? Entrar <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">Nome</Label>
                  <Input
                    {...register("name")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.name,
                    })}
                    placeholder="Seu nome"
                  />
                  {errors?.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Senha"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-1 py-2">
                  <Label htmlFor="password">Confirme a senha</Label>
                  <Input
                    {...register("password_confirmation")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500":
                        errors.password_confirmation,
                    })}
                    placeholder="Senha"
                  />
                  {errors?.password_confirmation && (
                    <p className="text-sm text-red-500">
                      {errors.password_confirmation.message}
                    </p>
                  )}
                </div>

                <Button disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Por favor aguarde.
                    </>
                  ) : (
                    "Registrar"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
