"use client";

import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import useAuthStore from "@/store/useAuthStore";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/api/users";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Medal,
  Award,
  Hash,
  Activity,
  ShieldAlert,
  ShieldCheck,
} from "lucide-react";

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

  const isAnggota = profile.role === "anggota" || !!anggota;

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col gap-6">
        {/* HEADER CARD */}
        <Card className="overflow-hidden border-none shadow-sm rounded-2xl bg-white relative">
          {/* Top Banner Gradient */}
          <div className="h-32 w-full bg-gradient-to-r from-neutral-900 to-neutral-700"></div>

          <div className="px-6 sm:px-10 pb-8 relative">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 sm:-mt-20">
              {/* Avatar Outline effect */}
              <div className="p-1.5 bg-white rounded-full shadow-md z-10 shrink-0">
                <Avatar className="w-32 h-32 border-4 border-neutral-50/50">
                  <AvatarImage
                    src={
                      profile?.foto_url || profile?.profile_picture || undefined
                    }
                    alt={profile?.nama || profile?.name || "User"}
                    className="object-cover"
                  />
                  <AvatarFallback className="text-4xl bg-neutral-100 text-neutral-400">
                    {(profile?.nama || profile?.name || "U")
                      .charAt(0)
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="flex-1 text-center sm:text-left pt-2 sm:pt-0 sm:pb-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
                  {profile?.nama || profile?.name || "User"}
                </h1>
                <p className="text-neutral-500 font-medium text-sm sm:text-base mt-1 flex items-center justify-center sm:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {profile?.email}
                </p>
              </div>

              <div className="flex flex-wrap justify-center sm:justify-end gap-3 pb-2 w-full sm:w-auto">
                <Badge
                  variant="outline"
                  className="px-3 py-1.5 text-sm uppercase tracking-wider font-semibold bg-neutral-50 text-neutral-700 border-neutral-200"
                >
                  <User className="w-3.5 h-3.5 mr-2" />
                  {profile?.role || "Anggota"}
                </Badge>

                {isAnggota &&
                  (anggota?.status_aktif === false ? (
                    <Badge
                      variant="destructive"
                      className="px-3 py-1.5 shadow-none text-sm font-semibold"
                    >
                      <ShieldAlert className="w-3.5 h-3.5 mr-2" />
                      Tidak Aktif
                    </Badge>
                  ) : (
                    <Badge className="px-3 py-1.5 shadow-none bg-green-500 hover:bg-green-600 text-white text-sm font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 mr-2" />
                      Aktif
                    </Badge>
                  ))}
              </div>
            </div>
          </div>
        </Card>

        {/* DETAILS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom Kiri: Info Kontak & Pribadi */}
          <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden lg:col-span-1 border border-neutral-100">
            <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 px-6 py-5">
              <CardTitle className="text-base font-semibold text-neutral-800 flex items-center gap-2">
                <User className="w-5 h-5 text-neutral-500" />
                Informasi Kontak
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-5">
              <div className="space-y-1">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> No. Handphone
                </p>
                <p className="text-sm font-medium text-neutral-800">
                  {profile?.no_hp || "-"}
                </p>
              </div>
              <Separator className="bg-neutral-100" />
              <div className="space-y-1">
                <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" /> Alamat
                </p>
                <p className="text-sm font-medium text-neutral-800 leading-relaxed">
                  {profile?.alamat || "-"}
                </p>
              </div>

              {isAnggota && (
                <>
                  <Separator className="bg-neutral-100" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5" /> Jenis Kelamin
                    </p>
                    <p className="text-sm font-medium text-neutral-800 capitalize">
                      {anggota?.jenis_kelamin || "-"}
                    </p>
                  </div>
                  <Separator className="bg-neutral-100" />
                  <div className="space-y-1">
                    <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> Tanggal Lahir
                    </p>
                    <p className="text-sm font-medium text-neutral-800">
                      {formatDate(anggota?.tanggal_lahir) || "-"}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Kolom Kanan: Data Perguruan / Keanggotaan */}
          {isAnggota && (
            <Card className="border-none shadow-sm rounded-2xl bg-white overflow-hidden lg:col-span-2 border border-neutral-100">
              <CardHeader className="bg-neutral-50/50 border-b border-neutral-100 px-6 py-5">
                <CardTitle className="text-base font-semibold text-neutral-800 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-neutral-500" />
                  Data Perguruan
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50/30">
                    <div className="p-2.5 bg-white border border-neutral-100 rounded-lg shadow-xs shrink-0 text-neutral-600">
                      <Hash className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                        Nomor Anggota
                      </p>
                      <p className="text-base font-bold text-neutral-900">
                        {anggota?.nomor_anggota || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50/30">
                    <div className="p-2.5 bg-white border border-neutral-100 rounded-lg shadow-xs shrink-0 text-amber-500">
                      <Medal className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                        Tingkatan Sabuk
                      </p>
                      <p className="text-base font-bold text-neutral-900">
                        {anggota?.tingkatan_sabuk || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50/30">
                    <div className="p-2.5 bg-white border border-neutral-100 rounded-lg shadow-xs shrink-0 text-blue-500">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                        Status Perguruan
                      </p>
                      <p className="text-base font-bold text-neutral-900">
                        {anggota?.status_perguruan || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-xl border border-neutral-100 bg-neutral-50/30">
                    <div className="p-2.5 bg-white border border-neutral-100 rounded-lg shadow-xs shrink-0 text-neutral-600">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">
                        Tanggal Bergabung
                      </p>
                      <p className="text-base font-bold text-neutral-900">
                        {anggota?.tanggal_bergabung
                          ? formatDate(anggota?.tanggal_bergabung.split("T")[0])
                          : "-"}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileMain;
