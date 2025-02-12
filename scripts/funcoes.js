// script das funções da simualação

function atualizar_posicao_celulas(celulas, jogo) {
   
    for (let i = 0; i < jogo.quant_celulas; i++) {

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

    }

}

function atualizar_posicao_comidas(comidas, celulas, jogo){

    for (let i = 0; i < jogo.quant_comidas; i++){
        if (comidas[i].foi_comida == true){
            comidas[i].foi_comida = false;

            // mesma lógica da inicialização das comidas

            comidas[i].x = Math.floor(Math.random() * (jogo.largura_canvas - jogo.raio_comidas - jogo.raio_comidas + 1) + jogo.raio_comidas);
            comidas[i].y = Math.floor(Math.random() * (jogo.altura_canvas - jogo.raio_comidas - jogo.raio_comidas + 1) + jogo.raio_comidas);
            
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
        }
    }
}

function atualizar_posicao_predadores(predadores, jogo){

    for (let i = 0; i < jogo.quant_predadores; i++) {

        if (predadores[i].esta_parede_esq == 1){
            predadores[i].x = 0 + predadores[i].raio;
        }
        if (predadores[i].esta_parede_dir == 1){
            predadores[i].x = jogo.largura_canvas - predadores[i].raio;
        }
        if (predadores[i].esta_parede_baixo == 1){
            predadores[i].y = jogo.altura_canvas - predadores[i].raio;
        }
        if (predadores[i].esta_parede_cima == 1){
            predadores[i].y = 0 + predadores[i].raio;
        }

        if (predadores[i].a == 1 && predadores[i].pode_andar_esq == 1){
            predadores[i].x -= predadores[i].vel;
        }
        if (predadores[i].d == 1 && predadores[i].pode_andar_dir == 1){
            predadores[i].x += predadores[i].vel;
        }
        if (predadores[i].s == 1 && predadores[i].pode_andar_baixo == 1){
            predadores[i].y += predadores[i].vel;
        }
        if (predadores[i].w == 1 && predadores[i].pode_andar_cima == 1){
            predadores[i].y -= predadores[i].vel;
        }

    }

}

function atualizar_posicao_elementos(celulas, predadores, comidas, jogo){
    atualizar_posicao_celulas(celulas, jogo);
    atualizar_posicao_comidas(comidas, celulas, jogo);
    atualizar_posicao_predadores(predadores, jogo);
}

