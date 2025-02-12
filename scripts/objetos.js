// script dos objetos da simualação

// vetor de objetos células
let celulas = [];
const quant_celulas = 12;
for (let i = 0; i < quant_celulas; i++) {
    celulas[i] = { 
        x: 0, 
        y: 0, 
        raio: 0, 
        cor: "",
        vel: 0,

        w: 0, 
        s: 0, 
        a: 0, 
        d: 0,  

        pode_andar_esq: 0, 
        pode_andar_dir: 0, 
        pode_andar_cima: 0, 
        pode_andar_baixo: 0, 

        esta_parede_esq: 0, 
        esta_parede_dir: 0, 
        esta_parede_cima: 0, 
        esta_parede_baixo: 0,

        esta_encostada_outra_cel_esq: 0,
        esta_encostada_outra_cel_dir: 0,
        esta_encostada_outra_cel_cima: 0,
        esta_encostada_outra_cel_baixo: 0,
        esta_encostada_outra_cel: 0, 

        foi_comida: false,

        tipo: "celula" 
    };
}

// vetor de comidas
let comidas = [];
const quant_comidas = 10;
for (let i = 0; i < quant_comidas; i++) {
    comidas[i] = { 
        x: 0, 
        y: 0, 
        raio: 0, 
        cor: "", 
        foi_comida: false, 
        tipo: "comida" 
    };
}

// vetor de objetos predadores
let predadores = [];
const quant_predadores = Math.round(quant_comidas/4);
for (let i = 0; i < quant_predadores; i++) {
    predadores[i] = { 
        x: 0, 
        y: 0, 
        raio: 0, 
        cor: "",
        vel: 0,

        w: 0, 
        s: 0, 
        a: 0, 
        d: 0,  

        pode_andar_esq: 0, 
        pode_andar_dir: 0, 
        pode_andar_cima: 0, 
        pode_andar_baixo: 0, 

        esta_parede_esq: 0, 
        esta_parede_dir: 0, 
        esta_parede_cima: 0, 
        esta_parede_baixo: 0,

        esta_encostada_outra_cel_esq: 0,
        esta_encostada_outra_cel_dir: 0,
        esta_encostada_outra_cel_cima: 0,
        esta_encostada_outra_cel_baixo: 0,
        esta_encostada_outra_cel: 0, 

        tipo: "celula_predadora" 
    };
}

export { celulas, comidas, predadores, quant_celulas, quant_comidas, quant_predadores };

