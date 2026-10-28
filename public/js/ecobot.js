/* =========================================================
   Elo Solidário — EcoBot (chat acessível com a IA)
   Monta o chat em qualquer página que carregar este arquivo.
   Conversa com o servidor pela rota POST /api/chat.
   ========================================================= */

(function () {
  "use strict";

  const LIMITE_CARACTERES = 1000;
  const TEMPO_LIMITE_MS = 45000;
  const historico = []; // mensagens já respondidas: { role, content }
  let aguardando = false;

  /* ---------- Criação dos elementos ---------- */
  function criar(tag, atributos, texto) {
    const elemento = document.createElement(tag);
    Object.entries(atributos || {}).forEach(function ([nome, valor]) {
      elemento.setAttribute(nome, valor);
    });
    if (texto) elemento.textContent = texto;
    return elemento;
  }

  const raiz = criar("div", { class: "ecobot" });

  const botaoAbrir = criar("button", {
    type: "button",
    class: "ecobot-abrir",
    "aria-expanded": "false",
    "aria-controls": "ecobot-painel"
  });
  botaoAbrir.innerHTML =
    '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">' +
    '<path d="M4 5h16v11H9l-5 4V5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' +
    '<path d="M8 10h8M8 13h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
    "<span>Falar com o EcoBot</span>";

  const painel = criar("section", {
    id: "ecobot-painel",
    class: "ecobot-painel",
    "aria-labelledby": "ecobot-titulo"
  });
  painel.hidden = true;

  const cabecalho = criar("div", { class: "ecobot-cabecalho" });
  const titulos = criar("div");
  titulos.append(
    criar("h2", { id: "ecobot-titulo" }, "EcoBot"),
    criar("p", { class: "ecobot-aviso" }, "Assistente com inteligência artificial sobre economia solidária. As respostas podem conter erros.")
  );
  const botaoFechar = criar("button", { type: "button", class: "ecobot-fechar", "aria-label": "Fechar o EcoBot" }, "×");
  cabecalho.append(titulos, botaoFechar);

  const conversa = criar("div", {
    class: "ecobot-mensagens",
    role: "log",
    "aria-live": "polite",
    "aria-label": "Conversa com o EcoBot",
    tabindex: "0"
  });

  const status = criar("p", { class: "ecobot-status", "aria-live": "polite" });

  const form = criar("form", { class: "ecobot-form", novalidate: "" });
  const rotulo = criar("label", { for: "ecobot-entrada" }, "Sua pergunta");
  const entrada = criar("textarea", {
    id: "ecobot-entrada",
    name: "mensagem",
    rows: "2",
    maxlength: String(LIMITE_CARACTERES),
    "aria-describedby": "ecobot-dica"
  });
  const dica = criar("p", { id: "ecobot-dica", class: "ecobot-dica" }, "Enter envia. Shift + Enter quebra a linha.");
  const botaoEnviar = criar("button", { type: "submit", class: "btn btn-primary ecobot-enviar" }, "Enviar");
  form.append(rotulo, entrada, dica, botaoEnviar);

  painel.append(cabecalho, conversa, status, form);
  raiz.append(painel, botaoAbrir);
  document.body.append(raiz);

  /* ---------- Mensagens ---------- */
  function adicionarMensagem(autor, texto, tipo) {
    const item = criar("div", { class: "ecobot-msg ecobot-msg--" + (tipo || autor) });
    item.append(
      criar("span", { class: "visually-hidden" }, autor === "usuario" ? "Você disse: " : "EcoBot: "),
      document.createTextNode(texto) // texto puro: nada vindo da rede é interpretado como HTML
    );
    conversa.append(item);
    conversa.scrollTop = conversa.scrollHeight;
  }

  adicionarMensagem(
    "bot",
    "Olá! Eu sou o EcoBot. Posso explicar o que é economia solidária, como funcionam cooperativas e associações, ou ajudar você a navegar pelo site. O que você quer saber?"
  );

  /* ---------- Abrir e fechar ---------- */
  function abrir() {
    painel.hidden = false;
    botaoAbrir.setAttribute("aria-expanded", "true");
    entrada.focus();
  }

  function fechar() {
    painel.hidden = true;
    botaoAbrir.setAttribute("aria-expanded", "false");
    botaoAbrir.focus();
  }

  botaoAbrir.addEventListener("click", function () {
    if (painel.hidden) abrir();
    else fechar();
  });
  botaoFechar.addEventListener("click", fechar);
  painel.addEventListener("keydown", function (evento) {
    if (evento.key === "Escape") fechar();
  });

  entrada.addEventListener("keydown", function (evento) {
    if (evento.key === "Enter" && !evento.shiftKey && !evento.isComposing) {
      evento.preventDefault();
      form.requestSubmit();
    }
  });

  /* ---------- Envio ---------- */
  async function perguntar(mensagem) {
    const controle = new AbortController();
    const temporizador = setTimeout(function () {
      controle.abort();
    }, TEMPO_LIMITE_MS);

    try {
      const resposta = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensagem: mensagem, historico: historico }),
        signal: controle.signal
      });
      const dados = await resposta.json().catch(function () {
        return {};
      });
      if (!resposta.ok) throw new Error(dados.erro || "O EcoBot não conseguiu responder agora.");
      return dados.resposta;
    } catch (erro) {
      if (erro.name === "AbortError") throw new Error("O EcoBot demorou demais para responder. Tente de novo.");
      if (erro instanceof TypeError) throw new Error("Sem conexão com o servidor. Verifique sua internet e tente de novo.");
      throw erro;
    } finally {
      clearTimeout(temporizador);
    }
  }

  form.addEventListener("submit", async function (evento) {
    evento.preventDefault();
    if (aguardando) return;

    const mensagem = entrada.value.trim();
    if (!mensagem) {
      status.textContent = "Escreva uma pergunta antes de enviar.";
      entrada.focus();
      return;
    }

    aguardando = true;
    botaoEnviar.disabled = true;
    entrada.value = "";
    adicionarMensagem("usuario", mensagem);
    status.textContent = "EcoBot está escrevendo...";

    try {
      const resposta = await perguntar(mensagem);
      historico.push({ role: "user", content: mensagem }, { role: "assistant", content: resposta });
      status.textContent = "";
      adicionarMensagem("bot", resposta);
    } catch (erro) {
      status.textContent = "";
      adicionarMensagem("bot", erro.message, "erro");
      entrada.value = mensagem; // devolve o texto para a pessoa tentar de novo
    } finally {
      aguardando = false;
      botaoEnviar.disabled = false;
      entrada.focus();
    }
  });
})();
