"use client";

import { FileImage, Upload } from "lucide-react";
import { type ChangeEvent, useRef } from "react";

import styles from "../PrototypeRequest.module.css";

type FieldErrorProps = {
  id?: string;
  text?: string;
};

export function FieldError({
  id,
  text,
}: FieldErrorProps) {
  if (!text) return null;

  return (
    <span
      className={styles.error}
      id={id}
      role="alert"
    >
      {text}
    </span>
  );
}

type UploadBoxProps = {
  title: string;
  description: string;
  files: File[];
  multiple?: boolean;
  accept: string;
  onChange: (files: File[]) => void;
};

export function UploadBox({
  title,
  description,
  files,
  multiple = false,
  accept,
  onChange,
}: UploadBoxProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selectedFiles = Array.from(
      event.target.files ?? [],
    );

    onChange(selectedFiles);

    // Permite selecionar novamente o mesmo arquivo
    // depois de removê-lo.
    event.target.value = "";
  }

  return (
    <div className={styles.uploadBox}>
      <input
        ref={inputRef}
        type="file"
        hidden
        multiple={multiple}
        accept={accept}
        onChange={handleChange}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
      >
        <span className={styles.uploadIcon}>
          <Upload aria-hidden="true" />
        </span>

        <span>
          <strong>{title}</strong>
          <small>{description}</small>
        </span>

        <FileImage aria-hidden="true" />
      </button>

      {files.length > 0 ? (
        <div
          className={styles.fileList}
          aria-live="polite"
        >
          {files.map((file) => (
            <span
              key={`${file.name}-${file.lastModified}`}
            >
              {file.name}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  );
}