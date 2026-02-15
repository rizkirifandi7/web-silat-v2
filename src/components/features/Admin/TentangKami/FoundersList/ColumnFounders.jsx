"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { EditFounder } from "./EditFounder";
import { DeleteFounder } from "./DeleteFounder";

export const columnsFounders = [
  {
    accessorKey: "order",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Urutan
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue("order")}</div>
    ),
  },
  {
    accessorKey: "photoUrl",
    header: "Foto",
    cell: ({ row }) => {
      const photoUrl = row.getValue("photoUrl");
      return (
        <div className="relative w-12 h-12 rounded-full overflow-hidden border">
          {photoUrl ? (
            <Image
              src={
                photoUrl.startsWith("http")
                  ? photoUrl
                  : `${process.env.NEXT_PUBLIC_API_URL?.replace("/api", "")}/${photoUrl}`
              }
              alt={row.getValue("nama")}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500">
              No Img
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Jabatan",
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => {
      const description = row.getValue("description");
      return (
        <div className="max-w-[200px] truncate" title={description}>
          {description}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const founder = row.original;
      return (
        <div className="flex items-center gap-2">
          <EditFounder founder={founder} />
          <DeleteFounder id={founder.id} name={founder.nama} />
        </div>
      );
    },
  },
];
