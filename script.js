// script principal

// importações --------------------------------------------------------------------
// funções
import { atualizar_posicao_elementos, dar_pause, dar_play, desenhar_elementos, detectar_colisoes, inicializar_elementos, limpar_canvas, mudar_direcao_elementos, reinicializar_variaveis_jogo, remover_celulas_comidas } from './scripts/funcoes.js';

// objetos
import { celulas, comidas, predadores, quant_celulas, quant_comidas, quant_predadores } from './scripts/objetos.js';

// --------------------------------------------------------------------------------

// canvas -------------------------------------------------------------------------

// canvas principal
const canvas = document.getElementById("canvas_principal"); 
const ctx = canvas.getContext("2d");

// canvas dos botões
const canvas_botao_play = document.getElementById("botao_play");
const canvas_botao_pause = document.getElementById("botao_pause");
const canvas_botao_restart = document.getElementById("botao_restart");

// --------------------------------------------------------------------------------

// configurações do jogo ----------------------------------------------------------

// variáveis e constantes do jogo
const unidade_minima = 5; // tamanho mínimo de uma dimensão de qualquer elemento
let jogo = {
    largura_canvas: canvas.width,
    altura_canvas: canvas.height,

    jogo_rodando: true,
    play: true, 
    pause: false,

    copia_celulas: structuredClone(celulas),
    raio_celulas: 3*unidade_minima,
    cor_celulas: "blue",
    velocidade_celulas: 5,
    quant_celulas_inicial: quant_celulas,
    quant_celulas: quant_celulas,

    raio_comidas: unidade_minima,
    cor_comidas: "green",
    quant_comidas: quant_comidas,

    raio_predadores: (3*unidade_minima)*1.5,
    cor_predadores: "red",
    velocidade_predadores: 7,
    quant_predadores: quant_predadores
};

// --------------------------------------------------------------------------------

// exucação do jogo ---------------------------------------------------------------

function carregar_jogo(){
    reinicializar_variaveis_jogo(jogo, celulas);
    inicializar_elementos(jogo.copia_celulas, comidas, predadores, jogo);
}

function rodar_jogo() {

    // para a execução se jogo_rodando for false
    if (jogo.jogo_rodando == false){
        return;
    } 

    limpar_canvas(ctx, canvas);
    desenhar_elementos(ctx, jogo.copia_celulas, comidas, predadores, jogo);

    if (jogo.play == true && jogo.pause == false){
        detectar_colisoes(jogo.copia_celulas, comidas, predadores, jogo);
        remover_celulas_comidas(jogo.copia_celulas, jogo);
        atualizar_posicao_elementos(jogo.copia_celulas, predadores, comidas, jogo);
        mudar_direcao_elementos(jogo.copia_celulas, predadores, jogo);
    }

    // chama a função novamente para continuar o loop
    //requestAnimationFrame(rodar_jogo);
    setTimeout(() => {
        requestAnimationFrame(rodar_jogo);
    }, 1000 / 60); // Define 60 FPS (1000 ms / 60)
}

// inicia o jogo
carregar_jogo();
rodar_jogo();

// eventos dos botões
// dar_play e dar_pause seriam chamadas automaticamente, mesmo sem clicar
// porque tem (), com parâmetros ou sem
// então os outros () antes delas servem para só serem chamados ao ser clicado
// e depois chamam as funções com o =>
canvas_botao_play.addEventListener("click", () => dar_play(jogo));
canvas_botao_pause.addEventListener("click", () => dar_pause(jogo));
// carregar_jogo só é chamada ao clicar
canvas_botao_restart.addEventListener("click", carregar_jogo);

// --------------------------------------------------------------------------------

