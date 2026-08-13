import styles from "./MediaFrame.module.css";

type MediaFrameProps = {
  src?: string;
  alt: string;
  label?: string;
  className?: string;
  priority?: boolean;
};

export function MediaFrame({ src, alt, label, className, priority = false }: MediaFrameProps) {
  const classes = [styles.frame, className].filter(Boolean).join(" ");

  return (
    <div className={classes}>
      {src ? (
        // O Demo Builder também poderá fornecer blob/object URLs.
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} />
      ) : (
        <div className={styles.placeholder} role="img" aria-label={alt}>
          <span>{label ?? "Fotografia"}</span>
        </div>
      )}
    </div>
  );
}
