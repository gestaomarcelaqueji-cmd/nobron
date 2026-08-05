import styles from "./DiagnosticSection.module.css";

const symptoms = [
  "Minha empresa não aparece para quem procura",
  "Meu site recebe visitas, mas não gera contatos",
  "Minha marca já não representa o que entregamos",
  "As pessoas chegam sem entender o que fazemos",
  "O atendimento repete sempre as mesmas respostas",
  "Uso várias ferramentas, mas nenhuma trabalha junto",
];

export function DiagnosticSection() {
  return (
    <section className={styles.section}>
      <div className={styles.backgroundWord} aria-hidden="true">
        DIAGNÓSTICO
      </div>

      <div className={styles.copy}>
        <span className={styles.eyebrow}>
          Você não precisa chegar com a solução
        </span>

        <h2 className={styles.title}>
          Basta saber o que não está funcionando.
        </h2>

        <p className={styles.description}>
          Você não precisa saber se o problema está na marca, no site, no marketing ou no atendimento. Mostre onde a empresa está travando. A partir disso, definimos o que precisa ser corrigido, fortalecido ou conectado.

        </p>
      </div>

      <div className={styles.symptoms}>
        {symptoms.map((symptom, index) => (
          <div key={symptom} className={styles.symptom}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <p>{symptom}</p>
          </div>
        ))}
      </div>

    </section>
  );
}