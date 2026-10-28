# Escopo do Projeto — Site sobre Economia Solidária

Documento elaborado conforme o roteiro da **Atividade A2 – Projeto de Site** (Curso Superior de Informática, Front-End, UNICID — Prof. Paulo Fratta / Profª. Tatiana).

---

## 1. Identificação

| Campo | Valor |
|---|---|
| Nome da equipe | NEXT HTML |
| Nome do projeto/site | Elo Solidário |
| Integrantes | Breno Oliveira da Silva (RGM 47504749), Gustavo Mariano Carvalho (RGM 47720689), Felipe Fragoso (RGM 1747539101), Jihady Nikuluz Cardoso (RGM 47560789), Kaue Cândido Alberti (RGM 47556668) |
| Data | 22/09/2026 |
| Professor(a) / Disciplina | Prof. Paulo Fratta / Profª. Tatiana — Front-End, Curso Superior de Informática, UNICID |

---

## 2. Contexto e Justificativa

A economia solidária é um modelo de produção, comercialização e consumo baseado na cooperação, na autogestão e na distribuição justa da renda, em contraposição à lógica puramente competitiva do mercado tradicional. No Brasil, esse modelo é praticado por cooperativas, associações, grupos de agricultura familiar e artesãos que buscam gerar renda de forma coletiva e sustentável.

O problema social e ambiental que o site aborda é a **baixa visibilidade e o desconhecimento público sobre a economia solidária** como alternativa de geração de renda, inclusão social e desenvolvimento sustentável. Muitas iniciativas desse tipo têm dificuldade de alcance porque a população em geral não compreende o conceito nem os benefícios que ele traz para comunidades, para o consumo consciente e para o meio ambiente.

O tema se relaciona diretamente com **sustentabilidade e impacto social** — eixo obrigatório da atividade — porque a economia solidária integra três dimensões centrais: a social (inclusão, geração de renda, fortalecimento comunitário), a ambiental (consumo consciente, produção em menor escala, valorização do local) e a econômica (comércio justo, autogestão, distribuição equitativa de resultados).

---

## 3. Objetivos

### 3.1 Objetivo Geral

Desenvolver um site educativo e de conscientização que explique, de forma simples e acessível, o que é a economia solidária e como ela contribui para a geração de renda, a inclusão social e o desenvolvimento sustentável, usando como exemplos iniciativas reais de cooperativas, associações e produtores.

### 3.2 Objetivos Específicos

1. Explicar de forma clara o conceito de economia solidária e seus princípios (cooperação, autogestão, comércio justo).
2. Apresentar exemplos de iniciativas de economia solidária (cooperativas, associações, agricultura familiar, artesanato) como referência educativa, sempre indicando fontes reais quando dados concretos forem utilizados.
3. Demonstrar, com dados e resultados verificáveis (a serem inseridos com fonte na página `impacto.html`), os impactos sociais e ambientais desse modelo econômico.
4. Garantir acesso ao conteúdo por pessoas com deficiência, aplicando boas práticas de acessibilidade digital em todas as páginas.
5. Entregar um site funcional, responsivo e navegável entre as 10 páginas, com identidade visual consistente do início ao fim do projeto.

---

## 4. Público-Alvo

- **Perfil geral:** estudantes, educadores, consumidores interessados em consumo consciente, pequenos produtores e associações que queiram entender ou divulgar a economia solidária, e o corpo docente avaliador da atividade.
- **Faixa etária:** adolescentes a partir de 14 anos até adultos, sem limite superior — linguagem simples e sem jargões técnicos.
- **Localização:** conteúdo em português do Brasil (pt-BR), com foco em iniciativas nacionais.
- **Necessidades específicas:** o site adota **pessoas com deficiência (PCD) como público prioritário**, incluindo usuários de leitores de tela (deficiência visual), usuários que dependem exclusivamente do teclado (deficiência motora) e usuários com baixa visão (necessidade de alto contraste e texto redimensionável). Essas necessidades orientam decisões de estrutura semântica, contraste de cores e navegação desde a primeira página.

---

## 5. Escopo Funcional (o que o site terá)

O site terá **10 páginas HTML interligadas** por um menu de navegação principal fixo, presente em todas as páginas:

