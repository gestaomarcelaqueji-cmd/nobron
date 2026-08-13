import type { Metadata } from "next";

import { StructuredData } from "@/components/seo/StructuredData";
import { BeautyLanding } from "@/features/beauty-presence/BeautyLanding";
import { naraValeData } from "@/features/beauty-presence/data/nara-vale";

import { beautyCaseMetadata } from "./metadata";
import { beautyCaseStructuredData } from "./structuredData";

export const metadata: Metadata = beautyCaseMetadata;

export default function BeautyPresenceCasePage() {
  return (
    <>
      <StructuredData
        id="nobron-beauty-case-jsonld"
        data={beautyCaseStructuredData}
      />

      <BeautyLanding data={naraValeData} />
    </>
  );
}
