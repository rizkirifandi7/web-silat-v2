"use client";

import { UsersTable } from "@/components/features/Admin/Users/UsersTable";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manajemen User</h1>
          <p className="text-muted-foreground">
            Kelola data pengguna, role, dan hak akses aplikasi.
          </p>
        </div>
      </div>
      <UsersTable />
    </div>
  );
}
