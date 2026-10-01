import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "./login-form";
import styles from "../teacher.module.css";

export const metadata: Metadata = { title: "Teacher Login" };

export default async function TeacherLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string; recovery?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="teacher-login-title">
        <span className="section-kicker">Teacher access</span>
        <h1 className={styles.heading} id="teacher-login-title">Sign in</h1>
        <p className={styles.description}>Sign in with your teacher account.</p>
        {params.reset === "success" && (
          <p className={styles.notice} role="status">
            Your password has been reset. Please sign in with your new password.
          </p>
        )}
        {params.recovery === "invalid" && (
          <p className={styles.notice} role="status">
            This password reset link is invalid or has expired. Please request a new one.
          </p>
        )}
        <LoginForm />
        <Link className={styles.secondaryAction} href="/teacher/forgot-password">
          Forgot your password?
        </Link>
      </section>
    </main>
  );
}