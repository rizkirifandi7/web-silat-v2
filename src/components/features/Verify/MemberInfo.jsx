"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  MapPin,
  CheckCircle2,
  XCircle,
  User,
  Medal,
  Phone,
  Mail,
  Hash,
  ShieldAlert,
} from "lucide-react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

const InfoItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/40 hover:bg-muted/60 transition-colors border border-transparent hover:border-border/50">
    <div className="p-2 rounded-md bg-background shadow-sm border mt-0.5">
      <Icon className="w-4 h-4 text-primary shrink-0" />
    </div>
    <div className="space-y-1 w-full">
      <p className="text-[10px] tracking-wider text-muted-foreground font-bold font-mono">
        {label}
      </p>
      <p className="text-sm font-semibold text-foreground/90 capitalize leading-snug">
        {value || "—"}
      </p>
    </div>
  </div>
);

const MemberInfo = ({ data }) => {
  if (!data) return null;

  // Extract from root user data and nested anggotaSilat
  const rootData = data;
  const anggotaData = data?.anggotaSilat || {};

  const isActive = anggotaData?.status_aktif ?? rootData?.status_aktif;
  const fotoUrl = rootData?.foto_url || anggotaData?.foto_url;
  const namaLengkap = rootData?.nama || anggotaData?.nama;
  const nomorAnggota = anggotaData?.id || rootData?.id;
  const sabuk = anggotaData?.tingkatan_sabuk || rootData?.sabuk;

  // Format dates securely
  const formatTgl = (dateString, useLong = true) => {
    if (!dateString) return "—";
    try {
      return format(
        new Date(dateString),
        useLong ? "dd MMMM yyyy" : "dd/MM/yyyy",
        { locale: id },
      );
    } catch {
      return dateString;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden border-0 shadow-xl bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      {/* Banner / Header */}
      <div
        className={`h-32 w-full relative ${isActive ? "bg-linear-to-r from-emerald-500/20 via-primary/10 to-transparent" : "bg-linear-to-r from-rose-500/20 via-destructive/10 to-transparent"}`}
      >
        <div className="absolute top-4 right-4 z-10">
          <Badge
            variant={isActive ? "default" : "destructive"}
            className={`shadow-md gap-1.5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider ${isActive ? "bg-emerald-500 hover:bg-emerald-600 text-white" : ""}`}
          >
            {isActive ? (
              <CheckCircle2 className="w-4 h-4" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            {isActive ? "Status Aktif" : "Tidak Aktif"}
          </Badge>
        </div>
      </div>

      <CardContent className="px-6 pb-8 pt-0 relative border-x border-b border-border/40 rounded-b-xl">
        {/* Avatar Profile Overlapping Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end gap-5 -mt-16 mb-8 relative z-10 w-full px-2">
          <Avatar className="w-32 h-32 border-4 border-background shadow-xl ring-2 ring-primary/20 bg-muted shrink-0">
            <AvatarImage
              src={fotoUrl}
              alt={namaLengkap}
              className="object-cover"
            />
            <AvatarFallback className="text-3xl font-bold text-muted-foreground">
              {namaLengkap?.substring(0, 2).toUpperCase() || "ID"}
            </AvatarFallback>
          </Avatar>

          <div className="text-center sm:text-left space-y-1.5 flex-1 w-full pb-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between w-full">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground line-clamp-1">
                {namaLengkap}
              </h2>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-sm font-medium">
              <Badge
                variant="secondary"
                className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20"
              >
                {sabuk || "Anggota"}
              </Badge>
              <span className="text-muted-foreground hidden sm:inline">•</span>
              <span className="font-mono text-muted-foreground bg-muted px-2 py-0.5 rounded border border-border/50 text-xs">
                ID: {nomorAnggota || "Belum ada nomor"}
              </span>
            </div>
          </div>
        </div>

        {/* Info Grid Sections */}
        <div className="space-y-8">
          {/* Section: Data Identitas Utama */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <User className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/80">
                Identitas Pribadi
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoItem
                icon={Hash}
                label="Gender"
                value={anggotaData?.jenis_kelamin || rootData?.jenis_kelamin}
              />
              <InfoItem
                icon={User}
                label="Ttl"
                value={`${anggotaData?.tempat_lahir || rootData?.tempat_lahir || "—"}, ${formatTgl(anggotaData?.tanggal_lahir || rootData?.tanggal_lahir, false)}`}
              />
            </div>
          </div>

          {/* Section: Kontak & Alamat */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <Phone className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/80">
                Kontak & Alamat
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoItem
                icon={Mail}
                label="Email"
                value={rootData?.email?.toLowerCase()}
              />
              <InfoItem
                icon={Phone}
                label="No. Handphone"
                value={rootData?.no_hp}
              />
              <div className="sm:col-span-2">
                <InfoItem
                  icon={MapPin}
                  label="Alamat Domisili"
                  value={rootData?.alamat}
                />
              </div>
            </div>
          </div>

          {/* Section: Verifikasi Keanggotaan */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 border-b pb-2">
              <ShieldAlert className="w-5 h-5 text-primary" />
              <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/80">
                Data Keanggotaan
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <InfoItem
                icon={Calendar}
                label="Tanggal Bergabung"
                value={formatTgl(anggotaData?.tanggal_bergabung)}
              />
              <InfoItem
                icon={Medal}
                label="Status Perguruan"
                value={anggotaData?.status_perguruan || "—"}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MemberInfo;
