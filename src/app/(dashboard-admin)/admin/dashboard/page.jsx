"use client";

import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/lib/api/dashboard";
import { StatsCard } from "@/components/features/Admin/Dashboard/StatsCard";
import { RecentActivity } from "@/components/features/Admin/Dashboard/RecentActivity";
// GANTI IMPORT INI:
import { UserOverviewChart } from "@/components/features/Admin/Dashboard/UserOverviewChart";
import { Users, UserCheck, Calendar, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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

  // --- Loading State ---
  if (isLoading) {
    return (
      <div className="flex-1 space-y-8 p-8 pt-6">
        <div className="space-y-2">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-4 w-[300px]" />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32 rounded-xl" />
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-7">
          <Skeleton className="lg:col-span-4 h-[400px] rounded-xl" />
          <Skeleton className="lg:col-span-3 h-[400px] rounded-xl" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[80vh] w-full items-center justify-center flex-col gap-4">
        <p className="text-destructive font-medium bg-destructive/10 px-4 py-2 rounded-md">
          Gagal memuat dashboard: {error.message}
        </p>
      </div>
    );
  }

  const { totalUsers, totalMembers, totalEvents, recentActivity } =
    data?.data || {};

  return (
    <div className="flex-1 space-y-8 p-8 pt-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h2>
          <p className="text-muted-foreground mt-1 text-sm font-medium">
            Halo Admin, ini ringkasan aktivitas untuk {currentDate}.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total User"
          value={totalUsers || 0}
          icon={<Users className="h-4 w-4" />}
          description="Pengguna terdaftar"
        />
        <StatsCard
          title="Anggota Silat"
          value={totalMembers || 0}
          icon={<UserCheck className="h-4 w-4" />}
          description="Anggota aktif"
        />
        <StatsCard
          title="Total Event"
          value={totalEvents || 0}
          icon={<Calendar className="h-4 w-4" />}
          description="Event terselenggara"
        />
        <StatsCard
          title="Pendaftar Baru"
          value={recentActivity?.length || 0}
          icon={<TrendingUp className="h-4 w-4" />}
          description="Dalam 30 hari terakhir"
        />
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-7">
        {/* CHART BARU DISINI */}
        <UserOverviewChart data={data?.data} />

        <RecentActivity activities={recentActivity} />
      </div>
    </div>
  );
}
