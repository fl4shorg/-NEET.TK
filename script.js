const mensagens = [
    "Neext! há 6 anos. O Melhor tem nome",
    "Qualidade",
    "Segurança",
    "Inovação",
    "Confiança",
    "Satisfação",
];

let i = 0; // Índice da mensagem atual
let j = 0; // Índice da letra atual
let dir = true; // Direção da animação (true = escrevendo, false = apagando)
const velocidade = 150; // Tempo de digitação e apagamento
const intervalo = 2000; // Tempo de espera antes de apagar

function escreverMensagem() {
    const mensagemElement = document.getElementById("mensagem");
    const mensagemAtual = mensagens[i];

    if (dir) {
        if (j < mensagemAtual.length) {
            mensagemElement.textContent += mensagemAtual.charAt(j);
            j++;
            setTimeout(escreverMensagem, velocidade); // Chama novamente para digitar
        } else {
            dir = false; // Muda para o modo de apagar
            setTimeout(() => {
                escreverMensagem();
            }, intervalo); // Pausa após completar a mensagem
        }
    } else {
        if (j > 0) {
            mensagemElement.textContent = mensagemAtual.slice(0, j - 1);
            j--;
            setTimeout(() => {
                escreverMensagem();
            }, velocidade); // Chama novamente para apagar
        } else {
            dir = true; // Muda para o modo de escrever
            i = (i + 1) % mensagens.length; // Avança para a próxima mensagem
            setTimeout(() => {
                escreverMensagem();
            }, intervalo); // Pausa antes da próxima mensagem
        }
    }
}

// Função para alternar o menu
function toggleMenu() {
    const menu = document.getElementById("menu");
    // Alterna a visibilidade do menu
    if (menu.style.display === "flex") {
        menu.style.display = "none"; // Esconde o menu
    } else {
        menu.style.display = "flex"; // Mostra o menu
    }
}

// Inicia a animação
escreverMensagem();