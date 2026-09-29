"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import styles from "../teacher.module.css";

export default function LoginForm() {
  const router = useRouter();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSigningIn(true);
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
        setErrorMessage("Unable to sign in. Check your email and password and try again.");
        return;
      }

      router.push("/teacher/dashboard");
    } catch {
      setErrorMessage("Unable to sign in right now. Please try again.");
    } finally {
      setIsSigningIn(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="teacher-email">Email</label>
        <input id="teacher-email" name="email" type="email" autoComplete="username" required />
      </div>
      <div className="field">
        <label htmlFor="teacher-password">Password</label>
        <input id="teacher-password" name="password" type="password" autoComplete="current-password" required />
      </div>
      <button className={`button ${styles.submit}`} type="submit" disabled={isSigningIn}>
        <LogIn size={16} />
        {isSigningIn ? "Signing in..." : "Sign in"}
      </button>
      {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
    </form>
  );
}