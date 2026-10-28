/* =========================================================
   Elo Solidário — Integração com a API de IA (Claude, Anthropic)
   Único ponto do projeto que conversa com a IA. A chave vem do
   ambiente (.env local ou variáveis do Railway), nunca do código.
   ========================================================= */

import dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";

dotenv.config({ quiet: true });

const MODELO = process.env.IA_MODELO || "claude-opus-5-5";

// Modelos que aceitam o reencaminhamento automático em caso de recusa
const MODELOS_COM_FALLBACK = ["claude-opus-5-5", "claude-opus-5", "claude-fable-5-1"];

const INSTRUCOES_ECOBOT = `Você é o EcoBot, assistente do site Elo Solidário, um projeto acadêmico e educativo \
da equipe NEXT HTML (Curso de Análise e Desenvolvimento de Sistemas, UNICID) sobre economia solidária.

Como responder:
- Sempre em português do Brasil, com frases curtas e linguagem simples, sem jargões.
- O público inclui pessoas com deficiência e usuários de leitores de tela: escreva em texto corrido \
ou em listas simples, sem tabelas, emojis ou formatação Markdown.
- Respostas curtas: no máximo 3 parágrafos pequenos, a não ser que a pessoa peça mais detalhes.

Sobre o que falar:
- Economia solidária: cooperativas, associações, autogestão, comércio justo, consumo consciente, \
agricultura familiar, artesanato, desenvolvimento local e sustentabilidade.
- O próprio site: as páginas Início, Sobre, Projetos, Impacto, Acessibilidade, Galeria, Mídia, \
Notícias, Contato e Hospedagem.
- Se perguntarem algo fora desses temas, explique com gentileza que você só ajuda com economia \
solidária e com o site.

Regras importantes:
- Não invente números, estatísticas, leis, nomes de iniciativas ou notícias. Se não tiver certeza, \
diga isso e sugira procurar fontes oficiais.
- O Elo Solidário não vende nada e não coleta dados. Para falar com a equipe, indique a página Contato.
- Nunca peça dados pessoais (documentos, endereço, senhas).`;

export class IaNaoConfigurada extends Error {
  constructor() {
    super("A variável ANTHROPIC_API_KEY não está definida.");
    this.name = "IaNaoConfigurada";
  }
}

let cliente = null;

function obterCliente() {
  if (!process.env.ANTHROPIC_API_KEY) throw new IaNaoConfigurada();
  if (!cliente) cliente = new Anthropic(); // lê ANTHROPIC_API_KEY do ambiente
  return cliente;
}

/**
 * Envia a conversa ao Claude e devolve a resposta do EcoBot em texto.
 * @param {Anthropic.Beta.BetaMessageParam[]} mensagens histórico validado, terminando com a pergunta do usuário
 * @returns {Promise<string>}
 */
export async function responder(mensagens) {
  const parametros = {
    model: MODELO,
    max_tokens: 4000,
    output_config: { effort: "low" }, // chat simples: respostas rápidas e baratas
    system: INSTRUCOES_ECOBOT,
    messages: mensagens
  };

  if (MODELOS_COM_FALLBACK.includes(MODELO)) {
    parametros.betas = ["server-side-fallback-2026-07-01"];
    parametros.fallbacks = "default";
  }

  const resposta = await obterCliente().beta.messages.create(parametros);

  if (resposta.stop_reason === "refusal") {
    return "Desculpe, não posso ajudar com esse pedido. Posso explicar algo sobre economia solidária?";
  }

  const texto = resposta.content
    .filter((bloco) => bloco.type === "text")
    .map((bloco) => bloco.text)
    .join("\n")
    .trim();

  return texto || "Desculpe, não consegui formular uma resposta agora. Tente perguntar de outro jeito.";
}

export { Anthropic };
