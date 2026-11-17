# Plano e resultados de testes — Elo Solidário

Este documento reúne o plano de testes do site e os resultados obtidos. Todos os testes abaixo foram
**executados de verdade** entre 09/11/2026 e 10/11/2026 e, para os recursos de JavaScript da Aula 07
(seção 10), em 16/11/2026, no servidor local (`npm run dev`,
http://localhost:3000), com o Google Chrome no Windows 11. As evidências ficam em [`evidencias/`](evidencias/).

Resumo:

| Área | Resultado |
|---|---|
| Validação W3C (10 páginas + exemplo de localStorage) | ✅ 0 erros e 0 avisos em todas |
| Navegação por teclado | ✅ Aprovado |
| Contraste (WCAG AA) | ✅ Aprovado, depois de 2 correções feitas durante os testes |
| Leitor de tela (estrutura semântica) | ✅ Aprovado na verificação automática; teste manual com NVDA ainda pendente |
| Responsividade (celular, tablet e desktop) | ✅ Aprovado, depois de 1 correção feita durante os testes |
| Formulário de contato | ✅ Aprovado (casos válidos e inválidos) |
| Links | ✅ Aprovado |
| EcoBot (recurso extra) | ✅ Interface e validações aprovadas; oculto quando o servidor não tem a chave (seção 11) |
| JavaScript da Aula 07 (localStorage, validação JS, controles de mídia) | ✅ Aprovado (seção 10) |
| Rota `/api/status` e EcoBot oculto sem chave | ✅ Aprovado (seção 11) |

---

## 1. Validação W3C (HTML)

- **Ferramenta:** Nu Html Checker do W3C, <https://validator.w3.org/nu/> (versão `vnu 26.11.9`, conforme a
  página de resultado).
- **Como:** o código de cada página foi enviado ao validador pela opção "text input".
- **Data:** 09/11/2026, entre 23h30 e 23h58. Em 10/11/2026, `midia.html` foi validada de novo depois de
  uma pequena mudança de texto (a lista "Como a mídia é publicada"). As outras páginas não mudaram desde
  então; só o CSS foi ajustado. Em **16/11/2026**, depois das mudanças da Aula 07, `contato.html`,
  `midia.html` e o exemplo `exemplos/teste-local-storage/scriptstorage.html` foram validados de novo
  (versão `vnu 26.11.14`), e as capturas e os relatórios JSON dessas páginas foram substituídos. Depois, na mesma
  data, `acessibilidade.html` foi validada de novo, por causa da observação "(quando o assistente estiver ativo)".
- **Evidências:** uma captura de tela da página de resultado por página (`w3c-<página>.png`) e o relatório
  completo do validador em JSON (`w3c-<página>.json`, gerado com `?out=json`).

| Página | Erros | Avisos | Mensagens informativas* | Captura | Relatório |
|---|---|---|---|---|---|
| `index.html` | 0 | 0 | 8 | [w3c-index.png](evidencias/w3c-index.png) | [JSON](evidencias/w3c-index.json) |
| `sobre.html` | 0 | 0 | 8 | [w3c-sobre.png](evidencias/w3c-sobre.png) | [JSON](evidencias/w3c-sobre.json) |
| `projetos.html` | 0 | 0 | 8 | [w3c-projetos.png](evidencias/w3c-projetos.png) | [JSON](evidencias/w3c-projetos.json) |
| `impacto.html` | 0 | 0 | 8 | [w3c-impacto.png](evidencias/w3c-impacto.png) | [JSON](evidencias/w3c-impacto.json) |
| `acessibilidade.html` (16/11, de novo) | 0 | 0 | 8 | [w3c-acessibilidade.png](evidencias/w3c-acessibilidade.png) | [JSON](evidencias/w3c-acessibilidade.json) |
| `galeria.html` | 0 | 0 | 16 | [w3c-galeria.png](evidencias/w3c-galeria.png) | [JSON](evidencias/w3c-galeria.json) |
| `midia.html` (16/11) | 0 | 0 | 10 | [w3c-midia.png](evidencias/w3c-midia.png) | [JSON](evidencias/w3c-midia.json) |
| `noticias.html` | 0 | 0 | 8 | [w3c-noticias.png](evidencias/w3c-noticias.png) | [JSON](evidencias/w3c-noticias.json) |
| `contato.html` (16/11) | 0 | 0 | 20 | [w3c-contato.png](evidencias/w3c-contato.png) | [JSON](evidencias/w3c-contato.json) |
| `orcamento_hospedagem.html` | 0 | 0 | 8 | [w3c-orcamento_hospedagem.png](evidencias/w3c-orcamento_hospedagem.png) | [JSON](evidencias/w3c-orcamento_hospedagem.json) |
| [`exemplos/teste-local-storage/scriptstorage.html`](../public/exemplos/teste-local-storage/scriptstorage.html) (16/11) | 0 | 0 | 0 | [w3c-exemplo-local-storage.png](evidencias/w3c-exemplo-local-storage.png) | [JSON](evidencias/w3c-exemplo-local-storage.json) |

