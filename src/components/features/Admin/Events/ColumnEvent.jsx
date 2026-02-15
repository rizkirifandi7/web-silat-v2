"use client";

import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  CalendarDays,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  PlayCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { EditEvent } from "./EditEvent";
import { DeleteEvent } from "./DeleteEvent";
import { Badge } from "@/components/ui/badge";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const getStatusBadge = (status) => {
  switch (status) {
    case "published":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100/80 border-0 flex items-center gap-1 w-fit">
          <CheckCircle2 className="h-3 w-3" /> Published
        </Badge>
      );
    case "ongoing":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100/80 border-0 flex items-center gap-1 w-fit">
          <PlayCircle className="h-3 w-3" /> Ongoing
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100/80 border-0 flex items-center gap-1 w-fit">
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

export const columnsEvent = [
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
    header: "Event",
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
              {row.original.eventType}
            </Badge>
            <span className="text-[10px] text-muted-foreground flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {row.original.location || "Online"}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "eventDate",
    header: "Waktu",
    cell: ({ row }) => {
      const start = row.getValue("eventDate");
      const end = row.original.endDate;

      if (!start) return <span className="text-muted-foreground">-</span>;

      const formatDate = (date) =>
        new Date(date).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

      return (
        <div className="flex flex-col text-xs">
          <span className="font-medium">{formatDate(start)}</span>
          {end && (
            <span className="text-muted-foreground text-[10px]">
              s/d {formatDate(end)}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "capacity",
    header: "Kuota & Harga",
    cell: ({ row }) => {
      const isFree = row.original.isFree;
      const price = Number(row.original.price || 0);

      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1 text-xs">
            <Users className="h-3 w-3" />
            <span>
              {row.original.registeredCount} / {row.original.capacity}
            </span>
          </div>
          <div className="text-xs font-medium">
            {isFree ? (
              <span className="text-green-600">Gratis</span>
            ) : (
              <span className="text-blue-600">{formatCurrency(price)}</span>
            )}
          </div>
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
    id: "actions",
    cell: ({ row }) => <EventActions event={row.original} />,
  },
];

const EventActions = ({ event }) => {
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

      <EditEvent open={showEdit} setOpen={setShowEdit} event={event} />

      <DeleteEvent open={showDelete} setOpen={setShowDelete} event={event} />
    </div>
  );
};
