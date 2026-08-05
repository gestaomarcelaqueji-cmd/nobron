"use client";

import { FileImage, Upload } from "lucide-react";
import { ChangeEvent, useRef } from "react";

import styles from "../PrototypeRequest.module.css";

export function FieldError({ id, text }: { id?: string; text?: string }) {
  return text ? (
    <span className={styles.error} id={id} role="alert">
      {text}
    </span>
  ) : null;
}

export function UploadBox({
  title,
  description,
  files,
  multiple,
  accept,
  onChange,
}: {
  title: string;
  description: string;
  files: File[];
  multiple?: boolean;
  accept: string;
  onChange: (files: File[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={styles.uploadBox}>
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple={multiple}
        accept={accept}
        onChange={(event: ChangeEvent<HTMLInputElement>) =>
          onChange(Array.from(event.target.files || []))
        }
      />

      <button type="button" onClick={() => inputRef.current?.click()}>
        <span className={styles.uploadIcon}>
          <Upload aria-hidden="true" />
        </span>

        <span>
          <strong>{title}</strong>
          <small>{description}</small>
        </span>

        <FileImage aria-hidden="true" />
      </button>

      {files.length > 0 && (
        <div className={styles.fileList}>
          {files.map((file) => (
            <span key={`${file.name}-${file.lastModified}`}>{file.name}</span>
          ))}
        </div>
      )}
    </div>
  );
}
