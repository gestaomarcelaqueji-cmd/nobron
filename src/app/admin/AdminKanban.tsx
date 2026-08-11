"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import styles from "./admin.module.css";

export type SubmissionStatus =
  | "new"
  | "reviewing"
  | "contacted"
  | "waiting"
  | "completed";

export type Submission = {
  id: string;
  source_key: string;
  source_label: string;
  source_path: string | null;
  contact_name: string | null;
  contact_whatsapp: string | null;
  contact_email: string | null;
  business_name: string | null;
  status: SubmissionStatus;
  priority: "low" | "normal" | "high";
  answers: Record<string, unknown>;
  attribution: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

const columns: Array<{
  id: SubmissionStatus;
  label: string;
  description: string;
}> = [
  { id: "new", label: "Novos", description: "Acabaram de chegar" },
  { id: "reviewing", label: "Em análise", description: "Você está avaliando" },
  { id: "contacted", label: "Contato iniciado", description: "Conversa começou" },
  { id: "waiting", label: "Aguardando", description: "Dependendo de retorno" },
  { id: "completed", label: "Concluídos", description: "Atendimento encerrado" },
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

function displayValue(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (Array.isArray(value)) return value.map(displayValue).join(", ");
  if (typeof value === "object") return JSON.stringify(value);
  if (typeof value === "boolean") return value ? "Sim" : "Não";
  return String(value);
}

export default function AdminKanban({
  initialSubmissions,
}: {
  initialSubmissions: Submission[];
}) {
  const [items, setItems] = useState(initialSubmissions);
  const [selected, setSelected] = useState<Submission | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const grouped = useMemo(
    () =>
      Object.fromEntries(
        columns.map((column) => [
          column.id,
          items.filter((item) => item.status === column.id),
        ]),
      ) as Record<SubmissionStatus, Submission[]>,
    [items],
  );

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setSelected(null);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [selected]);

  async function moveSubmission(id: string, status: SubmissionStatus) {
    const current = items.find((item) => item.id === id);
    if (!current || current.status === status || savingId) return;

    const previousStatus = current.status;
    setSavingId(id);
    setError("");
    setItems((list) =>
      list.map((item) => (item.id === id ? { ...item, status } : item)),
    );

    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error("update failed");

      setSelected((value) =>
        value?.id === id ? { ...value, status } : value,
      );
    } catch {
      setItems((list) =>
        list.map((item) =>
          item.id === id ? { ...item, status: previousStatus } : item,
        ),
      );
      setError("Não foi possível mover o cartão. A alteração foi desfeita.");
    } finally {
      setSavingId(null);
    }
  }

  return (
    <>
      {error ? (
        <div className={styles.boardError} role="alert">
          {error}
        </div>
      ) : null}

      <section className={styles.board} aria-label="Kanban de formulários">
        {columns.map((column) => (
          <div
            className={styles.column}
            key={column.id}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => {
              if (draggingId) void moveSubmission(draggingId, column.id);
              setDraggingId(null);
            }}
          >
            <header className={styles.columnHeader}>
              <div>
                <strong>{column.label}</strong>
                <span>{column.description}</span>
              </div>
              <b>{grouped[column.id].length}</b>
            </header>

            <div className={styles.cardList}>
              {grouped[column.id].map((submission) => (
                <article
                  className={styles.leadCard}
                  data-saving={savingId === submission.id}
                  draggable={savingId !== submission.id}
                  key={submission.id}
                  onDragStart={() => setDraggingId(submission.id)}
                  onDragEnd={() => setDraggingId(null)}
                >
                  <button
                    className={styles.cardOpen}
                    type="button"
                    onClick={() => setSelected(submission)}
                  >
                    <span className={styles.cardTopline}>
                      <span>{submission.source_label}</span>
                      <time>{formatDate(submission.created_at)}</time>
                    </span>

                    <strong className={styles.cardTitle}>
                      {submission.contact_name ||
                        submission.business_name ||
                        "Sem nome"}
                    </strong>

                    {submission.business_name &&
                    submission.business_name !== submission.contact_name ? (
                      <span className={styles.cardBusiness}>
                        {submission.business_name}
                      </span>
                    ) : null}

                    <span className={styles.cardContact}>
                      {submission.contact_whatsapp ? (
                        <span>{submission.contact_whatsapp}</span>
                      ) : null}
                      {submission.contact_email ? (
                        <span>{submission.contact_email}</span>
                      ) : null}
                    </span>

                    <span className={styles.cardAction}>Ver respostas</span>
                  </button>
                </article>
              ))}

              {grouped[column.id].length === 0 ? (
                <div className={styles.emptyColumn}>Nenhum formulário aqui.</div>
              ) : null}
            </div>
          </div>
        ))}
      </section>

      {selected ? (
        <div
          className={styles.drawerBackdrop}
          role="presentation"
          onMouseDown={() => setSelected(null)}
        >
          <aside
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="submission-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className={styles.drawerHeader}>
              <div>
                <span>{selected.source_label}</span>
                <h2 id="submission-title">
                  {selected.contact_name ||
                    selected.business_name ||
                    "Formulário"}
                </h2>
                <small>Recebido em {formatDate(selected.created_at)}</small>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Fechar detalhes"
              >
                ×
              </button>
            </header>

            <section className={styles.drawerSection}>
              <h3>Contato</h3>
              <dl className={styles.detailGrid}>
                <div>
                  <dt>Nome</dt>
                  <dd>{selected.contact_name || "—"}</dd>
                </div>
                <div>
                  <dt>Empresa</dt>
                  <dd>{selected.business_name || "—"}</dd>
                </div>
                <div>
                  <dt>WhatsApp</dt>
                  <dd>{selected.contact_whatsapp || "—"}</dd>
                </div>
                <div>
                  <dt>E-mail</dt>
                  <dd>{selected.contact_email || "—"}</dd>
                </div>
              </dl>
            </section>

            <section className={styles.drawerSection}>
              <h3>Respostas</h3>
              <dl className={styles.answerList}>
                {Object.entries(selected.answers || {}).map(([key, value]) => (
                  <div key={key}>
                    <dt>{key}</dt>
                    <dd>{displayValue(value)}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {Object.keys(selected.attribution || {}).length ? (
              <section className={styles.drawerSection}>
                <h3>Origem da visita</h3>
                <dl className={styles.answerList}>
                  {Object.entries(selected.attribution).map(([key, value]) => (
                    <div key={key}>
                      <dt>{key}</dt>
                      <dd>{displayValue(value)}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}

            <section className={styles.drawerSection}>
              <h3>Mover para</h3>
              <div className={styles.statusButtons}>
                {columns.map((column) => (
                  <button
                    type="button"
                    key={column.id}
                    data-active={selected.status === column.id}
                    disabled={
                      savingId === selected.id || selected.status === column.id
                    }
                    onClick={() =>
                      void moveSubmission(selected.id, column.id)
                    }
                  >
                    {column.label}
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </div>
      ) : null}
    </>
  );
}
