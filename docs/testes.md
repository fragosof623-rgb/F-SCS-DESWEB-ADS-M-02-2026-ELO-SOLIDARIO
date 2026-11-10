# Plano e resultados de testes — Elo Solidário

Este documento reúne o plano de testes do site e os resultados obtidos. Todos os testes abaixo foram
**executados de verdade** entre 09/11/2026 e 10/11/2026, no servidor local (`npm run dev`,
http://localhost:3000), com o Google Chrome no Windows 11. As evidências ficam em [`evidencias/`](evidencias/).

Resumo:

| Área | Resultado |
|---|---|
| Validação W3C (10 páginas) | ✅ 0 erros e 0 avisos em todas |
| Navegação por teclado | ✅ Aprovado |
| Contraste (WCAG AA) | ✅ Aprovado, depois de 2 correções feitas durante os testes |
| Leitor de tela (estrutura semântica) | ✅ Aprovado na verificação automática; teste manual com NVDA ainda pendente |
| Responsividade (celular, tablet e desktop) | ✅ Aprovado, depois de 1 correção feita durante os testes |
| Formulário de contato | ✅ Aprovado (casos válidos e inválidos) |
| Links | ✅ Aprovado |
| EcoBot | ✅ Interface e validações aprovadas; resposta da IA não testada localmente (sem chave) |

---

## 1. Validação W3C (HTML)

- **Ferramenta:** Nu Html Checker do W3C, <https://validator.w3.org/nu/> (versão `vnu 26.11.9`, conforme a
  página de resultado).
- **Como:** o código de cada página foi enviado ao validador pela opção "text input".
- **Data:** 09/11/2026, entre 23h30 e 23h58. Em 10/11/2026, `midia.html` foi validada de novo depois de
  uma pequena mudança de texto (a lista "Como a mídia é publicada"). As outras páginas não mudaram desde
  então; só o CSS foi ajustado.
- **Evidências:** uma captura de tela da página de resultado por página (`w3c-<página>.png`) e o relatório
  completo do validador em JSON (`w3c-<página>.json`, gerado com `?out=json`).

| Página | Erros | Avisos | Mensagens informativas* | Captura | Relatório |
|---|---|---|---|---|---|
| `index.html` | 0 | 0 | 8 | [w3c-index.png](evidencias/w3c-index.png) | [JSON](evidencias/w3c-index.json) |
| `sobre.html` | 0 | 0 | 8 | [w3c-sobre.png](evidencias/w3c-sobre.png) | [JSON](evidencias/w3c-sobre.json) |
| `projetos.html` | 0 | 0 | 8 | [w3c-projetos.png](evidencias/w3c-projetos.png) | [JSON](evidencias/w3c-projetos.json) |
| `impacto.html` | 0 | 0 | 8 | [w3c-impacto.png](evidencias/w3c-impacto.png) | [JSON](evidencias/w3c-impacto.json) |
| `acessibilidade.html` | 0 | 0 | 8 | [w3c-acessibilidade.png](evidencias/w3c-acessibilidade.png) | [JSON](evidencias/w3c-acessibilidade.json) |
| `galeria.html` | 0 | 0 | 16 | [w3c-galeria.png](evidencias/w3c-galeria.png) | [JSON](evidencias/w3c-galeria.json) |
| `midia.html` | 0 | 0 | 10 | [w3c-midia.png](evidencias/w3c-midia.png) | [JSON](evidencias/w3c-midia.json) |
| `noticias.html` | 0 | 0 | 8 | [w3c-noticias.png](evidencias/w3c-noticias.png) | [JSON](evidencias/w3c-noticias.json) |
| `contato.html` | 0 | 0 | 20 | [w3c-contato.png](evidencias/w3c-contato.png) | [JSON](evidencias/w3c-contato.json) |
| `orcamento_hospedagem.html` | 0 | 0 | 8 | [w3c-orcamento_hospedagem.png](evidencias/w3c-orcamento_hospedagem.png) | [JSON](evidencias/w3c-orcamento_hospedagem.json) |

\* As mensagens informativas não são erros nem avisos. São todas do tipo "Trailing slash on void elements
has no effect": a barra no fim de tags como `<meta ... />` e `<img ... />` é permitida no HTML5 e não muda
nada.

**Resultado:** ✅ as 10 páginas passaram sem erros e sem avisos.

**CSS:** o arquivo `public/css/style.css`, já com as correções da seção 3 e da seção 5, foi validado em
10/11/2026 no W3C CSS Validator (<https://jigsaw.w3.org/css-validator/>, perfil CSS3 + SVG). Resultado:
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
| Mensagens de erro e de status anunciadas | ✅ `aria-live="polite"` no CEP, na data, no número e no envio (4 áreas), além de `aria-invalid` nos campos com erro |
| Respostas do EcoBot anunciadas | ✅ Área de mensagens com `aria-live="polite"` |
| Lighthouse, categoria Acessibilidade | ✅ 100 nas 10 páginas |

**Limitação:** não foi feito um teste manual com um leitor de tela real (NVDA ou Narrador do Windows). A
verificação acima confere a estrutura que o leitor de tela usa, mas não substitui ouvir o site. Teste
recomendado para a equipe:

1. Ativar o NVDA ou o Narrador.
2. Navegar pelos títulos (tecla H) e pelas regiões (tecla D).
3. Preencher o formulário de contato e ouvir as mensagens de erro.
4. Usar o EcoBot.

**Resultado:** ✅ aprovado na verificação automática; teste manual pendente.

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
| E-mail inválido | `teste@` | Inválido | ✅ Bloqueado pela validação HTML5 |
| Telefone inválido | `123` | Inválido (`pattern`) | ✅ Bloqueado |
| Enviar vazio | nenhum campo | Bloquear e focar o 1º campo obrigatório | ✅ 9 campos obrigatórios inválidos; foco em "nome" |
| Enviar completo | todos os campos válidos (data futura, 12 pessoas, CEP 01310-100, número 1000) | Mensagem de sucesso e formulário limpo | ✅ "Obrigado! Sua mensagem foi registrada. (Envio simulado…)", campos limpos e sem mensagens de erro antigas |

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

## 9. Observações do Lighthouse (fora dos critérios de acessibilidade)

Em `midia.html`, a categoria "Boas práticas" ficou em 77. O motivo é um cookie de terceiros criado pelo
player do YouTube (`youtube-nocookie.com`) incorporado na página. Esse cookie não é controlado pelo site, e
o vídeo incorporado foi mantido porque faz parte do conteúdo exigido. As outras 9 páginas tiveram 100 em
"Boas práticas".
