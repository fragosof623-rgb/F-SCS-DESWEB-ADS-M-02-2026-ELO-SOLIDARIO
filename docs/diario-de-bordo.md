# Diário de bordo — Elo Solidário

Registro cronológico do desenvolvimento do site, feito pela equipe NEXT HTML. As informações vêm do histórico
do Git (`git log`) e dos documentos do projeto ([`escopo-projeto.md`](escopo-projeto.md),
[`plano-contexto.md`](plano-contexto.md) e [`fontes.md`](fontes.md)).

**Sobre o campo "Responsável":** indica quem responde pela entrega conforme a divisão de tarefas do escopo
(seção 10). Todos os commits do repositório foram enviados pela conta do GitHub de Felipe Fragoso
(`fragosof623`), e desde 27/10/2026 vários deles foram feitos com o apoio do Claude Code (ferramenta de IA),
como indica a linha `Co-Authored-By` de cada commit.

---

## 22/09/2026 — Escopo do projeto

- **O que foi feito:** a equipe definiu o tema (economia solidária), o objetivo, o público (com prioridade
  para pessoas com deficiência), as 10 páginas, os requisitos de acessibilidade, as tecnologias e o
  cronograma. O resultado foi o documento de escopo (`docs/escopo-projeto.md`, `.docx` e `.pdf`).
- **Responsável:** Felipe Fragoso (etapa 1 do cronograma: escopo e `index.html`).
- **Dificuldades e decisões:** dividir as 10 páginas entre os integrantes, em etapas, seguindo a ordem da lista
  de integrantes. A acessibilidade foi definida como prioridade de todas as decisões de layout e código.

## 20/10/2026 — Criação do repositório e primeira publicação no Railway

- **O que foi feito:** criação do repositório no GitHub (commit `d4e0cb8`, "Initial commit", às 21h38). Às
  21h47, envio do código-fonte inicial (commit `6c6caaf`): `index.html`, `css/style.css` e os arquivos do
  escopo. Às 21h53 ocorreu a primeira publicação automática no Railway, ligada ao repositório.
- **Responsável:** Felipe Fragoso ("Enviado por: Felipe Fragoso", na mensagem do commit `6c6caaf`).
- **Dificuldades e decisões:** escolha do GitHub para versionamento e do Railway para publicação automática a
  cada envio ao branch `main`.

## 27/10/2026 — Página de contato com busca de CEP (ViaCEP)

- **O que foi feito:** commit `ad40146`. Criação de `contato.html`: formulário acessível com validação
  HTML5, dados fictícios de contato e lista da equipe. Também foi criado `js/cep.js`: máscara do CEP,
  consulta à API pública ViaCEP e mensagens anunciadas com `aria-live`. Os estilos do formulário foram
  acrescentados ao CSS.
- **Responsável:** Felipe Fragoso (`contato.html`).
- **Dificuldades e decisões:**
  - **Saída de um integrante.** Com a saída de um integrante da equipe, o escopo foi atualizado: a equipe
    passou a ter 5 integrantes.
  - **Redistribuição das tarefas.** A etapa 5 do cronograma (`noticias.html` e `contato.html`) foi dividida
    entre Kaue Cândido Alberti (`noticias.html`) e Felipe Fragoso (`contato.html`).
  - **Envio simulado.** O formulário não envia dados a nenhum servidor: o envio é simulado, porque o site
    é acadêmico e não coleta dados pessoais.

## 27/10/2026 — Reorganização para Node.js + Railway e criação do EcoBot

- **O que foi feito:** commit `69eaf3b`.
  - **Organização dos arquivos.** As páginas e os recursos foram movidos para `public/`.
  - **Páginas novas.** Foram criadas as 8 páginas que faltavam, com o mesmo cabeçalho, menu e rodapé.
  - **Servidor.** Foi criado o `server.js` (Express), que entrega o site e a rota `POST /api/chat`.
  - **EcoBot.** `lib/ia.js` passou a chamar a API do Claude pelo SDK oficial, e `public/js/ecobot.js` monta
    o chat acessível.
  - **Documentação e regras.** Foram criados o `docs/plano-contexto.md` e as regras do projeto para
    ferramentas de IA (`.cursor/rules/`, `CLAUDE.md`).
