/* =========================================================
   Elo Solidário — Busca de endereço pelo CEP (API ViaCEP)
   Usado em contato.html. JavaScript puro, sem bibliotecas.
   ========================================================= */

(function () {
  "use strict";

  const form = document.getElementById("form-contato");
  const campoCep = document.getElementById("cep");
  if (!form || !campoCep) return;

  const statusCep = document.getElementById("cep-status");
  const statusEnvio = document.getElementById("envio-status");
  const campoNumero = document.getElementById("numero");
  const camposEndereco = {
    rua: document.getElementById("rua"),
    bairro: document.getElementById("bairro"),
    cidade: document.getElementById("cidade"),
    uf: document.getElementById("uf")
  };

  const TEMPO_LIMITE_MS = 8000;
  const MSG_FORMATO = "CEP inválido: digite 8 números, no formato 00000-000.";
  const MSG_NAO_ENCONTRADO = "CEP não encontrado. Confira o número ou preencha o endereço manualmente.";
  const MSG_CONEXAO = "Não foi possível consultar o CEP (falha de conexão). Preencha o endereço manualmente.";

  let ultimoCepConsultado = "";
  let consultaAtual = null; // AbortController da consulta em andamento

  /* ---------- Utilitários ---------- */
  function somenteDigitos(valor) {
    return valor.replace(/\D/g, "");
  }

  function formatarCep(digitos) {
    return digitos.length > 5 ? digitos.slice(0, 5) + "-" + digitos.slice(5) : digitos;
  }

  function mostrarStatus(elemento, texto, tipo) {
    elemento.textContent = texto;
    elemento.className = "form-status" + (tipo ? " form-status--" + tipo : "");
  }

  function limparEndereco() {
    Object.values(camposEndereco).forEach(function (campo) {
      campo.value = "";
    });
  }

  function marcarErro(mensagem) {
    campoCep.setAttribute("aria-invalid", "true");
    limparEndereco();
    mostrarStatus(statusCep, mensagem, "erro");
  }

  function limparErro() {
    campoCep.removeAttribute("aria-invalid");
  }

  function cancelarConsulta() {
    if (consultaAtual) {
      consultaAtual.abort();
      consultaAtual = null;
    }
    ultimoCepConsultado = "";
  }

  /* ---------- Consulta ao ViaCEP ---------- */
  async function buscarCep(cep) {
    cancelarConsulta();
    const controle = new AbortController();
    const temporizador = setTimeout(function () {
      controle.abort();
    }, TEMPO_LIMITE_MS);

    consultaAtual = controle;
    ultimoCepConsultado = cep;
    limparErro();
    mostrarStatus(statusCep, "Buscando endereço...", "carregando");

    try {
      const resposta = await fetch("https://viacep.com.br/ws/" + cep + "/json/", {
        signal: controle.signal
      });

      if (consultaAtual !== controle) return;
      if (resposta.status === 400) {
        marcarErro(MSG_FORMATO);
        return;
      }
      if (!resposta.ok) throw new Error("Resposta HTTP " + resposta.status);

      const dados = await resposta.json();
      if (consultaAtual !== controle) return;

      // O ViaCEP responde {"erro": true} (ou "true") quando o CEP não existe
      if (dados.erro === true || dados.erro === "true") {
        marcarErro(MSG_NAO_ENCONTRADO);
        return;
      }

      camposEndereco.rua.value = dados.logradouro || "";
      camposEndereco.bairro.value = dados.bairro || "";
      camposEndereco.cidade.value = dados.localidade || "";
      camposEndereco.uf.value = dados.uf || "";

      // CEPs gerais de cidade não trazem rua nem bairro: o foco vai para a rua
      if (!dados.logradouro) {
        mostrarStatus(
          statusCep,
          "Encontramos a cidade " + dados.localidade + "/" + dados.uf + ". Preencha a rua e o bairro.",
          "sucesso"
        );
        camposEndereco.rua.focus();
        return;
      }

      mostrarStatus(
        statusCep,
        "Endereço encontrado: " + dados.logradouro + ", " + dados.bairro + ", " +
          dados.localidade + "/" + dados.uf + ". Agora informe o número.",
        "sucesso"
      );
      campoNumero.focus();
    } catch (erro) {
      // Consulta cancelada porque o usuário mudou o CEP: nada a mostrar
      if (consultaAtual !== controle) return;
      marcarErro(MSG_CONEXAO);
    } finally {
      clearTimeout(temporizador);
      if (consultaAtual === controle) consultaAtual = null;
    }
  }

  function verificarCep() {
    const cep = somenteDigitos(campoCep.value);

    if (cep.length === 0) {
      cancelarConsulta();
      limparErro();
      mostrarStatus(statusCep, "");
      return;
    }
    if (cep.length !== 8) {
      cancelarConsulta();
      marcarErro(MSG_FORMATO);
      return;
    }
    if (cep === ultimoCepConsultado) return;

    buscarCep(cep);
  }

  /* ---------- Eventos do campo CEP ---------- */
  campoCep.addEventListener("input", function () {
    const posicao = campoCep.selectionStart || 0;
    const digitosAntesDoCursor = somenteDigitos(campoCep.value.slice(0, posicao)).length;
    const cep = somenteDigitos(campoCep.value).slice(0, 8);

    // Máscara 00000-000 mantendo o cursor no lugar certo
    campoCep.value = formatarCep(cep);
    const novaPosicao = digitosAntesDoCursor > 5 ? digitosAntesDoCursor + 1 : digitosAntesDoCursor;
    campoCep.setSelectionRange(novaPosicao, novaPosicao);

    if (cep !== ultimoCepConsultado) {
      cancelarConsulta();
      limparErro();
      mostrarStatus(statusCep, "");
    }

    if (cep.length === 8) verificarCep();
  });

  campoCep.addEventListener("blur", verificarCep);

  /* ---------- Envio do formulário (simulado: o site é estático) ---------- */
  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    form.reset();
    cancelarConsulta();
    limparErro();
    mostrarStatus(statusCep, "");
    mostrarStatus(
      statusEnvio,
      "Obrigado! Sua mensagem foi registrada. (Envio simulado: este é um site acadêmico sem servidor.)",
      "sucesso"
    );
  });
})();
