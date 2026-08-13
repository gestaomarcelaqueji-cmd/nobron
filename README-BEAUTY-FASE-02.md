# Beauty Presence — Fase 02: Serviços em linguagem de app

Esta fase substitui somente a seção **Serviços**.

## Arquivos para copiar

Copie esta pasta sobre:

```text
src/features/beauty-presence/sections/Services/
```

Arquivos:

```text
Services.tsx
Services.module.css
Services.motion.ts
```

## O que mudou

- saiu o accordion editorial antigo;
- os procedimentos agora funcionam como um deck de cards de aplicativo;
- um serviço fica aberto por vez;
- cards fechados são compactos e arredondados;
- o card ativo cresce e revela fotografia + descrição;
- o botão de trabalhos fica encaixado em um recorte de borda invertida;
- formas alternam discretamente entre os cards;
- nenhuma mudança foi feita em Portfolio, BeforeAfter, About, FAQ ou demais módulos;
- a assinatura do componente continua `Services({ data })`, então `BeautyLanding.tsx` da Fase 01 não precisa ser alterado.

## Teste

Abra a mesma rota e valide em **390 × 844**.

O objetivo desta fase é julgar apenas a linguagem visual e a interação de Serviços.
