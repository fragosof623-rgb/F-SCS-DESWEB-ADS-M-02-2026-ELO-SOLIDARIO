# F-SCS-DESWEB-ADS-M-02-2026-ELO-SOLIDARIO

**Elo Solidário**: site educativo sobre economia solidária (Desenvolvimento Web, ADS, UNICID).

O site explica, em linguagem simples, como cooperativas, associações, bancos comunitários, agricultores
familiares e artesãos geram renda e impacto social por meio da cooperação, da autogestão e do comércio justo.
São 10 páginas acessíveis, pensadas primeiro para pessoas com deficiência, mais o assistente de IA **EcoBot**,
que responde dúvidas sobre o tema. Todo dado, imagem, vídeo ou notícia de terceiros tem fonte real indicada.

Site no ar: https://f-scs-desweb-ads-m-02-2026-elo-solidario-production.up.railway.app

## Equipe NEXT HTML

| Integrante | RGM | Páginas e entregas |
|---|---|---|
| Felipe Fragoso | 1747539101 | `index.html` e `contato.html` |
| Breno Oliveira da Silva | 47504749 | `sobre.html` e `projetos.html` |
| Gustavo Mariano Carvalho | 47720689 | `impacto.html` e `acessibilidade.html` |
| Jihady Nikuluz Cardoso | 47560789 | `galeria.html` e `midia.html` |
| Kaue Cândido Alberti | 47556668 | `noticias.html`, `orcamento_hospedagem.html` e documentação |

## Tecnologias

- **HTML5** semântico, validado no W3C Validator
- **CSS3** puro, em um único arquivo com variáveis, Flexbox e Grid
- **JavaScript** puro no navegador, sem bibliotecas
- **Node.js + Express**: servidor que entrega o site e a rota `POST /api/chat`
- **ViaCEP**: preenche o endereço pelo CEP no formulário de contato
- **EcoBot** com a **API do Claude** (Anthropic), pelo SDK oficial `@anthropic-ai/sdk`
- **GitHub + Railway**: versionamento e publicação

## Recursos de JavaScript (Aula 07)

Todo o JavaScript do navegador é puro, em arquivos externos de `public/js/` carregados com `defer`, escrito com
`const`/`let`, arrow functions e camelCase. Nenhuma mensagem usa `alert()`: tudo aparece na própria página, em
áreas `aria-live`.

| Recurso | Onde | O que faz |
|---|---|---|
| Validação com JavaScript | `js/formulario.js` (contato) | `preventDefault` no envio; nome não vazio, e-mail com "@" e ".", telefone (11) 91234-5678 por regex, **mensagem com pelo menos 10 caracteres**; erro em vermelho abaixo do campo, `aria-invalid` e foco no 1º erro |
| localStorage | `js/rascunho.js` (contato) | Salva nome, e-mail, telefone e mensagem a cada digitação, recupera ao abrir a página e apaga com o botão "Limpar dados" |
| API de mídia | `js/midia.js` (mídia) | Botões próprios no vídeo: reproduzir/pausar (`play()`/`pause()`), pular para 1:30 (`currentTime`) e volume (`volume`); botão "Já assisti ao vídeo" abaixo do iframe |
| `fetch` + ViaCEP | `js/cep.js` (contato) | Preenche o endereço a partir do CEP |
| `fetch` + EcoBot | `js/ecobot.js` (todas as páginas) | Envia a pergunta para a rota `POST /api/chat` e mostra a resposta |

**Exemplo de localStorage da equipe:** [`public/exemplos/teste-local-storage/`](public/exemplos/teste-local-storage/)
(abre no site em `/exemplos/teste-local-storage/scriptstorage.html`). É um formulário simples que salva o nome e
o e-mail enquanto a pessoa digita, recupera os dados ao recarregar e os apaga com "Limpar Dados". Ele serviu de
base para o rascunho do formulário de contato.

## Como rodar localmente

Requisito: Node.js 20.11 ou mais novo.

```bash
npm install
copy .env.example .env    # Linux/macOS: cp .env.example .env
# abra o .env e preencha ANTHROPIC_API_KEY (sem ela o site abre, mas o EcoBot fica desativado)
npm run dev
```

Acesse http://localhost:3000.

## Estrutura

| Pasta/arquivo | O que tem |
|---|---|
| `public/` | As 10 páginas HTML, `css/`, `js/`, `img/`, `video/` e `exemplos/` (exemplo de localStorage da equipe) |
| `server.js` | Servidor Express (site + rota `POST /api/chat`) |
| `lib/ia.js` | Integração com a API do Claude |
| `docs/` | Escopo, diário de bordo, orçamento, testes, fontes e evidências (ver "Documentação") |
| `.cursor/` e `CLAUDE.md` | Regras do projeto para ferramentas de IA |

## Documentação

| Documento | Conteúdo |
|---|---|
| [Escopo do projeto](docs/escopo-projeto.md) | Objetivos, público, páginas, tecnologias e cronograma (também em [.docx](docs/escopo-projeto.docx) e [.pdf](docs/escopo-projeto.pdf)) |
| [Diário de bordo](docs/diario-de-bordo.md) | Registro cronológico do desenvolvimento, decisões e dificuldades |
| [Orçamento de hospedagem](docs/orcamento.md) | Comparativo de hospedagem e domínio, com fontes, datas de consulta e recomendação |
| [Testes](docs/testes.md) | Plano e resultados: W3C, teclado, contraste, leitor de tela, responsividade, formulário, links, EcoBot e JavaScript da Aula 07 (localStorage, validação, mídia) |
| [Fontes](docs/fontes.md) | Origem de todo conteúdo de terceiros, com links e datas de consulta |
| [Evidências](docs/evidencias/) | Capturas e relatórios do validador W3C das 10 páginas e do exemplo, capturas de responsividade e dos recursos de JavaScript |
| [Roteiro da apresentação](docs/roteiro-apresentacao.md) | Slides, falas, quem apresenta e o passo a passo da demonstração ao vivo |
| [Checklist da A2](docs/checklist-a2.md) | Cada requisito da Atividade A2 e da Aula 07, com onde está atendido |
| [Plano e contexto](docs/plano-contexto.md) | Referência rápida do projeto, do EcoBot e do deploy |

## Fontes

Todas as fontes usadas no site (iniciativas, dados, imagens, vídeo, áudio, notícias e preços de hospedagem),
com links e datas de consulta, estão em [`docs/fontes.md`](docs/fontes.md).

## Publicação

O Railway publica automaticamente a cada `git push` no branch `main`. Cadastre a variável
`ANTHROPIC_API_KEY` no painel do Railway. Passo a passo em [`docs/plano-contexto.md`](docs/plano-contexto.md).
