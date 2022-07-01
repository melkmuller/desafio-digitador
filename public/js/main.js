
var tempoInicial = $('#tempo-digitacao').text();
var campo = $('.campo-digitacao');

$(function() {
    atualizaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $('#botao-reiniciar').click(reiniciaJogo);
})

function atualizaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {
    campo.on('input', function() {
        var conteudo = campo.val()
        var conteudoSemEspaco = conteudo.replace(/\s+/g, '');
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $('#contador-palavras').text(qtdPalavras);
        var qtdCaracteres = conteudoSemEspaco.length;
        $('#contador-caracteres').text(qtdCaracteres);
    });
}

function inicializaCronometro() {
    var tempoRestante = $('#tempo-digitacao').text();
    campo.one('focus', function() {
        $('#botao-reiniciar').attr('disabled', true);
        var cronometroID = setInterval(function() {
            tempoRestante--;
            $('#tempo-digitacao').text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroID);
                finalizaJogo();
            }
        }, 1000)
    });
}

function finalizaJogo() {
    campo.attr('disabled', true);
    campo.toggleClass('campo-desativado');
    inserePlacar();
}

function reiniciaJogo() {
    campo.attr('disabled', false);
    campo.val('');
    campo.removeClass('campo-desativado');
    $('#contador-palavras').text('0');
    $('#contador-caracteres').text('0');
    $('#tempo-digitacao').text(tempoInicial);
    inicializaCronometro();
    campo.removeClass('campo-desativado');
    campo.removeClass("borda-vermelha");
    campo.removeClass("borda-verde");
};

function inicializaMarcadores() {
    var frase = $('.frase').text();
    var digitado = campo.val();
    campo.on('input', function() {
        if (frase.startsWith(digitado)) {
            campo.addClass("borda-verde");
            campo.removeClass("borda-vermelha");
        } else {
            campo.addClass("borda-vermelha");
            campo.removeClass("borda-verde");
        }      
    });
}