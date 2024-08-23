"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        <AccordionContent>Pendentes</AccordionContent>
        <AccordionContent>Concluídos</AccordionContent>
        <AccordionContent>Cancelados</AccordionContent>
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