\* As mensagens informativas não são erros nem avisos. São todas do tipo "Trailing slash on void elements
has no effect": a barra no fim de tags como `<meta ... />` e `<img ... />` é permitida no HTML5 e não muda
nada.

**Resultado:** ✅ as 10 páginas e o exemplo passaram sem erros e sem avisos.

**CSS:** o arquivo `public/css/style.css`, já com as correções da seção 3 e da seção 5, foi validado em
10/11/2026 e de novo em 16/11/2026, com os estilos novos da Aula 07, no W3C CSS Validator
(<https://jigsaw.w3.org/css-validator/>, perfil CSS3 + SVG). Resultado:
**válido, 0 erros** ([relatório JSON](evidencias/w3c-css.json)). Houve 9 avisos, nenhum de erro:

- 7 avisos dizem que as variáveis CSS não são verificadas estaticamente.
- 1 aviso aponta `-webkit-font-smoothing`, uma extensão de navegador.
- 1 aviso aponta a propriedade `clip`, usada na classe `.visually-hidden`, que o validador marca como
  obsoleta.

## 2. Navegação por teclado

Teste feito com teclas reais (Tab, Enter e Esc) enviadas ao Chrome, complementado por um script que coloca o
foco em cada elemento interativo de cada página.

| Caso | Esperado | Resultado |
|---|---|---|
| 1º Tab em `index.html` | Foco no link "Pular para o conteúdo principal", visível | ✅ Link aparece com contorno de foco |
| Enter no link de pular | Ir para `#conteudo-principal`; o próximo Tab fica dentro do `<main>` | ✅ O próximo foco foi "O que é economia solidária?", dentro do `<main>` |
| Ordem do foco nas 10 páginas | Nenhum `tabindex` positivo, ordem igual à do código | ✅ 0 `tabindex` positivo em todas |
| Foco visível em todos os elementos interativos (10 páginas, 19 a 35 por página) | Contorno visível em todos | ✅ Todos com contorno de 3 px (ver contraste do foco na seção 3) |
| EcoBot: Enter no botão "Falar com o EcoBot" | Abre o painel e o foco vai para o campo de pergunta | ✅ `aria-expanded="true"`, foco em `#ecobot-entrada` (rótulo "Sua pergunta") |
| EcoBot: digitar e apertar Enter | Envia a pergunta | ✅ Pergunta enviada e resposta anunciada na área `aria-live` |
| EcoBot: Esc | Fecha o painel e devolve o foco ao botão | ✅ `aria-expanded="false"` e foco de volta ao botão |
| Formulário | Todos os campos alcançáveis por Tab; ao enviar com erro, o foco vai para o primeiro campo inválido | ✅ Ao enviar vazio, o foco foi para "nome" |
| Vídeo e áudio de `midia.html` | Controles nativos acessíveis por teclado, nada toca sozinho | ✅ `controls` presente, sem `autoplay` |

**Resultado:** ✅ aprovado.

## 3. Contraste (WCAG 2.2, nível AA)

**Como foi testado:**

- **Texto (automático).** Um script percorreu todos os textos visíveis de cada página (de 46 a 91 trechos
  por página). Para cada um, calculou a razão de contraste entre a cor do texto e a cor de fundo real,
  segundo a fórmula da WCAG. O mínimo exigido é 4,5:1 para texto normal e 3:1 para texto grande.
- **Lighthouse.** Confirmação com o Lighthouse (Chrome DevTools), categoria Acessibilidade.
- **Foco.** O contorno de foco foi medido contra o fundo ao redor. O mínimo exigido é 3:1 para indicadores
  de interface.

**Pares principais da paleta:**

| Texto | Fundo | Razão | Situação |
|---|---|---|---|
| Texto `#26332c` | Fundo `#fbf8f2` | 12,44:1 | ✅ |
| Texto secundário `#55635a` | Fundo `#fbf8f2` | 5,97:1 | ✅ |
| Links verdes `#1f6d4c` | Fundo `#fbf8f2` | 5,91:1 | ✅ |
| Terracota `#b5502d` | Cartão `#ffffff` | 5,06:1 | ✅ |
| Texto do rodapé `#eaf2ec` | Verde-escuro `#1f4a34` | 8,82:1 | ✅ |
| Verde-escuro `#1f4a34` | Botão dourado `#e0a72e` | 4,66:1 | ✅ |

**Problemas encontrados e corrigidos durante os testes:**

1. **Link do rodapé.** O link "Saiba mais sobre acessibilidade", no rodapé das 10 páginas, era verde
   `#1f6d4c` sobre o verde-escuro `#1f4a34`, com contraste de **1,60:1**. Foi criada no CSS a regra
   `.footer-col a`, com texto claro `#eaf2ec`, e o contraste passou para **8,82:1**.
2. **Contorno de foco.** O contorno dourado `#c98a1d` tinha **2,78:1** sobre o fundo claro. Ele virou um
   foco em dois tons (anel branco junto ao elemento e anel verde-escuro por fora). O menor contraste de
   foco medido nas 10 páginas passou a ser **8,65:1**.

**Resultado depois das correções:**

- **Texto.** Nenhum texto abaixo do mínimo. O menor contraste encontrado foi 4,66:1, no texto verde-escuro
  sobre os botões dourados.
- **Falso positivo.** Em `midia.html`, o script apontou o texto alternativo de dentro do `<video>`. Esse
  texto só aparece em navegadores que não reproduzem vídeo e não é exibido no Chrome.
- **Lighthouse.** Nota de Acessibilidade 100 nas 10 páginas. Depois do ajuste do contorno de foco,
  `contato.html` (a página com mais elementos interativos) foi auditada de novo e manteve 100.

**Resultado:** ✅ aprovado.

## 4. Leitor de tela

**O que foi verificado** (por análise automática do código e da árvore de acessibilidade do Chrome):

| Item | Resultado |
|---|---|
| `lang="pt-BR"` no `<html>` (pronúncia correta) | ✅ 10/10 páginas |
| Exatamente um `<h1>` por página | ✅ 10/10 |
| Hierarquia de títulos sem saltos (por exemplo, `h2` → `h4`) | ✅ 0 saltos nas 10 páginas |
| Regiões `header`, `nav` (menu e rodapé, com `aria-label`), `main` e `footer` | ✅ Presentes nas 10 páginas |
| Página atual indicada no menu com `aria-current="page"` | ✅ 10/10 |
| Imagens com texto alternativo | ✅ 8 de 8 imagens da galeria com `alt` descritivo |
| `iframe` com `title` | ✅ O vídeo do YouTube em `midia.html` tem `title` descritivo |
| Vídeo e áudio com descrição em texto | ✅ Resumo ligado por `aria-describedby`; o áudio tem também link para a transcrição completa |
| Campos do formulário com `<label for>` | ✅ 0 campos sem rótulo; dicas ligadas por `aria-describedby` |
| Mensagens de erro e de status anunciadas | ✅ `aria-live="polite"` no CEP, na data, no número e no envio (4 áreas), além de `aria-invalid` nos campos com erro. Em 16/11: mais 9 áreas de erro por campo, a área do rascunho e 2 áreas em `midia.html` (seção 10) |
| Respostas do EcoBot anunciadas | ✅ Área de mensagens com `aria-live="polite"` |
| Lighthouse, categoria Acessibilidade | ✅ 100 nas 10 páginas |

**Limitação:** não foi feito um teste manual com um leitor de tela real (NVDA ou Narrador do Windows). A
verificação acima confere a estrutura que o leitor de tela usa, mas não substitui ouvir o site. Teste
recomendado para a equipe:

1. Ativar o NVDA ou o Narrador.
2. Navegar pelos títulos (tecla H) e pelas regiões (tecla D).
3. Preencher o formulário de contato e ouvir as mensagens de erro.
4. Usar o EcoBot, se ele estiver ativo (só aparece quando o servidor tem a chave da API).

**Resultado:** ✅ aprovado na verificação automática; teste manual pendente.

**Teste manual com NVDA:** ainda não executado. O passo a passo está em [`checklist-a2.md`](checklist-a2.md), na seção
"Testes recomendados antes da apresentação". Anote aqui a data, quem testou, as páginas testadas e os problemas
encontrados.

## 5. Responsividade

**Como:** cada uma das 10 páginas foi carregada nas larguras de 320, 375, 768 e 1280 px (40 combinações). Em
cada uma, o teste verificou se surgia rolagem horizontal (página mais larga que a tela). Também foram feitas
capturas com emulação de dispositivo no Chrome DevTools.

| Largura | Dispositivo de referência | Resultado |
|---|---|---|
| 320 px | Celular pequeno | ✅ Sem rolagem horizontal nas 10 páginas |
| 375 px | Celular | ✅ Sem rolagem horizontal nas 10 páginas ([index](evidencias/responsivo-index-celular-375.png), [contato](evidencias/responsivo-contato-celular-375.png), [hospedagem](evidencias/responsivo-hospedagem-celular-375.png)) |
| 768 px | Tablet | ✅ Sem rolagem horizontal ([index](evidencias/responsivo-index-tablet-768.png)) |
| 1280 px | Desktop | ✅ Sem rolagem horizontal ([index](evidencias/responsivo-index-desktop-1280.png)) |

**Problema encontrado e corrigido:**

- **Onde.** Em `orcamento_hospedagem.html`, nas larguras de 320, 375 e 768 px, a página ficava com 769 px
  de largura.
- **Causa.** Os textos ocultos da tabela (classe `.visually-hidden`, que usa `position: absolute`)
  escapavam da área com rolagem da tabela.
- **Correção.** Foi acrescentado `position: relative` à classe `.tabela-wrapper`. Agora a tabela rola só
  dentro da própria caixa, e a página não rola para os lados.

**Resultado:** ✅ aprovado depois da correção. Em telas pequenas, o menu quebra em várias linhas e os
cartões ficam em uma coluna.

## 6. Formulário de contato (`contato.html`)

O teste preencheu os campos no navegador e conferiu a validação, o atributo `aria-invalid` e a mensagem
exibida e anunciada.

| Caso | Entrada | Esperado | Resultado |
|---|---|---|---|
| Data mínima | (carregar a página) | `min` igual à data de hoje | ✅ `min="2026-11-10"` no dia do teste |
| Data passada | ontem | Inválido + mensagem | ✅ "A data de retorno não pode ser anterior a hoje." |
| Data de hoje | hoje | Válido | ✅ Sem erro |
| Data futura | daqui a 30 dias | Válido | ✅ Sem erro |
| Número abaixo do mínimo | `0` | Inválido | ✅ "O número mínimo é 1 pessoa." |
| Número acima do máximo | `10001` | Inválido | ✅ "O número máximo é 10.000 pessoas." |
| Número decimal | `2.5` | Inválido (`step="1"`) | ✅ "Use um número inteiro, sem casas decimais." |
| Número válido | `25` | Válido | ✅ Sem erro |
| CEP incompleto | `0131` | Inválido | ✅ "CEP inválido: digite 8 números, no formato 00000-000." |
| CEP válido (ViaCEP) | `01310100` | Máscara e endereço preenchidos | ✅ Virou `01310-100` e preencheu Avenida Paulista, Bela Vista, São Paulo/SP |
| CEP inexistente | `99999-999` | Mensagem de erro | ✅ "CEP não encontrado. Confira o número ou preencha o endereço manualmente." |
| E-mail inválido | `teste@` | Inválido | ✅ Até 10/11 bloqueado pela bolha do HTML5; em 16/11, pela validação JS: "E-mail inválido: use o formato nome@provedor.com." |
| Telefone inválido | `123` | Inválido (`pattern` + regex no JS) | ✅ "Telefone inválido: use o formato (11) 91234-5678." (16/11) |
| Enviar vazio | nenhum campo | Bloquear e focar o 1º campo obrigatório | ✅ 9 campos obrigatórios inválidos; foco em "nome" |
| Enviar completo | todos os campos válidos (data futura, 12 pessoas, CEP 01310-100, número 1000) | Mensagem de sucesso | ✅ "Obrigado! Sua mensagem foi registrada. (Envio simulado…)". **Mudou em 16/11:** o formulário não é mais limpo depois do envio, para manter o rascunho (seção 10.1) |

**Resultado:** ✅ aprovado. O envio é simulado: o site não guarda nem envia dados pessoais.

## 7. Links

| Teste | Resultado |
|---|---|
| Links e arquivos locais (`href`, `src` e `poster` das 10 páginas: páginas, CSS, JS, imagens, vídeo) | ✅ 24 de 24 responderam 200 |
| Links externos (42 endereços: fontes, notícias, licenças, vídeo, áudio, Wikimedia Commons) | ✅ 40 responderam 200 |
| `https://fonts.googleapis.com` e `https://fonts.gstatic.com` | Respondem 404 na raiz, o que é normal: são apenas `preconnect` (conexão antecipada às fontes), não links clicáveis |

**Resultado:** ✅ aprovado.

## 8. EcoBot

| Caso | Esperado | Resultado |
|---|---|---|
| Pergunta normal, sem chave da API no servidor local | Aviso amigável, sem quebrar o site | ✅ HTTP 503: "O EcoBot ainda não foi configurado neste servidor." |
| Pergunta vazia | Recusar | ✅ HTTP 400: "Escreva uma pergunta para o EcoBot." |
| Pergunta com 1001 caracteres | Recusar (limite de 1000) | ✅ HTTP 400: "A pergunta pode ter no máximo 1000 caracteres." |
| Mais de 10 perguntas por minuto do mesmo IP | Limitar | ✅ HTTP 429: "Muitas perguntas em pouco tempo. Aguarde um minuto e tente de novo." |
| Interface (teclado, `aria-live`, Esc) | Ver seção 2 | ✅ Aprovado |

**Limitação:** o arquivo `.env` local não tem a chave `ANTHROPIC_API_KEY`, por isso a resposta da IA não foi
testada aqui. Esse teste deve ser feito no site publicado no Railway, onde a chave é cadastrada no painel.
Desde 16/11/2026 o EcoBot nem aparece quando o servidor não tem a chave (seção 11). A linha "sem chave" acima continua
valendo para quem chama a rota `POST /api/chat` diretamente.

## 9. Observações do Lighthouse (fora dos critérios de acessibilidade)

Em `midia.html`, a categoria "Boas práticas" ficou em 77. O motivo é um cookie de terceiros criado pelo
player do YouTube (`youtube-nocookie.com`) incorporado na página. Esse cookie não é controlado pelo site, e
o vídeo incorporado foi mantido porque faz parte do conteúdo exigido. As outras 9 páginas tiveram 100 em
"Boas práticas".

## 10. JavaScript da Aula 07 (16/11/2026)

Executados em 16/11/2026 no servidor local (`npm start`, http://localhost:3000), no Google Chrome
(perfil isolado, controlado pelo Chrome DevTools). Os campos foram preenchidos por script, disparando os
eventos `input` e `change`, como acontece quando um usuário digita. Em todas as rodadas o console ficou
**sem erros e sem avisos**.

### 10.1 localStorage no formulário de contato (`public/js/rascunho.js`)

| Caso | Passos | Esperado | Resultado |
|---|---|---|---|
| Salvar | Digitar nome, e-mail e mensagem | Gravar a cada `input` | ✅ Chave `eloSolidario.rascunhoContato` = `{"nome":"Ana Souza","email":"ana@exemplo.com","telefone":"","mensagem":"1234567890"}` |
| Só os campos permitidos | Preencher também o CEP 01310-100, a rua e o número | CEP, endereço, data e participantes **não** são salvos | ✅ O JSON tem só `nome`, `email`, `telefone` e `mensagem`; é a única chave do site |
| Envio válido mantém os dados | Enviar com tudo válido | Sucesso, sem limpar | ✅ Mensagem de sucesso; campos e localStorage continuam preenchidos |
| Recarregar e recuperar | Recarregar a página (F5) | Campos preenchidos no `DOMContentLoaded` e aviso anunciado | ✅ Nome, e-mail e mensagem voltaram; CEP e rua vazios; aviso "Rascunho recuperado…" em área `aria-live="polite"` |
| Limpar dados | Gerar um erro (mensagem "curta") e clicar em "Limpar dados" | `removeItem`, formulário vazio, erros apagados | ✅ `localStorage.getItem(...)` = `null`; campos vazios; 0 campos com `aria-invalid`; aviso "Dados apagados…" |
| Botão não envia o formulário | Conferir o botão | `type="button"` | ✅ `type="button"` |
| localStorage bloqueado | Recarregar com `localStorage` lançando `SecurityError` e digitar | Formulário funciona; aviso amigável; nenhum erro no console | ✅ "O navegador bloqueou o armazenamento local: o rascunho não será salvo, mas o formulário funciona normalmente."; "Limpar dados" continua funcionando |
| Exemplo da equipe | Abrir [`/exemplos/teste-local-storage/scriptstorage.html`](../public/exemplos/teste-local-storage/scriptstorage.html) e digitar | Grava `formNome` e `formEmail` | ✅ Gravou `formNome` = "Teste" e `formEmail` = "t@x.com"; o console mostra só os `console.log` do próprio exemplo |

### 10.2 Validação com JavaScript (`public/js/formulario.js`)

O formulário usa `novalidate`: os atributos HTML5 continuam no código, mas as mensagens vêm do JavaScript.
Cada erro aparece logo abaixo do campo, em vermelho `#b3261e` (6,17:1 sobre o fundo `#fbf8f2`; 5,62:1
sobre o verde-claro). O campo recebe `aria-invalid="true"` e borda vermelha de 3 px (`rgb(179, 38, 30)`,
medido no navegador), e a mensagem fica ligada a ele por `aria-describedby`.

| Campo | Entrada | Esperado | Resultado |
|---|---|---|---|
| Todos | Enviar vazio | `preventDefault`, erros e foco no 1º campo | ✅ "Não foi possível enviar: 9 campos precisam de correção."; foco em `nome` |
| Nome | 3 espaços | Inválido (`trim`) | ✅ "O nome é obrigatório." |
| E-mail | `anaexemplo.com` (sem @) | Inválido | ✅ "E-mail inválido: use o formato nome@provedor.com." |
| E-mail | `ana@exemplo` (sem ponto) | Inválido | ✅ Mesma mensagem |
| E-mail | `ana@exemplo.com` | Válido | ✅ Sem erro; a borda volta ao cinza `rgb(85, 99, 90)` |
| Telefone | `11912345678` | Inválido (regex `/^\(\d{2}\) ?\d{4,5}-\d{4}$/`) | ✅ "Telefone inválido: use o formato (11) 91234-5678." |
| Telefone | `(11) 91234-5678` | Válido | ✅ Sem erro |
| Telefone | `(11) 1234-5678` (fixo) | Válido | ✅ Sem erro |
| Telefone | vazio | Válido (é opcional) | ✅ Sem erro |
| **Mensagem** | **`123456789` (9 caracteres)** | **Inválido** | ✅ **"A mensagem precisa ter pelo menos 10 caracteres (você digitou 9)."** ([captura](evidencias/js-validacao-mensagem-9-caracteres.png)) |
| **Mensagem** | **`1234567890` (10 caracteres)** | **Válido** | ✅ **Sem erro** |
| Erro some ao corrigir | Corrigir o e-mail depois do erro | A mensagem some enquanto a pessoa digita | ✅ Erro apagado no evento `input` |
| Foco no 1º erro | Nome e e-mail válidos, endereço vazio | Foco no 1º campo com erro | ✅ Foco em `cep`; "6 campos precisam de correção." |
| Data e número (regressão) | data passada; `0`, `10001`, `2.5`, `25`; data de hoje e daqui a 30 dias | Iguais à seção 6 | ✅ Mesmas mensagens da seção 6; `min="2026-11-16"` no dia do teste |
| ViaCEP (regressão) | `01310100`; `0131`; `99999999` | Iguais à seção 6 | ✅ Avenida Paulista, Bela Vista, São Paulo/SP; mensagem de formato; "CEP não encontrado…" |

Captura com vários erros: [js-validacao-erros-contato.png](evidencias/js-validacao-erros-contato.png).

### 10.3 Controles do vídeo e botão do iframe (`public/js/midia.js`)

| Caso | Esperado | Resultado |
|---|---|---|
| Estado inicial | Botão "▶ Reproduzir", `aria-label="Reproduzir o vídeo"`, `aria-pressed="false"`; `<video>` com `controls` e `poster` | ✅ Tudo conforme |
| Clicar em "▶ Reproduzir" | `play()`; botão vira "⏸ Pausar", `aria-label="Pausar o vídeo"`, `aria-pressed="true"` | ✅ Evento `play` 4 ms depois do clique; texto, rótulo e `aria-pressed` atualizados |
| Clicar em "⏸ Pausar" | `pause()`; botão volta a "▶ Reproduzir" | ✅ `video.paused = true` e botão atualizado |
| Controles nativos | Tocar pelo player nativo também atualiza o botão | ✅ O botão mudou para "⏸ Pausar" (eventos `play` e `pause`) |
| "Pular para 1:30" | `currentTime = 90` (vídeo de 1:34; duração lida: 94,45 s) | ✅ `currentTime = 90`; aviso "Vídeo posicionado em 1:30." |
| "Aumentar volume" com volume 1,0 | Não passar de 1,0 | ✅ Continua em 1; "O volume já está no máximo (100%)." |
| "Diminuir volume" 3 vezes | De 1,0 para 0,7, em passos de 0,1 | ✅ `volume = 0.7`; "Volume: 70%." |
| "Diminuir volume" mais 10 vezes | Não passar de 0,0 | ✅ Continua em 0; "O volume já está no mínimo (0%)." |
| "Aumentar volume" a partir de 0 | 0,1 | ✅ `volume = 0.1` |
| Teclado | Botões alcançáveis por Tab, foco visível, Enter aciona | ✅ Shift+Tab chegou a "▶ Reproduzir" com `:focus-visible` (contorno sólido); Enter tocou o vídeo ([captura](evidencias/js-controles-video-midia.png)) |
| "Já assisti ao vídeo" (abaixo do iframe) | Mensagem na página com `addEventListener("click")`, sem `alert()` | ✅ "Você assistiu ao vídeo sobre moeda social! Apoie a economia solidária." em área `aria-live="polite"` |
| Botões | Todos `type="button"`, sem `tabindex` positivo | ✅ 5 de 5 |

### 10.4 Outras verificações de 16/11/2026

| Teste | Resultado |
|---|---|
| As 10 páginas, o exemplo e os 4 scripts do formulário e da mídia respondem 200 | ✅ |
| Console sem erros nem avisos nas 10 páginas | ✅ |
| Sem rolagem horizontal em `contato.html` (com todos os erros visíveis) e em `midia.html` | ✅ Testado a 500 px, a menor largura de janela que o Chrome permite; os botões quebram linha. O teste a 375 px de 10/11 (seção 5) não foi repetido |
| Nenhum `alert()` no site (`public/js/`) | ✅ 0 ocorrências. O exemplo da equipe usa `alert()` e foi mantido sem mudar a lógica, a pedido da equipe: é uma página de estudo à parte, fora do menu |
| Validação W3C de `contato.html`, `midia.html`, do exemplo e do CSS | ✅ Ver seção 1 |

## 11. EcoBot oculto sem a chave da API (16/11/2026)

O EcoBot é um recurso extra, não exigido pela A2. Ele depende de uma chave de API paga
(`ANTHROPIC_API_KEY`). Sem a chave, o botão "Falar com o EcoBot" não deve aparecer. A rota `GET /api/status`
(`server.js`) diz ao navegador se o EcoBot está ativo, e o `js/ecobot.js` só monta o chat quando a resposta é
`{"ecobot": true}`.

Ambiente: dois servidores locais ao mesmo tempo. Um sem a chave (porta 3100; a linha `ANTHROPIC_API_KEY` do
`.env` está vazia) e outro com uma chave **falsa**, criada só para o teste (`chave-falsa-de-teste`, porta 3101), que
apenas simula a presença da variável. Navegador: Google Chrome com perfil isolado e sem cache.

### 11.1 Rota `GET /api/status`

| Caso | Esperado | Resultado |
|---|---|---|
| Servidor sem a chave | `{"ecobot": false}` | ✅ `{"ecobot":false}` |
| Servidor com a chave | `{"ecobot": true}` | ✅ `{"ecobot":true}` |
| A resposta não revela a chave | Nenhuma parte da chave no corpo | ✅ O corpo tem só `{"ecobot":true}`; a busca pelo texto da chave achou 0 ocorrências |
| Sem cache | Cabeçalho `Cache-Control: no-store` | ✅ Presente nos dois casos |
| Outro método | `POST /api/status` não existe | ✅ HTTP 404 (`{"erro":"Rota não encontrada."}`) |

### 11.2 EcoBot na página

| Caso | Esperado | Resultado |
|---|---|---|
| Sem chave: as 10 páginas | Nenhum botão, janela ou aviso do EcoBot | ✅ 0 elementos `.ecobot`, `.ecobot-abrir` e `#ecobot-painel` nas 10 páginas (título e `h1` de cada página conferidos, para garantir que carregaram) |
| Sem chave: console | Sem erros | ✅ 0 erros de script nas 10 páginas; console vazio em `index`, `contato` e `midia`, abertas numa primeira visita sem cache |
| Sem chave: outros recursos | Formulário e vídeo funcionam como antes | ✅ `contato.html` mostra "Enviar mensagem" e "Limpar dados"; `midia.html` mostra os 5 botões de mídia |
| Conferência final com `npm run dev` (porta 3000, sem chave, contexto novo do navegador) | 10 páginas e o exemplo abrem sem o EcoBot e sem erros | ✅ `/api/status` = `{"ecobot":false}`; 11 de 11 páginas com 0 elementos do EcoBot e 0 erros; console vazio; `/favicon.ico` → 204 |
| Com chave | O EcoBot aparece e funciona como antes | ✅ Botão "Falar com o EcoBot"; ao clicar, `aria-expanded="true"` e foco em `#ecobot-entrada`; Esc fecha e devolve o foco ao botão |
| Com chave, mas a consulta falha | Nada aparece | ✅ Com `fetch("/api/status")` simulando falha de rede: 0 elementos do EcoBot e nenhum erro no console |
| `acessibilidade.html` | Atalhos do EcoBot continuam listados, com a observação | ✅ "(quando o assistente estiver ativo)" nos 2 itens que citam o EcoBot; W3C: 0 erros e 0 avisos ([captura](evidencias/w3c-acessibilidade.png), [JSON](evidencias/w3c-acessibilidade.json)) |

### 11.3 Correção feita durante o teste: favicon

Na primeira visita, sem cache, o navegador pede `/favicon.ico` sozinho. Como o site não tem esse arquivo, aparecia
um erro 404 no console. O `server.js` passou a responder `204` (sem conteúdo) nesse endereço, sem mexer nas
páginas. Depois da correção: `/favicon.ico` → 204 e console vazio.
