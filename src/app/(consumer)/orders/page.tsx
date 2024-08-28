"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";
import NavUser from "@/components/NavUser";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrders } from "@/services/SaleServices";
import { Sale } from "@/interfaces/Sale";
import { View, Loader2 } from "lucide-react";
import RequireAuth from "@/components/RequireAuth";

const BREADCRUMBS = [
  { id: 1, name: "Home", href: "/" },
  { id: 2, name: "Pedidos", href: "/orders" },
];

const Page = () => {
  const [orders, setOrders] = useState<Sale[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const perPage = 10;

  const searchParams = useSearchParams();
  let sort = searchParams.get("sort");

  if (!sort) sort = "completed";

  useEffect(() => {
    const fetchOrders = async () => {
      setOrders([]);
      setIsLoading(true);

      const response = await getOrders(currentPage, perPage, sort);
      const { data } = response;

      if (Array.isArray(data.data)) {
        setOrders(data.data);
      }

      console.log(data);

      setTotalPages(data.last_page || 1);
      setIsLoading(false);
    };

    fetchOrders();
  }, [currentPage, sort]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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

              <div className="py-4">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  Meus pedidos
                </h1>
              </div>

              <section className="py-4">
                <Table>
                  {orders.length === 0 && (
                    <TableCaption>
                      {isLoading ? (
                        <Loader2 className="animate-spin h-5 w-5 text-zinc-300" />
                      ) : (
                        <>Nenhum item encontrado</>
                      )}
                    </TableCaption>
                  )}
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Identificador</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead className="text-right">
                        Data de Criação
                      </TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order) => (
                      <TableRow key={order.identifier}>
                        <TableCell className="font-medium">
                          {order.identifier}
                        </TableCell>
                        <TableCell>{order.status}</TableCell>
                        <TableCell>
                          {order.coin} {order.total}
                        </TableCell>
                        <TableCell className="text-right">
                          {order.created_at}
                        </TableCell>
                        <TableCell>
                          <Link href={`/orders/${order.identifier}`}>
                            <View className="h-4 w-4 cursor-pointer" />
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Anterior
                  </button>
                  <span>
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Próximo
                  </button>
                </div>
              </section>
            </div>
          </section>
        </MaxWidthWrapper>
      </RequireAuth>
    </>
  );
};

export default Page;
