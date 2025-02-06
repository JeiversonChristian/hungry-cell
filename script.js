// script principal

// funções importadas -------------------------------------------------------------

import { limpar_canvas, desenhar_celula } from './scripts/funcoes.js';

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

// constantes do jogo
const unidade_minima = 20; // tamanho mínimo de uma dimensão de qualquer elemento
const tamanho_canvas_horizontal = canvas.width / unidade_minima;
const tamanho_canvas_vertical = canvas.height / unidade_minima;

// variáveis do jogo
let jogo_rodando = true;
let x_celula = 50; // Posição inicial x
let y_celula = 50; // Posição inicial y
let raio_celula = unidade_minima / 2;
let cor_celula = "blue";

// --------------------------------------------------------------------------------

// exucação do jogo ---------------------------------------------------------------

function rodar_jogo() {
    // para a execução se jogo_rodando for false
    if (jogo_rodando == false) return;

    limpar_canvas(ctx, canvas);
    desenhar_celula(ctx, x_celula, y_celula, raio_celula, cor_celula);

    // chama a função novamente para continuar o loop
    requestAnimationFrame(rodar_jogo);
}

// inicia o jogo
rodar_jogo();

// --------------------------------------------------------------------------------

