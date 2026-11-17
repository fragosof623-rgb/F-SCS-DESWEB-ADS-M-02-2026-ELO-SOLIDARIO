# Checklist da Atividade A2 e da Aula 07 — Elo Solidário

Conferido em **16/11/2026** no código do projeto. Cada item foi verificado nos arquivos, com uma auditoria
automática que lê as 10 páginas, o CSS e os scripts. Os itens que envolvem comportamento também foram
testados no navegador, conforme `docs/testes.md`.

Legenda: **[x]** atendido, com o local indicado; **[ ]** pendente ou atendido só em parte, com o que falta.

**Resumo:** 72 itens atendidos e 3 pendentes (listados no fim do documento).

---

## 1. As 10 páginas

Todas têm `lang="pt-BR"`, um único `h1`, `<title>` próprio (10 títulos diferentes), meta descrição, o link
"Pular para o conteúdo principal", `css/style.css` e `js/ecobot.js` com `defer`.

- [x] **`index.html`**: resumo do tema e apresentação do projeto. `h1` "Economia que transforma. Comunidades que prosperam." e seções "O que é Economia Solidária?", "Por que ela é importante?", "Como funciona?" e "Conheça o projeto".
- [x] **`sobre.html`**: história, missão, visão e valores. Seções "Nossa história", "Missão", "Visão", "Valores" e "Quem faz o projeto".
- [x] **`projetos.html`**: iniciativas de economia solidária. "Iniciativas brasileiras" (Banco Palmas, Coopamare, Justa Trama, Cooperativa Xique Xique e UNISOL Brasil) e "Tipos de iniciativas", em 11 `<article>`, com fontes.
- [x] **`impacto.html`**: dados, tabela e resultados. "As três dimensões do impacto", "Dados e resultados" (tabela com `<caption>`, cabeçalhos, ano de referência e fonte de cada linha) e "O que esses números mostram".
- [x] **`acessibilidade.html`**: medidas de inclusão. "Medidas adotadas", "Atalhos de teclado úteis" e "Encontrou alguma barreira?".
- [x] **`galeria.html`**: imagens com legenda e fonte. 8 imagens, todas com `alt` descritivo e `<figcaption>` com autor e licença (CC BY 2.0, CC BY-SA 3.0 e CC BY-SA 4.0).
- [x] **`midia.html`**: vídeo, áudio e iframe. Ver a seção 4 deste checklist.
- [x] **`noticias.html`**: notícias com fonte. "Notícias recentes" (6 `<article>` com veículo, data e link) e "Como saber se uma notícia é confiável".
- [x] **`contato.html`**: formulário validado, dados fictícios e equipe. Formulário (ver a seção 3), "Dados de contato" em `<address>`, com aviso de que são fictícios, e "Equipe NEXT HTML" com os 5 integrantes.
- [x] **`orcamento_hospedagem.html`**: comparativo de hospedagem e domínio. "Como o site está publicado hoje", "Comparativo de hospedagem", "Domínio" e "Nossa recomendação" (Railway Hobby, US$ 5 por mês).
- [x] **Navegação entre as páginas**: o menu principal liga as 10 páginas em todas elas, com `aria-current="page"` na página atual (conferido nas 10).

## 2. HTML5 semântico e títulos

- [x] `header`, `nav`, `main` e `footer` nas 10 páginas.
- [x] `section` em todas as páginas (2 a 5 por página) e `article` onde há itens independentes (`index`, `projetos`, `impacto` e `noticias`).
- [x] Cabeçalho, menu e rodapé **idênticos** nas 10 páginas: a auditoria comparou o `<header class="site-header">` e o `<footer class="site-footer">` de todas as páginas, sem o `aria-current`, e encontrou 1 versão de cada.
- [x] Exatamente **um `h1`** por página (10 de 10).
- [x] `h2` e `h3` em ordem, **sem saltos** de nível (0 saltos nas 10 páginas). O `h3` aparece em `index`, `projetos`, `impacto`, `midia`, `noticias` e `contato`.
- [x] HTML válido no W3C: ver a seção 6.

