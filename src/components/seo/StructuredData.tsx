import type { JsonLd } from "@/lib/structured-data";

type StructuredDataProps = {
  id: string;
  data: JsonLd;
};

export function StructuredData({
  id,
  data,
}: StructuredDataProps) {
  const json = JSON.stringify(data).replace(
    /</g,
    "\\u003c",
  );

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: json,
      }}
    />
  );
}