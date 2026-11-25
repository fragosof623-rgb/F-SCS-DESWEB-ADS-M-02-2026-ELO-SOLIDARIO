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

## 16/11/2026 — Conteúdos da Aula 07 (JavaScript)

- **O que foi feito:**
  - **Exemplo da equipe.** O exemplo "Teste Local Storage JS" foi movido para
    `public/exemplos/teste-local-storage/` (arquivos `scriptstorage.html` e `scriptstorage.js`) e abre no site
    em `/exemplos/teste-local-storage/scriptstorage.html`. A lógica não mudou; o HTML ganhou só um `<title>`
    descritivo, `lang="pt-BR"` e `<label for>` nos dois campos, para passar no W3C.
  - **Rascunho no formulário de contato (`public/js/rascunho.js`).** Nome, e-mail, telefone e mensagem são
    salvos no localStorage a cada digitação e recuperados quando a página abre de novo, como no exemplo da
    aula. Um envio válido não apaga os dados; só o novo botão "Limpar dados" apaga (`removeItem`). Os avisos
    "Rascunho recuperado" e "Dados apagados" aparecem numa área `aria-live`. CEP, endereço, data e número de
    participantes não são salvos.
  - **Validação com JavaScript (`public/js/formulario.js`).** No envio: `preventDefault`, limpeza dos erros
    antigos e conferência de cada campo (nome com `trim`, e-mail com "@" e ".", telefone por expressão
    regular, mensagem com pelo menos 10 caracteres, que é a atividade da seção 11 da aula, além de CEP,
    endereço, data e quantidade). Cada erro aparece em vermelho logo abaixo do campo, com `aria-invalid`,
    `aria-describedby` e borda vermelha, e o foco vai para o primeiro campo com erro.
  - **Controles de mídia (`public/js/midia.js`).** O vídeo da TV Senado ganhou botões próprios:
    reproduzir/pausar, pular para 1:30 (desafio do Projeto A2) e diminuir/aumentar o volume. Abaixo do vídeo
    do YouTube entrou o botão "Já assisti ao vídeo".
  - **Documentação.** Foram atualizados a seção 9 do escopo (com o `.docx` e o `.pdf` gerados de novo), o
    `testes.md` (nova seção 10, com os testes executados), este diário e o README. Foram criados o roteiro
    da apresentação (`roteiro-apresentacao.md`) e o checklist da A2 (`checklist-a2.md`).
- **Responsável:** Felipe Fragoso (envio pelo Git, com apoio do Claude Code). O exemplo de localStorage é da
  equipe.
- **Dificuldades e decisões:**
  - **Envio e limpeza do formulário.** Antes, `cep.js` limpava o formulário depois do envio (`form.reset()`),
    o que apagaria o rascunho. O envio passou para `formulario.js`, que não limpa nada. O `cep.js` agora só
    cancela a consulta ao ViaCEP quando a pessoa clica em "Limpar dados".
  - **`novalidate`.** Sem ele, as bolhas do navegador apareceriam antes das mensagens do JavaScript. Os
    atributos HTML5 (`required`, `pattern`, `minlength`) continuam no código.
  - **Defeito encontrado.** O código antigo dos campos de data e quantidade chamava `checkValidity()` dentro
    do próprio evento `invalid`. Isso pode disparar o evento de novo, sem fim. Com `novalidate` esses ouvintes
    deixaram de ser necessários e foram removidos; a validação agora usa `validity` diretamente.
  - **Cor de erro.** O erro usava a cor terracota. Foi criada a variável `--color-erro` (`#b3261e`), um
    vermelho com contraste de 6,17:1 sobre o fundo do site (mínimo AA: 4,5:1).
  - **Telefone.** O `pattern` do HTML foi ajustado para a mesma regra da expressão regular do JavaScript:
    DDD entre parênteses e hífen, por exemplo (11) 91234-5678.
  - **`alert()` no exemplo.** O exemplo da equipe usa `alert()`. Ele foi mantido sem mudar a lógica, mas o
    site em si não usa `alert()`: as mensagens aparecem na página.

## 16/11/2026 (noite) — EcoBot oculto sem chave, roteiro e checklist

