
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mensagens Anônimas</title>
  <meta name="description" content="Leia as mensagens anônimas e salve-as quando quiser." />
  <meta name="author" content="Mensagens Anônimas" />
  
  <!-- Tailwind CDN para estilização -->
  <script src="https://cdn.tailwindcss.com"></script>
  
  <style>
    /* Animações e estilos personalizados */
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes slideUp {
      from { transform: translateY(10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideDown {
      from { transform: translateY(-10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes pulseSlight {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.8; }
    }
    
    .animate-fade-in {
      animation: fadeIn 0.4s ease-out;
    }
    
    .animate-slide-up {
      animation: slideUp 0.6s ease-out;
    }
    
    .animate-slide-down {
      animation: slideDown 0.6s ease-out;
    }
    
    .animate-pulse-subtle {
      animation: pulseSlight 2s ease-in-out infinite;
    }
    
    /* Estilo de mensagens e cartões */
    .message-card {
      background-color: white;
      border-radius: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      margin-bottom: 1rem;
      overflow: hidden;
    }
    
    .message-header {
      background-color: #a855f7; /* Cor primária (roxo) */
      color: white;
      padding: 1rem;
      font-weight: 500;
      text-align: center;
    }
    
    .message-content {
      padding: 1.5rem;
      text-align: center;
      font-size: 1.25rem;
      font-weight: 500;
    }
    
    .message-actions {
      display: flex;
      justify-content: center;
      gap: 1rem;
      padding: 1rem;
    }
    
    .action-button {
      width: 3rem;
      height: 3rem;
      border-radius: 9999px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s;
    }
    
    .info-button {
      background-color: #a855f7;
      color: white;
    }
    
    .share-button {
      background-color: #22c55e;
      color: white;
    }
    
    .arrow-button {
      background-color: #f3f4f6;
      color: #6b7280;
    }
  </style>
</head>
<body class="bg-gray-50 min-h-screen flex flex-col">
  <!-- Header -->
  <header class="w-full py-6 px-8 flex flex-col items-center justify-center sticky top-0 z-40 animate-fade-in bg-white">
    <div class="flex flex-col items-center gap-2">
      <div class="h-20 w-20 rounded-full bg-purple-500 flex items-center justify-center mb-4 animate-fade-in">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      </div>
      <h1 class="text-4xl font-bold tracking-tight text-center opacity-0 animate-slide-down" style="animation-delay: 0.1s; animation-fill-mode: forwards;">
        Mensagens Anônimas
      </h1>
      <p class="text-xl text-gray-500 mt-2 text-center max-w-md opacity-0 animate-slide-up" style="animation-delay: 0.2s; animation-fill-mode: forwards;">
        Leia as mensagens anônimas e salve-as quando quiser.
      </p>
    </div>
  </header>
  
  <!-- Main Content -->
  <main class="flex-1 container max-w-2xl px-4 py-8 mx-auto">
    <div class="bg-purple-100 text-purple-700 py-2 px-6 rounded-full inline-block mx-auto mb-8 opacity-0 animate-fade-in" style="animation-delay: 0.3s; animation-fill-mode: forwards;">
      <span class="text-base font-medium">Mensagens recentes</span>
    </div>
    
    <section class="mb-8 opacity-0 animate-fade-in" style="animation-delay: 0.4s; animation-fill-mode: forwards;">
      <h2 class="text-3xl font-bold tracking-tight mb-2 text-center">Leia as mensagens anônimas</h2>
    </section>
    
    <!-- Loading state -->
    <div id="loadingState" class="flex flex-col items-center justify-center py-20">
      <div class="flex items-center justify-center space-x-2">
        <div class="h-3 w-3 rounded-full bg-purple-500/80 animate-pulse"></div>
        <div class="h-3 w-3 rounded-full bg-purple-500/60 animate-pulse" style="animation-delay: 0.2s"></div>
        <div class="h-3 w-3 rounded-full bg-purple-500/40 animate-pulse" style="animation-delay: 0.4s"></div>
      </div>
      <p class="text-gray-500 mt-4 animate-pulse-subtle">Carregando mensagens...</p>
    </div>
    
    <!-- Error state -->
    <div id="errorState" class="flex flex-col items-center justify-center py-16 text-center hidden">
      <div class="rounded-full bg-red-100 p-3 text-red-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" x2="12" y1="8" y2="12"/>
          <line x1="12" x2="12.01" y1="16" y2="16"/>
        </svg>
      </div>
      <h3 class="text-xl font-medium mb-2">Não foi possível carregar as mensagens</h3>
      <p class="text-gray-500 max-w-md">
        Ocorreu um erro ao tentar buscar as mensagens. Por favor, verifique sua conexão e tente novamente.
      </p>
    </div>
    
    <!-- Empty state -->
    <div id="emptyState" class="flex flex-col items-center justify-center py-16 text-center hidden">
      <div class="rounded-full bg-gray-100 p-3 text-gray-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="m13.5 8.5-5 5"/>
          <path d="m8.5 8.5 5 5"/>
          <circle cx="11" cy="11" r="8"/>
          <path d="m21 21-4.3-4.3"/>
        </svg>
      </div>
      <h3 class="text-xl font-medium mb-2">Nenhuma mensagem encontrada</h3>
      <p class="text-gray-500 max-w-md">
        Não há mensagens registradas no momento. Volte mais tarde para verificar novamente.
      </p>
    </div>
    
    <!-- Questions list -->
    <div id="questionsList" class="flex flex-col gap-4 hidden"></div>
  </main>
  
  <!-- Footer -->
  <footer class="py-6 px-4 text-center text-sm text-gray-500 border-t">
    <p>© <span id="currentYear"></span> Mensagens Anônimas. Todos os direitos reservados.</p>
  </footer>
  
  <!-- Toast notification container -->
  <div id="toastContainer" class="fixed top-4 right-4 z-50 flex flex-col gap-2"></div>
  
  <script>
    // Configurar o ano atual no footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Função para mostrar toast de notificação
    function showToast(title, description, variant = 'default') {
      const toast = document.createElement('div');
      toast.className = `p-4 rounded-lg shadow-lg max-w-md animate-slide-up flex gap-3 items-start ${
        variant === 'destructive' ? 'bg-red-100 text-red-800' : 'bg-white text-gray-800'
      }`;
      
      toast.innerHTML = `
        <div class="flex-shrink-0">
          ${variant === 'destructive' 
            ? '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>' 
            : '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/></svg>'
          }
        </div>
        <div class="flex-1">
          <h4 class="font-medium mb-1">${title}</h4>
          <p class="text-sm opacity-90">${description}</p>
        </div>
      `;
      
      document.getElementById('toastContainer').appendChild(toast);
      
      // Remover o toast após 5 segundos
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(10px)';
        toast.style.transition = 'opacity 0.3s, transform 0.3s';
        
        setTimeout(() => {
          toast.remove();
        }, 300);
      }, 5000);
    }
    
    // Função para criar um cartão de pergunta
    function createQuestionCard(question, index) {
      const card = document.createElement('div');
      card.className = 'message-card opacity-0 animate-slide-up';
      card.style.animationDelay = `${0.1 + index * 0.05}s`;
      card.style.animationFillMode = 'forwards';
      
      card.innerHTML = `
        <div class="message-header">
          me mande mensagens anônimas!
        </div>
        <div class="message-content">
          ${question.pergunta}
        </div>
        <div class="message-actions">
          <button class="action-button info-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 16v-4"/>
              <path d="M12 8h.01"/>
            </svg>
          </button>
          <button class="action-button share-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
          </button>
          <button class="action-button arrow-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m5 12 7-7 7 7"/>
              <path d="M12 19V5"/>
            </svg>
          </button>
        </div>
      `;
      
      return card;
    }
    
    // Função para alterar a visibilidade dos estados
    function showElement(elementId, show = true) {
      const element = document.getElementById(elementId);
      if (show) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    }
    
    // Função para buscar as perguntas
    async function fetchQuestions() {
      // Mostrar estado de carregamento
      showElement('loadingState', true);
      showElement('errorState', false);
      showElement('emptyState', false);
      showElement('questionsList', false);
      
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyMh9YnzKtxF9Nc_awc9w8KSPyXa4OzXf0iiW748b8-dY4W0SxkoYy77Wcudn7ky9xUJg/exec');
        
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        
        const data = await response.json();
        
        // Ocultar estado de carregamento
        showElement('loadingState', false);
        
        // Verificar se há perguntas
        if (!data.perguntas || data.perguntas.length === 0) {
          showElement('emptyState', true);
          return;
        }
        
        // Inverter a ordem das perguntas para mostrar as mais recentes primeiro
        const reversedQuestions = [...data.perguntas].reverse();
        
        // Limpar a lista de perguntas
        const questionsList = document.getElementById('questionsList');
        questionsList.innerHTML = '';
        
        // Adicionar cada pergunta à lista
        reversedQuestions.forEach((question, index) => {
          const card = createQuestionCard(question, index);
          questionsList.appendChild(card);
        });
        
        // Mostrar a lista de perguntas
        showElement('questionsList', true);
        
      } catch (error) {
        console.error('Error fetching questions:', error);
        showElement('loadingState', false);
        showElement('errorState', true);
        showToast(
          "Erro ao carregar mensagens", 
          "Houve um problema ao carregar as mensagens. Tente novamente mais tarde.",
          "destructive"
        );
      }
    }
    
    // Carregar perguntas ao iniciar a página
    document.addEventListener('DOMContentLoaded', fetchQuestions);
  </script>
</body>
</html>
