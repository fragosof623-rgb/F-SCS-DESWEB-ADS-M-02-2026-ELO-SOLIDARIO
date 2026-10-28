# Elo Solidário — instruções para o Claude Code

Site educativo sobre economia solidária (projeto acadêmico da equipe NEXT HTML, ADS UNICID), com o
assistente de IA **EcoBot**. Contexto completo em `docs/plano-contexto.md`; escopo em `docs/escopo-projeto.md`.
As regras detalhadas estão em `.cursor/rules/*.mdc` e valem igualmente aqui.

## Comandos

- `npm install` — instala as dependências
- `npm run dev` — servidor local com recarga automática (http://localhost:3000)
- `npm start` — servidor como em produção (usado pelo Railway)

## Estrutura

- `public/` — as 10 páginas HTML e `css/`, `js/`, `img/` (tudo o que o navegador recebe)
- `server.js` — Express: serve `public/` e a rota `POST /api/chat`
- `lib/ia.js` — único ponto que chama a API do Claude (`@anthropic-ai/sdk`)
- `docs/` — documentação; `.cursor/` — regras e MCP do Cursor

## Regras essenciais

- **Acessibilidade em primeiro lugar** (público prioritário: PCD): navegação só por teclado, foco visível,
  contraste WCAG AA, `<label for>` em todo campo, mensagens com `aria-live`, nunca `alert()`.
- HTML5 semântico, `lang="pt-BR"`, um `h1` por página, cabeçalho/menu/rodapé idênticos em todas as páginas
  (com `aria-current="page"` na atual). O HTML deve passar no W3C Validator.
- Um único CSS (`public/css/style.css`), sempre com as variáveis de `:root`. JavaScript do navegador puro,
  sem bibliotecas, carregado com `defer`; use `textContent` para conteúdo do usuário ou da rede.
- Textos, comentários e nomes em português do Brasil; arquivos em minúsculas; caminhos relativos.
- **Segredos só em variáveis de ambiente** (`.env` local ou painel do Railway). Nunca escreva chaves no
  código, no `.env.example`, no `.cursor/mcp.json` ou em commits. Confira `git status` antes de commitar.
- **Não invente** dados, estatísticas, notícias ou imagens de terceiros: só com fonte real e identificável.
