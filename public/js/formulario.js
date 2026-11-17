/* =========================================================
   Elo Solidário — Validação do formulário de contato
   Usado em contato.html. JavaScript puro, sem bibliotecas.
   Conteúdos da Aula 07: DOM, addEventListener, preventDefault,
   validação com JavaScript e expressões regulares.
   - A busca de CEP (ViaCEP) fica em cep.js.
   - O rascunho no localStorage fica em rascunho.js.
   Os atributos HTML5 (required, type, pattern, minlength) continuam
   no HTML; o formulário usa novalidate para que as mensagens abaixo
   apareçam no lugar das bolhas do navegador.
   ========================================================= */

(() => {
  "use strict";

  const form = document.getElementById("form-contato");
  if (!form) return;

  const buscar = (id) => document.getElementById(id);

  const campoNome = buscar("nome");
  const campoData = buscar("data-retorno");
  const campoParticipantes = buscar("participantes");
  const campoCep = buscar("cep");
  const statusEnvio = buscar("envio-status");

  const regexTelefone = /^\(\d{2}\) ?\d{4,5}-\d{4}$/; // (11) 91234-5678 ou (11) 1234-5678
  const regexCep = /^\d{5}-?\d{3}$/;
  const tamanhoMinimoMensagem = 10; // atividade da seção 11 da Aula 07

  /* ---------- Mensagens de erro ---------- */

  // Cada campo mostra o erro no <p id="<campo>-erro">; data, quantidade e CEP usam o <p id="<campo>-status">
  const areaDoErro = (campo) => buscar(campo.id + "-erro") || buscar(campo.id + "-status");

  const mostrarErro = (campo, mensagem) => {
    const area = areaDoErro(campo);
    campo.setAttribute("aria-invalid", "true"); // o CSS pinta a borda de vermelho
    area.textContent = mensagem;
    if (area.classList.contains("form-status")) area.className = "form-status form-status--erro";
  };

  const limparErro = (campo) => {
    const area = areaDoErro(campo);
    // Na área compartilhada do CEP, só apaga se ela estiver mostrando um erro
    // (assim a mensagem "Endereço encontrado" do cep.js continua visível)
    if (area.classList.contains("form-status") && campo.getAttribute("aria-invalid") !== "true") return;
    campo.removeAttribute("aria-invalid");
    area.textContent = "";
    if (area.classList.contains("form-status")) area.className = "form-status";
  };

  /* ---------- Regras de cada campo: devolvem o texto do erro ou "" ---------- */

  const obrigatorio = (texto) => (campo) => (campo.value.trim() === "" ? texto : "");

  const regras = {
    nome: (campo) => {
      const nome = campo.value.trim();
      if (nome === "") return "O nome é obrigatório.";
      if (nome.length < 2) return "Digite pelo menos 2 letras no nome.";
      return "";
    },
    email: (campo) => {
      const email = campo.value.trim();
      if (email === "") return "O e-mail é obrigatório.";
      if (!email.includes("@") || !email.includes(".")) return "E-mail inválido: use o formato nome@provedor.com.";
      return "";
    },
    telefone: (campo) => {
      const telefone = campo.value.trim();
      if (telefone !== "" && !regexTelefone.test(telefone)) {
        return "Telefone inválido: use o formato (11) 91234-5678.";
      }
      return "";
    },
    "data-retorno": (campo) => {
      const validade = campo.validity;
      if (validade.badInput) return "Data inválida. Use o formato dia/mês/ano.";
      if (validade.rangeUnderflow) return "A data de retorno não pode ser anterior a hoje.";
      return "";
    },
    participantes: (campo) => {
      const validade = campo.validity;
      if (validade.badInput) return "Digite apenas números.";
      if (validade.rangeUnderflow) return "O número mínimo é 1 pessoa.";
      if (validade.rangeOverflow) return "O número máximo é 10.000 pessoas.";
      if (validade.stepMismatch) return "Use um número inteiro, sem casas decimais.";
      return "";
    },
    cep: (campo) => {
      const cep = campo.value.trim();
      if (cep === "") return "O CEP é obrigatório.";
      if (!regexCep.test(cep)) return "CEP inválido: digite 8 números, no formato 00000-000.";
      return "";
    },
    rua: obrigatorio("Informe a rua."),
    numero: obrigatorio("Informe o número."),
    bairro: obrigatorio("Informe o bairro."),
    cidade: obrigatorio("Informe a cidade."),
    uf: (campo) => (campo.value === "" ? "Selecione a UF." : ""),
    mensagem: (campo) => {
      const tamanho = campo.value.trim().length;
      if (tamanho === 0) return "A mensagem é obrigatória.";
      if (tamanho < tamanhoMinimoMensagem) {
        return `A mensagem precisa ter pelo menos ${tamanhoMinimoMensagem} caracteres (você digitou ${tamanho}).`;
      }
      return "";
    }
  };

  // Campos na mesma ordem em que aparecem na página (o foco vai para o primeiro com erro)
  const camposValidados = Object.keys(regras).map(buscar).filter(Boolean);

  /* Valida um campo, mostra ou limpa o erro e diz se ele está válido */
  const validarCampo = (campo) => {
    const erro = regras[campo.id](campo);
    if (erro) {
      mostrarErro(campo, erro);
      return false;
    }
    limparErro(campo);
    return true;
  };

  const limparTodosOsErros = () => {
    camposValidados.forEach(limparErro);
    statusEnvio.textContent = "";
    statusEnvio.className = "form-status";
  };

  /* ---------- Eventos ---------- */

  // Data mínima = hoje, no fuso do visitante (formato AAAA-MM-DD exigido pelo campo date)
  const dataDeHoje = () => {
    const agora = new Date();
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const dia = String(agora.getDate()).padStart(2, "0");
    return `${agora.getFullYear()}-${mes}-${dia}`;
  };
  campoData.min = dataDeHoje();

  // Data e quantidade: avisam logo que o valor muda (como antes)
  campoData.addEventListener("change", () => validarCampo(campoData));
  campoParticipantes.addEventListener("input", () => validarCampo(campoParticipantes));

  // Nos outros campos, depois que um erro aparece, ele some assim que a pessoa corrige
  // (o CEP fica de fora: cep.js já cuida das mensagens dele enquanto a pessoa digita)
  camposValidados
    .filter((campo) => campo !== campoData && campo !== campoParticipantes && campo !== campoCep)
    .forEach((campo) => {
      const tipoDeEvento = campo.tagName === "SELECT" ? "change" : "input";
      campo.addEventListener(tipoDeEvento, () => {
        if (campo.getAttribute("aria-invalid") === "true") validarCampo(campo);
      });
    });

  form.addEventListener("submit", (evento) => {
    evento.preventDefault(); // o site é estático: o envio é simulado
    limparTodosOsErros();

    const camposComErro = camposValidados.filter((campo) => !validarCampo(campo));

    if (camposComErro.length > 0) {
      const quantidade = camposComErro.length;
      statusEnvio.textContent = quantidade === 1
        ? "Não foi possível enviar: 1 campo precisa de correção."
        : `Não foi possível enviar: ${quantidade} campos precisam de correção.`;
      statusEnvio.className = "form-status form-status--erro";
      camposComErro[0].focus();
      return;
    }

    // Tudo válido: mostra o sucesso e NÃO limpa o formulário (o rascunho fica salvo, como no exemplo da aula)
    statusEnvio.textContent =
      `Obrigado, ${campoNome.value.trim()}! Sua mensagem foi registrada. ` +
      "(Envio simulado: este é um site acadêmico sem servidor.)";
    statusEnvio.className = "form-status form-status--sucesso";
  });

  // O botão "Limpar dados" (rascunho.js) chama form.reset(): as mensagens somem junto
  form.addEventListener("reset", limparTodosOsErros);
})();
