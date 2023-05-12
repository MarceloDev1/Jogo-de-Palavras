var tempoInicial = $("#tempo-digitacao").text();

$(document).ready(function () {
    inicializaTamanhoFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcadores();
    $("#botao-reiniciar").click(reiniciaJogo);
});


function inicializaTamanhoFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tamanho-frase");
    tamanhoFrase.text(numPalavras);
}

var campoDigtacao = $(".campo-digitacao");

function inicializaContadores() {
    campoDigtacao.on("input", function () {
        var conteudo = campoDigtacao.val();
        var qtdPalavras = conteudo.split(/\S+/).length - 1;
        $("#contador-palavras").text(qtdPalavras);

        var qtdCaracteres = conteudo.length;
        $("#contador-caracteres").text(qtdCaracteres);

    });
}

function inicializaCronometro() {

    var tempoRestante = $("#tempo-digitacao").text();
    campoDigtacao.one("focus", function () {
        var cronometroId = setInterval(function () {
            tempoRestante--;
            $("#tempo-digitacao").text(tempoRestante);
            if (tempoRestante < 1) {
                clearInterval(cronometroId);
                finalizaJogo();
            }
        }, 1000);
    });

}

function inicializaMarcadores() {
    var frase = $(".frase").text();
    campoDigtacao.on("input", function () {
        var digitado = campoDigtacao.val();
        var comparavel = frase.substr(0, digitado.length);
        if (digitado == comparavel) {
            campoDigtacao.addClass("borda-verde");
            campoDigtacao.removeClass("borda-vermelha");
        }
        else {
            campoDigtacao.addClass("borda-vermelha");
            campoDigtacao.removeClass("borda-verde");
        }
    });
}

function reiniciaJogo(params) {
    campoDigtacao.attr("disabled", false);
    campoDigtacao.val("");
    $("#contador-palavras").text("0");
    $("#contador-caracteres").text("0");
    $("#tempo-digitacao").text(tempoInicial);
    inicializaCronometro();
    campoDigtacao.toggleClass("campo-desativado");
    campoDigtacao.removeClass("borda-vermelha");
    campoDigtacao.removeClass("borda-verde");
}

function finalizaJogo() {
    campoDigtacao.attr("disabled", true);
    campoDigtacao.toggleClass("campo-desativado");
    inserePlacar();
}

$(".botao-remover").click(function(event) {
    $(this).parent().parent().remove();
});