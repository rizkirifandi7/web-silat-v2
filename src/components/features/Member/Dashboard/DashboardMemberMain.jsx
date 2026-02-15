"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import useAuthStore from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getMaterials } from "@/lib/api/materi";

const DashboardMemberMain = () => {
  const user = useAuthStore((state) => state.user);
  const greeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Selamat pagi";
    if (hour < 18) return "Selamat siang";
    return "Selamat malam";
  };

  // Ambil materi dari backend
  const { data: materialsData, isLoading: loadingMaterials } = useQuery({
    queryKey: ["dashboard-materials"],
    queryFn: () => getMaterials().then((res) => res.data.data || []),
  });
  // Hitung progress belajar
  const totalMateri = materialsData?.length || 0;
  // Dummy: materi selesai, bisa diganti dengan data backend jika ada
  const materiSelesai = Math.min(5, totalMateri);
  const progress =
    totalMateri > 0 ? Math.round((materiSelesai / totalMateri) * 100) : 0;

  return (
    <section className="w-full mx-auto px-4 py-8 flex flex-col gap-8">
      {/* Header Greeting */}
      <div className="flex items-center gap-4">
        <Avatar size="lg">
          <AvatarImage
            src={user?.profile_picture || undefined}
            alt={user?.name || "User"}
          />
          <AvatarFallback>{user?.name?.[0] || "U"}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-semibold leading-tight">
            {greeting()},{" "}
            <span className="text-primary">{user?.name || "Anggota"}</span>
          </h1>
          <div className="text-muted-foreground text-sm mt-1">
            Selamat datang di dashboard anggota Silat
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <Card className={"shadow-none"}>
          <CardHeader>
            <CardTitle>Materi</CardTitle>
            <CardDescription>Materi yang telah dipelajari</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{materiSelesai}</div>
          </CardContent>
        </Card>
        <Card className={"shadow-none"} >
          <CardHeader>
            <CardTitle>Status</CardTitle>
            <CardDescription>Keanggotaan</CardDescription>
          </CardHeader>
          <CardContent>
            <Badge variant="secondary">
              {user?.anggotaSilat?.status_aktif === false
                ? "Tidak Aktif"
                : "Aktif"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Progress Belajar */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Progress Belajar</h2>
        <Card className={"shadow-none"}>
          <CardContent className="py-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">
                Materi selesai
              </span>
              <span className="text-sm font-medium">
                {materiSelesai}/{totalMateri}
              </span>
            </div>
            <Progress value={progress} />
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DashboardMemberMain;
