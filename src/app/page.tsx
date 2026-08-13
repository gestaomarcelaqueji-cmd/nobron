import { HeroImmersive } from "@/components/HeroImmersive";
import { StructuredData } from "@/components/seo/StructuredData";

import {
  createPageMetadata,
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
} from "@/lib/seo";
import { createHomeJsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: DEFAULT_TITLE,

  description: DEFAULT_DESCRIPTION,

  path: "/",
});

const homeJsonLd = createHomeJsonLd();

export default function Home() {
  return (
    <>
      <StructuredData
        id="nobron-home-jsonld"
        data={homeJsonLd}
      />

      <main>
        <HeroImmersive />
      </main>
    </>
  );
}
