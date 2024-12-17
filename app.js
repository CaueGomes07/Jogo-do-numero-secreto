// //  Alterando título no HTML pelo JS;
// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo Secreto';

// //  Alterando paragrafo no HTML pelo JS;
// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

//  Função para alterar os textos a serem exibidos nas tags HTML
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.5; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

//  Função para exibir o texto inicial do jogo
function textoInicial(){
    exibirTextoNaTela('h1','Jogo Secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}

//  Função para gerar número aleatório
function gerarNumeroAleatório(){
    //  Gerando um número
    let numGerado = parseInt(Math.random() * totalNumSorteado + 1);
    //  
    //let qtdElementoNaLista = listaSorteados.length;
    //if(qtdElementoNaLista == totalNumSorteado){}
    if(listaSorteados.length == totalNumSorteado){
        listaSorteados = [];
    }
    if(listaSorteados.includes(numGerado)){
        return gerarNumeroAleatório();
    }else{
        listaSorteados.push(numGerado);
        console.log(listaSorteados);
        return numGerado;
    }

}

//  Função para limpar o campo de chute a cada palpite
function limparChute(){
    chute = document.querySelector('input');
    chute.value = '';
}

//  Função para verificar o chute pelo botão 'chutar';
function verificarChute(){
    let chute = document.querySelector('input').value;
    // chute == numeroSecreto ? exibirTextoNaTela('h1', 'Acertoooou!!') : exibirTextoNaTela('h1', 'Erooooooouuuuuuuu!');
    if(chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você acertou com ${tentativas} ${palavraTentativa}!`;

        exibirTextoNaTela('h1', 'Acertou!!!!');
        exibirTextoNaTela('p', mensagemTentativas);
        //  Ativando o botão 'Novo jogo' quando o jogador vencer. removendo o atributo 'disabled' que desabilita o botão.
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        if(chute > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor!');
        }else{
            exibirTextoNaTela('p', 'O número secreto é maior!');
        }
        tentativas ++
        limparChute();

    }
}

//  Função para reiniciar o jogo
function reiniciarJogo(){
    //  Desabilitando o botão 'novo jogo' até o fim da partida
    document.getElementById('reiniciar').setAttribute('disabled', true);
    //  Exibindo o texto inicial do jogo
    textoInicial();
    //  Gerando novo número secreto
    numeroSecreto = gerarNumeroAleatório();
    //  Contando as tentativas da nova partida
    tentativas = 1;
    //  Limpando o chute do jogador
    limparChute();
}

//  Inicializando o texto exibido no HTML
textoInicial();
//  Declarando uma lista que armazenará os números gerados
let listaSorteados = [];
//  Estabelecendo a quantidade de números que podem ser gerados
let totalNumSorteado = 10;
//  Gerando o número secreto
let numeroSecreto = gerarNumeroAleatório();
//  Variavel de contagem de tentativas
let tentativas = 1;


// function verificaNum(num){
//     return console.log(num > 0 ? 'positivo' : num < 0 ? 'negativo' : 'é zero' )
// }
//  verificaNum(0);