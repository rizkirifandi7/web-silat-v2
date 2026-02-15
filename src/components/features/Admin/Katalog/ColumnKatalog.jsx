"use client";

import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { EditKatalog } from "./EditKatalog";
import { DeleteKatalog } from "./DeleteKatalog";
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

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const columnsKatalog = [
  {
    accessorKey: "imageUrl",
    header: "Produk",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="relative w-12 h-12 overflow-hidden rounded-md bg-muted border border-border">
          <Image
            src={product.imageUrl}
            alt={product.nama}
            fill
            className="object-contain p-1"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "nama",
    header: "Nama Produk",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("nama")}</span>
    ),
  },
  {
    accessorKey: "kategori",
    header: "Kategori",
    cell: ({ row }) => {
      return (
        <div className="inline-block px-2 py-1 text-xs rounded-lg bg-primary/10 text-primary capitalize font-medium">
          {row.getValue("kategori")}
        </div>
      );
    },
  },
  {
    accessorKey: "harga",
    header: "Harga",
    cell: ({ row }) => {
      return (
        <span className="font-bold text-primary">
          {formatCurrency(row.getValue("harga"))}
        </span>
      );
    },
  },
  {
    accessorKey: "isNew",
    header: "Status",
    cell: ({ row }) => {
      return row.getValue("isNew") ? (
        <span className="px-2 py-1 text-[10px] font-bold uppercase bg-yellow-500/20 text-yellow-600 rounded">
          Baru
        </span>
      ) : null;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <KatalogActions product={row.original} />,
  },
];

const KatalogActions = ({ product }) => {
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
        className="h-8 w-8 text-destructive hover:text-destructive"
        onClick={() => setShowDelete(true)}
      >
        <Trash2 className="h-4 w-4" />
      </Button>

      <EditKatalog open={showEdit} setOpen={setShowEdit} product={product} />
      <DeleteKatalog
        open={showDelete}
        setOpen={setShowDelete}
        product={product}
      />
    </div>
  );
};
