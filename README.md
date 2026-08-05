# noBRon

Projeto completo em Next.js, TypeScript, Tailwind CSS, Motion e GSAP, construído a partir do conceito visual aprovado.

## O que já está pronto

- Cada seção está em um arquivo separado.
- Hero cinematográfica com mockup e cards flutuantes.
- Marquee de benefícios.
- Comparação entre informações espalhadas e organizadas.
- Demonstração que muda entre cinco profissões.
- Jornada visual até o WhatsApp.
- Personalização com animação ligada ao scroll.
- Explicação visual de SEO.
- Camadas do produto em visão explodida.
- Oferta de R$ 200 por mês.
- Avaliação de quando uma Landing Page não é suficiente.
- Processo de criação, FAQ, CTA final e rodapé.
- Menu e botão fixo de WhatsApp responsivos.
- Respeito à preferência de redução de movimento.

## Como executar

Requisitos: Node.js 20.9 ou superior.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Para gerar a versão de produção:

```bash
npm run build
npm run start
```

## Primeira alteração obrigatória

Abra:

```text
src/data/site.ts
```

Troque o número fictício:

```ts
whatsapp: "5542998207831"
```

Use apenas números, com código do país e DDD.

Nesse mesmo arquivo você pode alterar:

- preço;
- cidade;
- slogan;
- navegação;
- mensagens abertas por cada CTA.

## Onde está cada seção

```text
src/components/sections/
├── HeroSection.tsx
├── BenefitsMarquee.tsx
├── ProblemSolutionSection.tsx
├── ProfessionShowcase.tsx
├── WhatsAppJourney.tsx
├── PersonalizationSection.tsx
├── SeoExplanation.tsx
├── IncludedLayers.tsx
├── PricingSection.tsx
├── NotEnoughSection.tsx
├── CreationProcess.tsx
├── FaqSection.tsx
└── FinalCta.tsx
```

## Profissões demonstradas

As informações, cores, serviços e chamadas ficam em:

```text
src/data/professions.ts
```

Você pode adicionar, remover ou reescrever profissões sem alterar o componente principal.

## Estilos

Tailwind CSS 4 está configurado pelo PostCSS. A identidade visual específica e a responsividade estão concentradas em:

```text
src/app/globals.css
```

As variáveis principais ficam no começo do arquivo:

```css
:root {
  --bg: #f7f8fb;
  --text: #111827;
  --blue: #145cff;
}
```

## Referência visual

O arquivo `design-reference.png` contém o conceito visual aprovado e foi incluído apenas como referência. A página não usa essa imagem para montar as seções: os elementos são componentes reais em HTML, CSS e SVG.

## Observação sobre fontes

O projeto usa `next/font` com Inter e Manrope. O Next.js baixa e otimiza essas fontes durante a instalação/build. Caso prefira não depender disso, substitua em `src/app/layout.tsx` por fontes locais ou por uma pilha de fontes do sistema.