function calcular_distancia_entre_objetos_redondos(obj1, obj2){
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

function desenhar_predadores(ctx, predadores, jogo){
    for (let i = 0; i < jogo.quant_predadores; i++) {
        ctx.beginPath();
        ctx.arc(predadores[i].x, predadores[i].y, predadores[i].raio, 0, Math.PI * 2);
        ctx.fillStyle = predadores[i].cor;
        ctx.fill();
        ctx.closePath();
    }
}

function desenhar_elementos(ctx, celulas, comidas, predadores, jogo) {
    desenhar_comidas(ctx, comidas, jogo);
    desenhar_celulas(ctx, celulas, jogo);
    desenhar_predadores(ctx, predadores, jogo);
}

function detectar_colisao_celulas_celulas(celulas, jogo) {
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

function detectar_colisao_celulas_comidas(celulas, comidas, jogo){
    for (let i = 0; i < jogo.quant_celulas; i++){
        for (let j = 0; j < jogo.quant_comidas; j++){
            let dist = calcular_distancia_entre_objetos_redondos(celulas[i], comidas[j]);
            // só dá pra entender com um desenho
            if (dist <= celulas[i].raio - comidas[j].raio){
                comidas[j].foi_comida = true;
            }
        }
    }
}

function detectar_colisao_celulas_paredes(celulas, jogo){

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

function detectar_colisao_predadores_celulas(predadores, celulas, jogo){
    for (let i = 0; i < jogo.quant_predadores; i++){
        for (let j = 0; j < jogo.quant_celulas; j++){
            let dist = calcular_distancia_entre_objetos_redondos(predadores[i], celulas[j]);
            // só dá pra entender com um desenho
            if (dist <= predadores[i].raio - celulas[j].raio){
                celulas[j].foi_comida = true;
            }
        }
    }
}

function detectar_colisao_predadores_paredes(predadores, jogo){

    for (let i = 0; i < jogo.quant_predadores; i++){

        // parede esquerda
        if (predadores[i].x - predadores[i].raio <= 0){
            predadores[i].esta_parede_esq = 1;
            predadores[i].pode_andar_esq = 0;
        }
        else {
            predadores[i].esta_parede_esq = 0;
            predadores[i].pode_andar_esq = 1;
        }
        // parede direita
        if (predadores[i].x + predadores[i].raio >= jogo.largura_canvas){
            predadores[i].esta_parede_dir = 1;
            predadores[i].pode_andar_dir = 0;
        }
        else {
            predadores[i].esta_parede_dir = 0;
            predadores[i].pode_andar_dir = 1;
        }
        // parede baixo
        if (predadores[i].y + predadores[i].raio >= jogo.altura_canvas){
            predadores[i].esta_parede_baixo = 1;
            predadores[i].pode_andar_baixo = 0;
        }
        else {
            predadores[i].esta_parede_baixo = 0;
            predadores[i].pode_andar_baixo = 1;
        }
        // parede cima
        if (predadores[i].y - predadores[i].raio <= 0){
            predadores[i].esta_parede_cima = 1;
            predadores[i].pode_andar_cima = 0;
        }
        else {
            predadores[i].esta_parede_cima = 0;
            predadores[i].pode_andar_cima = 1;
        }

    }

}

function detectar_colisao_predadores_predadores(predadores, jogo){

    for (let i = 0; i < jogo.quant_predadores; i++){

        predadores[i].pode_andar_esq = 1;
        predadores[i].pode_andar_dir = 1;
        predadores[i].pode_andar_cima = 1;
        predadores[i].pode_andar_baixo = 1;

        for (let j = 0; j < jogo.quant_predadores; j++){
            if (i != j) {
                let dist = calcular_distancia_entre_objetos_redondos(predadores[i], predadores[j]);
                if (dist <= 2*predadores[i].raio + 1){

                    // se estiver no lado direito da outra célula
                    if (predadores[i].x > predadores[j].x) {
                        predadores[i].esta_encostada_outra_cel_esq = 1;
                        predadores[i].pode_andar_esq = 0;

                        predadores[j].esta_encostada_outra_cel_dir = 1;
                        predadores[j].pode_andar_dir = 0;
                    }

                    // se estiver no lado esquerdo da outra célula
                    if (predadores[i].x < predadores[j].x) {
                        predadores[i].esta_encostada_outra_cel_dir = 1;
                        predadores[i].pode_andar_dir = 0;

                        predadores[j].esta_encostada_outra_cel_esq = 1;
                        predadores[j].pode_andar_esq = 0;
                    }

                    // se estiver em cima da outra célula
                    if (predadores[i].y < predadores[j].y) {
                        predadores[i].esta_encostada_outra_cel_baixo = 1;
                        predadores[i].pode_andar_baixo = 0;

                        predadores[j].esta_encostada_outra_cel_cima = 1;
                        predadores[j].pode_andar_cima = 0;
                    }

                    // se estiver em baixo da outra célula
                    if (predadores[i].y > predadores[j].y) {
                        predadores[i].esta_encostada_outra_cel_cima = 1;
                        predadores[i].pode_andar_cima = 0;

                        predadores[j].esta_encostada_outra_cel_baixo = 1;
                        predadores[j].pode_andar_baixo = 0;
                    }

                    if (predadores[i].esta_encostada_outra_cel_dir ||  predadores[i].esta_encostada_outra_cel_esq || predadores[i].esta_encostada_outra_cel_cima || predadores[i].esta_encostada_outra_cel_baixo 
                        || 
                        predadores[j].esta_encostada_outra_cel_dir ||  predadores[j].esta_encostada_outra_cel_esq || predadores[j].esta_encostada_outra_cel_cima || predadores[j].esta_encostada_outra_cel_baixo
                    ) {
                        predadores[i].esta_encostada_outra_cel = 1;
                        predadores[j].esta_encostada_outra_cel = 1;
                        break;
                    }

                }
            }
        }
    }
    
}

function detectar_colisoes(celulas, comidas, predadores, jogo) {
    detectar_colisao_celulas_paredes(celulas, jogo);
    detectar_colisao_celulas_celulas(celulas, jogo);
    detectar_colisao_celulas_comidas(celulas, comidas, jogo);
    detectar_colisao_predadores_paredes(predadores, jogo);
    detectar_colisao_predadores_predadores(predadores, jogo);
    detectar_colisao_predadores_celulas(predadores, celulas, jogo);
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

        celulas[i].foi_comida = false;
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

function inicializar_predadores(predadores, celulas, jogo){

    // calcula as coordenadas dos predadores --------------------------------------
    for (let i = 0; i < jogo.quant_predadores; i++) {
        predadores[i].x = Math.floor(Math.random() * (jogo.largura_canvas - jogo.raio_predadores - jogo.raio_predadores + 1) + jogo.raio_predadores);
        predadores[i].y = Math.floor(Math.random() * (jogo.altura_canvas - jogo.raio_predadores - jogo.raio_predadores + 1) + jogo.raio_predadores);
        
        // garante que o predador não vai ficar em cima de nenhuma célula ---------
        let j = 0;
        let dist_predador_cel = 0;
        while (j < jogo.quant_celulas) {
            dist_predador_cel = calcular_distancia_entre_objetos_redondos(celulas[j], predadores[i]);

            if (dist_predador_cel <= jogo.raio_predadores + jogo.raio_celulas + 1) {
                predadores[i].x = Math.floor(Math.random() * (jogo.largura_canvas - jogo.raio_predadores - jogo.raio_predadores + 1) + jogo.raio_predadores);
                predadores[i].y = Math.floor(Math.random() * (jogo.altura_canvas - jogo.raio_predadores - jogo.raio_predadores + 1) + jogo.raio_predadores);
                j = 0; // Reinicia o loop
                continue; // Volta para o início do loop sem executar o restante do código
            }
            j++;
        }
        // ------------------------------------------------------------------------

        // o resto dos parâmetros -------------------------------------------------
        predadores[i].raio = jogo.raio_predadores;
        predadores[i].cor = jogo.cor_predadores;
        predadores[i].vel = jogo.velocidade_predadores;

        predadores[i].pode_andar_esq = 1; 
        predadores[i].pode_andar_dir = 1; 
        predadores[i].pode_andar_cima = 1; 
        predadores[i].pode_andar_baixo = 1; 

        predadores[i].w = Math.round(Math.random()); 
        predadores[i].s = Math.round(Math.random()); 
        predadores[i].a = Math.round(Math.random()); 
        predadores[i].d = Math.round(Math.random());

        predadores[i].esta_parede_esq = 0; 
        predadores[i].esta_parede_dir = 0; 
        predadores[i].esta_parede_cima = 0; 
        predadores[i].esta_parede_baixo = 0;

        predadores[i].esta_encostada_outra_cel_esq = 0;
        predadores[i].esta_encostada_outra_cel_dir = 0;
        predadores[i].esta_encostada_outra_cel_cima = 0;
        predadores[i].esta_encostada_outra_cel_baixo = 0;
        predadores[i].esta_encostada_outra_cel = 0;
    // ----------------------------------------------------------------------------
    }
    // ----------------------------------------------------------------------------

}

function inicializar_elementos(celulas, comidas, predadores, jogo){
    inicializar_celulas(celulas, jogo);
    inicializar_comidas(comidas, celulas, jogo);
    inicializar_predadores(predadores, celulas, jogo);
}

function limpar_canvas(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function mudar_direcao_celulas(celulas, jogo) {
    for (let i = 0; i < jogo.quant_celulas; i++) {
        if (Math.floor(Math.random() * 101) < 5)
            celulas[i].w = Math.round(Math.random()); 
        if (Math.floor(Math.random() * 101) < 5)
            celulas[i].s = Math.round(Math.random()); 
        if (Math.floor(Math.random() * 101) < 5)
            celulas[i].a = Math.round(Math.random()); 
        if (Math.floor(Math.random() * 101) < 5)
            celulas[i].d = Math.round(Math.random());
    }
}

function mudar_direcao_predadores(predadores, jogo){
    for (let i = 0; i < jogo.quant_predadores; i++) {
        if (Math.floor(Math.random() * 101) < 5)
            predadores[i].w = Math.round(Math.random()); 
        if (Math.floor(Math.random() * 101) < 5)
            predadores[i].s = Math.round(Math.random()); 
        if (Math.floor(Math.random() * 101) < 5)
            predadores[i].a = Math.round(Math.random()); 
        if (Math.floor(Math.random() * 101) < 5)
            predadores[i].d = Math.round(Math.random());
    }
}

function mudar_direcao_elementos(celulas, predadores, jogo){
    mudar_direcao_celulas(celulas, jogo);
    mudar_direcao_predadores(predadores, jogo);
}

function reinicializar_variaveis_jogo(jogo, celulas){
    jogo.jogo_rodando = true;
    jogo.play = true;
    jogo.pause = false;
    jogo.quant_celulas = jogo.quant_celulas_inicial;
    jogo.copia_celulas = structuredClone(celulas);
}

function remover_celulas_comidas(celulas, jogo){
    for (let i = 0; i < jogo.quant_celulas; i++) {
        if (celulas[i].foi_comida == true){
            celulas.splice(i, 1);
            jogo.quant_celulas -= 1;
        }
    }
}

// Exportar as funções para serem usadas em outros arquivos
export { atualizar_posicao_elementos, dar_pause, dar_play, desenhar_elementos, detectar_colisoes, inicializar_elementos, limpar_canvas, mudar_direcao_elementos, reinicializar_variaveis_jogo, remover_celulas_comidas };
