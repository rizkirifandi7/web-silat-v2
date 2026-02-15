"use client";

import { Button } from "@/components/ui/button";
import {
  Pencil,
  Trash2,
  FileText,
  Video,
  File,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { EditMateri } from "./EditMateri";
import { DeleteMateri } from "./DeleteMateri";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

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

const formatEnum = (value) => {
  if (!value) return "-";
  return value
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getTypeIcon = (type) => {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4" />;
    case "pdf":
      return <FileText className="h-4 w-4" />;
    default:
      return <File className="h-4 w-4" />;
  }
};

const getSabukColor = (sabuk) => {
  switch (sabuk) {
    case "Belum punya":
      return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
    case "LULUS Binfistal":
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100/80";
    case "Sabuk Putih":
      return "bg-white text-black border border-gray-300";
    case "Sabuk Kuning":
      return "bg-yellow-200 text-yellow-900 hover:bg-yellow-200/80";
    case "Sabuk Hijau":
      return "bg-green-200 text-green-900 hover:bg-green-200/80";
    case "Sabuk Merah":
      return "bg-red-200 text-red-900 hover:bg-red-200/80";
    case "Sabuk Hitam Wiraga 1":
    case "Sabuk Hitam Wiraga 2":
    case "Sabuk Hitam Wiraga 3":
      return "bg-black text-white hover:bg-black/80";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100/80";
  }
};

export const columnsMateri = [
  {
    accessorKey: "fileUrl",
    header: "File/Foto",
    cell: ({ row }) => {
      const material = row.original;
      const url = material.fileUrl || material.photoUrl;
      const isImage = url?.match(/\.(jpeg|jpg|gif|png)$/i) != null;

      return (
        <div className="relative w-12 h-12 overflow-hidden rounded-md bg-muted flex items-center justify-center">
          {isImage ? (
            <Image
              src={url}
              alt={material.title}
              fill
              className="object-cover"
            />
          ) : (
            getTypeIcon(material.type)
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Judul",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("title")}</span>
          <span className="text-xs text-muted-foreground capitalize">
            {row.original.type}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Kategori",
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className="capitalize">
          {formatEnum(row.getValue("category"))}
        </Badge>
      );
    },
  },
  {
    accessorKey: "sabuk",
    header: "Tingkatan Sabuk",
    cell: ({ row }) => {
      const sabuk = row.getValue("sabuk");
      return (
        <Badge className={`${getSabukColor(sabuk)} border-0 capitalize`}>
          {sabuk}
        </Badge>
      );
    },
  },
  {
    accessorKey: "isActive",
    header: "Status",
    cell: ({ row }) => {
      return row.getValue("isActive") ? (
        <div className="flex items-center gap-1 text-green-600 text-xs font-medium">
          <CheckCircle2 className="h-3 w-3" /> Aktif
        </div>
      ) : (
        <div className="flex items-center gap-1 text-muted-foreground text-xs font-medium">
          <XCircle className="h-3 w-3" /> Nonaktif
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <MateriActions material={row.original} />,
  },
];

const MateriActions = ({ material }) => {
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

      <EditMateri open={showEdit} setOpen={setShowEdit} material={material} />

      <DeleteMateri
        open={showDelete}
        setOpen={setShowDelete}
        material={material}
      />
    </div>
  );
};
