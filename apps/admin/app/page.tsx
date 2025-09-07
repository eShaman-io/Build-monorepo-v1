"use client";

import { AdminAuthProvider } from "./components/AdminAuthProvider";
import { SetAdminForm } from "./components/SetAdminForm";
import { MeditationManager } from "./components/MeditationManager";

export default function AdminPage() {
  return (
    <AdminAuthProvider>
      <main className="min-h-screen bg-background p-8">
        <h1 className="mb-8 text-4xl font-bold">Admin Dashboard</h1>
        <div className="space-y-8">
          <SetAdminForm />
          <MeditationManager />
        </div>
      </main>
    </AdminAuthProvider>
  );
}
