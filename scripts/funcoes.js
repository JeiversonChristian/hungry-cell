// script das funções da simualação

function atualizar_posicao_celulas(celulas, jogo) {
   
    for (let i = 0; i < jogo.quant_celulas; i++) {

        if (celulas[i].a == 1 && celulas[i].pode_andar_esq == 1){
            celulas[i].x -= celulas[i].vel;
        }
        if (celulas[i].d == 1 && celulas[i].pode_andar_dir == 1){
            celulas[i].x += celulas[i].vel;
        }
        if (celulas[i].s == 1 && celulas[i].pode_andar_baixo == 1){
            celulas[i].y += celulas[i].vel;
        }
        if (celulas[i].w == 1 && celulas[i].pode_andar_cima == 1){
            celulas[i].y -= celulas[i].vel;
        }
        
        if (celulas[i].esta_parede_esq == 1){
            celulas[i].x = 0 + celulas[i].raio;
        }
        if (celulas[i].esta_parede_dir == 1){
            celulas[i].x = jogo.largura_canvas - celulas[i].raio;
        }
        if (celulas[i].esta_parede_baixo == 1){
            celulas[i].y = jogo.altura_canvas - celulas[i].raio;
        }
        if (celulas[i].esta_parede_cima == 1){
            celulas[i].y = 0 + celulas[i].raio;
        }

    }

}

function calcular_distancia_entre_objetos_redondos(obj1, obj2) {
    return Math.sqrt((obj1.x - obj2.x) ** 2 + (obj1.y - obj2.y) ** 2);
}

function dar_pause(jogo) {
    jogo.play = false;
    jogo.pause = true;    
}

function dar_play(jogo) {
    jogo.play = true;
    jogo.pause = false;  
}

function desenhar_celulas(ctx, celulas, jogo){
    for (let i = 0; i < jogo.quant_celulas; i++) {
        ctx.beginPath();
        ctx.arc(celulas[i].x, celulas[i].y, celulas[i].raio, 0, Math.PI * 2);
        ctx.fillStyle = celulas[i].cor;
        ctx.fill();
        ctx.closePath();
    }
}

function desenhar_comidas(ctx, comidas, jogo){
    for (let i = 0; i < jogo.quant_comidas; i++) {
        ctx.beginPath();
        ctx.arc(comidas[i].x, comidas[i].y, comidas[i].raio, 0, Math.PI * 2);
        ctx.fillStyle = comidas[i].cor;
        ctx.fill();
        ctx.closePath();
    }
}

function desenhar_elementos(ctx, celulas, comidas, jogo) {
    desenhar_celulas(ctx, celulas, jogo);
    desenhar_comidas(ctx, comidas, jogo);
}

function detectar_colisao_celulas(celulas, jogo) {
    for (let i = 0; i < jogo.quant_celulas; i++){

        celulas[i].pode_andar_esq = 1;
        celulas[i].pode_andar_dir = 1;
        celulas[i].pode_andar_cima = 1;
        celulas[i].pode_andar_baixo = 1;

        for (let j = 0; j < jogo.quant_celulas; j++){
            if (i != j) {
                let dist = calcular_distancia_entre_objetos_redondos(celulas[i], celulas[j]);
                if (dist <= 2*celulas[i].raio + 1){

                    // se estiver no lado direito da outra célula
                    if (celulas[i].x > celulas[j].x) {
                        celulas[i].esta_encostada_outra_cel_esq = 1;
                        celulas[i].pode_andar_esq = 0;

                        celulas[j].esta_encostada_outra_cel_dir = 1;
                        celulas[j].pode_andar_dir = 0;
                    }

                    // se estiver no lado esquerdo da outra célula
                    if (celulas[i].x < celulas[j].x) {
                        celulas[i].esta_encostada_outra_cel_dir = 1;
                        celulas[i].pode_andar_dir = 0;

                        celulas[j].esta_encostada_outra_cel_esq = 1;
                        celulas[j].pode_andar_esq = 0;
                    }

                    // se estiver em cima da outra célula
                    if (celulas[i].y < celulas[j].y) {
                        celulas[i].esta_encostada_outra_cel_baixo = 1;
                        celulas[i].pode_andar_baixo = 0;

                        celulas[j].esta_encostada_outra_cel_cima = 1;
                        celulas[j].pode_andar_cima = 0;
                    }

                    // se estiver em baixo da outra célula
                    if (celulas[i].y > celulas[j].y) {
                        celulas[i].esta_encostada_outra_cel_cima = 1;
                        celulas[i].pode_andar_cima = 0;

                        celulas[j].esta_encostada_outra_cel_baixo = 1;
                        celulas[j].pode_andar_baixo = 0;
                    }

                    if (celulas[i].esta_encostada_outra_cel_dir ||  celulas[i].esta_encostada_outra_cel_esq || celulas[i].esta_encostada_outra_cel_cima || celulas[i].esta_encostada_outra_cel_baixo 
                        || 
                    celulas[j].esta_encostada_outra_cel_dir ||  celulas[j].esta_encostada_outra_cel_esq || celulas[j].esta_encostada_outra_cel_cima || celulas[j].esta_encostada_outra_cel_baixo
                    ) {
                        celulas[i].esta_encostada_outra_cel = 1;
                        celulas[j].esta_encostada_outra_cel = 1;
                        break;
                    }

                }
            }
        }
    }
}

