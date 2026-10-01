import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import UpdatePasswordForm from "./update-password-form";
import styles from "../teacher.module.css";

export const metadata: Metadata = { title: "Set New Password" };

export default async function UpdatePasswordPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/teacher/login");
  }

  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="update-password-title">
        <span className="section-kicker">Teacher access</span>
        <h1 className={styles.heading} id="update-password-title">Set a new password</h1>
        <p className={styles.description}>Choose a new password for your teacher account.</p>
        <UpdatePasswordForm />
      </section>
    </main>
  );
}
