"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import styles from "../teacher.module.css";

export default function LogoutButton() {
  const router = useRouter();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignOut() {
    setIsSigningOut(true);
    setErrorMessage("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();

      if (error) {
        setErrorMessage("Unable to sign out right now. Please try again.");
        setIsSigningOut(false);
        return;
      }

      router.replace("/teacher/login");
    } catch {
      setErrorMessage("Unable to sign out right now. Please try again.");
      setIsSigningOut(false);
    }
  }

  return (
    <div>
      <button className={`button button-light ${styles.logout}`} type="button" onClick={handleSignOut} disabled={isSigningOut}>
        <LogOut size={16} />
        {isSigningOut ? "Signing out..." : "Sign out"}
      </button>
      {errorMessage && <p className={`form-error ${styles.status}`} role="alert">{errorMessage}</p>}
    </div>
  );
}