function detectar_colisao_paredes(celulas, jogo){

    for (let i = 0; i < jogo.quant_celulas; i++){

        // parede esquerda
        if (celulas[i].x - celulas[i].raio <= 0){
            celulas[i].esta_parede_esq = 1;
            celulas[i].pode_andar_esq = 0;
        }
        else {
            celulas[i].esta_parede_esq = 0;
            celulas[i].pode_andar_esq = 1;
        }
        // parede direita
        if (celulas[i].x + celulas[i].raio >= jogo.largura_canvas){
            celulas[i].esta_parede_dir = 1;
            celulas[i].pode_andar_dir = 0;
        }
        else {
            celulas[i].esta_parede_dir = 0;
            celulas[i].pode_andar_dir = 1;
        }
        // parede baixo
        if (celulas[i].y + celulas[i].raio >= jogo.altura_canvas){
            celulas[i].esta_parede_baixo = 1;
            celulas[i].pode_andar_baixo = 0;
        }
        else {
            celulas[i].esta_parede_baixo = 0;
            celulas[i].pode_andar_baixo = 1;
        }
        // parede cima
        if (celulas[i].y - celulas[i].raio <= 0){
            celulas[i].esta_parede_cima = 1;
            celulas[i].pode_andar_cima = 0;
        }
        else {
            celulas[i].esta_parede_cima = 0;
            celulas[i].pode_andar_cima = 1;
        }

    }
    
}

function detectar_colisoes(celulas, jogo) {
    detectar_colisao_paredes(celulas, jogo);
    detectar_colisao_celulas(celulas, jogo);
}

