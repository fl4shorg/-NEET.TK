
import React from 'react';
import Navbar from '@/components/Navbar';
import DrawingCanvas from '@/components/DrawingCanvas';
import FAQ from '@/components/FAQ';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-purple-400 to-purple-600">
              NeextGartic - Desenhe e Compartilhe
            </h1>
            <p className="text-xl text-muted-foreground">
              Crie desenhos incríveis com nossa variedade de ferramentas e envie para nosso servidor!
            </p>
          </div>
        </div>
        
        <DrawingCanvas />
        
        <FAQ />
      </main>
      
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NeextGartic. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
