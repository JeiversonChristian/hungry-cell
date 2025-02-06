// Canvas -------------------------------------------------------------------------

// canvas principal
const canvas = document.getElementById("canvas_principal"); 
const ctx = canvas.getContext("2d");

// canvas dos botões
const canvas_botao_play = document.getElementById("botao_play");
const canvas_botao_pause = document.getElementById("botao_pause");
const canvas_botao_restart = document.getElementById("botao_restart");

// --------------------------------------------------------------------------------

// Configurações do jogo ----------------------------------------------------------

// constantes do jogo
const unidade_minima = 20; // tamanho mínimo de uma dimensão de qualquer elemento
const tamanho_canvas_horizontal = canvas.width / unidade_minima;
const tamanho_canvas_vertical = canvas.height / unidade_minima;

// --------------------------------------------------------------------------------

