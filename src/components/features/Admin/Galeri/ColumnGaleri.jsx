"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { EditGaleri } from "./EditGaleri";
import { DeleteGaleri } from "./DeleteGaleri";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TruncatedText = ({ text, maxLength = 50 }) => {
  if (!text) return "-";

  if (text.length <= maxLength) {
    return <span>{text}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="cursor-help">{text.slice(0, maxLength)}...</span>
        </TooltipTrigger>
        <TooltipContent className="max-w-xs">
          <p className="whitespace-pre-wrap">{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const columnsGaleri = [
  {
    accessorKey: "photoUrl",
    header: "Thumbnail",
    cell: ({ row }) => {
      const gallery = row.original;
      return (
        <div className="relative w-12 h-12 overflow-hidden rounded-md bg-muted">
          <Image
            src={gallery.thumbnailUrl || gallery.photoUrl}
            alt={gallery.title}
            fill
            className="object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Judul",
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => {
      return (
        <div className="inline-block px-2 py-1 text-xs rounded-lg bg-primary/10 text-primary capitalize">
          {row.getValue("category")}
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Deskripsi",
    cell: ({ row }) => {
      return (
        <TruncatedText text={row.getValue("description")} maxLength={50} />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <GalleryActions gallery={row.original} />,
  },
];

const GalleryActions = ({ gallery }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 "
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

      <EditGaleri open={showEdit} setOpen={setShowEdit} gallery={gallery} />

      <DeleteGaleri
        open={showDelete}
        setOpen={setShowDelete}
        gallery={gallery}
      />
    </div>
  );
};
