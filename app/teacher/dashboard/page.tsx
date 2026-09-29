import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "./logout-button";
import ResourceManager from "./resource-manager";
import styles from "../teacher.module.css";

export const metadata: Metadata = { title: "Teacher Dashboard" };

export default async function TeacherDashboardPage() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/teacher/login");
  }

  return (
    <main className={`${styles.page} ${styles.dashboardPage}`}>
      <section className={`${styles.panel} ${styles.dashboardPanel}`} aria-labelledby="teacher-dashboard-title">
        <div className={styles.dashboardHeader}>
          <div>
            <span className="section-kicker">Teacher access</span>
            <h1 className={styles.heading} id="teacher-dashboard-title">Teacher Dashboard</h1>
          </div>
          <LogoutButton />
        </div>
        <ResourceManager />
      </section>
    </main>
  );
}