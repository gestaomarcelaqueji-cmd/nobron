# noBRon — Fundação Local Técnica

Arquivos alterados:

- `src/app/page.tsx`
- `src/lib/seo.ts`
- `src/lib/structured-data.ts`

Arquivos enviados que NÃO precisam ser alterados nesta etapa:

- `src/app/layout.tsx`
- `src/components/seo/StructuredData.tsx`

## O que mudou

1. A Home passa a usar um título e descrição alinhados aos serviços comerciais prioritários e a Telêmaco Borba.
2. `page.tsx` usa `DEFAULT_TITLE` e `DEFAULT_DESCRIPTION`, evitando divergência entre a Home e os metadados globais.
3. O `Organization` mantém a noBRon como `Organization`, sem inventar `LocalBusiness`, endereço, telefone, avaliações ou horário.
4. O grafo associa a organização a Telêmaco Borba em nível de cidade, sem publicar endereço residencial ou físico.
5. Foram adicionados `slogan`, `areaServed` e os temas de atuação que já existem no site.
6. O `WebSite` e a `WebPage` apontam para a mesma entidade `Organization`.
7. Breadcrumbs permanecem inalterados.

## Depois de aplicar

Rodar:

```bash
npm run build
```

Depois publicar e solicitar nova indexação da Home no Search Console.
