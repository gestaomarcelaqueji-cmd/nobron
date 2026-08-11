"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { createClient } from "@/lib/supabase/client";

import styles from "./admin.module.css";

export function AdminSignOutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function signOut() {
    setLoading(true);
    try {
      await createClient().auth.signOut();
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      className={styles.signOutButton}
      type="button"
      disabled={loading}
      onClick={() => void signOut()}
    >
      {loading ? "Saindo..." : "Sair"}
    </button>
  );
}
