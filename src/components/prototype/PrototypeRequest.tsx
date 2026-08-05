import { PrototypeFlow } from "./form/PrototypeFlow";
import styles from "./PrototypeRequest.module.css";

export function PrototypeRequest() {
  return (
    <main className={styles.page}>
      <PrototypeFlow />
    </main>
  );
}
