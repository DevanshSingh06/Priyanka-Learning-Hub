"use client";

import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { siteConfig } from "@/lib/config/site";
import styles from "../teacher.module.css";

const PRODUCTION_SITE_URL = "https://priyanka-learning-hub.vercel.app";

export default function ForgotPasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();

    try {
      const supabase = createClient();
      const configuredSiteUrl = siteConfig.url.replace(/\/+$/, "");
      const siteUrl = process.env.NODE_ENV === "development"
        ? window.location.origin
        : configuredSiteUrl === PRODUCTION_SITE_URL
          ? configuredSiteUrl
          : PRODUCTION_SITE_URL;
      const redirectUrl = new URL("/auth/confirm", siteUrl);

      if (process.env.NODE_ENV === "development") {
        let siteUrlConfigStatus = "missing (not used in development)";
        if (siteConfig.url) {
          try {
            const configuredUrl = new URL(siteConfig.url);
            siteUrlConfigStatus = configuredUrl.protocol === "http:" || configuredUrl.protocol === "https:"
              ? "valid (not used in development)"
              : "malformed (not used in development)";
          } catch {
            siteUrlConfigStatus = "malformed (not used in development)";
          }
        }

        console.info("[password recovery] redirect diagnostics", {
          redirectTo: redirectUrl.toString(),
          redirectToIsValid: (redirectUrl.protocol === "http:" || redirectUrl.protocol === "https:")
            && redirectUrl.pathname === "/auth/confirm",
          nextPublicSiteUrl: siteUrlConfigStatus,
        });
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl.toString(),
      });

      if (error) {
        setErrorMessage("Unable to send a reset link right now. Please try again.");
        return;
      }

      setSuccessMessage("If that email belongs to a teacher account, a reset link is on its way.");
    } catch {
      setErrorMessage("Unable to send a reset link right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="recovery-email">Email</label>
        <input
          id="recovery-email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </div>
      <button className={`button ${styles.submit}`} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send reset link"}
      </button>
      {successMessage && <p className={styles.notice} role="status">{successMessage}</p>}
      {errorMessage && <p className="form-error" role="alert">{errorMessage}</p>}
    </form>
  );
}
