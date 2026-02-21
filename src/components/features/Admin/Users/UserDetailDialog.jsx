"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/api/users";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Loader2,
  Shield,
  User,
  Medal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Hash,
  Activity,
  Eye,
} from "lucide-react";

// Komponen InfoItem minimalis untuk menampilkan Data
const InfoItem = ({ label, value, colSpan = 1 }) => (
  <div
    className={`flex flex-col gap-1.5 ${colSpan === 2 ? "sm:col-span-2" : ""}`}
  >
    <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
      {label}
    </span>
    <span className="text-sm font-medium text-neutral-900 leading-relaxed">
      {value || "—"}
    </span>
  </div>
);

// Wrapper Section untuk kerapian kategori data
const Section = ({ icon: Icon, title, children }) => (
  <div className="flex flex-col gap-4 p-1">
    <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
      <div className="p-1.5 bg-neutral-50 rounded-md ring-1 ring-neutral-200">
        <Icon className="w-4 h-4 text-neutral-600" />
      </div>
      <h3 className="text-sm font-semibold text-neutral-900 tracking-wide">
        {title}
      </h3>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
      {children}
    </div>
  </div>
);

export default function UserDetailDialog({ user }) {
  const [open, setOpen] = useState(false);
  const userId = user?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["user-detail", userId],
    queryFn: () => getUserById(userId).then((res) => res.data),
    enabled: open && !!userId,
  });

  if (!userId) return null;

  // Helper format tanggal
  const formatDate = (dateString) => {
    if (!dateString) return "—";
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const isAnggota = data?.role === "anggota";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="font-medium bg-white text-neutral-700 border-neutral-200 hover:bg-neutral-50 hover:text-neutral-900"
        >
          <Eye className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl bg-white border-neutral-200 shadow-xl rounded-2xl max-h-[85vh] p-0 flex flex-col gap-0 overflow-hidden">
        {/* HEADER */}
        <DialogHeader className="p-6 border-b border-neutral-100 bg-white shrink-0">
          <div className="flex items-center gap-4">
            {/* Avatar Placeholder */}
            <div className="w-14 h-14 rounded-full bg-neutral-50 flex items-center justify-center ring-1 ring-neutral-200 shadow-sm">
              <User className="w-6 h-6 text-neutral-500" />
            </div>

            <div className="flex flex-col gap-1.5">
              <DialogTitle className="text-xl font-bold tracking-tight text-neutral-900">
                {data?.nama || user?.nama || "Detail Pengguna"}
              </DialogTitle>

              {data && (
                <div className="flex items-center gap-2.5 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border-none font-medium px-2.5 py-0.5 rounded-md capitalize"
                  >
                    {data.role}
                  </Badge>

                  {/* Status Indicator Indicator */}
                  <div className="flex items-center gap-1.5 bg-neutral-50 px-2.5 py-0.5 rounded-md ring-1 ring-neutral-200">
                    <span className="relative flex h-2 w-2">
                      {data.status_aktif && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      )}
                      <span
                        className={`relative inline-flex rounded-full h-2 w-2 ${data.status_aktif ? "bg-green-500" : "bg-red-500"}`}
                      ></span>
                    </span>
                    <span className="text-[11px] font-semibold text-neutral-600 uppercase tracking-wider">
                      {data.status_aktif ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </DialogHeader>

        {/* BODY / CONTENT */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 bg-neutral-50/50">
            <Loader2 className="h-8 w-8 text-neutral-400 animate-spin mb-4" />
            <p className="text-sm text-neutral-500 font-medium">
              Memuat data pengguna...
            </p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-24 bg-neutral-50/50">
            <div className="p-3 bg-red-50 text-red-500 rounded-full mb-3">
              <Activity className="w-6 h-6" />
            </div>
            <p className="text-sm text-neutral-600 font-medium">
              Gagal memuat data pengguna.
            </p>
          </div>
        ) : data ? (
          <ScrollArea className="flex-1 bg-neutral-50/50 px-6 py-6 custom-scrollbar overflow-y-auto">
            <div className="space-y-10 pb-6">
              {/* SECTION 1: Informasi Akun & Kontak */}
              <Section icon={Shield} title="Informasi Akun & Kontak">
                <InfoItem
                  label="Email"
                  value={
                    <span className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-neutral-400" />
                      {data.email}
                    </span>
                  }
                />
                <InfoItem
                  label="No. Handphone"
                  value={
                    <span className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-neutral-400" />
                      {data.no_hp}
                    </span>
                  }
                />
                <InfoItem
                  label="Alamat Lengkap"
                  value={
                    <span className="flex items-start gap-2 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                      <span>{data.alamat}</span>
                    </span>
                  }
                  colSpan={2}
                />
              </Section>

              {/* SECTION 2: Data Pribadi */}
              <Section icon={User} title="Data Pribadi">
                <InfoItem
                  label="NIK"
                  value={
                    <span className="flex items-center gap-2">
                      <Hash className="w-3.5 h-3.5 text-neutral-400" />
                      {data.nik}
                    </span>
                  }
                />
                <InfoItem label="Jenis Kelamin" value={data.jenis_kelamin} />
                <InfoItem label="Tempat Lahir" value={data.tempat_lahir} />
                <InfoItem
                  label="Tanggal Lahir"
                  value={
                    <span className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                      {formatDate(data.tanggal_lahir)}
                    </span>
                  }
                />
              </Section>

              {/* SECTION 3: Profil Perguruan (Hanya tampil jika Anggota) */}
              {isAnggota && (
                <Section icon={Medal} title="Profil Perguruan">
                  <InfoItem
                    label="Tingkatan Sabuk"
                    value={
                      <Badge
                        variant="outline"
                        className="bg-white border-neutral-200 text-neutral-800 font-medium px-2 py-0.5 mt-1"
                      >
                        {data.sabuk}
                      </Badge>
                    }
                    colSpan={2}
                  />
                  <InfoItem
                    label="Status Perguruan"
                    value={data.status_perguruan}
                  />
                  <InfoItem
                    label="Tanggal Bergabung"
                    value={
                      <span className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                        {formatDate(data.tanggal_bergabung)}
                      </span>
                    }
                  />
                </Section>
              )}
            </div>
          </ScrollArea>
        ) : null}

        {/* FOOTER */}
        <div className="p-5 border-t border-neutral-100 bg-white flex justify-end shrink-0">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="bg-white border-neutral-200 text-neutral-700 hover:bg-neutral-50 hover:text-neutral-900 rounded-lg transition-colors min-w-[100px]"
            >
              Tutup
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
