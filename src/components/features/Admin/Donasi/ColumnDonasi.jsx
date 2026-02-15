"use client";

import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  AlertOctagon,
  CheckCircle2,
  XCircle,
  Clock,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { EditDonasi } from "./EditDonasi";
import { DeleteDonasi } from "./DeleteDonasi";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const formatEnum = (value) => {
  if (!value) return "-";
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getStatusBadge = (status) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80 border-0 flex items-center gap-1 w-fit">
          <PlayCircle className="h-3 w-3" /> Aktif
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100/80 border-0 flex items-center gap-1 w-fit">
          <CheckCircle2 className="h-3 w-3" /> Selesai
        </Badge>
      );
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100/80 border-0 flex items-center gap-1 w-fit">
          <XCircle className="h-3 w-3" /> Dibatalkan
        </Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100/80 border-0 flex items-center gap-1 w-fit">
          <Clock className="h-3 w-3" /> Draft
        </Badge>
      );
  }
};

export const columnsDonasi = [
  {
    accessorKey: "imageUrl",
    header: "Banner",
    cell: ({ row }) => {
      const url = row.original.imageUrl;
      return (
        <div className="relative w-16 h-10 overflow-hidden rounded-md bg-muted">
          {url ? (
            <Image
              src={url}
              alt={row.original.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
              No Img
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Program",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col max-w-[200px]">
          <span className="font-medium truncate" title={row.getValue("title")}>
            {row.getValue("title")}
          </span>
          <div className="flex items-center gap-2 mt-1">
            <Badge
              variant="outline"
              className="text-[10px] px-1 py-0 h-5 capitalize"
            >
              {row.original.category}
            </Badge>
            {row.original.isUrgent && (
              <Badge
                variant="destructive"
                className="text-[10px] px-1 py-0 h-5 flex items-center gap-0.5"
              >
                <AlertOctagon className="h-2 w-2" /> Urgent
              </Badge>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress Dana",
    cell: ({ row }) => {
      const current = Number(row.original.currentAmount || 0);
      const target = Number(row.original.targetAmount || 1);
      const percentage = Math.min(Math.round((current / target) * 100), 100);

      return (
        <div className="flex flex-col gap-1 w-[180px]">
          <div className="flex justify-between text-xs">
            <span className="font-medium text-green-600">
              {formatCurrency(current)}
            </span>
            <span className="text-muted-foreground">
              of {formatCurrency(target)}
            </span>
          </div>
          <Progress value={percentage} className="h-2" />
          <span className="text-[10px] text-muted-foreground text-right">
            {percentage}% Terkumpul
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => getStatusBadge(row.getValue("status")),
  },
  {
    accessorKey: "endDate",
    header: "Berakhir",
    cell: ({ row }) => {
      const date = row.getValue("endDate");
      if (!date) return <span className="text-muted-foreground">-</span>;
      return (
        <span className="text-sm">
          {new Date(date).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DonasiActions campaign={row.original} />,
  },
];

const DonasiActions = ({ campaign }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => setShowEdit(true)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => setShowDelete(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <EditDonasi open={showEdit} setOpen={setShowEdit} campaign={campaign} />

      <DeleteDonasi
        open={showDelete}
        setOpen={setShowDelete}
        campaign={campaign}
      />
    </div>
  );
};
