import type { Metadata } from "next";
import LoginForm from "./login-form";
import styles from "../teacher.module.css";

export const metadata: Metadata = { title: "Teacher Login" };

export default function TeacherLoginPage() {
  return (
    <main className={styles.page}>
      <section className={styles.panel} aria-labelledby="teacher-login-title">
        <span className="section-kicker">Teacher access</span>
        <h1 className={styles.heading} id="teacher-login-title">Sign in</h1>
        <p className={styles.description}>Sign in with your teacher account.</p>
        <LoginForm />
      </section>
    </main>
  );
}