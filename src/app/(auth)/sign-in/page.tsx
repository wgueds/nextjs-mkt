"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import {
  LoginCredentialsValidator,
  TLoginCredentialsValidator,
} from "@/lib/validators/login-credentials-validator";
import { toast } from "sonner";
import { useState } from "react";
import { loginUser } from "@/services/userService";
import { User } from "@/interfaces/User";
import { useAuth } from "@/contexts/AuthContext";

const Page = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isSeller = searchParams.get("as") === "seller";
  const origin = searchParams.get("origin");
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const { login, logout } = useAuth();
  const continueAsSeller = () => {
    router.push("?as=seller");
  };

  const continueAsBuyer = () => {
    router.replace("/sign-in", undefined);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginCredentialsValidator>({
    resolver: zodResolver(LoginCredentialsValidator),
  });

  const onSubmit = async ({ email, password }: TLoginCredentialsValidator) => {
    setIsLoading(true);

    try {
      setIsLoading(false);

      const response = await loginUser({ email, password });

      if (!response.success) {
        toast.error(response.message);
        logout();
        return;
      }

      const { user } = response;
      setUserData(user);
      login(user);

      toast.success(`Bem vindo ${user.name}`);

      if (origin) {
        router.push(`/${origin}`);
        return;
      }

      router.push("/");
    } catch (error) {
      toast.error("Ocorreu algum erro ao enviar o formulário.");
    }
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Entrar na sua conta {isSeller ? "de vendedor" : ""}
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-up"
            >
              Não tem uma conta?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
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
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Entrar
                </Button>
              </div>
            </form>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  ou
                </span>
              </div>
            </div>

            {isSeller ? (
              <Button
                onClick={continueAsBuyer}
                variant="secondary"
                disabled={isLoading}
              >
                Continue como consumidor
              </Button>
            ) : (
              <Button
                onClick={continueAsSeller}
                variant="secondary"
                disabled={isLoading}
              >
                Continue como vendedor
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
