"use strict";

let responsedaLista;
let moedas;

$.ajax("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL")
    .done(resp  =>
      processar(resp))
    .fail(function () { alert("NÃO FOI POSSÍVEL A CONEXÃO COM O SERVIDOR, VERIFIQUE SUA INTERNET OU TENTE NOVAMENTE") })

$("#enviar").click(function () {
  executar(responsedaLista)
});

function processar(resp){moedas = Object.keys(resp);

  for(let value of moedas){
    $("#lista").append(`<option value=${value}>${resp[`${value}`]["name"].split('/',1)[0]}</option`)};
    responsedaLista = resp
}

function executar(resp) {
  let select = document.querySelector("#lista");
  let moedaEscolhida = select.options[select.selectedIndex].text;

  let valordig = $("#valor").val();
  let valorlista = $("#lista").val();
 
  if (valordig > 0) {
    for (let value of moedas){
      
  if (valorlista == value) { $("#resp").html(valordig + " " + moedaEscolhida + " é igual a <br><strong id='black'>R$" + (resp[`${value}`]["bid"] * valordig).toFixed(2) + "</strong>");

  if (resp[`${value}`]["pctChange"] >= 0){$("#porcentagem").html("Porcentagem de varição(dia): <div id='green'>%" + resp[`${value}`]["pctChange"] + "</div>"); }
  else{$("#porcentagem").html("Porcentagem de varição(dia): <div id='red'>%" + resp[`${value}`]["pctChange"] + "</div>");}

  if(resp[`${value}`]["varBid"] >= 0){$("#variacaodia").html("Variação da moeda: <br><div id='green'>$" + resp[`${value}`]["varBid"] + "</div>")}
  else{$("#variacaodia").html("Variação da moeda: <br><div id='red'>$" + resp[`${value}`]["varBid"] + "</div>")}

$("#alta").html("Máxima do dia: <br><div id='black'>" + resp[`${value}`]["high"]) + "</div>";
$("#baixa").html("Mínimo do dia: <br><div id='black'>" + resp[`${value}`]["low"]) + "</div>"}
}
  }
  else { $("#resp").html("Por favor, digite um valor válido") }

  
}
if(executar()){setInterval(executar, 1000)}