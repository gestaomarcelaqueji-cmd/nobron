export type FormSubmissionInput = {
  sourceKey: string;
  sourceLabel: string;
  sourcePath?: string;
  formVersion?: string;
  contact?: {
    name?: string;
    whatsapp?: string;
    email?: string;
    businessName?: string;
  };
  answers: Record<string, unknown>;
  attribution?: Record<string, string | undefined>;
  website?: string;
};

export async function submitFormResponse(input: FormSubmissionInput) {
  const response = await fetch("/api/forms/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
    cache: "no-store",
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as
      | { error?: string }
      | null;
    throw new Error(body?.error || "Não foi possível registrar o formulário.");
  }

  return (await response.json()) as { ok: true; id?: string };
}
