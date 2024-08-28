"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

const NavUser = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Meus dados</AccordionTrigger>
        <AccordionContent>Perfil</AccordionContent>
        <AccordionContent>Segurança</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Meus pedidos</AccordionTrigger>
        <AccordionContent>
          <Link
            href="/orders?sort=completed"
            className="mt-6 block font-medium text-gray-900"
          >
            Concluídos
          </Link>
        </AccordionContent>
        <AccordionContent>
          <Link
            href="/orders?sort=pendding"
            className="mt-6 block font-medium text-gray-900"
          >
            Pendentes
          </Link>
        </AccordionContent>
        <AccordionContent>
          <Link
            href="/orders?sort=canceled"
            className="mt-6 block font-medium text-gray-900"
          >
            Cancelados
          </Link>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Minha loja</AccordionTrigger>
        <AccordionContent>Dashboard</AccordionContent>
        <AccordionContent>Meus produtos</AccordionContent>
        <AccordionContent>Gerenciar produtos</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default NavUser;
