/* =========================================================
   Elo Solidário — Rascunho do formulário de contato (localStorage)
   Usado em contato.html. JavaScript puro, sem bibliotecas.
   Mesmo comportamento do exemplo da Aula 07 (seções 7 e 8) e do
   exemplo da equipe em exemplos/teste-local-storage/:
   - salva a cada "input"; recupera no DOMContentLoaded;
   - o envio válido NÃO apaga os dados; só o botão "Limpar dados" apaga.
   Só guardamos nome, e-mail, telefone e mensagem (nada de CEP,
   endereço, data ou número de participantes).
   ========================================================= */

(() => {
  "use strict";

  const form = document.getElementById("form-contato");
  const botaoLimpar = document.getElementById("limpar-dados");
  const statusRascunho = document.getElementById("rascunho-status");
  if (!form || !botaoLimpar || !statusRascunho) return;

  const chaveRascunho = "eloSolidario.rascunhoContato";
  const camposSalvos = ["nome", "email", "telefone", "mensagem"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  let avisouBloqueio = false;

  const mostrarAviso = (texto, tipo = "sucesso") => {
    statusRascunho.textContent = texto;
    statusRascunho.className = `form-status form-status--${tipo}`;
  };

  // O localStorage pode estar bloqueado (modo privado, cookies desativados): por isso o try/catch
  const avisarBloqueio = () => {
    if (avisouBloqueio) return;
    avisouBloqueio = true;
    mostrarAviso(
      "O navegador bloqueou o armazenamento local: o rascunho não será salvo, mas o formulário funciona normalmente.",
      "erro"
    );
  };

  const lerRascunho = () => {
    try {
      const texto = localStorage.getItem(chaveRascunho); // null quando ainda não existe
      return texto === null ? null : JSON.parse(texto);
    } catch (erro) {
      return null; // armazenamento bloqueado ou conteúdo corrompido
    }
  };

  const salvarRascunho = () => {
    const dados = {};
    camposSalvos.forEach((campo) => {
      dados[campo.id] = campo.value;
    });
    try {
      localStorage.setItem(chaveRascunho, JSON.stringify(dados));
    } catch (erro) {
      avisarBloqueio();
    }
  };

  const apagarRascunho = () => {
    try {
      localStorage.removeItem(chaveRascunho);
    } catch (erro) {
      // Se o armazenamento está bloqueado, não havia nada salvo para apagar
    }
  };

  // 1. Recuperar e preencher os campos quando a página termina de carregar
  window.addEventListener("DOMContentLoaded", () => {
    const rascunho = lerRascunho();
    if (rascunho === null || typeof rascunho !== "object") return;

    let recuperouAlgo = false;
    camposSalvos.forEach((campo) => {
      const valorSalvo = rascunho[campo.id];
      if (typeof valorSalvo === "string" && valorSalvo !== "") {
        campo.value = valorSalvo; // .value é texto puro: nada é interpretado como HTML
        recuperouAlgo = true;
      }
    });

    if (recuperouAlgo) {
      mostrarAviso("Rascunho recuperado: preenchemos os campos com o que você digitou da última vez.");
    }
  });

  // 2. Salvar automaticamente enquanto a pessoa digita
  camposSalvos.forEach((campo) => {
    campo.addEventListener("input", salvarRascunho);
  });

  // 3. Limpar os dados manualmente (o botão é type="button": não envia o formulário)
  botaoLimpar.addEventListener("click", () => {
    apagarRascunho();
    form.reset(); // formulario.js e cep.js ouvem o evento "reset" e apagam as mensagens de erro
    mostrarAviso("Dados apagados: o formulário e o rascunho salvo neste navegador foram limpos.");
  });
})();
