# BeautyLanding — MVP estrutural

Este pacote adiciona **somente arquivos novos**. Ele não substitui o `layout.tsx`, `globals.css`, SEO global, header global, footer global ou qualquer seção já existente da noBRon.

## Rota criada

`/cases/presenca-local-beleza`

## O que já funciona nesta base

- `BeautyLanding` orientado a dados.
- NARA VALE isolada em `data/nara-vale.ts`.
- tema via CSS custom properties, sem vinho espalhado pelos componentes.
- Hero com movimento de scroll isolado em `Hero.motion.ts`.
- Trabalhos selecionados com entradas por viewport.
- Serviços em accordion, mantendo a descrição de todos os serviços no DOM.
- Portfólio categorizado e reorganização com Motion.
- detalhe do trabalho em componente separado.
- before/after funcional, ainda com placeholder demonstrativo.
- sobre, avaliações condicionais, localização, FAQ, CTA final e transição noBRon.
- selo fixo `DEMO noBRon`.
- CTAs fictícios não tentam abrir um WhatsApp inexistente; exibem uma explicação e levam para a noBRon.
- suporte a `prefers-reduced-motion`.
- metadata e JSON-LD isolados da interface.

## Fotografias

Nenhuma fotografia definitiva foi embutida. Onde `image` está vazio, `MediaFrame` cria uma superfície visual provisória. Assim dá para julgar ritmo, proporção e UX antes de fechar o material fotográfico.

Quando as fotos existirem, basta preencher `image` nos dados. O componente já aceita `blob:`/object URLs para facilitar o futuro Demo Builder.

## Atenção: header/footer globais

Como este pacote não recebeu o `src/app/layout.tsx` atual, ele não altera o layout global. Se o layout raiz da noBRon injeta Header/Footer em **todas** as rotas, a rota do case também os herdará.

A decisão correta é criar uma exceção estrutural para `/cases/presenca-local-beleza` (ou mover as páginas institucionais para um route group que carregue Header/Footer), em vez de esconder elementos globais com CSS. Faça essa alteração somente depois de conferir o `layout.tsx` atual.

## SEO

`page.tsx` exporta metadata estática importada de `metadata.ts`. A página usa uma imagem social global já existente (`/brand/og/og-global.png`) para não depender de um novo asset nesta etapa.

`structuredData.ts` descreve a página como case/serviço da **noBRon**. Não existe `LocalBusiness`, review, telefone, endereço ou empresa fictícia para Nara Vale.

Se o projeto atual já possui um helper central em `src/lib/seo.ts`, adapte `metadata.ts` para usar esse helper antes de publicar, mantendo este arquivo como a camada específica da rota.

## Próximo passo

1. Copiar o pacote para o projeto.
2. Rodar `npm run dev`.
3. Abrir `/cases/presenca-local-beleza` em mobile e desktop.
4. Julgar a experiência inteira.
5. Alterar uma seção por vez — cada seção já está isolada.
6. Só depois criar o Demo Builder.
