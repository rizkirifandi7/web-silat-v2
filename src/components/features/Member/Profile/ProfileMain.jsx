"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useAuthStore from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/api/users";

export const formatDate = (dateString) => {
  if (!dateString) return "-";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const ProfileMain = () => {
  const user = useAuthStore((state) => state.user);
  const userId = user?.id;
  const { data, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getUserById(userId).then((res) => res.data),
    enabled: !!userId,
  });
  const profile = data || {};
  const anggota = profile.anggotaSilat;

  return (
    <section className="w-full mx-auto px-4 py-10 flex flex-col gap-8">
      <Card className={"shadow-none"}>
        <CardHeader className="flex flex-row items-center gap-6">
          <Avatar size="lg">
            <AvatarImage
              src={profile?.foto_url || profile?.profile_picture || undefined}
              alt={profile?.nama || profile?.name || "User"}
            />
            <AvatarFallback>
              {(profile?.nama || profile?.name || "U")[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl font-semibold mb-1">
              {profile?.nama || profile?.name || "User"}
            </CardTitle>
            <div className="text-muted-foreground text-sm">
              {profile?.email}
            </div>
            <div className="mt-2 flex gap-2">
              <Badge variant="secondary">{profile?.role || "Anggota"}</Badge>
              {anggota?.status_aktif === false ? (
                <Badge variant="destructive">Tidak Aktif</Badge>
              ) : (
                <Badge variant="success">Aktif</Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-muted-foreground">Memuat data profil...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div>
                <div className="text-xs text-muted-foreground">
                  Nomor Anggota
                </div>
                <div className="font-medium">
                  {anggota?.nomor_anggota || "-"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Tingkatan Sabuk
                </div>
                <div className="font-medium">
                  {anggota?.tingkatan_sabuk || "-"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Tanggal Lahir
                </div>
                <div className="font-medium">
                  {formatDate(anggota?.tanggal_lahir) || "-"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Jenis Kelamin
                </div>
                <div className="font-medium capitalize">
                  {anggota?.jenis_kelamin || "-"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Status Perguruan
                </div>
                <div className="font-medium">
                  {anggota?.status_perguruan || "-"}
                </div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Alamat</div>
                <div className="font-medium">{profile?.alamat || "-"}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">No. HP</div>
                <div className="font-medium">{profile?.no_hp || "-"}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">
                  Tanggal Bergabung
                </div>
                <div className="font-medium">
                  {anggota?.tanggal_bergabung
                    ? anggota.tanggal_bergabung.split("T")[0]
                    : "-"}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};
export default ProfileMain;