function inicializar_celulas(celulas, jogo){
    
    // calcula as coordenadas das células -----------------------------------------
    
    // Math.random(): [0,1): float
    // Math.random() * b: [0,b): float
    // Math.floor( Math.random() * (b+1) ): [0,b]: int
    // Math.random() * (b - a) + a: [a,b): float
    // Math.floor(Math.random() * (b - a + 1) + a): [a,b]: int
    // a = raio
    // b = largura_canvas - raio ou b = altura_canvas - raio

    for (let i = 0; i < jogo.quant_celulas; i++){
        celulas[i].x = Math.floor(Math.random() * (jogo.largura_canvas - jogo.raio_celulas - jogo.raio_celulas + 1) + jogo.raio_celulas);
        celulas[i].y = Math.floor(Math.random() * (jogo.altura_canvas - jogo.raio_celulas - jogo.raio_celulas + 1) + jogo.raio_celulas);
        
        // garante que a célula não vai ficar em cima de nenhuma já incializada ---
        let j = 0;
        let dist = 0;
        while (j <= i) {
            if (j != i){
                dist = calcular_distancia_entre_objetos_redondos(celulas[j], celulas[i]);
                if (dist <= 2*jogo.raio_celulas) {
                    celulas[i].x = Math.floor(Math.random() * (jogo.largura_canvas - jogo.raio_celulas - jogo.raio_celulas + 1) + jogo.raio_celulas);
                    celulas[i].y = Math.floor(Math.random() * (jogo.altura_canvas - jogo.raio_celulas - jogo.raio_celulas + 1) + jogo.raio_celulas);
                    j = 0; // reinicia o loop
                    continue; // volta para o início do loop sem executar o restante do código
                }
            }            
            j++;
        }
        // ------------------------------------------------------------------------
        
        // o resto dos parâmetros -------------------------------------------------
        celulas[i].raio = jogo.raio_celulas;
        celulas[i].cor = jogo.cor_celulas;
        celulas[i].vel = jogo.velocidade_celulas;

        celulas[i].pode_andar_esq = 1; 
        celulas[i].pode_andar_dir = 1; 
        celulas[i].pode_andar_cima = 1; 
        celulas[i].pode_andar_baixo = 1; 

        // Math.round(Math.random()) => [0,1]
        celulas[i].w = Math.round(Math.random()); 
        celulas[i].s = Math.round(Math.random()); 
        celulas[i].a = Math.round(Math.random()); 
        celulas[i].d = Math.round(Math.random());

        celulas[i].esta_parede_esq = 0; 
        celulas[i].esta_parede_dir = 0; 
        celulas[i].esta_parede_cima = 0; 
        celulas[i].esta_parede_baixo = 0;

        celulas[i].esta_encostada_outra_cel_esq = 0;
        celulas[i].esta_encostada_outra_cel_dir = 0;
        celulas[i].esta_encostada_outra_cel_cima = 0;
        celulas[i].esta_encostada_outra_cel_baixo = 0;
        celulas[i].esta_encostada_outra_cel = 0;
        // ------------------------------------------------------------------------
    }
    // ----------------------------------------------------------------------------
}

function inicializar_comidas(comidas, celulas, jogo){

    // calcula as coordenadas das comidas -----------------------------------------
    for (let i = 0; i < jogo.quant_comidas; i++) {
        comidas[i].x = Math.floor(Math.random() * (jogo.largura_canvas - jogo.raio_comidas - jogo.raio_comidas + 1) + jogo.raio_comidas);
        comidas[i].y = Math.floor(Math.random() * (jogo.altura_canvas - jogo.raio_comidas - jogo.raio_comidas + 1) + jogo.raio_comidas);
        
        // garante que a comida não vai ficar em cima de nenhuma célula -----------
        let j = 0;
        let dist_comida_cel = 0;
        while (j < jogo.quant_celulas) {
            dist_comida_cel = calcular_distancia_entre_objetos_redondos(celulas[j], comidas[i]);

            if (dist_comida_cel <= jogo.raio_comidas + jogo.raio_celulas) {
                comidas[i].x = Math.floor(Math.random() * (jogo.largura_canvas - jogo.raio_comidas - jogo.raio_comidas + 1) + jogo.raio_comidas);
                comidas[i].y = Math.floor(Math.random() * (jogo.altura_canvas - jogo.raio_comidas - jogo.raio_comidas + 1) + jogo.raio_comidas);
                j = 0; // Reinicia o loop
                continue; // Volta para o início do loop sem executar o restante do código
            }
            j++;
        }
        // ------------------------------------------------------------------------

        // o resto dos parâmetros -----------------------------------------------------
        comidas[i].raio = jogo.raio_comidas;
        comidas[i].cor = jogo.cor_comidas;
    // ----------------------------------------------------------------------------
    }
    // ----------------------------------------------------------------------------

}

function limpar_canvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function mudar_direcao_celulas(celula) {
    if (Math.floor(Math.random() * 101) < 5)
        celula.w = Math.round(Math.random()); 
    if (Math.floor(Math.random() * 101) < 5)
        celula.s = Math.round(Math.random()); 
    if (Math.floor(Math.random() * 101) < 5)
        celula.a = Math.round(Math.random()); 
    if (Math.floor(Math.random() * 101) < 5)
        celula.d = Math.round(Math.random());
}

function reinicializar_variaveis_jogo(jogo){
    jogo.jogo_rodando = true;
    jogo.play = true;
    jogo.pause = false;
}

// Exportar as funções para serem usadas em outros arquivos
export { atualizar_posicao_celulas, dar_pause, dar_play, desenhar_elementos, detectar_colisoes, inicializar_celulas, inicializar_comidas, limpar_canvas, mudar_direcao_celulas, reinicializar_variaveis_jogo };
