// script das funções da simualação

function atualizar_posicao_celula(celula, largura_canvas, altura_canvas) {
    if (celula.a == 1 && celula.pode_andar_esq == 1){
        celula.x -= celula.v;
    }
    
    if (celula.esta_parede_esq == 1){
        celula.x = 0 + celula.raio;
    }
}

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

function detectar_colisao_celulas(celulas, quant_celulas) {
    for (let i = 0; i < quant_celulas-1; i++){
        for (let j = i+1; j < quant_celulas; j++){
            let dist = calcular_distancia_entre_objetos_redondos(celulas[i], celulas[j]);
            if (dist <= 2*celulas[i].raio){
                // se estiver no lado direito da outra célula
                if (celulas[i].x > celulas[j].x) {
                    celulas[i].esta_encostada_outra_cel = 1;
                    celulas[i].pode_andar_esq = 0;
                    break;
                }
                else {
                    celulas[i].esta_encostada_outra_cel = 0;
                    celulas[i].pode_andar_esq = 1;
                }
            }
        }
    }
}

function detectar_colisao_paredes(celula, largura_canvas, altura_canvas) {
    // parede esquerda
    if (celula.x - celula.raio <= 0){
        celula.esta_parede_esq = 1;
        celula.pode_andar_esq = 0;
    }
    else {
        celula.esta_parede_esq = 0;
        celula.pode_andar_esq = 1;
    }
}

function detectar_colisoes(celulas, quant_celulas, largura_canvas, altura_canvas) {
    for (let i = 0; i < quant_celulas; i++) {
        detectar_colisao_paredes(celulas[i], largura_canvas, altura_canvas);
    }
    detectar_colisao_celulas(celulas, quant_celulas);
}

function inicializar_celula(celula, x, y, raio, cor) {
    celula.x = x;
    celula.y = y;
    celula.raio = raio;
    celula.cor = cor;
    if (celula.tipo == "celula"){
        celula.v = 5;
        celula.a = 1;
    }
}

function limpar_canvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Exportar as funções para serem usadas em outros arquivos
export { atualizar_posicao_celula, calcular_distancia_entre_objetos_redondos, calcular_parametros_para_celulas, desenhar_celula, detectar_colisoes, inicializar_celula, limpar_canvas };
