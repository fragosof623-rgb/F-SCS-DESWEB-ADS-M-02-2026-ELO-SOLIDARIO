/* =========================================================
   Elo Solidário — Validação dos campos de data e quantidade
   Usado em contato.html. JavaScript puro, sem bibliotecas.
   A busca de CEP fica em cep.js e não é alterada aqui.
   ========================================================= */

(function () {
  "use strict";

  const form = document.getElementById("form-contato");
  const campoData = document.getElementById("data-retorno");
  const campoParticipantes = document.getElementById("participantes");
  if (!form || !campoData || !campoParticipantes) return;

  const statusData = document.getElementById("data-retorno-status");
  const statusParticipantes = document.getElementById("participantes-status");

  /* Data de hoje no fuso do visitante, no formato AAAA-MM-DD exigido pelo campo date */
  function dataDeHoje() {
    const agora = new Date();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    return agora.getFullYear() + "-" + mes + "-" + dia;
  }

  campoData.min = dataDeHoje();

  function mostrarErro(campo, status, mensagem) {
    campo.setAttribute("aria-invalid", "true");
    status.textContent = mensagem;
    status.className = "form-status form-status--erro";
  }

  function limparErro(campo, status) {
    campo.removeAttribute("aria-invalid");
    status.textContent = "";
    status.className = "form-status";
  }

  function validarData() {
    const validade = campoData.validity;
    if (validade.badInput) {
      mostrarErro(campoData, statusData, "Data inválida. Use o formato dia/mês/ano.");
    } else if (validade.rangeUnderflow) {
      mostrarErro(campoData, statusData, "A data de retorno não pode ser anterior a hoje.");
    } else {
      limparErro(campoData, statusData);
    }
    return campoData.checkValidity();
  }

  function validarParticipantes() {
    const validade = campoParticipantes.validity;
    if (validade.badInput) {
      mostrarErro(campoParticipantes, statusParticipantes, "Digite apenas números.");
    } else if (validade.rangeUnderflow) {
      mostrarErro(campoParticipantes, statusParticipantes, "O número mínimo é 1 pessoa.");
    } else if (validade.rangeOverflow) {
      mostrarErro(campoParticipantes, statusParticipantes, "O número máximo é 10.000 pessoas.");
    } else if (validade.stepMismatch) {
      mostrarErro(campoParticipantes, statusParticipantes, "Use um número inteiro, sem casas decimais.");
    } else {
      limparErro(campoParticipantes, statusParticipantes);
    }
    return campoParticipantes.checkValidity();
  }

  campoData.addEventListener("change", validarData);
  campoData.addEventListener("blur", validarData);
  campoParticipantes.addEventListener("input", validarParticipantes);
  campoParticipantes.addEventListener("blur", validarParticipantes);

  /* Quando o navegador bloqueia o envio, mostra a mensagem também no texto da página */
  campoData.addEventListener("invalid", validarData);
  campoParticipantes.addEventListener("invalid", validarParticipantes);

  /* Depois do envio simulado (cep.js limpa o formulário), remove mensagens antigas */
  form.addEventListener("reset", function () {
    limparErro(campoData, statusData);
    limparErro(campoParticipantes, statusParticipantes);
  });
})();
