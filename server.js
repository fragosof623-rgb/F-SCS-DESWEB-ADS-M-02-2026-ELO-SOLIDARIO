/* =========================================================
   Elo Solidário — Servidor Node (site estático + API do EcoBot)
   ========================================================= */

import path from "node:path";
import express from "express";
import { responder, IaNaoConfigurada, Anthropic } from "./lib/ia.js";

const app = express();
const PORTA = Number(process.env.PORT) || 3000;

const LIMITE_MENSAGEM = 1000;      // caracteres por pergunta
const LIMITE_HISTORICO = 10;       // mensagens anteriores enviadas à IA
const LIMITE_REQUISICOES = 10;     // por IP, a cada minuto
const JANELA_MS = 60 * 1000;

app.disable("x-powered-by");
app.set("trust proxy", 1); // o Railway fica na frente do app como proxy
app.use(express.json({ limit: "32kb" }));
app.use(express.static(path.join(import.meta.dirname, "public")));

/* ---------- Limite simples de requisições (protege os créditos da API) ---------- */
const acessos = new Map();

function limitarRequisicoes(req, res, next) {
  const agora = Date.now();
  const recentes = (acessos.get(req.ip) || []).filter((t) => agora - t < JANELA_MS);
  if (recentes.length >= LIMITE_REQUISICOES) {
    return res.status(429).json({ erro: "Muitas perguntas em pouco tempo. Aguarde um minuto e tente de novo." });
  }
  recentes.push(agora);
  acessos.set(req.ip, recentes);
  next();
}

setInterval(() => {
  const agora = Date.now();
  for (const [ip, tempos] of acessos) {
    if (tempos.every((t) => agora - t >= JANELA_MS)) acessos.delete(ip);
  }
}, JANELA_MS).unref();

/* ---------- Validação da conversa recebida do navegador ---------- */
function montarMensagens(corpo) {
  const mensagem = typeof corpo?.mensagem === "string" ? corpo.mensagem.trim() : "";
  if (!mensagem) return { erro: "Escreva uma pergunta para o EcoBot." };
  if (mensagem.length > LIMITE_MENSAGEM) {
    return { erro: `A pergunta pode ter no máximo ${LIMITE_MENSAGEM} caracteres.` };
  }

  const historico = Array.isArray(corpo.historico) ? corpo.historico.slice(-LIMITE_HISTORICO) : [];
  const mensagens = historico
    .filter(
      (item) =>
        (item?.role === "user" || item?.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim() &&
        item.content.length <= 4000
    )
    .map((item) => ({ role: item.role, content: item.content }));

  // A conversa enviada à API precisa começar com uma mensagem do usuário
  while (mensagens.length && mensagens[0].role !== "user") mensagens.shift();

  mensagens.push({ role: "user", content: mensagem });
  return { mensagens };
}

/* ---------- Rota do EcoBot ---------- */
app.post("/api/chat", limitarRequisicoes, async (req, res) => {
  const { erro, mensagens } = montarMensagens(req.body);
  if (erro) return res.status(400).json({ erro });

  try {
    const resposta = await responder(mensagens);
    res.json({ resposta });
  } catch (falha) {
    if (falha instanceof IaNaoConfigurada) {
      console.warn("[EcoBot] " + falha.message);
      return res.status(503).json({ erro: "O EcoBot ainda não foi configurado neste servidor." });
    }
    if (falha instanceof Anthropic.RateLimitError) {
      return res.status(503).json({ erro: "O EcoBot está muito ocupado agora. Tente de novo em instantes." });
    }
    if (falha instanceof Anthropic.AuthenticationError) {
      console.error("[EcoBot] Chave da API inválida ou revogada.");
      return res.status(503).json({ erro: "O EcoBot está indisponível no momento." });
    }
    if (falha instanceof Anthropic.APIError) {
      console.error(`[EcoBot] Erro da API (${falha.status}):`, falha.message);
      return res.status(502).json({ erro: "O EcoBot não conseguiu responder agora. Tente de novo." });
    }
    console.error("[EcoBot] Erro inesperado:", falha);
    res.status(500).json({ erro: "Erro interno ao falar com o EcoBot." });
  }
});

app.use("/api", (req, res) => res.status(404).json({ erro: "Rota não encontrada." }));

app.listen(PORTA, () => {
  console.log(`Elo Solidário rodando em http://localhost:${PORTA}`);
});
