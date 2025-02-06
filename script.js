// script principal

// importações --------------------------------------------------------------------

// funções
import { calcular_distancia_entre_objetos_redondos, calcular_parametros_para_celulas, desenhar_celula, inicializar_celula, limpar_canvas } from './scripts/funcoes.js';

// objetos
import { celulas } from './scripts/objetos.js';

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
const unidade_minima = 5; // tamanho mínimo de uma dimensão de qualquer elemento
const tamanho_canvas_horizontal = canvas.width / unidade_minima;
const tamanho_canvas_vertical = canvas.height / unidade_minima;

// variáveis do jogo
let jogo_rodando = true;
let raio_celulas = 2*unidade_minima;
let cor_celulas = "blue";

// --------------------------------------------------------------------------------

// exucação do jogo ---------------------------------------------------------------

function carregar_jogo(){
    // incializar células
    for (let i = 0; i < 10; i++) {
        let [x, y, raio, cor] = calcular_parametros_para_celulas(canvas.width, canvas.height, raio_celulas, cor_celulas);
        inicializar_celula(celulas[i], x, y, raio, cor);
        
        // verifica se a célula não vai ficar em cima de nenhuma já incializada
        let j = 0;
        let dist = 0;
        while (j <= i) {
            if (j != i){
                dist = calcular_distancia_entre_objetos_redondos(celulas[j], celulas[i]);
            
            
                if (dist <= 2*raio_celulas) {
                    let [x, y, raio, cor] = calcular_parametros_para_celulas(canvas.width, canvas.height, raio_celulas, cor_celulas);
                    inicializar_celula(celulas[i], x, y, raio, cor);
                    j = 0; // Reinicia o loop
                    continue; // Volta para o início do loop sem executar o restante do código
                }
            }            
            j++;
        }
    }
}

function rodar_jogo() {
    // para a execução se jogo_rodando for false
    if (jogo_rodando == false){
        return;
    } 

    limpar_canvas(ctx, canvas);

    for (let i = 0; i < 10; i++) {
        desenhar_celula(ctx, celulas[i]);
    }

    // chama a função novamente para continuar o loop
    requestAnimationFrame(rodar_jogo);
}

// inicia o jogo
carregar_jogo();
rodar_jogo();

// --------------------------------------------------------------------------------

