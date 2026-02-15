"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/lib/api/getUserById";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function UserDetailDialog({ user }) {
  const [open, setOpen] = useState(false);
  const userId = user?.id;
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-detail", userId],
    queryFn: () => getUserById(userId).then((res) => res.data.data),
    enabled: open && !!userId,
  });

  console.log("UserDetailDialog - userId:", userId);
  console.log("UserDetailDialog - data:", data);

  if (!userId) return null;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Lihat Detail
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Detail User</DialogTitle>
          <DialogDescription>Informasi lengkap user anggota.</DialogDescription>
        </DialogHeader>
        {isLoading ? (
          <div className="py-6 text-center text-muted-foreground">
            Memuat data...
          </div>
        ) : error ? (
          <div className="py-6 text-center text-destructive">
            Gagal memuat data user.
          </div>
        ) : data ? (
          <div className="space-y-2 text-sm">
            <div>
              <b>Nama:</b> {data.nama}
            </div>
            <div>
              <b>Email:</b> {data.email || "-"}
            </div>
            <div>
              <b>Role:</b> {data.role}
            </div>
            <div>
              <b>NIK:</b> {data.nik || "-"}
            </div>
            <div>
              <b>Tempat, Tanggal Lahir:</b> {data.tempat_lahir},{" "}
              {data.tanggal_lahir}
            </div>
            <div>
              <b>Jenis Kelamin:</b> {data.jenis_kelamin}
            </div>
            <div>
              <b>Tingkatan Sabuk:</b> {data.sabuk}
            </div>
            <div>
              <b>No HP:</b> {data.no_hp || "-"}
            </div>
            <div>
              <b>Alamat:</b> {data.alamat || "-"}
            </div>
          </div>
        ) : null}
        <div className="pt-4 text-right">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Tutup
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
