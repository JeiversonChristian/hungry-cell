// script das funções da simualação

function calcular_distancia_entre_objetos_redondos(obj1, obj2) {
    return Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2);
}


function calcular_parametros_para_celulas(largura_canvas, altura_canvas, raio, cor) {
    // Math.random(): [0,1): float
    // Math.random() * b: [0,b): float
    // Math.floor( Math.random() * (b+1) ): [0,b]: int
    // Math.random() * (b - a) + a: [a,b): float
    // Math.floor(Math.random() * (b - a + 1) + a): [a,b]: int
    // a = raio
    // b = largura_canvas - raio ou b = altura_canvas - raio
    let x = Math.floor(Math.random() * (largura_canvas - raio - raio + 1) + raio);
    let y = Math.floor(Math.random() * (altura_canvas - raio - raio + 1) + raio);
    let r = raio;
    let c = cor;
    return [x, y, r, c];
}

function desenhar_celula(ctx, celula) {
    ctx.beginPath();
    ctx.arc(celula.x, celula.y, celula.raio, 0, Math.PI * 2);
    ctx.fillStyle = celula.cor;
    ctx.fill();
    ctx.closePath();
}

function inicializar_celula(celula, x, y, raio, cor) {
    celula.x = x;
    celula.y = y;
    celula.raio = raio;
    celula.cor = cor;
}

function limpar_canvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Exportar as funções para serem usadas em outros arquivos
export { calcular_distancia_entre_objetos_redondos, calcular_parametros_para_celulas, desenhar_celula, inicializar_celula, limpar_canvas };
