// script dos objetos da simualação

// vetor de objetos células
let celulas = [];
const quant_celulas = 10;
for (let i = 0; i < quant_celulas; i++) {
    celulas[i] = { x: 0, y: 0, raio: 0, cor: "" };
}

// vetor de comidas
let comidas = [];
const quant_comidas = 10;
for (let i = 0; i < quant_comidas; i++) {
    comidas[i] = { x: 0, y: 0, raio: 0, cor: "" };
}

export { celulas, comidas, quant_celulas, quant_comidas };