## 3. Formulário (`public/contato.html`)

- [x] **`required`** em 9 campos: nome, e-mail, CEP, rua, número, bairro, cidade, UF e mensagem.
- [x] **`type="email"`** no campo `#email`.
- [x] **`type="tel"`** no campo `#telefone`, com `pattern="\(\d{2}\) ?\d{4,5}-\d{4}"` e `title` explicando o formato.
- [x] **`type="date"`** no campo `#data-retorno`, com data mínima igual a hoje (definida em `js/formulario.js`).
- [x] **`type="number"`** no campo `#participantes`, com `min="1"`, `max="10000"` e `step="1"`.
- [x] **`pattern`** em 2 campos: telefone e CEP (`\d{5}-?\d{3}`).
- [x] **`minlength`** em 2 campos: nome (2) e mensagem (10).
- [x] **`<label for>`** em todos os 13 campos (a auditoria encontrou 0 campos sem rótulo). O endereço fica agrupado em `<fieldset>` com `<legend>`.
- [x] Dicas e erros ligados aos campos por `aria-describedby`, em 14 áreas `aria-live="polite"`.
- [x] Busca de endereço pelo CEP (ViaCEP) em `js/cep.js`, testada com `01310-100`, com um CEP incompleto e com um CEP inexistente (`docs/testes.md`, seções 6 e 10.2).

## 4. Multimídia (`public/midia.html`)

- [x] **`<video>` com `controls` e `poster`**: `<video id="video-coleta" controls preload="metadata" poster="img/poster-coleta-seletiva.webp">`, com o arquivo local `video/coleta-seletiva-cooperativas.webm` (TV Senado, CC BY 3.0) e link de download como alternativa.
- [x] **`<audio>` com `controls`**: `<audio controls preload="none">`, reportagem da Rádio Senado, com resumo em texto e link para a transcrição.
- [x] **`<iframe>`**: vídeo da TV Brasil no YouTube (`youtube-nocookie.com`), com `title` descritivo e `loading="lazy"`.
- [x] Nada toca sozinho: 0 ocorrências de `autoplay`.
- [x] Fonte, autor e licença de cada mídia em `<figcaption>`.
- [ ] **Legendas (`<track>`) no vídeo local**: o vídeo da TV Senado não tem legendas publicadas na fonte, então não há `<track>` (0 na página). A alternativa adotada é um resumo em texto ligado ao vídeo por `aria-describedby="video-local-resumo"`. Ele cobre o conteúdo, mas não substitui uma legenda sincronizada.

## 5. Acessibilidade

- [x] **`alt`**: 8 de 8 imagens com `alt` descritivo (0 sem `alt`, 0 com `alt` vazio). Os ícones decorativos em SVG têm `aria-hidden="true"`.
- [x] **Contraste WCAG AA**: todas as combinações de cor medidas passam (`docs/testes.md`, seção 3). O novo vermelho de erro, `--color-erro: #b3261e`, tem 6,17:1 sobre o fundo e 5,62:1 sobre o verde-claro.
- [x] **Teclado**: navegação completa, link para pular ao conteúdo, nenhum `tabindex` positivo e foco visível em dois tons (`a:focus-visible, button:focus-visible…` em `css/style.css`). Os botões novos do vídeo e do formulário também foram testados pelo teclado (`docs/testes.md`, seção 10.3).
- [x] **`lang="pt-BR"`** nas 10 páginas e no exemplo.
- [x] **ARIA só onde o HTML não resolve**: `aria-current`, `aria-live`, `aria-invalid`, `aria-describedby`, `aria-expanded` (EcoBot) e `aria-pressed` (botão de reproduzir).
- [x] **Nunca `alert()`**: 0 ocorrências nos scripts do site (`public/js/`). O exemplo da equipe tem `alert()` e foi mantido sem mudar a lógica (ver a seção 8).
- [x] `prefers-reduced-motion` respeitado em `css/style.css`.
- [x] Lighthouse, categoria Acessibilidade: 100 nas 10 páginas (`docs/testes.md`, seção 4, teste de 10/11/2026).
- [ ] **Teste manual com leitor de tela (NVDA)**: ainda pendente. A estrutura foi verificada de forma automática (`docs/testes.md`, seção 4), mas ninguém da equipe ouviu as páginas com o NVDA.