- **O que foi feito:**
  - **EcoBot oculto sem chave.** O EcoBot depende de uma chave de API paga, que esta versão acadêmica não tem.
    Para o botão "Falar com o EcoBot" não aparecer sem funcionar, foi criada a rota `GET /api/status` em
    `server.js`. Ela responde só `{"ecobot": true}` ou `{"ecobot": false}`, conforme a variável
    `ANTHROPIC_API_KEY` exista ou não, e nunca devolve a chave. O `public/js/ecobot.js` consulta essa rota antes
    de montar o chat: se a resposta for `false`, ou se a consulta falhar, nada é criado na página. Quando a chave
    for cadastrada no servidor, o EcoBot volta a aparecer sozinho. O `lib/ia.js` não foi alterado.
  - **Acessibilidade.** Os atalhos do EcoBot continuam listados em `acessibilidade.html`, agora com a observação
    "(quando o assistente estiver ativo)".
  - **Roteiro.** A demonstração do EcoBot saiu da apresentação. A demonstração ao vivo passou a ter 9 passos e o
    tempo total, cerca de 14 minutos. No slide de GitHub + Railway entrou uma frase explicando por que o EcoBot
    está desativado.
  - **Checklist.** As legendas do vídeo foram marcadas como atendidas pela alternativa em texto. O EcoBot foi
    registrado como recurso extra, não exigido pela A2. O teste com NVDA virou um passo a passo na seção "Testes
    recomendados antes da apresentação".
  - **Testes.** Nova seção 11 em `docs/testes.md`: rota `/api/status` com e sem a chave e EcoBot oculto nas
    10 páginas.
- **Responsável:** Felipe Fragoso (envio pelo Git, com apoio do Claude Code).
- **Dificuldades e decisões:**
  - **Teste com e sem chave.** Para testar o caso "com chave" sem usar uma chave verdadeira, um segundo servidor
    local foi iniciado com um valor falso na variável. A rota só verifica se a variável existe, então o valor
    falso basta para simular a presença da chave.
  - **Favicon.** Os testes numa primeira visita mostraram um erro 404 no console, porque o navegador pede
    `/favicon.ico` sozinho e o site não tem esse arquivo. O servidor passou a responder "sem conteúdo" (204)
    nesse endereço.

## 24/11/2026 — Migração da hospedagem do Railway para o Render

- **O que foi feito:**
  - **Nova hospedagem.** O período de teste gratuito do Railway acabou, e o site saiu do ar no endereço antigo.
    Ele foi publicado no **Render, plano Free**, no endereço https://elo-solidario.onrender.com (respondeu 200
    em 24/11/2026). O código não mudou: o Render executa `npm install` e `npm start`, como o Railway fazia.
  - **Links.** O endereço antigo do Railway foi trocado pelo novo no README e na documentação (`docs/`).
  - **Orçamento.** Em `orcamento_hospedagem.html` e `docs/orcamento.md`, o Render Free passou a ser marcado como
    a hospedagem usada hoje, com a explicação da migração e da limitação do plano grátis. O Railway Hobby
    continua na tabela como alternativa paga (US$ 5 por mês), e a estimativa de custo anual ganhou as linhas do
    Render Free.
  - **Publicação.** Os documentos que diziam que a publicação era automática a cada `git push` agora explicam
    que, no Render, ela é feita pelo botão **Manual Deploy → Deploy latest commit** no painel.
  - **Comentários e regras.** As menções ao "painel do Railway" em `server.js`, `lib/ia.js`, `.env.example`,
    `CLAUDE.md` e `.cursor/rules/seguranca-segredos.mdc` passaram a citar o Render.
- **Responsável:** Felipe Fragoso (publicação e envio pelo Git, com apoio do Claude Code); Kaue Cândido Alberti
  (página de orçamento e documentação, conforme o escopo).
- **Dificuldades e decisões:**
  - **Limitação do plano grátis.** O serviço "dorme" após 15 minutos sem acesso, e o primeiro acesso depois
    disso leva cerca de 50 segundos. A recomendação é abrir o site alguns minutos antes da apresentação.
  - **Por que o Render Free.** Ele roda o servidor Node sem custo. O Railway Free tem pouca memória e não aceita
    domínio próprio; o Railway Hobby resolveria a espera, mas é pago.
  - **Histórico.** As entradas anteriores deste diário, que falam do Railway, foram mantidas como estavam,
    porque registram o que aconteceu na época.
