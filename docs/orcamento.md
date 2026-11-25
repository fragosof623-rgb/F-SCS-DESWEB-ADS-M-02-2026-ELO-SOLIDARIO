# Orçamento de hospedagem e domínio — Elo Solidário

Responsável: Kaue Cândido Alberti (página `orcamento_hospedagem.html` e documentação).

Este documento traz os mesmos dados da página [`public/orcamento_hospedagem.html`](../public/orcamento_hospedagem.html).
Todos os preços foram conferidos nos sites oficiais em **09/11/2026**. Os serviços estrangeiros cobram em
dólar (US$), e o valor em reais depende do câmbio do dia. Promoções e preços podem mudar a qualquer momento.
As fontes também estão registradas em [`fontes.md`](fontes.md).

## 1. Situação atual

O código fica no GitHub e o site está publicado no **Render, plano Free**, em <https://elo-solidario.onrender.com>.
O site tem um servidor Node.js (Express), que entrega as páginas e a rota `POST /api/chat` do EcoBot. Por isso a
hospedagem precisa executar aplicações Node: uma hospedagem só de arquivos estáticos abriria o site, mas deixaria
o EcoBot fora do ar.

- **Migração:** começamos no Railway e migramos para o Render em novembro de 2026, quando o período de teste
  gratuito do Railway acabou (registro em [`diario-de-bordo.md`](diario-de-bordo.md)).
- **Publicação:** no Render ela não é automática. Depois do `git push`, a equipe clica em
  **Manual Deploy → Deploy latest commit** no painel do serviço.
- **Limitação do plano grátis:** o serviço "dorme" após 15 minutos sem acesso, e o primeiro acesso depois disso
  leva cerca de 50 segundos. Antes de uma apresentação, vale abrir o site alguns minutos antes.

## 2. Comparativo de hospedagem

| Serviço e plano | Preço | O que inclui | Roda o servidor Node (EcoBot)? | Fonte (consulta em 09/11/2026) |
|---|---|---|---|---|
| **Render — Free** (usado hoje) | US$ 0 | 0,1 CPU e 512 MB; 750 horas por mês. O serviço "dorme" após 15 minutos sem acesso, e o primeiro acesso depois disso leva cerca de 50 segundos. | Sim (Node.js com Express), mas a primeira resposta pode demorar. Publicação pelo botão "Manual Deploy". | <https://render.com/docs/free> |
| Railway — Hobby (alternativa paga) | US$ 5 por mês | US$ 5 de crédito de uso por mês; até 48 vCPU e 48 GB por serviço; 2 domínios próprios. Uso acima do crédito é cobrado à parte. | Sim: servidor Node sempre ligado, publicado a partir do GitHub. | <https://railway.com/pricing> |
| Railway — Free | US$ 0 | US$ 1 de crédito de uso por mês; até 1 vCPU e 0,5 GB; nenhum domínio próprio. | Sim, com recursos bem limitados. | <https://railway.com/pricing> |
| Hostinger — VPS KVM 1 | R$ 29,99 por mês no contrato de 24 meses (R$ 719,76 no total); renova por R$ 59,99 por mês | 1 vCPU, 4 GB de RAM, 50 GB de disco NVMe, 4 TB de banda e domínio grátis por 1 ano. Servidor administrado pela própria equipe. | Sim, com instalação de Node.js pelo painel. | <https://www.hostinger.com/br/vps> |
| Vercel — Hobby | US$ 0 (Pro: US$ 20 por mês) | 100 GB de transferência e 1 milhão de execuções de funções por mês. Só para uso pessoal e não comercial. | Não como servidor contínuo: o código roda em funções sob demanda, e o servidor teria de ser adaptado. | <https://vercel.com/pricing> |
| Netlify — Free | US$ 0 (Personal: US$ 9 por mês) | 300 créditos por mês para publicações, funções e banda; CDN global. | Não como servidor contínuo: oferece funções, e o servidor teria de ser adaptado. | <https://www.netlify.com/pricing/> |
| GitHub Pages | Preço não informado na documentação consultada | Site de até 1 GB e limite flexível de 100 GB de banda por mês. Não é indicado para sites comerciais. | Não: hospeda só arquivos estáticos. O site abriria, mas o EcoBot não funcionaria. | <https://docs.github.com/pt/pages/getting-started-with-github-pages/github-pages-limits> |

Observação: os preços dos planos pagos do Render não foram obtidos na consulta e por isso não aparecem.

## 3. Domínio

| Item | Preço | Observações | Fonte (consulta em 09/11/2026) |
|---|---|---|---|
| Domínio `.com.br` no Registro.br | R$ 40,00 por ano | O registro exige CPF ou CNPJ. Sem domínio próprio, o site continua no ar no endereço gratuito do Render (`elo-solidario.onrender.com`). | <https://registro.br/dominio/precos/> |

## 4. Estimativa de custo anual

Cálculo direto com os preços acima (sem impostos, sem variação do câmbio e sem consumo acima do crédito incluído):

| Cenário | Cálculo | Total por ano |
|---|---|---|
| Render Free, sem domínio próprio (usado hoje) | US$ 0 × 12 meses | US$ 0 |
| Render Free + domínio `.com.br` | US$ 0 + R$ 40,00 | R$ 40,00 |
| Railway Hobby, sem domínio próprio | US$ 5 × 12 meses | US$ 60 |
| Railway Hobby + domínio `.com.br` | US$ 60 + R$ 40,00 | US$ 60 + R$ 40,00 |
| Hostinger VPS KVM 1 (1º ano do contrato de 24 meses) | R$ 29,99 × 12 meses (domínio grátis no 1º ano) | R$ 359,88 |

## 5. Recomendação

**Para a versão acadêmica, manter o Render no plano Free (US$ 0).**

- Ele roda o servidor Node sem custo, e a espera de cerca de 50 segundos no primeiro acesso é aceitável para um
  site de estudo.
- O Railway Free não serve como alternativa: tem pouca memória e não aceita domínio próprio.

**Se o site precisar responder na hora, sempre, a alternativa paga é o Railway Hobby (US$ 5 por mês).**

- Ele mantém o servidor Node ligado o tempo todo, então não há espera no primeiro acesso.
- Publica sozinho a cada envio ao GitHub, sem que a equipe precise administrar um servidor.
- O crédito de uso incluído tende a cobrir um site pequeno como o nosso. O consumo deve ser acompanhado no
  painel do Railway.

Outras opções avaliadas:

- A VPS da Hostinger também roda Node e cobra em reais, mas exige configurar e manter o servidor.
- Vercel, Netlify e GitHub Pages pediriam mudanças no projeto ou deixariam o EcoBot fora do ar.
- Se a equipe quiser um endereço próprio, o domínio `.com.br` acrescenta R$ 40,00 por ano.
