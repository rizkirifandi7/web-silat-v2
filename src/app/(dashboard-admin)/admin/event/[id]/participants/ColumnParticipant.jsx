"use client";

import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const getPaymentStatusBadge = (status) => {
  switch (status) {
    case "settlement":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80 border-0 flex items-center gap-1 w-fit">
          <CheckCircle2 className="h-3 w-3" /> Lunas
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80 border-0 flex items-center gap-1 w-fit">
          <Clock className="h-3 w-3" /> Menunggu
        </Badge>
      );
    case "failed":
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100/80 border-0 flex items-center gap-1 w-fit">
          <XCircle className="h-3 w-3" /> Dibatalkan
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

const getRegistrationStatusBadge = (status) => {
  switch (status) {
    case "registered":
      return (
        <Badge variant="default" className="bg-blue-600">
          Terdaftar
        </Badge>
      );
    case "cancelled":
      return <Badge variant="destructive">Dibatalkan</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
};

export const columnsParticipant = [
  {
    accessorKey: "user.nama",
    header: "Peserta",
    cell: ({ row }) => {
      const user = row.original.user;

      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 border border-border">
            <AvatarImage src={user?.avatar || ""} alt={user?.nama || "User"} />
            <AvatarFallback className="bg-primary/10 text-primary">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">
              {user?.nama || user?.username || "Peserta"}
            </span>
            <span className="text-xs text-muted-foreground">
              {user?.email || "-"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "registrationDate",
    header: "Tgl Daftar",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      if (!date) return "-";
      return new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Pembayaran",
    cell: ({ row }) => getPaymentStatusBadge(row.original.payment?.paymentStatus),
  },
  {
    accessorKey: "status",
    header: "Status Registrasi",
    cell: ({ row }) => getRegistrationStatusBadge(row.original.status),
  },
];