| Nº | Página | Função |
|---|---|---|
| 1 | `index.html` | Resumo do tema, apresentação do projeto e menu principal *(desenvolvida nesta etapa)* |
| 2 | `sobre.html` | História, missão, visão e valores do projeto |
| 3 | `projetos.html` | Apresentação de projetos/iniciativas de economia solidária |
| 4 | `impacto.html` | Dados, tabelas e resultados de impacto social/ambiental |
| 5 | `acessibilidade.html` | Medidas de inclusão e acessibilidade adotadas no site |
| 6 | `galeria.html` | Imagens com legendas e indicação de fonte |
| 7 | `midia.html` | Vídeo, áudio e conteúdo incorporado (iframe) |
| 8 | `noticias.html` | Notícias, artigos ou blog sobre o tema |
| 9 | `contato.html` | Formulário de contato validado, dados fictícios e membros da equipe |
| 10 | `orcamento_hospedagem.html` | Comparativo de hospedagem e domínio para publicação do site |

Funcionalidades transversais previstas: formulário de contato com validação HTML5 (`contato.html`), galeria de imagens com legendas (`galeria.html`), seção de mídia com vídeo/áudio/iframe (`midia.html`), listagem de notícias (`noticias.html`) e navegação principal idêntica em todas as páginas.

---

## 6. Escopo Não Funcional

- **Acessibilidade:** `lang="pt-BR"`, textos alternativos descritivos em imagens, contraste adequado (mínimo AA — 4.5:1 para texto normal e 3:1 para texto grande/elementos gráficos), navegação completa por teclado, foco visível em todos os elementos interativos, uso de ARIA apenas quando o HTML semântico não for suficiente, hierarquia correta de títulos (`h1`→`h3`) e link de "pular para o conteúdo".
- **Sustentabilidade:** conteúdo educativo sobre consumo consciente, escolha futura de hospedagem com menor impacto ambiental (a ser avaliada em `orcamento_hospedagem.html`), imagens otimizadas para reduzir peso de carregamento.
- **Responsividade:** layout adaptável a celular, tablet e desktop, usando CSS com unidades relativas, `flexbox`/`grid` e *media queries* — sem necessidade de JavaScript para o menu funcionar em qualquer tamanho de tela.
- **Desempenho:** CSS organizado em um único arquivo (`style.css`) reaproveitado por todas as páginas, sem bibliotecas externas pesadas, imagens futuras otimizadas.
- **SEO básico:** `<title>` único e descritivo por página, meta descrição, uso correto de `h1`–`h3`, texto alternativo em imagens.

---

## 7. Mapa do Site

```
index.html (Início)
 ├── sobre.html
 ├── projetos.html
 ├── impacto.html
 ├── acessibilidade.html
 ├── galeria.html
 ├── midia.html
 ├── noticias.html
 ├── contato.html
 └── orcamento_hospedagem.html
```

**Fluxo de navegação:** todas as páginas são acessíveis a partir do menu principal fixo no cabeçalho (presente em todas as 10 páginas), permitindo navegação direta entre quaisquer duas páginas sem a necessidade de retornar ao `index.html`. O rodapé replica os links principais como atalho adicional.

---

## 8. Conteúdo e Identidade Visual

**Tom de voz:** educativo, acolhedor e direto — frases curtas, linguagem acessível, sem jargão técnico ou economês, sempre convidando o visitante a entender e explorar o tema (não é um site de vendas).

**Paleta de cores** (definida em variáveis CSS, reutilizável em todas as páginas futuras):

| Cor | Código | Função |
|---|---|---|
| Verde principal | `#1F4A34` | Cabeçalho, rodapé, elementos de destaque — remete à sustentabilidade e ao crescimento |
| Verde texto/título | `#1F6D4C` | Títulos e links sobre fundo claro |
| Terracota | `#B5502D` | Cor secundária de apoio — remete à terra, ao artesanato e à produção local |
| Dourado/mostarda | `#E0A72E` | Botões de ação (CTA) e pequenos destaques — remete à troca de valor e à economia solidária. Tom calibrado para manter contraste de no mínimo 4.5:1 com o texto verde-escuro sobre ele |
| Creme (fundo) | `#FBF8F2` | Fundo principal das páginas — neutro, quente e de fácil leitura |
| Grafite (texto) | `#26332C` | Cor de texto padrão, com alto contraste sobre o fundo claro |

**Tipografia:** títulos em **Poppins** (fonte geométrica, moderna e amigável, com bom peso visual para `h1`–`h3`) e textos em **Inter** (fonte de alta legibilidade em telas, indicada para parágrafos e textos longos). Ambas são gratuitas (Google Fonts) e possuem excelente suporte a acentuação em português.

**Logotipo:** nesta etapa, o logotipo é textual (nome do projeto + ícone simples em SVG, sem uso de imagens externas), garantindo leveza e fácil substituição quando a equipe definir a identidade visual final.

