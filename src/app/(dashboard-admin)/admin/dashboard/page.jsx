"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/lib/api/dashboard";
import { StatsCard } from "@/components/features/Admin/Dashboard/StatsCard";
import { RecentActivity } from "@/components/features/Admin/Dashboard/RecentActivity";
import { DashboardChart } from "@/components/features/Admin/Dashboard/DashboardChart";
import { Users, UserCheck, Calendar, FileText, Loader2 } from "lucide-react";

export default function AdminDashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  if (isLoading) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center flex-col gap-4">
        <p className="text-destructive font-medium">Gagal memuat dashboard.</p>
        <p className="text-muted-foreground text-sm">{error.message}</p>
      </div>
    );
  }

  const { totalUsers, totalMembers, totalEvents, recentActivity } =
    data?.data || {};

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Dashboard
          </h2>
          <p className="text-muted-foreground mt-1">
            Selamat datang kembali, Admin! Hari ini {currentDate}.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Quick Actions placeholder or real buttons */}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total User"
          value={totalUsers || 0}
          icon={<Users className="h-5 w-5" />}
          description="Pengguna terdaftar di sistem"
          color="primary"
        />
        <StatsCard
          title="Anggota Silat"
          value={totalMembers || 0}
          icon={<UserCheck className="h-5 w-5" />}
          description="Total anggota aktif"
          color="success"
        />
        <StatsCard
          title="Total Event"
          value={totalEvents || 0}
          icon={<Calendar className="h-5 w-5" />}
          description="Event yang telah dibuat"
          color="purple"
        />
        <StatsCard
          title="Pendaftaran Baru"
          value={recentActivity?.length || 0}
          icon={<FileText className="h-5 w-5" />}
          description="Pendaftaran event terbaru"
          color="warning"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <DashboardChart data={data?.data} />
        </div>
        <div className="lg:col-span-3">
          <RecentActivity activities={recentActivity} />
        </div>
      </div>
    </div>
  );
}
