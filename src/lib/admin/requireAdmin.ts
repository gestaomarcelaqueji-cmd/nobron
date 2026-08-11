import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function requireAdminAal2() {
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/admin/login");
  }

  if (user.app_metadata?.role !== "admin") {
    await supabase.auth.signOut();
    redirect("/admin/login?error=forbidden");
  }

  const { data: aal, error: aalError } =
    await supabase.auth.mfa.getAuthenticatorAssuranceLevel();

  if (aalError) {
    redirect("/admin/login?error=session");
  }

  if (aal.currentLevel !== "aal2") {
    const { data: factors } = await supabase.auth.mfa.listFactors();
    const hasVerifiedTotp = Boolean(
      factors?.totp?.some((factor) => factor.status === "verified"),
    );
    redirect(hasVerifiedTotp ? "/admin/mfa" : "/admin/mfa/setup");
  }

  return { supabase, user };
}
