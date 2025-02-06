// script das funções da simualação

// limpar o canvas
function limpar_canvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// desenhar as celulas
function desenhar_celula(ctx, celula) {
    ctx.beginPath();
    ctx.arc(celula.x, celula.y, celula.raio, 0, Math.PI * 2);
    ctx.fillStyle = celula.cor;
    ctx.fill();
    ctx.closePath();
}

// incializar os parâmetros das células
function inicializar_celula(celula, x, y, raio, cor) {
    celula.x = x;
    celula.y = y;
    celula.raio = raio;
    celula.cor = cor;
}

// Exportar as funções para serem usadas em outros arquivos
export { limpar_canvas, desenhar_celula, inicializar_celula };
