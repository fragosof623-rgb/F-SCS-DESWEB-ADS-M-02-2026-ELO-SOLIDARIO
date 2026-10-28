# Plano e Contexto do Projeto — Elo Solidário

Documento de referência rápida para a equipe e para as ferramentas de IA (Cursor e Claude Code).
O escopo completo entregue à disciplina está em [`escopo-projeto.md`](escopo-projeto.md).

---

## 1. Objetivo do site

O **Elo Solidário** é um site educativo sobre **economia solidária**: explica, em linguagem simples, como
cooperativas, associações, agricultores familiares e artesãos geram renda e impacto social por meio da
cooperação, da autogestão e do comércio justo.

É um trabalho acadêmico da equipe **NEXT HTML** (Desenvolvimento Web — ADS, UNICID). Não vende nada e não
coleta dados pessoais.

## 2. Público

- Estudantes, educadores, consumidores interessados em consumo consciente, pequenos produtores e o corpo
  docente avaliador.
- A partir de 14 anos; linguagem simples, sem jargões.
- **Público prioritário: pessoas com deficiência (PCD)** — usuários de leitores de tela, de navegação só por
  teclado e com baixa visão. Toda decisão de layout, cor e código deve respeitar isso.

## 3. As 10 páginas

| Página | Conteúdo | Responsável |
|---|---|---|
| `index.html` | Resumo do tema e apresentação do projeto | Felipe Fragoso |
| `sobre.html` | História, missão, visão e valores | Breno Oliveira da Silva |
| `projetos.html` | Tipos de iniciativas de economia solidária | Breno Oliveira da Silva |
| `impacto.html` | Impactos social, econômico e ambiental, com dados e fontes | Gustavo Mariano Carvalho |
| `acessibilidade.html` | Medidas de acessibilidade do site | Gustavo Mariano Carvalho |
| `galeria.html` | Imagens com legenda, descrição e fonte | Jihady Nikuluz Cardoso |
| `midia.html` | Vídeo, áudio e iframe com legendas e transcrição | Jihady Nikuluz Cardoso |
| `noticias.html` | Notícias com data, veículo e link | Kaue Cândido Alberti |
| `contato.html` | Formulário validado, busca de CEP (ViaCEP), equipe | Felipe Fragoso |
| `orcamento_hospedagem.html` | Comparativo de hospedagem e domínio | Kaue Cândido Alberti |

Páginas com conteúdo pendente exibem um aviso "Página em construção" indicando o responsável.
**Nenhum dado, número, notícia ou imagem de terceiros pode ser publicado sem fonte real e identificável.**

## 4. EcoBot

Assistente de IA disponível em todas as páginas (botão "Falar com o EcoBot", no canto inferior direito).

- **Interface:** `public/js/ecobot.js` monta o chat; funciona só com teclado (`Enter` envia, `Esc` fecha),
  anuncia as respostas com `aria-live` e insere o texto sempre como texto puro (nunca como HTML).
- **Servidor:** `server.js` recebe `POST /api/chat` com `{ "mensagem": "...", "historico": [...] }`,
  valida o tamanho, limita 10 perguntas por minuto por IP e chama `lib/ia.js`.
- **IA:** `lib/ia.js` usa o SDK oficial da Anthropic (`@anthropic-ai/sdk`) com o modelo Claude
  (`claude-opus-5-5` por padrão, configurável em `IA_MODELO`). As instruções do EcoBot limitam as
  respostas a economia solidária e ao site, em português simples, sem inventar dados.
- **Sem chave configurada**, o site funciona normalmente e o EcoBot responde que ainda não foi configurado.

## 5. Stack

| Camada | Tecnologia |
|---|---|
| Páginas | HTML5 semântico, CSS3 puro (variáveis, Flexbox, Grid), JavaScript puro |
| Servidor | Node.js 20.11+ com Express 5 |
| IA | Claude (Anthropic) via `@anthropic-ai/sdk` |
| Configuração | `dotenv` (arquivo `.env` local, fora do Git) |
| APIs externas | ViaCEP (busca de endereço no formulário de contato) |
| Versionamento e deploy | GitHub + Railway |

### Estrutura de pastas

```
├── .cursor/rules/*.mdc   regras do projeto para a IA do Cursor
├── .cursor/mcp.json      servidores MCP do Cursor (sem tokens)
├── CLAUDE.md             regras para o Claude Code
├── docs/                 escopo, plano e documentação
├── lib/ia.js             integração com a API de IA
├── public/               tudo que o navegador recebe (10 páginas, css/, js/, img/)
├── server.js             servidor Express (site estático + /api/chat)
├── package.json
├── .env.example          nomes das variáveis, sem valores
└── .env                  segredos locais (nunca vai para o Git)
```

## 6. Como rodar localmente

```bash
npm install
cp .env.example .env      # no Windows: copy .env.example .env
# edite o .env e preencha ANTHROPIC_API_KEY
npm run dev               # reinicia sozinho ao salvar arquivos
```

Abra http://localhost:3000.

## 7. Como fazer o deploy (Railway)

1. Envie as alterações para o branch `main` do GitHub (`git push`).
2. No Railway, o serviço ligado ao repositório detecta o `package.json` e executa `npm install` e `npm start`.
3. Em **Variables**, cadastre:
   - `ANTHROPIC_API_KEY` — chave da API da Anthropic (obrigatória para o EcoBot).
   - `IA_MODELO` — opcional; se vazio, usa `claude-opus-5-5`.
   - `PORT` não precisa ser cadastrada: o Railway define sozinho.
4. Em **Settings → Networking**, gere um domínio público (se ainda não houver).
5. Teste a página inicial e o EcoBot no endereço publicado.

**Segurança:** a chave nunca deve aparecer no código, em commits, em prints ou em mensagens. Se vazar,
revogue-a no console da Anthropic e crie outra.