**Fontes de imagens e textos:** todos os textos desta entrega são de autoria da equipe, escritos especificamente para o projeto acadêmico. Nenhuma estatística, dado numérico ou citação de terceiros foi inventado. Elementos gráficos do `index.html` são ilustrações vetoriais (SVG) criadas para o projeto, não fotografias. **Nas próximas páginas**, sempre que forem utilizadas imagens, dados, notícias ou citações de terceiros, será obrigatório indicar a fonte real e identificável (autor, instituição, link ou publicação), conforme exigido pela atividade.

---

## 9. Tecnologias e Ferramentas

- **HTML5** semântico (estrutura de todas as páginas).
- **CSS3** puro, com variáveis (`custom properties`), Flexbox e Grid (sem frameworks CSS externos, para manter o código enxuto e didático).
- **JavaScript**: opcional nesta entrega (não utilizado no `index.html`); poderá ser usado pontualmente em páginas futuras (ex.: validação extra do formulário em `contato.html`), conforme permitido pela atividade.
- **Editor de código:** VS Code (ou equivalente).
- **Controle de versão:** Git/GitHub (recomendado para organização da equipe, não obrigatório pela atividade).
- **Validadores:** W3C Markup Validator (validação de HTML), W3C CSS Validator, e ferramentas de checagem de acessibilidade (ex.: extensão axe DevTools ou Lighthouse) para gerar as evidências exigidas na pasta `/docs`.

---

## 10. Cronograma e Divisão de Tarefas

| Etapa | Entrega | Responsável | Data prevista |
|---|---|---|---|
| 1 | Escopo do projeto + `index.html` | Felipe Fragoso | 22/09/2026 |
| 2 | `sobre.html` + `projetos.html` | Breno Oliveira da Silva | [DATA] |
| 3 | `impacto.html` + `acessibilidade.html` | Gustavo Mariano Carvalho | [DATA] |
| 4 | `galeria.html` + `midia.html` | Jihady Nikuluz Cardoso | [DATA] |
| 5 | `noticias.html` + `contato.html` | Kaue Cândido Alberti (`noticias.html`) e Felipe Fragoso (`contato.html`) | [DATA] |
| 6 | `orcamento_hospedagem.html` + documentação `/docs` | Kaue Cândido Alberti | [DATA] |
| 7 | Validação W3C, testes de acessibilidade, ajustes finais e empacotamento (.zip) | Toda a equipe | [DATA] |

*Divisão sugerida pela ordem da lista de integrantes. Com a saída de um integrante, a etapa 5 foi dividida entre Kaue Cândido Alberti e Felipe Fragoso — a equipe pode reorganizar conforme disponibilidade de cada um.*

Ferramenta de gestão sugerida: [Trello/Notion/Google Sheets — a definir pela equipe].

---

## 11. Riscos e Restrições

- Prazo apertado em relação à carga de outras disciplinas do semestre.
- Dificuldade de coordenação entre os integrantes para manter a mesma identidade visual em todas as páginas.
- Curva de aprendizado em HTML5 semântico e acessibilidade (ARIA, contraste, navegação por teclado) para integrantes menos familiarizados com o tema.
- Necessidade de imagens e dados reais e identificáveis para as páginas `galeria.html`, `impacto.html` e `noticias.html`, o que pode demandar tempo de pesquisa.
- Dependência de conexão à internet para carregar as fontes do Google Fonts (mitigada por uma pilha de fontes de substituição no CSS).
- Tempo necessário para validar todas as páginas no W3C Validator e corrigir eventuais erros antes da entrega final.

---

## 12. Critérios de Aceitação

O site será considerado pronto quando:

- As 10 páginas HTML estiverem criadas, interligadas e navegáveis a partir do menu principal.
- O formulário de contato estiver funcional e validado com atributos HTML5 (`required`, `email`, `tel`, `pattern`, `<label for>`).
- Todas as páginas usarem HTML5 semântico (`header`, `nav`, `main`, `section`, `article`, `footer`) e hierarquia correta de títulos.
- As boas práticas de acessibilidade estiverem aplicadas (contraste, teclado, `alt`, ARIA quando necessário) em todas as páginas.
- O layout responder corretamente em celular, tablet e desktop.
- O código HTML e CSS passar no W3C Validator sem erros.
- A documentação da pasta `/docs` estiver completa (README, diário de bordo, orçamento de hospedagem, evidências de teste).
- A identidade visual (cores, tipografia, cabeçalho, rodapé) for consistente em todas as páginas do site.

---

## 13. Aprovação

| Campo | Valor |
|---|---|
| Responsável pela validação do escopo | |
| Data | |
| Assinatura | |