- **Responsável:** Felipe Fragoso (envio pelo Git).
- **Dificuldades e decisões:**
  - **Proteção da chave da API.** Para o EcoBot funcionar sem expor a chave da API no navegador, o site
    deixou de ser só estático e passou a ter um servidor Node. A chave fica apenas em variável de ambiente
    (`.env` local, fora do Git, ou o painel do Railway).
  - **Correção do skip-link.** Foi corrigido o link "Pular para o conteúdo", que aparecia no topo das
    páginas.

## 09/11/2026 — Finalização das 10 páginas com conteúdo real e fontes

- **O que foi feito:** commit `67bad08`.
  - **Páginas concluídas.** Foram finalizadas `projetos`, `impacto`, `galeria`, `midia`, `noticias` e
    `orcamento_hospedagem`, e os avisos de "Página em construção" foram retirados.
  - **Fontes.** Toda fonte de terceiros foi registrada em `docs/fontes.md`, com link e data de consulta.
  - **Validação.** As 10 páginas passaram no W3C Validator sem erros.
  - **Documentação.** O escopo, o plano de contexto e o README foram atualizados.
- **Responsáveis (conforme o escopo):**
  - Breno Oliveira da Silva: `sobre` e `projetos`.
  - Gustavo Mariano Carvalho: `impacto` e `acessibilidade`.
  - Jihady Nikuluz Cardoso: `galeria` e `midia`.
  - Kaue Cândido Alberti: `noticias`, `orcamento_hospedagem` e documentação.
  - Felipe Fragoso: `index` e `contato`.
- **Dificuldades e decisões:** a regra adotada foi não publicar nenhum dado, notícia ou imagem sem fonte real
  e identificável. Por isso cada item de terceiros tem a fonte indicada na própria página e em
  `docs/fontes.md`.

## 10/11/2026 — Requisitos finais da Atividade A2

- **O que foi feito:**
  - **Formulário (`contato.html`).** Ganhou um campo de data (`type="date"`, sem datas passadas) e um campo
    numérico (`type="number"`, de 1 a 10.000, só inteiros). Cada campo tem rótulo, dica e mensagem de erro
    anunciada (`public/js/formulario.js`).
  - **Vídeo (`midia.html`).** Ganhou um vídeo hospedado no próprio site (`<video>`): uma produção da TV
    Senado de 2018, com licença CC BY 3.0, baixada do Wikimedia Commons. O vídeo tem imagem de capa
    (poster), legenda com autor, licença e link, e um resumo em texto.
  - **Documentação.** Foram criados este diário, `orcamento.md` e `testes.md`, e as evidências da validação
    W3C foram salvas em `docs/evidencias/`. O `.docx` e o `.pdf` do escopo foram gerados de novo a partir do
    `.md`, e o README ganhou a seção "Documentação".
- **Responsável:** Felipe Fragoso (envio pelo Git, com apoio do Claude Code), sobre as páginas de cada
  integrante.
- **Dificuldades e decisões:**
  - **Vídeo sem legendas.** O vídeo não tem legendas publicadas no Wikimedia Commons, por isso não foi usado
    `<track>`. No lugar entrou um resumo em texto, ligado ao vídeo por `aria-describedby`.
  - **Tamanho do vídeo.** Foi usada a versão em 480p (cerca de 10 MB) gerada pelo próprio Commons, para
    manter o arquivo leve.
  - **Contraste no rodapé.** Os testes encontraram um problema real: o link "Saiba mais sobre
    acessibilidade", no rodapé, tinha contraste de 1,6:1. O CSS foi corrigido, e o contraste passou de
    4,5:1 em todas as páginas.
  - **Contorno de foco.** O contorno dourado (`#c98a1d`) tinha só 2,78:1 sobre o fundo claro, abaixo do mínimo
    de 3:1 para indicadores de interface. Ele virou um foco em dois tons: um anel branco junto ao elemento e um
    anel verde-escuro por fora. Assim o foco fica visível tanto nos fundos claros quanto nos escuros.
  - **Rolagem horizontal.** Também foi corrigida uma rolagem horizontal na página de hospedagem em telas
    pequenas: os textos ocultos da tabela escapavam da área com rolagem.
  - **Evidências.** As capturas de tela do validador foram geradas com o navegador. Os relatórios JSON do
    próprio validador também foram salvos, como evidência complementar.