## 6. Validação W3C com evidências

- [x] **As 10 páginas HTML com 0 erros e 0 avisos** no Nu Html Checker: capturas `docs/evidencias/w3c-<página>.png` e relatórios `w3c-<página>.json`.
- [x] **Páginas alteradas nesta etapa validadas de novo** em 16/11/2026 (vnu 26.11.14): `w3c-contato.*` e `w3c-midia.*`.
- [x] **Exemplo de localStorage** válido: `docs/evidencias/w3c-exemplo-local-storage.png` e `.json` (0 erros, 0 avisos).
- [x] **CSS válido** (0 erros) no W3C CSS Validator, revalidado em 16/11/2026: `docs/evidencias/w3c-css.json`. Os 9 avisos não são erros (variáveis CSS, `-webkit-font-smoothing` e `clip`).

## 7. Documentação

- [x] **README** (`README.md`): equipe, tecnologias, recursos de JavaScript da Aula 07, exemplo de localStorage, como rodar, estrutura, documentação e publicação.
- [x] **Diário de bordo** (`docs/diario-de-bordo.md`): entradas por data, incluindo a de 16/11/2026 (Aula 07).
- [x] **Orçamento de hospedagem** (`docs/orcamento.md` e a página `orcamento_hospedagem.html`), com fontes e datas de consulta.
- [x] **Testes** (`docs/testes.md`): W3C, teclado, contraste, leitor de tela, responsividade, formulário, links e EcoBot, mais a nova seção 10 (JavaScript da Aula 07). Todos os resultados vêm de testes executados.
- [x] **Escopo** (`docs/escopo-projeto.md`, com o `.docx` e o `.pdf` gerados de novo em 16/11/2026). A seção 9 descreve o JavaScript usado.
- [x] **Evidências** em `docs/evidencias/`: W3C, responsividade e capturas dos recursos de JavaScript (`js-validacao-erros-contato.png`, `js-validacao-mensagem-9-caracteres.png` e `js-controles-video-midia.png`).
- [x] **Fontes** (`docs/fontes.md`), **roteiro da apresentação** (`docs/roteiro-apresentacao.md`) e este checklist.

## 8. JavaScript da Aula 07

