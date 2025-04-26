
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
      
      <Accordion type="single" collapsible className="max-w-2xl mx-auto">
        <AccordionItem value="item-1">
          <AccordionTrigger>Como desenhar no NeextGartic?</AccordionTrigger>
          <AccordionContent>
            Use o mouse ou toque na tela para desenhar. Escolha diferentes pincéis, cores e fundos 
            para criar seu desenho. Você pode escolher entre lápis, spray, marcador e outros tipos
            de pincéis para melhorar sua arte.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>Como enviar meu desenho?</AccordionTrigger>
          <AccordionContent>
            Após terminar seu desenho, preencha seu nome e o nome do desenho nos campos indicados 
            abaixo da tela de desenho. Clique no botão "Enviar Desenho" para salvar sua criação. 
            O desenho será armazenado online e registrado no sistema.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger>Posso apagar ou corrigir meu desenho?</AccordionTrigger>
          <AccordionContent>
            Sim! Você pode usar a ferramenta borracha para corrigir partes específicas do seu desenho, 
            ou clicar no botão "Limpar Lousa" para apagar completamente e começar de novo.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger>Posso trocar o fundo do meu desenho?</AccordionTrigger>
          <AccordionContent>
            Sim! O NeextGartic permite escolher entre vários fundos para seu desenho. 
            Você pode optar por um fundo branco tradicional, ou escolher outras cores e padrões 
            disponíveis na barra de opções.
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger>O que acontece após enviar meu desenho?</AccordionTrigger>
          <AccordionContent>
            Seu desenho será enviado para nossos servidores e ficará registrado em nossa base de dados. 
            A imagem é hospedada online e as informações são registradas em uma planilha para futuras 
            referências.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQ;
