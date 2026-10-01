import type { Metadata } from "next";
import Link from "next/link";
import ForgotPasswordForm from "./forgot-password-form";
import styles from "../teacher.module.css";

export const metadata: Metadata = { title: "Forgot Password" };

export default function ForgotPasswordPage() {
  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="forgot-password-title">
        <span className="section-kicker">Teacher access</span>
        <h1 className={styles.heading} id="forgot-password-title">Forgot your password?</h1>
        <p className={styles.description}>
          Enter your teacher account email and we&apos;ll send you a password reset link.
        </p>
        <ForgotPasswordForm />
        <Link className={styles.secondaryAction} href="/teacher/login">
          Back to sign in
        </Link>
      </section>
    </main>
  );
}
