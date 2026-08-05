import { motion } from "motion/react";

import type { BrandingServiceCategory } from "@/data/solutions/branding";

import styles from "./BrandingServices.module.css";

type ServicePreviewProps = {
  category: BrandingServiceCategory;
  activeService: string;
};

export function ServicePreview({ category, activeService }: ServicePreviewProps) {
  return (
    <div className={`${styles.previewColumn} ${styles[`preview_${category.id}`] ?? ""}`}>
      <div className={styles.previewHeader}>
        <span>LIVE PREVIEW</span>
        <span>{category.preview.toUpperCase()}</span>
      </div>

      <motion.div
        className={styles.previewCanvas}
        key={`${category.id}-${activeService}`}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={styles.previewGrid} />
        <div className={styles.previewWordmark} />
        <span className={styles.previewIndex}>{category.number}</span>
        <strong className={styles.previewTitle}>{activeService}</strong>
        <p className={styles.previewDescription}>{category.summary}</p>
        <div className={styles.previewShapeA} />
        <div className={styles.previewShapeB} />
        <div className={styles.previewShapeC} />
      </motion.div>

      <div className={styles.previewFooter}>
        <span>{category.title}</span>
        <strong>{activeService}</strong>
      </div>
    </div>
  );
}
