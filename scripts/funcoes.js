// script das funções do jogo

// função para limpar o canvas
function limpar_canvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// função para desenhar as celulas
function desenhar_celula(ctx, x, y, raio, cor) {
    ctx.beginPath();
    ctx.arc(x, y, raio, 0, Math.PI * 2);
    ctx.fillStyle = cor;
    ctx.fill();
    ctx.closePath();
}

// Exportar as funções para serem usadas em outros arquivos
export { limpar_canvas, desenhar_celula };