- [x] **JavaScript externo com `defer`**: todos os `<script>` das 10 páginas têm `defer`. Em `contato.html` são 4 de 4 (`cep.js`, `formulario.js`, `rascunho.js` e `ecobot.js`); em `midia.html`, 2 de 2 (`midia.js` e `ecobot.js`).
- [x] **`let`/`const`, sem `var`**: 0 `var` nos 5 arquivos de `public/js/`.
- [x] **Arrow functions**: em `formulario.js` (25), `rascunho.js` (12) e `midia.js` (11). Os arquivos mais antigos, `cep.js` e `ecobot.js`, ainda usam `function` e funcionam do mesmo jeito. Eles não foram reescritos para não mexer no ViaCEP e no EcoBot.
- [x] **camelCase**: `buscarCep`, `validarCampo`, `salvarRascunho`, `atualizarBotaoPlay`, `mudarVolume` etc.
- [x] **DOM**: `document.getElementById`, `textContent`, `innerText` (no botão de reproduzir), `setAttribute`/`removeAttribute`, `classList` e `focus()`.
- [x] **`addEventListener`** em todos os scripts (`click`, `input`, `change`, `submit`, `reset`, `play`, `pause`, `ended`, `DOMContentLoaded`).
- [x] **Validação com `preventDefault`** (`formulario.js`, no evento `submit`): limpa os erros antigos e confere nome (`trim`), e-mail (`includes("@")` e `includes(".")`), telefone (`regexTelefone`) e mensagem (`tamanhoMinimoMensagem = 10`), além de CEP, endereço, data e quantidade.
- [x] **Atividade da seção 11 (mensagem com pelo menos 10 caracteres)**: erro em vermelho logo abaixo do campo (`#mensagem-erro`). Testado com 9 caracteres (inválido) e com 10 (válido).
- [x] **Erros acessíveis**: texto abaixo do campo com `aria-live`, `aria-describedby`, `aria-invalid="true"`, borda vermelha (`[aria-invalid="true"]` em `css/style.css`) e foco no primeiro campo com erro. O `<form>` tem `novalidate`.
- [x] **localStorage** (`rascunho.js`): `setItem` a cada `input`, `getItem` + `JSON.parse` no `DOMContentLoaded`, `JSON.stringify` e `removeItem` no botão "Limpar dados" (`type="button"`), com `try/catch` em todos os acessos. Só nome, e-mail, telefone e mensagem são salvos, e o envio válido mantém os dados.
- [x] **Avisos sem `alert()`**: "Rascunho recuperado" e "Dados apagados" aparecem em `#rascunho-status` (`aria-live="polite"`), e abaixo do formulário há a nota "Seus dados ficam salvos só neste navegador até você clicar em Limpar dados.".
- [x] **API de mídia** (`midia.js`): `video.paused`, `play()`, `pause()` e `innerText` no botão "▶ Reproduzir"/"⏸ Pausar" (com `aria-label` e `aria-pressed`); `currentTime = 90` em "Pular para 1:30"; `volume` de 0,0 a 1,0, em passos de 0,1, sem passar dos limites. O atributo `controls` continua no vídeo.
- [x] **Botão do iframe**: "Já assisti ao vídeo", com `addEventListener("click")`, mostra a mensagem em `#assisti-status` (`aria-live="polite"`).
- [x] **Exemplo da equipe** em `public/exemplos/teste-local-storage/` (`scriptstorage.html` e `scriptstorage.js`), com link no README e em `docs/testes.md`. A lógica é a original; só entraram `<title>`, `lang="pt-BR"` e `<label for>`.
- [x] **`fetch`** com `async/await`: ViaCEP (`cep.js`) e EcoBot (`ecobot.js`).

## 9. Publicação

- [x] **GitHub**: repositório público https://github.com/fragosof623-rgb/F-SCS-DESWEB-ADS-M-02-2026-ELO-SOLIDARIO, branch `main`.
- [x] **Railway**: site no ar em https://f-scs-desweb-ads-m-02-2026-elo-solidario-production.up.railway.app (respondeu 200 em 16/11/2026), publicado automaticamente a cada `git push` no `main`.
- [x] **Segredos fora do código**: a chave da API fica só em variável de ambiente; `.env`, `node_modules/` e `.vscode/` estão no `.gitignore`.
- [ ] **Resposta da IA do EcoBot testada**: o `.env` local não tem a chave, então a resposta da IA só pode ser testada no site do Railway. A interface e as mensagens de erro (sem chave, pergunta vazia, pergunta longa e limite por minuto) foram testadas (`docs/testes.md`, seção 8).

## 10. Fontes reais

- [x] Toda iniciativa, dado, imagem, vídeo, áudio, notícia e preço de terceiros tem fonte identificável na própria página e em `docs/fontes.md`.
- [x] Os dados de contato são fictícios e estão marcados assim na página (`.nota-ficticia` em `contato.html`).
- [x] Links externos verificados: 40 de 42 responderam 200; os outros 2 são `preconnect` das fontes do Google, não links clicáveis (`docs/testes.md`, seção 7).

---

## Pendências

1. **Teste manual com NVDA** (seção 5): ouvir pelo menos `index.html`, `contato.html` (com erros e com o aviso de rascunho) e `midia.html` (botões do vídeo) e registrar o resultado em `docs/testes.md`.
2. **Resposta da IA do EcoBot no Railway** (seção 9): fazer uma pergunta no site publicado e registrar o resultado. Vale ensaiar antes da apresentação.
3. **Legendas do vídeo da TV Senado** (seção 4): só se a equipe quiser ir além do resumo em texto. Seria preciso escrever um arquivo `.vtt` com a transcrição do vídeo e ligá-lo com `<track kind="captions" srclang="pt">`.
