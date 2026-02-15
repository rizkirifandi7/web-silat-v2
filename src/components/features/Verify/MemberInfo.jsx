"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, CheckCircle2, XCircle, User } from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const MemberInfo = ({ data }) => {
  if (!data) return null;

  const isActive = data.status_aktif; // Pastikan field ini sesuai database (boolean/int)

  return (
    <Card className="w-full overflow-hidden border-2 transition-all hover:shadow-md bg-card">
      {/* Header dengan Warna Status */}
      <CardHeader
        className={`pb-4 border-b ${isActive ? "bg-green-500/5" : "bg-red-500/5"}`}
      >
        <div className="flex justify-between items-start mb-4">
          <Badge
            variant={isActive ? "default" : "destructive"}
            className={isActive ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {isActive ? (
              <span className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Aktif
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <XCircle className="w-3 h-3" /> Tidak Aktif
              </span>
            )}
          </Badge>
          <span className="text-xs font-mono font-medium text-muted-foreground bg-background px-2 py-1 rounded border">
            {data.nomor_anggota || "NO ID"}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-background shadow-sm">
            <AvatarImage
              src={data.foto_url}
              alt={data.nama}
              className="object-cover"
            />
            <AvatarFallback className="text-lg font-bold bg-muted text-muted-foreground">
              {data.nama?.substring(0, 2).toUpperCase() || "JD"}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h3 className="text-lg font-bold text-foreground leading-none">
              {data.nama}
            </h3>
            <p className="text-sm font-medium text-primary">
              {data.tingkatan_sabuk || "Anggota"}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6 space-y-5">
        <div className="grid gap-4">
          {/* Tanggal Bergabung */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                Bergabung Sejak
              </p>
              <p className="text-sm font-medium">
                {data.tanggal_bergabung
                  ? format(new Date(data.tanggal_bergabung), "dd MMMM yyyy", {
                      locale: id,
                    })
                  : "-"}
              </p>
            </div>
          </div>

          {/* Status Unit/Cabang */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="space-y-0.5">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">
                Unit Latihan
              </p>
              <p className="text-sm font-medium">
                {data.unit_latihan || "Pusat"}
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t text-center">
          <p className="text-[10px] text-muted-foreground italic">
            Data diverifikasi real-time dari database pusat.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberInfo;
